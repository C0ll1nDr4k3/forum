export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","google.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.BYkCA2c5.js","app":"_app/immutable/entry/app.Sho3h_-R.js","imports":["_app/immutable/entry/start.BYkCA2c5.js","_app/immutable/chunks/entry.BHyODbek.js","_app/immutable/chunks/runtime.QVh8-8dV.js","_app/immutable/chunks/index.B5-8jDeY.js","_app/immutable/chunks/index-client.BRu-p0hC.js","_app/immutable/entry/app.Sho3h_-R.js","_app/immutable/chunks/runtime.QVh8-8dV.js","_app/immutable/chunks/render.CGILuW-D.js","_app/immutable/chunks/events.DJ2rhY5v.js","_app/immutable/chunks/disclose-version.Gv39rB-h.js","_app/immutable/chunks/if.BZTmHWO_.js","_app/immutable/chunks/svelte-component.CV2HG0yE.js","_app/immutable/chunks/props.-EZ33SAS.js","_app/immutable/chunks/index.B5-8jDeY.js","_app/immutable/chunks/this.D5yiMbYs.js","_app/immutable/chunks/index-client.BRu-p0hC.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/catergory/[catergoryId]/threads",
				pattern: /^\/api\/catergory\/([^/]+?)\/threads\/?$/,
				params: [{"name":"catergoryId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/catergory/_catergoryId_/threads/_server.ts.js'))
			},
			{
				id: "/api/map",
				pattern: /^\/api\/map\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/map/_server.ts.js'))
			},
			{
				id: "/api/posts",
				pattern: /^\/api\/posts\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/posts/_server.ts.js'))
			},
			{
				id: "/api/user/[username]",
				pattern: /^\/api\/user\/([^/]+?)\/?$/,
				params: [{"name":"username","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/user/_username_/_server.ts.js'))
			},
			{
				id: "/auth/signIn",
				pattern: /^\/auth\/signIn\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/auth/signOut",
				pattern: /^\/auth\/signOut\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/forum",
				pattern: /^\/forum\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/map/directory",
				pattern: /^\/map\/directory\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/map/graph",
				pattern: /^\/map\/graph\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/map/tree",
				pattern: /^\/map\/tree\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/search",
				pattern: /^\/search\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
