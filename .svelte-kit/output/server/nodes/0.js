import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0._DOIdPzP.js","_app/immutable/chunks/disclose-version.CYORNhja.js","_app/immutable/chunks/runtime.uobgoVXo.js","_app/immutable/chunks/button.8LcxH8CP.js","_app/immutable/chunks/if.Cgp9qeyL.js","_app/immutable/chunks/attributes.MjcitS0i.js","_app/immutable/chunks/events.BoXtXd8z.js","_app/immutable/chunks/this.Du7lNeWB.js","_app/immutable/chunks/props.DpYQSjaA.js","_app/immutable/chunks/index-client.gQ-dNcNZ.js","_app/immutable/chunks/legacy.Ca8QNlcK.js","_app/immutable/chunks/render.CIvV8wbi.js","_app/immutable/chunks/each.0R2BEjeo.js","_app/immutable/chunks/svelte-component.C7jPkKVZ.js","_app/immutable/chunks/slot.CX1LTVzY.js","_app/immutable/chunks/waypoints.XBzRzA44.js","_app/immutable/chunks/lifecycle.DIyrtUee.js"];
export const stylesheets = ["_app/immutable/assets/0.YMzEHC73.css"];
export const fonts = [];
