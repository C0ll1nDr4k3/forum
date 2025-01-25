import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.ClZr3WY0.js","_app/immutable/chunks/disclose-version.Gv39rB-h.js","_app/immutable/chunks/runtime.QVh8-8dV.js","_app/immutable/chunks/button.OSmJDM-R.js","_app/immutable/chunks/if.BZTmHWO_.js","_app/immutable/chunks/attributes.DblhVvAH.js","_app/immutable/chunks/events.DJ2rhY5v.js","_app/immutable/chunks/this.D5yiMbYs.js","_app/immutable/chunks/props.-EZ33SAS.js","_app/immutable/chunks/index.B5-8jDeY.js","_app/immutable/chunks/svelte-component.CV2HG0yE.js","_app/immutable/chunks/index-client.BRu-p0hC.js","_app/immutable/chunks/legacy.C8mmlGkh.js","_app/immutable/chunks/Icon.BRxNmMqH.js","_app/immutable/chunks/each.OyTsW8_o.js","_app/immutable/chunks/lifecycle.DbpNhD8o.js","_app/immutable/chunks/render.CGILuW-D.js","_app/immutable/chunks/class.C2IlbBZd.js"];
export const stylesheets = ["_app/immutable/assets/0.BM4Idq96.css"];
export const fonts = [];
