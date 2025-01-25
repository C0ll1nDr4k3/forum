import "../../chunks/index.js";
const load = async (event) => {
  const session = await event.locals.auth();
  return {
    session
  };
};
export {
  load
};
