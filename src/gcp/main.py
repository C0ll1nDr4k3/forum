import logging
from contextlib import asynccontextmanager
from typing import List

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from sentence_transformers import SentenceTransformer
import torch  # Explicitly import torch to potentially help with packaging/detection

# --- Configuration ---
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Determine device (CPU is often sufficient and simpler for Cloud Run unless you configure GPU)
# Cloud Run defaults to CPU. For GPU, you'd need specific machine types.
device = "cuda" if torch.cuda.is_available() else "cpu"
logger.info(f"Using device: {device}")

# Model name
MODEL_NAME = "multi-qa-MiniLM-L6-cos-v1"


# --- Pydantic Models ---
class TextInput(BaseModel):
    text: str = Field(..., min_length=1, description="The text content to encode.")
    # Example of adding optional parameters if needed later
    # normalize_embeddings: bool = False


class EncodingResponse(BaseModel):
    embedding: List[float] = Field(..., description="The resulting embedding vector.")
    model_name: str = Field(
        MODEL_NAME, description="Name of the model used for encoding."
    )
    # text_truncated: bool = Field(False, description="Indicates if the input text was truncated.") # Add if truncation logic is implemented


# --- Application State ---
# We'll store the loaded model in the app's state to avoid reloading on every request
app_state = {}


# --- Lifespan Management (for model loading/unloading) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load the model
    logger.info(f"Loading model '{MODEL_NAME}' onto device '{device}'...")
    try:
        model = SentenceTransformer(MODEL_NAME, device=device)
        # You could potentially optimize further here if needed:
        # model.half() # If using GPU and want FP16
        # model = torch.compile(model) # If using PyTorch 2.0+ and want compilation (might increase startup time)
        app_state["model"] = model
        logger.info("Model loaded successfully.")
    except Exception as e:
        logger.error(f"Failed to load model: {e}", exc_info=True)
        # Decide if the app should fail to start or continue without a model
        # For this critical function, it's better to prevent startup if model fails
        raise RuntimeError(f"Could not load SentenceTransformer model: {e}") from e

    yield  # Application runs here

    # Shutdown: Clean up resources (optional, Cloud Run might just kill the container)
    logger.info("Shutting down and cleaning up resources...")
    app_state.clear()
    # Explicitly clear GPU memory if applicable
    if device == "cuda":
        import torch

        torch.cuda.empty_cache()
    logger.info("Cleanup finished.")


# --- FastAPI App ---
app = FastAPI(
    title="Text Encoding Service",
    description="Encodes text using the multi-qa-MiniLM-L6-cos-v1 model.",
    version="1.0.0",
    lifespan=lifespan,  # Use the lifespan context manager
)


# --- API Endpoints ---
@app.get("/health", summary="Health Check", tags=["Health"])
async def health_check():
    """Basic health check endpoint."""
    # Could add a check here to ensure the model is loaded in app_state if needed
    if "model" not in app_state or app_state["model"] is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {"status": "ok"}


@app.post(
    "/encode", response_model=EncodingResponse, summary="Encode Text", tags=["Encoding"]
)
async def encode_text(payload: TextInput):
    """
    Receives text input and returns its semantic embedding vector.
    """
    if "model" not in app_state or app_state["model"] is None:
        logger.error("Model not found in application state during request.")
        raise HTTPException(status_code=503, detail="Model is not available")

    model: SentenceTransformer = app_state["model"]
    text_to_encode = payload.text

    # Consider adding truncation logic if needed, SentenceTransformer handles it by default
    # max_seq_length = model.get_max_seq_length() # Or model.max_seq_length
    # if len(model.tokenizer.encode(text_to_encode)) > max_seq_length:
    #     logger.warning(f"Input text longer than model max sequence length ({max_seq_length}). Truncating.")
    #     # text_truncated = True # Set flag for response if needed

    try:
        logger.info(f"Encoding text (length: {len(text_to_encode)})...")
        # Encode the text. The model handles moving data to the correct device.
        # encode() returns a numpy array, convert it to a list for JSON serialization.
        embedding = model.encode(
            text_to_encode, convert_to_numpy=False
        ).tolist()  # Directly get list if possible, else use .tolist() on numpy array
        logger.info("Encoding successful.")

        return EncodingResponse(
            model_name=MODEL_NAME,
            embedding=embedding,
            # text_truncated=text_truncated # Include if implementing truncation feedback
        )
    except Exception as e:
        logger.error(f"Error during encoding: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to encode text: {e}")


# --- Optional: Run directly with uvicorn for local testing ---
# if __name__ == "__main__":
#     import uvicorn
#     # Use the PORT environment variable provided by Cloud Run, default to 8080 locally
#     port = int(os.environ.get("PORT", 8080))
#     uvicorn.run(app, host="0.0.0.0", port=port)
# Note: The Dockerfile's CMD will handle running uvicorn in production.
