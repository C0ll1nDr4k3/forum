const load = async ({ fetch }) => {
  const response = await fetch("/api/posts");
  return {
    posts: await response.json()
  };
};
export {
  load
};
