# Use an official Python slim runtime (Debian-based, glibc)
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8080
ENV HOST=0.0.0.0
# Tell uv where to find the cache (optional)
ENV UV_CACHE_DIR=/root/.cache/uv

# Set the working directory in the container
WORKDIR /app

# --- Install uv and then use it to install Python dependencies ---
COPY requirements.txt .

# Install uv using pip, then use uv to install requirements.
# Wheels for PyTorch should now be found on this glibc-based image.
RUN pip install --no-cache-dir uv && \
    uv pip install --system --no-cache -r requirements.txt
    # --system: Install packages into the main Python environment
    # --no-cache: Disable uv's caching for this specific install command

# Copy the rest of the application code into the container
COPY . .

# --- Download the model ---
# Ensure MODEL_NAME is handled correctly (e.g., hardcoded, ENV, ARG)
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('multi-qa-MiniLM-L6-cos-v1')"

# Command to run the application using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "1"]

# Expose the port the container will listen on
EXPOSE 8080
