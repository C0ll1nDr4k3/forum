import * as universal from '../entries/pages/forum/_page.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/forum/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/forum/+page.ts";
export const imports = ["_app/immutable/nodes/5.Bq9lKZw_.js","_app/immutable/chunks/disclose-version.CYORNhja.js","_app/immutable/chunks/runtime.uobgoVXo.js","_app/immutable/chunks/each.0R2BEjeo.js","_app/immutable/chunks/render.CIvV8wbi.js","_app/immutable/chunks/events.BoXtXd8z.js","_app/immutable/chunks/if.Cgp9qeyL.js","_app/immutable/chunks/attributes.MjcitS0i.js"];
export const stylesheets = [];
export const fonts = [];
