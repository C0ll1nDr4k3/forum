

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/search/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.D0Vyq7YZ.js","_app/immutable/chunks/disclose-version.CYORNhja.js","_app/immutable/chunks/runtime.uobgoVXo.js","_app/immutable/chunks/legacy.Ca8QNlcK.js"];
export const stylesheets = [];
export const fonts = [];
