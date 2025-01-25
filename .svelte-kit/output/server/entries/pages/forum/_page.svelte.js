import { e as escape_html, p as pop, a as push, l as ensure_array_like, v as bind_props } from "../../../chunks/index2.js";
import "clsx";
function PostPreview($$payload, $$props) {
  push();
  const { post } = $$props;
  $$payload.out += `<article><h2>${escape_html(post.title)}</h2> <p>by ${escape_html(post.author)} on ${escape_html(post.date)}</p> <p>Tags: ${escape_html(post.tags.join(", "))}</p> <p>${escape_html(post.likes)} likes</p></article>`;
  pop();
}
function _page($$payload, $$props) {
  let data = $$props["data"];
  let { posts } = data;
  const each_array = ensure_array_like(posts);
  $$payload.out += `<h1>Welcome to SvelteKit</h1> <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let post = each_array[$$index];
    PostPreview($$payload, { post });
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { data });
}
export {
  _page as default
};
