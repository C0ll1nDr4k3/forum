import "clsx";
import { h as ensure_array_like, p as pop, a as push, e as escape_html } from "../../chunks/index2.js";
import { B as Button } from "../../chunks/button.js";
import { g as goto } from "../../chunks/client.js";
import { W as Waypoints, N as Network, F as Folder_tree } from "../../chunks/waypoints.js";
function MapSelector($$payload, $$props) {
  push();
  let options = {
    graph: Waypoints,
    tree: Network,
    directory: Folder_tree
  };
  let selected = "graph";
  function onClick(option) {
    selected = option;
    goto();
  }
  const each_array = ensure_array_like(Object.entries(options));
  $$payload.out += `<div class="flex space-x-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [Option, Icon] = each_array[$$index];
    Button($$payload, {
      variant: selected === Option ? "outline" : "default",
      onclick: () => onClick(Option),
      children: ($$payload2) => {
        Icon($$payload2, {});
        $$payload2.out += `<!----> ${escape_html(Option)}`;
      },
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function _page($$payload) {
  MapSelector($$payload);
  $$payload.out += `<!----> <h1>Welcome to SvelteKit</h1> <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>`;
}
export {
  _page as default
};
