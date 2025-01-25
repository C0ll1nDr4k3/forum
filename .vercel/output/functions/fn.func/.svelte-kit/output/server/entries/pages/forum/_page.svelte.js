import { e as escape_html, h as ensure_array_like, l as attr, p as pop, a as push } from "../../../chunks/index2.js";
function PostPreview($$payload, $$props) {
  push();
  const { post } = $$props;
  $$payload.out += `<article><header><h2>${escape_html(post.content)}</h2> <p>Posted by ${escape_html(post.userId)} on ${escape_html(post.createdAt)}</p></header> `;
  if (post.attachments) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(post.attachments);
    $$payload.out += `<figure><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let attachment = each_array[$$index];
      $$payload.out += `<img${attr("src", attachment.fileUrl)}${attr("alt", " ")}>`;
    }
    $$payload.out += `<!--]--></figure>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></article>`;
  pop();
}
function _page($$payload, $$props) {
  const { data } = $$props;
  let { posts } = data;
  const each_array = ensure_array_like(posts);
  $$payload.out += `<!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let post = each_array[$$index];
    PostPreview($$payload, { post });
  }
  $$payload.out += `<!--]-->`;
}
export {
  _page as default
};
