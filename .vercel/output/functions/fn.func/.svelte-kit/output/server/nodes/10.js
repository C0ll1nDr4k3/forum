

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/settings/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.HP2_gvPx.js","_app/immutable/chunks/disclose-version.Gv39rB-h.js","_app/immutable/chunks/runtime.QVh8-8dV.js","_app/immutable/chunks/legacy.C8mmlGkh.js"];
export const stylesheets = [];
export const fonts = [];
