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
		client: {"start":"_app/immutable/entry/start.C2gcoF39.js","app":"_app/immutable/entry/app.Popz-Ocy.js","imports":["_app/immutable/entry/start.C2gcoF39.js","_app/immutable/chunks/entry.GIBkNZHR.js","_app/immutable/chunks/runtime.uobgoVXo.js","_app/immutable/chunks/index-client.gQ-dNcNZ.js","_app/immutable/entry/app.Popz-Ocy.js","_app/immutable/chunks/runtime.uobgoVXo.js","_app/immutable/chunks/render.CIvV8wbi.js","_app/immutable/chunks/events.BoXtXd8z.js","_app/immutable/chunks/disclose-version.CYORNhja.js","_app/immutable/chunks/if.Cgp9qeyL.js","_app/immutable/chunks/svelte-component.C7jPkKVZ.js","_app/immutable/chunks/props.DpYQSjaA.js","_app/immutable/chunks/index-client.gQ-dNcNZ.js","_app/immutable/chunks/this.Du7lNeWB.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js'))
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
				endpoint: __memo(() => import('./entries/endpoints/api/catergory/_catergoryId_/threads/_server.ts.js'))
			},
			{
				id: "/api/map",
				pattern: /^\/api\/map\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/map/_server.ts.js'))
			},
			{
				id: "/api/posts",
				pattern: /^\/api\/posts\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/posts/_server.ts.js'))
			},
			{
				id: "/api/user/[username]",
				pattern: /^\/api\/user\/([^/]+?)\/?$/,
				params: [{"name":"username","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/user/_username_/_server.ts.js'))
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
