import "clsx";
import { r as rest_props, j as fallback, k as spread_attributes, l as attr, h as ensure_array_like, m as slot, n as bind_props, p as pop, a as push, e as escape_html, o as sanitize_props } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/index3.js";
import "../../../../chunks/client.js";
import { B as Button } from "../../../../chunks/button.js";
function SignIn($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "className",
    "provider",
    "signInPage",
    "options",
    "authorizationParams"
  ]);
  push();
  let className = fallback($$props["className"], "");
  let provider = fallback($$props["provider"], "");
  let signInPage = fallback($$props["signInPage"], "signin");
  let options = fallback($$props["options"], () => void 0, true);
  let authorizationParams = fallback($$props["authorizationParams"], () => void 0, true);
  const callbackUrl = options instanceof FormData ? options.get("redirectTo") : options?.redirectTo;
  const redirect = options instanceof FormData ? options.get("redirect") : options?.redirectTo;
  const authorizationParamsInputs = authorizationParams ? typeof authorizationParams === "string" && authorizationParams ? new URLSearchParams(authorizationParams) : authorizationParams : void 0;
  $$payload.out += `<form${spread_attributes({
    method: "POST",
    action: `/${signInPage}`,
    class: `signInButton ${className}`,
    ...$$restProps
  })}><input type="hidden" name="providerId"${attr("value", provider)}> `;
  if (callbackUrl) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<input type="hidden" name="callbackUrl"${attr("value", callbackUrl)}>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (redirect) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<input type="hidden" name="redirect"${attr("value", redirect)}>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (authorizationParamsInputs) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(Object.entries(authorizationParamsInputs));
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [key, value] = each_array[$$index];
      $$payload.out += `<input type="hidden"${attr("name", `authorizationParams-${key}`)}${attr("value", value)}>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (provider === "credentials") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "credentials", {}, null);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (provider === "email" || provider === "sendgrid" || provider === "resend") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "email", {}, () => {
      $$payload.out += `<label class="section-header"${attr("for", `input-email-for-${provider}-provider`)}>Email</label> <input id="input-email-for-email-provider" type="email" name="email" placeholder="email@example.com" required>`;
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <button type="submit"><!---->`;
  slot($$payload, $$props, "submitButton", {}, () => {
    $$payload.out += `Signin${escape_html(provider ? ` with ${provider}` : "")}`;
  });
  $$payload.out += `<!----></button></form>`;
  bind_props($$props, {
    className,
    provider,
    signInPage,
    options,
    authorizationParams
  });
  pop();
}
function SignIn_1($$payload, $$props) {
  push();
  SignIn($$payload, {
    options: {
      redirectTo: page.data.redirectTo ? `/${decodeURIComponent(page.data.redirectTo).slice(1)}` : `/`
    },
    className: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<img src="../../../../../static/google.png" alt="Google Logo"> `;
      Button($$payload2, {
        href: "/auth/signIn",
        children: ($$payload3) => {
          $$payload3.out += `<!---->Sign-In with Google`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <img src="../../../../../static/google.png" alt="Google Logo"> `;
  Button($$payload, {
    href: "/auth/signIn",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Sign-In with Google`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}
function _page($$payload) {
  SignIn_1($$payload);
}
export {
  _page as default
};
