import "clsx";
import "../../../../chunks/client.js";
import { r as rest_props, j as fallback, k as spread_attributes, l as attr, m as slot, n as bind_props, p as pop, a as push, o as sanitize_props } from "../../../../chunks/index2.js";
function SignOut($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["className", "options", "signOutPage"]);
  push();
  let className = fallback($$props["className"], "");
  let options = fallback($$props["options"], () => void 0, true);
  let signOutPage = fallback($$props["signOutPage"], "signout");
  $$payload.out += `<form${spread_attributes({
    method: "POST",
    action: `/${signOutPage}`,
    class: `signOutButton ${className}`,
    ...$$restProps
  })}>`;
  if (options) {
    $$payload.out += "<!--[-->";
    if (options?.redirect) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<input type="hidden" name="redirect"${attr("value", options.redirect)}>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (options?.redirectTo) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<input type="hidden" name="redirectTo"${attr("value", options.redirectTo)}>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <button type="submit"><!---->`;
  slot($$payload, $$props, "submitButton", {}, () => {
    $$payload.out += `Sign Out`;
  });
  $$payload.out += `<!----></button></form>`;
  bind_props($$props, { className, options, signOutPage });
  pop();
}
function _page($$payload) {
  SignOut($$payload, {});
}
export {
  _page as default
};
