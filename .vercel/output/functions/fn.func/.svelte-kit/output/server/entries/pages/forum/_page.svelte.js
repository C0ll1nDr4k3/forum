import { b as ensure_array_like, c as bind_props } from "../../../chunks/index2.js";
function _page($$payload, $$props) {
  let data = $$props["data"];
  let { posts } = data;
  const each_array = ensure_array_like(posts);
  $$payload.out += `<h1>Welcome to SvelteKit</h1> <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    each_array[$$index];
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { data });
}
export {
  _page as default
};
