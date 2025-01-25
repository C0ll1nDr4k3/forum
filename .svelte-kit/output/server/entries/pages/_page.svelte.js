import "clsx";
import { z as spread_props, u as slot, w as sanitize_props, l as ensure_array_like, p as pop, a as push, e as escape_html } from "../../chunks/index2.js";
import { B as Button } from "../../chunks/button.js";
import { g as goto } from "../../chunks/client.js";
import { I as Icon } from "../../chunks/Icon.js";
function Folder_tree($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
      }
    ],
    [
      "path",
      {
        "d": "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
      }
    ],
    ["path", { "d": "M3 5a2 2 0 0 0 2 2h3" }],
    ["path", { "d": "M3 3v13a2 2 0 0 0 2 2h3" }]
  ];
  Icon($$payload, spread_props([
    { name: "folder-tree" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Network($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      {
        "x": "16",
        "y": "16",
        "width": "6",
        "height": "6",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "x": "2",
        "y": "16",
        "width": "6",
        "height": "6",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "x": "9",
        "y": "2",
        "width": "6",
        "height": "6",
        "rx": "1"
      }
    ],
    [
      "path",
      {
        "d": "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"
      }
    ],
    ["path", { "d": "M12 12V8" }]
  ];
  Icon($$payload, spread_props([
    { name: "network" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Waypoints($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "4.5", "r": "2.5" }
    ],
    ["path", { "d": "m10.2 6.3-3.9 3.9" }],
    [
      "circle",
      { "cx": "4.5", "cy": "12", "r": "2.5" }
    ],
    ["path", { "d": "M7 12h10" }],
    [
      "circle",
      { "cx": "19.5", "cy": "12", "r": "2.5" }
    ],
    ["path", { "d": "m13.8 17.7 3.9-3.9" }],
    [
      "circle",
      { "cx": "12", "cy": "19.5", "r": "2.5" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "waypoints" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {}, null);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
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
    let [Option, Icon2] = each_array[$$index];
    Button($$payload, {
      variant: selected === Option ? "outline" : "default",
      onclick: () => onClick(Option),
      children: ($$payload2) => {
        Icon2($$payload2, {});
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
