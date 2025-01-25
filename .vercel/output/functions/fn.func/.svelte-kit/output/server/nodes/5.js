import * as universal from '../entries/pages/forum/_page.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/forum/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/forum/+page.ts";
export const imports = ["_app/immutable/nodes/5.B-EJ9qbs.js","_app/immutable/chunks/disclose-version.Gv39rB-h.js","_app/immutable/chunks/runtime.QVh8-8dV.js","_app/immutable/chunks/legacy.C8mmlGkh.js","_app/immutable/chunks/each.OyTsW8_o.js","_app/immutable/chunks/props.-EZ33SAS.js","_app/immutable/chunks/index.B5-8jDeY.js"];
export const stylesheets = [];
export const fonts = [];
