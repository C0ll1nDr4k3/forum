import "clsx";
import { a as push, k as fallback, y as getContext, a9 as store_get, x as attr, aa as stringify, o as clsx, u as slot, ab as unsubscribe_stores, v as bind_props, p as pop, j as rest_props, e as escape_html, w as sanitize_props, ac as add_styles, ad as merge_styles, a8 as setContext, l as ensure_array_like, z as spread_props, ae as store_set, m as spread_attributes, af as sanitize_slots, ag as hasContext } from "../../../../chunks/index2.js";
import { g as get, w as writable, r as readable, d as derived } from "../../../../chunks/index4.js";
import cc from "classcat";
import { Position, ConnectionMode, areConnectionMapsEqual, handleConnectionChange, errorMessages, getBezierPath, getSmoothStepPath, getStraightPath, infiniteExtent, adoptUserNodes, updateConnectionLookup, getInternalNodesBounds, getViewportForBounds, SelectionMode, initialConnection, ConnectionLineType, devWarn, isEdgeVisible, getEdgePosition, getElevatedEdgeZIndex, getNodesInside, getElementsToRemove, addEdge, updateNodeInternals, updateAbsolutePositions, getDimensions, getFitViewNodes, fitView, panBy, pointToRendererPoint, createMarkerIds, nodeHasDimensions, getMarkerId, MarkerType, isNumeric, isMacOs, getConnectionStatus, PanOnScrollMode, getBoundsOfRects, getNodeDimensions } from "@xyflow/system";
import { o as onDestroy } from "../../../../chunks/index-server.js";
function Handle($$payload, $$props) {
  push();
  var $$store_subs;
  let isTarget, isConnectable, handleId, connectionInProcess, connectingFrom, connectingTo, isPossibleEndHandle, valid;
  let id = fallback($$props["id"], void 0);
  let type = fallback($$props["type"], "source");
  let position = fallback($$props["position"], () => Position.Top, true);
  let style = fallback($$props["style"], void 0);
  let isValidConnection = fallback($$props["isValidConnection"], void 0);
  let onconnect = fallback($$props["onconnect"], void 0);
  let ondisconnect = fallback($$props["ondisconnect"], void 0);
  let isConnectableProp = fallback($$props["isConnectable"], void 0);
  let className = fallback($$props["class"], void 0);
  const nodeId = getContext("svelteflow__node_id");
  const connectable = getContext("svelteflow__node_connectable");
  const store = useStore();
  const {
    connectionMode,
    domNode,
    nodeLookup,
    connectionRadius,
    viewport,
    isValidConnection: isValidConnectionStore,
    lib,
    addEdge: addEdge2,
    onedgecreate,
    panBy: panBy2,
    cancelConnection,
    updateConnection,
    autoPanOnConnect,
    edges,
    connectionLookup,
    onconnect: onConnectAction,
    onconnectstart: onConnectStartAction,
    onconnectend: onConnectEndAction,
    flowId,
    connection
  } = store;
  let prevConnections = null;
  let connections;
  isTarget = type === "target";
  isConnectable = isConnectableProp !== void 0 ? isConnectableProp : store_get($$store_subs ??= {}, "$connectable", connectable);
  handleId = id || null;
  if (onconnect || ondisconnect) {
    store_get($$store_subs ??= {}, "$edges", edges);
    connections = store_get($$store_subs ??= {}, "$connectionLookup", connectionLookup).get(`${nodeId}-${type}-${id || null}`);
  }
  {
    if (prevConnections && !areConnectionMapsEqual(connections, prevConnections)) {
      const _connections = connections ?? /* @__PURE__ */ new Map();
      handleConnectionChange(prevConnections, _connections, ondisconnect);
      handleConnectionChange(_connections, prevConnections, onconnect);
    }
    prevConnections = connections ?? /* @__PURE__ */ new Map();
  }
  connectionInProcess = !!store_get($$store_subs ??= {}, "$connection", connection).fromHandle;
  connectingFrom = store_get($$store_subs ??= {}, "$connection", connection).fromHandle?.nodeId === nodeId && store_get($$store_subs ??= {}, "$connection", connection).fromHandle?.type === type && store_get($$store_subs ??= {}, "$connection", connection).fromHandle?.id === handleId;
  connectingTo = store_get($$store_subs ??= {}, "$connection", connection).toHandle?.nodeId === nodeId && store_get($$store_subs ??= {}, "$connection", connection).toHandle?.type === type && store_get($$store_subs ??= {}, "$connection", connection).toHandle?.id === handleId;
  isPossibleEndHandle = store_get($$store_subs ??= {}, "$connectionMode", connectionMode) === ConnectionMode.Strict ? store_get($$store_subs ??= {}, "$connection", connection).fromHandle?.type !== type : nodeId !== store_get($$store_subs ??= {}, "$connection", connection).fromHandle?.nodeId || handleId !== store_get($$store_subs ??= {}, "$connection", connection).fromHandle?.id;
  valid = connectingTo && store_get($$store_subs ??= {}, "$connection", connection).isValid;
  $$payload.out += `<div${attr("data-handleid", handleId)}${attr("data-nodeid", nodeId)}${attr("data-handlepos", position)}${attr("data-id", `${stringify(store_get($$store_subs ??= {}, "$flowId", flowId))}-${stringify(nodeId)}-${stringify(id || null)}-${stringify(type)}`)}${attr("class", `${stringify(clsx(cc([
    "svelte-flow__handle",
    `svelte-flow__handle-${position}`,
    "nodrag",
    "nopan",
    position,
    className
  ])))} ${stringify([
    valid ? "valid" : "",
    connectingTo ? "connectingto" : "",
    connectingFrom ? "connectingfrom" : "",
    !isTarget ? "source" : "",
    isTarget ? "target" : "",
    isConnectable ? "connectablestart" : "",
    isConnectable ? "connectableend" : "",
    isConnectable ? "connectable" : "",
    isConnectable && (!connectionInProcess || isPossibleEndHandle) ? "connectionindicator" : ""
  ].filter(Boolean).join(" "))}`)}${attr("style", style)} role="button" tabindex="-1"><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    id,
    type,
    position,
    style,
    isValidConnection,
    onconnect,
    ondisconnect,
    isConnectable: isConnectableProp,
    class: className
  });
  pop();
}
function DefaultNode($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, ["data", "targetPosition", "sourcePosition"]);
  push();
  let data = fallback($$props["data"], () => ({ label: "Node" }), true);
  let targetPosition = fallback($$props["targetPosition"], void 0);
  let sourcePosition = fallback($$props["sourcePosition"], void 0);
  Handle($$payload, {
    type: "target",
    position: targetPosition ?? Position.Top
  });
  $$payload.out += `<!----> ${escape_html(data?.label)} `;
  Handle($$payload, {
    type: "source",
    position: sourcePosition ?? Position.Bottom
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { data, targetPosition, sourcePosition });
  pop();
}
function InputNode($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, ["data", "sourcePosition"]);
  push();
  let data = fallback($$props["data"], () => ({ label: "Node" }), true);
  let sourcePosition = fallback($$props["sourcePosition"], void 0);
  $$payload.out += `<!---->${escape_html(data?.label)} `;
  Handle($$payload, {
    type: "source",
    position: sourcePosition ?? Position.Bottom
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { data, sourcePosition });
  pop();
}
function OutputNode($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, ["data", "targetPosition"]);
  push();
  let data = fallback($$props["data"], () => ({ label: "Node" }), true);
  let targetPosition = fallback($$props["targetPosition"], void 0);
  $$payload.out += `<!---->${escape_html(data?.label)} `;
  Handle($$payload, {
    type: "target",
    position: targetPosition ?? Position.Top
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { data, targetPosition });
  pop();
}
function GroupNode($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, []);
}
function EdgeLabelRenderer($$payload, $$props) {
  push();
  useStore();
  $$payload.out += `<div><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  pop();
}
function useHandleEdgeSelect() {
  const { edgeLookup, selectionRect, selectionRectMode, multiselectionKeyPressed, addSelectedEdges, unselectNodesAndEdges, elementsSelectable } = useStore();
  return (id) => {
    const edge = get(edgeLookup).get(id);
    if (!edge) {
      console.warn("012", errorMessages["error012"](id));
      return;
    }
    const selectable = edge.selectable || get(elementsSelectable) && typeof edge.selectable === "undefined";
    if (selectable) {
      selectionRect.set(null);
      selectionRectMode.set(null);
      if (!edge.selected) {
        addSelectedEdges([id]);
      } else if (edge.selected && get(multiselectionKeyPressed)) {
        unselectNodesAndEdges({ nodes: [], edges: [edge] });
      }
    }
  };
}
function EdgeLabel($$payload, $$props) {
  push();
  let style = fallback($$props["style"], void 0);
  let x = fallback($$props["x"], void 0);
  let y = fallback($$props["y"], void 0);
  useHandleEdgeSelect();
  getContext("svelteflow__edge_id");
  EdgeLabelRenderer($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<div${add_styles(merge_styles("pointer-events: all;" + style, {
        transform: `translate(-50%, -50%) translate(${stringify(x)}px,${stringify(y)}px)`
      }))} class="svelte-flow__edge-label" role="button" tabindex="-1"><!---->`;
      slot($$payload2, $$props, "default", {}, null);
      $$payload2.out += `<!----></div>`;
    },
    $$slots: { default: true }
  });
  bind_props($$props, { style, x, y });
  pop();
}
function BaseEdge($$payload, $$props) {
  push();
  let id = fallback($$props["id"], void 0);
  let path = $$props["path"];
  let label = fallback($$props["label"], void 0);
  let labelX = fallback($$props["labelX"], void 0);
  let labelY = fallback($$props["labelY"], void 0);
  let labelStyle = fallback($$props["labelStyle"], void 0);
  let markerStart = fallback($$props["markerStart"], void 0);
  let markerEnd = fallback($$props["markerEnd"], void 0);
  let style = fallback($$props["style"], void 0);
  let interactionWidth = fallback($$props["interactionWidth"], 20);
  let className = fallback($$props["class"], void 0);
  let interactionWidthValue = interactionWidth === void 0 ? 20 : interactionWidth;
  $$payload.out += `<path${attr("id", id)}${attr("d", path)}${attr("class", clsx(cc(["svelte-flow__edge-path", className])))}${attr("marker-start", markerStart)}${attr("marker-end", markerEnd)} fill="none"${attr("style", style)}></path>`;
  if (interactionWidthValue) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<path${attr("d", path)}${attr("stroke-opacity", 0)}${attr("stroke-width", interactionWidthValue)} fill="none" class="svelte-flow__edge-interaction"></path>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (label) {
    $$payload.out += "<!--[-->";
    EdgeLabel($$payload, {
      x: labelX,
      y: labelY,
      style: labelStyle,
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(label)}`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    id,
    path,
    label,
    labelX,
    labelY,
    labelStyle,
    markerStart,
    markerEnd,
    style,
    interactionWidth,
    class: className
  });
  pop();
}
function BezierEdgeInternal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, [
    "label",
    "labelStyle",
    "style",
    "markerStart",
    "markerEnd",
    "interactionWidth",
    "sourceX",
    "sourceY",
    "sourcePosition",
    "targetX",
    "targetY",
    "targetPosition"
  ]);
  push();
  let path, labelX, labelY;
  let label = fallback($$props["label"], void 0);
  let labelStyle = fallback($$props["labelStyle"], void 0);
  let style = fallback($$props["style"], void 0);
  let markerStart = fallback($$props["markerStart"], void 0);
  let markerEnd = fallback($$props["markerEnd"], void 0);
  let interactionWidth = fallback($$props["interactionWidth"], void 0);
  let sourceX = $$props["sourceX"];
  let sourceY = $$props["sourceY"];
  let sourcePosition = $$props["sourcePosition"];
  let targetX = $$props["targetX"];
  let targetY = $$props["targetY"];
  let targetPosition = $$props["targetPosition"];
  [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });
  BaseEdge($$payload, {
    path,
    labelX,
    labelY,
    label,
    labelStyle,
    markerStart,
    markerEnd,
    interactionWidth,
    style
  });
  bind_props($$props, {
    label,
    labelStyle,
    style,
    markerStart,
    markerEnd,
    interactionWidth,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  pop();
}
function SmoothStepEdgeInternal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, [
    "label",
    "labelStyle",
    "style",
    "markerStart",
    "markerEnd",
    "interactionWidth",
    "sourceX",
    "sourceY",
    "sourcePosition",
    "targetX",
    "targetY",
    "targetPosition"
  ]);
  push();
  let path, labelX, labelY;
  let label = fallback($$props["label"], void 0);
  let labelStyle = fallback($$props["labelStyle"], void 0);
  let style = fallback($$props["style"], void 0);
  let markerStart = fallback($$props["markerStart"], void 0);
  let markerEnd = fallback($$props["markerEnd"], void 0);
  let interactionWidth = fallback($$props["interactionWidth"], void 0);
  let sourceX = $$props["sourceX"];
  let sourceY = $$props["sourceY"];
  let sourcePosition = $$props["sourcePosition"];
  let targetX = $$props["targetX"];
  let targetY = $$props["targetY"];
  let targetPosition = $$props["targetPosition"];
  [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });
  BaseEdge($$payload, {
    path,
    labelX,
    labelY,
    label,
    labelStyle,
    markerStart,
    markerEnd,
    interactionWidth,
    style
  });
  bind_props($$props, {
    label,
    labelStyle,
    style,
    markerStart,
    markerEnd,
    interactionWidth,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  pop();
}
function StraightEdgeInternal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, [
    "label",
    "labelStyle",
    "style",
    "markerStart",
    "markerEnd",
    "interactionWidth",
    "sourceX",
    "sourceY",
    "targetX",
    "targetY"
  ]);
  push();
  let path, labelX, labelY;
  let label = fallback($$props["label"], void 0);
  let labelStyle = fallback($$props["labelStyle"], void 0);
  let style = fallback($$props["style"], void 0);
  let markerStart = fallback($$props["markerStart"], void 0);
  let markerEnd = fallback($$props["markerEnd"], void 0);
  let interactionWidth = fallback($$props["interactionWidth"], void 0);
  let sourceX = $$props["sourceX"];
  let sourceY = $$props["sourceY"];
  let targetX = $$props["targetX"];
  let targetY = $$props["targetY"];
  [path, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  BaseEdge($$payload, {
    path,
    labelX,
    labelY,
    label,
    labelStyle,
    markerStart,
    markerEnd,
    interactionWidth,
    style
  });
  bind_props($$props, {
    label,
    labelStyle,
    style,
    markerStart,
    markerEnd,
    interactionWidth,
    sourceX,
    sourceY,
    targetX,
    targetY
  });
  pop();
}
function StepEdgeInternal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, [
    "label",
    "labelStyle",
    "style",
    "markerStart",
    "markerEnd",
    "interactionWidth",
    "sourceX",
    "sourceY",
    "sourcePosition",
    "targetX",
    "targetY",
    "targetPosition"
  ]);
  push();
  let path, labelX, labelY;
  let label = fallback($$props["label"], void 0);
  let labelStyle = fallback($$props["labelStyle"], void 0);
  let style = fallback($$props["style"], void 0);
  let markerStart = fallback($$props["markerStart"], void 0);
  let markerEnd = fallback($$props["markerEnd"], void 0);
  let interactionWidth = fallback($$props["interactionWidth"], void 0);
  let sourceX = $$props["sourceX"];
  let sourceY = $$props["sourceY"];
  let sourcePosition = $$props["sourcePosition"];
  let targetX = $$props["targetX"];
  let targetY = $$props["targetY"];
  let targetPosition = $$props["targetPosition"];
  [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 0
  });
  BaseEdge($$payload, {
    path,
    labelX,
    labelY,
    label,
    labelStyle,
    markerStart,
    markerEnd,
    interactionWidth,
    style
  });
  bind_props($$props, {
    label,
    labelStyle,
    style,
    markerStart,
    markerEnd,
    interactionWidth,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  pop();
}
function syncNodeStores(nodesStore, userNodesStore) {
  const nodesStoreSetter = nodesStore.set;
  const userNodesStoreSetter = userNodesStore.set;
  const currentNodesStore = get(nodesStore);
  const currentUserNodesStore = get(userNodesStore);
  const initWithUserNodes = currentNodesStore.length === 0 && currentUserNodesStore.length > 0;
  let val = initWithUserNodes ? currentUserNodesStore : currentNodesStore;
  nodesStore.set(val);
  const _set = (nds) => {
    const updatedNodes = nodesStoreSetter(nds);
    val = updatedNodes;
    userNodesStoreSetter(val);
    return updatedNodes;
  };
  nodesStore.set = userNodesStore.set = _set;
  nodesStore.update = userNodesStore.update = (fn) => _set(fn(val));
}
function syncEdgeStores(edgesStore, userEdgesStore) {
  const nodesStoreSetter = edgesStore.set;
  const userEdgesStoreSetter = userEdgesStore.set;
  let val = get(userEdgesStore);
  edgesStore.set(val);
  const _set = (eds) => {
    nodesStoreSetter(eds);
    userEdgesStoreSetter(eds);
    val = eds;
  };
  edgesStore.set = userEdgesStore.set = _set;
  edgesStore.update = userEdgesStore.update = (fn) => _set(fn(val));
}
const syncViewportStores = (panZoomStore, viewportStore, userViewportStore) => {
  if (!userViewportStore) {
    return;
  }
  const panZoom = get(panZoomStore);
  const viewportStoreSetter = viewportStore.set;
  const userViewportStoreSetter = userViewportStore.set;
  let val = userViewportStore ? get(userViewportStore) : { x: 0, y: 0, zoom: 1 };
  viewportStore.set(val);
  viewportStore.set = (vp) => {
    viewportStoreSetter(vp);
    userViewportStoreSetter(vp);
    val = vp;
    return vp;
  };
  userViewportStore.set = (vp) => {
    panZoom?.syncViewport(vp);
    viewportStoreSetter(vp);
    userViewportStoreSetter(vp);
    val = vp;
    return vp;
  };
  viewportStore.update = (fn) => {
    viewportStore.set(fn(val));
  };
  userViewportStore.update = (fn) => {
    userViewportStore.set(fn(val));
  };
};
const createNodesStore = (nodes, nodeLookup, parentLookup, nodeOrigin = [0, 0], nodeExtent = infiniteExtent) => {
  const { subscribe, set, update } = writable([]);
  let value = nodes;
  let defaults = {};
  let elevateNodesOnSelect = true;
  const _set = (nds) => {
    adoptUserNodes(nds, nodeLookup, parentLookup, {
      elevateNodesOnSelect,
      nodeOrigin,
      nodeExtent,
      defaults,
      checkEquality: false
    });
    value = nds;
    set(value);
    return value;
  };
  const _update = (fn) => _set(fn(value));
  const setDefaultOptions = (options) => {
    defaults = options;
  };
  const setOptions = (options) => {
    elevateNodesOnSelect = options.elevateNodesOnSelect ?? elevateNodesOnSelect;
  };
  _set(value);
  return {
    subscribe,
    set: _set,
    update: _update,
    setDefaultOptions,
    setOptions
  };
};
const createEdgesStore = (edges, connectionLookup, edgeLookup, defaultOptions) => {
  const { subscribe, set, update } = writable([]);
  let value = edges;
  let defaults = {};
  const _set = (eds) => {
    const nextEdges = defaults ? eds.map((edge) => ({ ...defaults, ...edge })) : eds;
    updateConnectionLookup(connectionLookup, edgeLookup, nextEdges);
    value = nextEdges;
    set(value);
  };
  const _update = (fn) => _set(fn(value));
  const setDefaultOptions = (options) => {
    defaults = options;
  };
  _set(value);
  return {
    subscribe,
    set: _set,
    update: _update,
    setDefaultOptions
  };
};
const initialNodeTypes = {
  input: InputNode,
  output: OutputNode,
  default: DefaultNode,
  group: GroupNode
};
const initialEdgeTypes = {
  straight: StraightEdgeInternal,
  smoothstep: SmoothStepEdgeInternal,
  default: BezierEdgeInternal,
  step: StepEdgeInternal
};
const getInitialStore = ({ nodes = [], edges = [], width, height, fitView: fitView2, nodeOrigin, nodeExtent }) => {
  const nodeLookup = /* @__PURE__ */ new Map();
  const parentLookup = /* @__PURE__ */ new Map();
  const connectionLookup = /* @__PURE__ */ new Map();
  const edgeLookup = /* @__PURE__ */ new Map();
  const storeNodeOrigin = nodeOrigin ?? [0, 0];
  const storeNodeExtent = nodeExtent ?? infiniteExtent;
  adoptUserNodes(nodes, nodeLookup, parentLookup, {
    nodeExtent: storeNodeExtent,
    nodeOrigin: storeNodeOrigin,
    elevateNodesOnSelect: false,
    checkEquality: false
  });
  updateConnectionLookup(connectionLookup, edgeLookup, edges);
  let viewport = { x: 0, y: 0, zoom: 1 };
  if (fitView2 && width && height) {
    const bounds = getInternalNodesBounds(nodeLookup, {
      filter: (node) => !!((node.width || node.initialWidth) && (node.height || node.initialHeight))
    });
    viewport = getViewportForBounds(bounds, width, height, 0.5, 2, 0.1);
  }
  return {
    flowId: writable(null),
    nodes: createNodesStore(nodes, nodeLookup, parentLookup, storeNodeOrigin, storeNodeExtent),
    nodeLookup: readable(nodeLookup),
    parentLookup: readable(parentLookup),
    edgeLookup: readable(edgeLookup),
    visibleNodes: readable([]),
    edges: createEdgesStore(edges, connectionLookup, edgeLookup),
    visibleEdges: readable([]),
    connectionLookup: readable(connectionLookup),
    height: writable(500),
    width: writable(500),
    minZoom: writable(0.5),
    maxZoom: writable(2),
    nodeOrigin: writable(storeNodeOrigin),
    nodeDragThreshold: writable(1),
    nodeExtent: writable(storeNodeExtent),
    translateExtent: writable(infiniteExtent),
    autoPanOnNodeDrag: writable(true),
    autoPanOnConnect: writable(true),
    fitViewOnInit: writable(false),
    fitViewOnInitDone: writable(false),
    fitViewOptions: writable(void 0),
    panZoom: writable(null),
    snapGrid: writable(null),
    dragging: writable(false),
    selectionRect: writable(null),
    selectionKeyPressed: writable(false),
    multiselectionKeyPressed: writable(false),
    deleteKeyPressed: writable(false),
    panActivationKeyPressed: writable(false),
    zoomActivationKeyPressed: writable(false),
    selectionRectMode: writable(null),
    selectionMode: writable(SelectionMode.Partial),
    nodeTypes: writable(initialNodeTypes),
    edgeTypes: writable(initialEdgeTypes),
    viewport: writable(viewport),
    connectionMode: writable(ConnectionMode.Strict),
    domNode: writable(null),
    connection: readable(initialConnection),
    connectionLineType: writable(ConnectionLineType.Bezier),
    connectionRadius: writable(20),
    isValidConnection: writable(() => true),
    nodesDraggable: writable(true),
    nodesConnectable: writable(true),
    elementsSelectable: writable(true),
    selectNodesOnDrag: writable(true),
    markers: readable([]),
    defaultMarkerColor: writable("#b1b1b7"),
    lib: readable("svelte"),
    onlyRenderVisibleElements: writable(false),
    onerror: writable(devWarn),
    ondelete: writable(void 0),
    onedgecreate: writable(void 0),
    onconnect: writable(void 0),
    onconnectstart: writable(void 0),
    onconnectend: writable(void 0),
    onbeforedelete: writable(void 0),
    nodesInitialized: writable(false),
    edgesInitialized: writable(false),
    viewportInitialized: writable(false),
    initialized: readable(false)
  };
};
function getVisibleEdges(store) {
  const visibleEdges = derived([
    store.edges,
    store.nodes,
    store.nodeLookup,
    store.onlyRenderVisibleElements,
    store.viewport,
    store.width,
    store.height
  ], ([edges, , nodeLookup, onlyRenderVisibleElements, viewport, width, height]) => {
    const visibleEdges2 = onlyRenderVisibleElements && width && height ? edges.filter((edge) => {
      const sourceNode = nodeLookup.get(edge.source);
      const targetNode = nodeLookup.get(edge.target);
      return sourceNode && targetNode && isEdgeVisible({
        sourceNode,
        targetNode,
        width,
        height,
        transform: [viewport.x, viewport.y, viewport.zoom]
      });
    }) : edges;
    return visibleEdges2;
  });
  return derived([visibleEdges, store.nodes, store.nodeLookup, store.connectionMode, store.onerror], ([visibleEdges2, , nodeLookup, connectionMode, onerror]) => {
    const layoutedEdges = visibleEdges2.reduce((res, edge) => {
      const sourceNode = nodeLookup.get(edge.source);
      const targetNode = nodeLookup.get(edge.target);
      if (!sourceNode || !targetNode) {
        return res;
      }
      const edgePosition = getEdgePosition({
        id: edge.id,
        sourceNode,
        targetNode,
        sourceHandle: edge.sourceHandle || null,
        targetHandle: edge.targetHandle || null,
        connectionMode,
        onError: onerror
      });
      if (edgePosition) {
        res.push({
          ...edge,
          zIndex: getElevatedEdgeZIndex({
            selected: edge.selected,
            zIndex: edge.zIndex,
            sourceNode,
            targetNode,
            elevateOnSelect: false
          }),
          ...edgePosition
        });
      }
      return res;
    }, []);
    return layoutedEdges;
  });
}
function getVisibleNodes(store) {
  return derived([
    store.nodeLookup,
    store.onlyRenderVisibleElements,
    store.width,
    store.height,
    store.viewport,
    store.nodes
  ], ([nodeLookup, onlyRenderVisibleElements, width, height, viewport]) => {
    const transform = [viewport.x, viewport.y, viewport.zoom];
    return onlyRenderVisibleElements ? getNodesInside(nodeLookup, { x: 0, y: 0, width, height }, transform, true) : Array.from(nodeLookup.values());
  });
}
const key = Symbol();
function createStore({ nodes, edges, width, height, fitView: fitViewOnCreate, nodeOrigin, nodeExtent }) {
  const store = getInitialStore({
    nodes,
    edges,
    width,
    height,
    fitView: fitViewOnCreate,
    nodeOrigin,
    nodeExtent
  });
  function setNodeTypes(nodeTypes) {
    store.nodeTypes.set({
      ...initialNodeTypes,
      ...nodeTypes
    });
  }
  function setEdgeTypes(edgeTypes) {
    store.edgeTypes.set({
      ...initialEdgeTypes,
      ...edgeTypes
    });
  }
  function addEdge$1(edgeParams) {
    const edges2 = get(store.edges);
    store.edges.set(addEdge(edgeParams, edges2));
  }
  const updateNodePositions = (nodeDragItems, dragging = false) => {
    const nodeLookup = get(store.nodeLookup);
    for (const [id, dragItem] of nodeDragItems) {
      const node = nodeLookup.get(id)?.internals.userNode;
      if (!node) {
        continue;
      }
      node.position = dragItem.position;
      node.dragging = dragging;
    }
    store.nodes.update((nds) => nds);
  };
  function updateNodeInternals$1(updates) {
    const nodeLookup = get(store.nodeLookup);
    const parentLookup = get(store.parentLookup);
    const { changes, updatedInternals } = updateNodeInternals(updates, nodeLookup, get(store.parentLookup), get(store.domNode), get(store.nodeOrigin));
    if (!updatedInternals) {
      return;
    }
    updateAbsolutePositions(nodeLookup, parentLookup, { nodeOrigin, nodeExtent });
    if (!get(store.fitViewOnInitDone) && get(store.fitViewOnInit)) {
      const fitViewOptions = get(store.fitViewOptions);
      const fitViewOnInitDone = fitViewSync({
        ...fitViewOptions,
        nodes: fitViewOptions?.nodes
      });
      store.fitViewOnInitDone.set(fitViewOnInitDone);
    }
    for (const change of changes) {
      const node = nodeLookup.get(change.id)?.internals.userNode;
      if (!node) {
        continue;
      }
      switch (change.type) {
        case "dimensions": {
          const measured = { ...node.measured, ...change.dimensions };
          if (change.setAttributes) {
            node.width = change.dimensions?.width ?? node.width;
            node.height = change.dimensions?.height ?? node.height;
          }
          node.measured = measured;
          break;
        }
        case "position":
          node.position = change.position ?? node.position;
          break;
      }
    }
    store.nodes.update((nds) => nds);
    if (!get(store.nodesInitialized)) {
      store.nodesInitialized.set(true);
    }
  }
  function fitView$1(options) {
    const panZoom = get(store.panZoom);
    const domNode = get(store.domNode);
    if (!panZoom || !domNode) {
      return Promise.resolve(false);
    }
    const { width: width2, height: height2 } = getDimensions(domNode);
    const fitViewNodes = getFitViewNodes(get(store.nodeLookup), options);
    return fitView({
      nodes: fitViewNodes,
      width: width2,
      height: height2,
      minZoom: get(store.minZoom),
      maxZoom: get(store.maxZoom),
      panZoom
    }, options);
  }
  function fitViewSync(options) {
    const panZoom = get(store.panZoom);
    if (!panZoom) {
      return false;
    }
    const fitViewNodes = getFitViewNodes(get(store.nodeLookup), options);
    fitView({
      nodes: fitViewNodes,
      width: get(store.width),
      height: get(store.height),
      minZoom: get(store.minZoom),
      maxZoom: get(store.maxZoom),
      panZoom
    }, options);
    return fitViewNodes.size > 0;
  }
  function zoomBy(factor, options) {
    const panZoom = get(store.panZoom);
    if (!panZoom) {
      return Promise.resolve(false);
    }
    return panZoom.scaleBy(factor, options);
  }
  function zoomIn(options) {
    return zoomBy(1.2, options);
  }
  function zoomOut(options) {
    return zoomBy(1 / 1.2, options);
  }
  function setMinZoom(minZoom) {
    const panZoom = get(store.panZoom);
    if (panZoom) {
      panZoom.setScaleExtent([minZoom, get(store.maxZoom)]);
      store.minZoom.set(minZoom);
    }
  }
  function setMaxZoom(maxZoom) {
    const panZoom = get(store.panZoom);
    if (panZoom) {
      panZoom.setScaleExtent([get(store.minZoom), maxZoom]);
      store.maxZoom.set(maxZoom);
    }
  }
  function setTranslateExtent(extent) {
    const panZoom = get(store.panZoom);
    if (panZoom) {
      panZoom.setTranslateExtent(extent);
      store.translateExtent.set(extent);
    }
  }
  function resetSelectedElements(elements) {
    let elementsChanged = false;
    elements.forEach((element) => {
      if (element.selected) {
        element.selected = false;
        elementsChanged = true;
      }
    });
    return elementsChanged;
  }
  function setPaneClickDistance(distance) {
    get(store.panZoom)?.setClickDistance(distance);
  }
  function unselectNodesAndEdges(params) {
    const resetNodes = resetSelectedElements(params?.nodes || get(store.nodes));
    if (resetNodes)
      store.nodes.set(get(store.nodes));
    const resetEdges = resetSelectedElements(params?.edges || get(store.edges));
    if (resetEdges)
      store.edges.set(get(store.edges));
  }
  store.deleteKeyPressed.subscribe(async (deleteKeyPressed) => {
    if (deleteKeyPressed) {
      const nodes2 = get(store.nodes);
      const edges2 = get(store.edges);
      const selectedNodes = nodes2.filter((node) => node.selected);
      const selectedEdges = edges2.filter((edge) => edge.selected);
      const { nodes: matchingNodes, edges: matchingEdges } = await getElementsToRemove({
        nodesToRemove: selectedNodes,
        edgesToRemove: selectedEdges,
        nodes: nodes2,
        edges: edges2,
        onBeforeDelete: get(store.onbeforedelete)
      });
      if (matchingNodes.length || matchingEdges.length) {
        store.nodes.update((nds) => nds.filter((node) => !matchingNodes.some((mN) => mN.id === node.id)));
        store.edges.update((eds) => eds.filter((edge) => !matchingEdges.some((mE) => mE.id === edge.id)));
        get(store.ondelete)?.({
          nodes: matchingNodes,
          edges: matchingEdges
        });
      }
    }
  });
  function addSelectedNodes(ids) {
    const isMultiSelection = get(store.multiselectionKeyPressed);
    store.nodes.update((ns) => ns.map((node) => {
      const nodeWillBeSelected = ids.includes(node.id);
      const selected = isMultiSelection ? node.selected || nodeWillBeSelected : nodeWillBeSelected;
      node.selected = selected;
      return node;
    }));
    if (!isMultiSelection) {
      store.edges.update((es) => es.map((edge) => {
        edge.selected = false;
        return edge;
      }));
    }
  }
  function addSelectedEdges(ids) {
    const isMultiSelection = get(store.multiselectionKeyPressed);
    store.edges.update((edges2) => edges2.map((edge) => {
      const edgeWillBeSelected = ids.includes(edge.id);
      const selected = isMultiSelection ? edge.selected || edgeWillBeSelected : edgeWillBeSelected;
      edge.selected = selected;
      return edge;
    }));
    if (!isMultiSelection) {
      store.nodes.update((ns) => ns.map((node) => {
        node.selected = false;
        return node;
      }));
    }
  }
  function handleNodeSelection(id) {
    const node = get(store.nodes)?.find((n) => n.id === id);
    if (!node) {
      console.warn("012", errorMessages["error012"](id));
      return;
    }
    store.selectionRect.set(null);
    store.selectionRectMode.set(null);
    if (!node.selected) {
      addSelectedNodes([id]);
    } else if (node.selected && get(store.multiselectionKeyPressed)) {
      unselectNodesAndEdges({ nodes: [node], edges: [] });
    }
  }
  function panBy$1(delta) {
    const viewport = get(store.viewport);
    return panBy({
      delta,
      panZoom: get(store.panZoom),
      transform: [viewport.x, viewport.y, viewport.zoom],
      translateExtent: get(store.translateExtent),
      width: get(store.width),
      height: get(store.height)
    });
  }
  const _connection = writable(initialConnection);
  const updateConnection = (newConnection) => {
    _connection.set({ ...newConnection });
  };
  function cancelConnection() {
    _connection.set(initialConnection);
  }
  function reset() {
    store.fitViewOnInitDone.set(false);
    store.selectionRect.set(null);
    store.selectionRectMode.set(null);
    store.snapGrid.set(null);
    store.isValidConnection.set(() => true);
    unselectNodesAndEdges();
    cancelConnection();
  }
  return {
    // state
    ...store,
    // derived state
    visibleEdges: getVisibleEdges(store),
    visibleNodes: getVisibleNodes(store),
    connection: derived([_connection, store.viewport], ([connection, viewport]) => {
      return connection.inProgress ? {
        ...connection,
        to: pointToRendererPoint(connection.to, [viewport.x, viewport.y, viewport.zoom])
      } : { ...connection };
    }),
    markers: derived([store.edges, store.defaultMarkerColor, store.flowId], ([edges2, defaultColor, id]) => createMarkerIds(edges2, { defaultColor, id })),
    initialized: (() => {
      let initialized = false;
      const initialNodesLength = get(store.nodes).length;
      const initialEdgesLength = get(store.edges).length;
      return derived([store.nodesInitialized, store.edgesInitialized, store.viewportInitialized], ([nodesInitialized, edgesInitialized, viewportInitialized]) => {
        if (initialized)
          return initialized;
        if (initialNodesLength === 0) {
          initialized = viewportInitialized;
        } else if (initialEdgesLength === 0) {
          initialized = viewportInitialized && nodesInitialized;
        } else {
          initialized = viewportInitialized && nodesInitialized && edgesInitialized;
        }
        return initialized;
      });
    })(),
    // actions
    syncNodeStores: (nodes2) => syncNodeStores(store.nodes, nodes2),
    syncEdgeStores: (edges2) => syncEdgeStores(store.edges, edges2),
    syncViewport: (viewport) => syncViewportStores(store.panZoom, store.viewport, viewport),
    setNodeTypes,
    setEdgeTypes,
    addEdge: addEdge$1,
    updateNodePositions,
    updateNodeInternals: updateNodeInternals$1,
    zoomIn,
    zoomOut,
    fitView: (options) => fitView$1(options),
    setMinZoom,
    setMaxZoom,
    setTranslateExtent,
    setPaneClickDistance,
    unselectNodesAndEdges,
    addSelectedNodes,
    addSelectedEdges,
    handleNodeSelection,
    panBy: panBy$1,
    updateConnection,
    cancelConnection,
    reset
  };
}
function useStore() {
  const store = getContext(key);
  if (!store) {
    throw new Error("In order to use useStore you need to wrap your component in a <SvelteFlowProvider />");
  }
  return store.getStore();
}
function createStoreContext({ nodes, edges, width, height, fitView: fitView2, nodeOrigin, nodeExtent }) {
  const store = createStore({ nodes, edges, width, height, fitView: fitView2, nodeOrigin, nodeExtent });
  setContext(key, {
    getStore: () => store
  });
  return store;
}
function Zoom($$payload, $$props) {
  push();
  var $$store_subs;
  let initialViewport = fallback($$props["initialViewport"], void 0);
  let onMoveStart = fallback($$props["onMoveStart"], void 0);
  let onMove = fallback($$props["onMove"], void 0);
  let onMoveEnd = fallback($$props["onMoveEnd"], void 0);
  let panOnScrollMode = $$props["panOnScrollMode"];
  let preventScrolling = $$props["preventScrolling"];
  let zoomOnScroll = $$props["zoomOnScroll"];
  let zoomOnDoubleClick = $$props["zoomOnDoubleClick"];
  let zoomOnPinch = $$props["zoomOnPinch"];
  let panOnDrag = $$props["panOnDrag"];
  let panOnScroll = $$props["panOnScroll"];
  let paneClickDistance = $$props["paneClickDistance"];
  const {
    viewport,
    panZoom,
    selectionRect,
    minZoom,
    maxZoom,
    dragging,
    translateExtent,
    lib,
    panActivationKeyPressed,
    zoomActivationKeyPressed,
    viewportInitialized
  } = useStore();
  store_get($$store_subs ??= {}, "$panActivationKeyPressed", panActivationKeyPressed) || panOnDrag;
  store_get($$store_subs ??= {}, "$panActivationKeyPressed", panActivationKeyPressed) || panOnScroll;
  $$payload.out += `<div class="svelte-flow__zoom svelte-4xkw84"><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    initialViewport,
    onMoveStart,
    onMove,
    onMoveEnd,
    panOnScrollMode,
    preventScrolling,
    zoomOnScroll,
    zoomOnDoubleClick,
    zoomOnPinch,
    panOnDrag,
    panOnScroll,
    paneClickDistance
  });
  pop();
}
function Pane($$payload, $$props) {
  push();
  var $$store_subs;
  let _panOnDrag, isSelecting;
  let panOnDrag = fallback($$props["panOnDrag"], void 0);
  let selectionOnDrag = fallback($$props["selectionOnDrag"], void 0);
  const {
    nodes,
    nodeLookup,
    edges,
    viewport,
    dragging,
    elementsSelectable,
    selectionRect,
    selectionRectMode,
    selectionKeyPressed,
    selectionMode,
    panActivationKeyPressed,
    unselectNodesAndEdges
  } = useStore();
  _panOnDrag = store_get($$store_subs ??= {}, "$panActivationKeyPressed", panActivationKeyPressed) || panOnDrag;
  isSelecting = store_get($$store_subs ??= {}, "$selectionKeyPressed", selectionKeyPressed) || store_get($$store_subs ??= {}, "$selectionRect", selectionRect) || selectionOnDrag && _panOnDrag !== true;
  store_get($$store_subs ??= {}, "$elementsSelectable", elementsSelectable) && (isSelecting || store_get($$store_subs ??= {}, "$selectionRectMode", selectionRectMode) === "user");
  $$payload.out += `<div${attr("class", `svelte-flow__pane svelte-1esy7hx ${stringify([
    panOnDrag === true || Array.isArray(panOnDrag) && panOnDrag.includes(0) ? "draggable" : "",
    store_get($$store_subs ??= {}, "$dragging", dragging) ? "dragging" : "",
    isSelecting ? "selection" : ""
  ].filter(Boolean).join(" "))}`)}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { panOnDrag, selectionOnDrag });
  pop();
}
function Viewport($$payload, $$props) {
  push();
  var $$store_subs;
  const { viewport } = useStore();
  $$payload.out += `<div class="svelte-flow__viewport xyflow__viewport svelte-1floaup"${attr("style", `transform: translate(${stringify(store_get($$store_subs ??= {}, "$viewport", viewport).x)}px, ${stringify(store_get($$store_subs ??= {}, "$viewport", viewport).y)}px) scale(${stringify(store_get($$store_subs ??= {}, "$viewport", viewport).zoom)})`)}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function getNodeInlineStyleDimensions({ width, height, initialWidth, initialHeight, measuredWidth, measuredHeight }) {
  if (measuredWidth === void 0 && measuredHeight === void 0) {
    const styleWidth = width ?? initialWidth;
    const styleHeight = height ?? initialHeight;
    return {
      width: styleWidth ? `width:${styleWidth}px;` : "",
      height: styleHeight ? `height:${styleHeight}px;` : ""
    };
  }
  return {
    width: width ? `width:${width}px;` : "",
    height: height ? `height:${height}px;` : ""
  };
}
function NodeWrapper($$payload, $$props) {
  push();
  var $$store_subs;
  let nodeType, nodeTypeValid, nodeComponent, inlineStyleDimensions;
  let node = $$props["node"];
  let id = $$props["id"];
  let data = fallback($$props["data"], () => ({}), true);
  let selected = fallback($$props["selected"], false);
  let draggable = fallback($$props["draggable"], void 0);
  let selectable = fallback($$props["selectable"], void 0);
  let connectable = fallback($$props["connectable"], true);
  let deletable = fallback($$props["deletable"], true);
  let hidden = fallback($$props["hidden"], false);
  let dragging = fallback($$props["dragging"], false);
  let resizeObserver = fallback($$props["resizeObserver"], null);
  let style = fallback($$props["style"], void 0);
  let type = fallback($$props["type"], "default");
  let isParent = fallback($$props["isParent"], false);
  let positionX = $$props["positionX"];
  let positionY = $$props["positionY"];
  let sourcePosition = fallback($$props["sourcePosition"], void 0);
  let targetPosition = fallback($$props["targetPosition"], void 0);
  let zIndex = $$props["zIndex"];
  let measuredWidth = fallback($$props["measuredWidth"], void 0);
  let measuredHeight = fallback($$props["measuredHeight"], void 0);
  let initialWidth = fallback($$props["initialWidth"], void 0);
  let initialHeight = fallback($$props["initialHeight"], void 0);
  let width = fallback($$props["width"], void 0);
  let height = fallback($$props["height"], void 0);
  let dragHandle = fallback($$props["dragHandle"], void 0);
  let initialized = fallback($$props["initialized"], false);
  let parentId = fallback($$props["parentId"], void 0);
  let nodeClickDistance = fallback($$props["nodeClickDistance"], void 0);
  let className = fallback($$props["class"], "");
  const store = useStore();
  const {
    nodeTypes,
    nodeDragThreshold,
    selectNodesOnDrag,
    handleNodeSelection,
    updateNodeInternals: updateNodeInternals2
  } = store;
  let nodeRef;
  let prevNodeRef = null;
  const connectableStore = writable(connectable);
  let prevType = void 0;
  let prevSourcePosition = void 0;
  let prevTargetPosition = void 0;
  setContext("svelteflow__node_id", id);
  setContext("svelteflow__node_connectable", connectableStore);
  onDestroy(() => {
    if (prevNodeRef) {
      resizeObserver?.unobserve(prevNodeRef);
    }
  });
  nodeType = type || "default";
  nodeTypeValid = !!store_get($$store_subs ??= {}, "$nodeTypes", nodeTypes)[nodeType];
  nodeComponent = store_get($$store_subs ??= {}, "$nodeTypes", nodeTypes)[nodeType] || DefaultNode;
  {
    if (!nodeTypeValid) {
      console.warn("003", errorMessages["error003"](type));
    }
  }
  inlineStyleDimensions = getNodeInlineStyleDimensions({
    width,
    height,
    initialWidth,
    initialHeight,
    measuredWidth,
    measuredHeight
  });
  {
    connectableStore.set(!!connectable);
  }
  {
    const doUpdate = prevType && nodeType !== prevType || prevSourcePosition && sourcePosition !== prevSourcePosition || prevTargetPosition && targetPosition !== prevTargetPosition;
    if (doUpdate) {
      requestAnimationFrame(() => updateNodeInternals2(/* @__PURE__ */ new Map([
        [id, { id, nodeElement: nodeRef, force: true }]
      ])));
    }
    prevType = nodeType;
    prevSourcePosition = sourcePosition;
    prevTargetPosition = targetPosition;
  }
  {
    if (resizeObserver && (nodeRef !== prevNodeRef || !initialized)) {
      prevNodeRef && resizeObserver.unobserve(prevNodeRef);
      prevNodeRef = nodeRef;
    }
  }
  if (!hidden) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${add_styles(merge_styles(`${stringify(style ?? "")};${stringify(inlineStyleDimensions.width)}${stringify(inlineStyleDimensions.height)}`, {
      "z-index": zIndex,
      transform: `translate(${stringify(positionX)}px, ${stringify(positionY)}px)`,
      visibility: initialized ? "visible" : "hidden"
    }))}${attr("data-id", id)}${attr("class", `${stringify(clsx(cc([
      "svelte-flow__node",
      `svelte-flow__node-${nodeType}`,
      className
    ])))} ${stringify([
      dragging ? "dragging" : "",
      selected ? "selected" : "",
      draggable ? "draggable" : "",
      connectable ? "connectable" : "",
      selectable ? "selectable" : "",
      draggable ? "nopan" : "",
      isParent ? "parent" : ""
    ].filter(Boolean).join(" "))}`)}><!---->`;
    nodeComponent?.($$payload, {
      data,
      id,
      selected,
      selectable,
      deletable,
      sourcePosition,
      targetPosition,
      zIndex,
      dragging,
      draggable,
      dragHandle,
      parentId,
      type: nodeType,
      isConnectable: store_get($$store_subs ??= {}, "$connectableStore", connectableStore),
      positionAbsoluteX: positionX,
      positionAbsoluteY: positionY,
      width,
      height
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    node,
    id,
    data,
    selected,
    draggable,
    selectable,
    connectable,
    deletable,
    hidden,
    dragging,
    resizeObserver,
    style,
    type,
    isParent,
    positionX,
    positionY,
    sourcePosition,
    targetPosition,
    zIndex,
    measuredWidth,
    measuredHeight,
    initialWidth,
    initialHeight,
    width,
    height,
    dragHandle,
    initialized,
    parentId,
    nodeClickDistance,
    class: className
  });
  pop();
}
function NodeRenderer($$payload, $$props) {
  push();
  var $$store_subs;
  let nodeClickDistance = fallback($$props["nodeClickDistance"], 0);
  const {
    visibleNodes,
    nodesDraggable,
    nodesConnectable,
    elementsSelectable,
    updateNodeInternals: updateNodeInternals2,
    parentLookup
  } = useStore();
  const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver((entries) => {
    const updates = /* @__PURE__ */ new Map();
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("data-id");
      updates.set(id, { id, nodeElement: entry.target, force: true });
    });
    updateNodeInternals2(updates);
  });
  onDestroy(() => {
    resizeObserver?.disconnect();
  });
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$visibleNodes", visibleNodes));
  $$payload.out += `<div class="svelte-flow__nodes svelte-tf4uy4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let node = each_array[$$index];
    NodeWrapper($$payload, {
      node,
      id: node.id,
      data: node.data,
      selected: !!node.selected,
      hidden: !!node.hidden,
      draggable: !!(node.draggable || store_get($$store_subs ??= {}, "$nodesDraggable", nodesDraggable) && typeof node.draggable === "undefined"),
      selectable: !!(node.selectable || store_get($$store_subs ??= {}, "$elementsSelectable", elementsSelectable) && typeof node.selectable === "undefined"),
      connectable: !!(node.connectable || store_get($$store_subs ??= {}, "$nodesConnectable", nodesConnectable) && typeof node.connectable === "undefined"),
      deletable: node.deletable ?? true,
      positionX: node.internals.positionAbsolute.x,
      positionY: node.internals.positionAbsolute.y,
      isParent: store_get($$store_subs ??= {}, "$parentLookup", parentLookup).has(node.id),
      style: node.style,
      class: node.class,
      type: node.type ?? "default",
      sourcePosition: node.sourcePosition,
      targetPosition: node.targetPosition,
      dragging: node.dragging,
      zIndex: node.internals.z ?? 0,
      dragHandle: node.dragHandle,
      initialized: nodeHasDimensions(node),
      width: node.width,
      height: node.height,
      initialWidth: node.initialWidth,
      initialHeight: node.initialHeight,
      measuredWidth: node.measured.width,
      measuredHeight: node.measured.height,
      parentId: node.parentId,
      resizeObserver,
      nodeClickDistance
    });
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { nodeClickDistance });
  pop();
}
function EdgeWrapper($$payload, $$props) {
  push();
  var $$store_subs;
  let edgeType, edgeComponent, markerStartUrl, markerEndUrl, isSelectable;
  let id = $$props["id"];
  let type = fallback($$props["type"], "default");
  let source = fallback($$props["source"], "");
  let target = fallback($$props["target"], "");
  let data = fallback($$props["data"], () => ({}), true);
  let style = fallback($$props["style"], void 0);
  let zIndex = fallback($$props["zIndex"], void 0);
  let animated = fallback($$props["animated"], false);
  let selected = fallback($$props["selected"], false);
  let selectable = fallback($$props["selectable"], void 0);
  let deletable = fallback($$props["deletable"], void 0);
  let hidden = fallback($$props["hidden"], false);
  let label = fallback($$props["label"], void 0);
  let labelStyle = fallback($$props["labelStyle"], void 0);
  let markerStart = fallback($$props["markerStart"], void 0);
  let markerEnd = fallback($$props["markerEnd"], void 0);
  let sourceHandle = fallback($$props["sourceHandle"], void 0);
  let targetHandle = fallback($$props["targetHandle"], void 0);
  let sourceX = $$props["sourceX"];
  let sourceY = $$props["sourceY"];
  let targetX = $$props["targetX"];
  let targetY = $$props["targetY"];
  let sourcePosition = $$props["sourcePosition"];
  let targetPosition = $$props["targetPosition"];
  let ariaLabel = fallback($$props["ariaLabel"], void 0);
  let interactionWidth = fallback($$props["interactionWidth"], void 0);
  let className = fallback($$props["class"], "");
  setContext("svelteflow__edge_id", id);
  const {
    edgeLookup,
    edgeTypes,
    flowId,
    elementsSelectable
  } = useStore();
  useHandleEdgeSelect();
  edgeType = type || "default";
  edgeComponent = store_get($$store_subs ??= {}, "$edgeTypes", edgeTypes)[edgeType] || BezierEdgeInternal;
  markerStartUrl = markerStart ? `url('#${getMarkerId(markerStart, store_get($$store_subs ??= {}, "$flowId", flowId))}')` : void 0;
  markerEndUrl = markerEnd ? `url('#${getMarkerId(markerEnd, store_get($$store_subs ??= {}, "$flowId", flowId))}')` : void 0;
  isSelectable = selectable ?? store_get($$store_subs ??= {}, "$elementsSelectable", elementsSelectable);
  if (!hidden) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg${add_styles({ "z-index": zIndex })}><g${attr("class", `${stringify(clsx(cc(["svelte-flow__edge", className])))} ${stringify([
      animated ? "animated" : "",
      selected ? "selected" : "",
      isSelectable ? "selectable" : ""
    ].filter(Boolean).join(" "))}`)}${attr("data-id", id)}${attr("aria-label", ariaLabel === null ? void 0 : ariaLabel ? ariaLabel : `Edge from ${source} to ${target}`)} role="img"><!---->`;
    edgeComponent?.($$payload, {
      id,
      source,
      target,
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
      animated,
      selected,
      label,
      labelStyle,
      data,
      style,
      interactionWidth,
      selectable: isSelectable,
      deletable: deletable ?? true,
      type: edgeType,
      sourceHandleId: sourceHandle,
      targetHandleId: targetHandle,
      markerStart: markerStartUrl,
      markerEnd: markerEndUrl
    });
    $$payload.out += `<!----></g></svg>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    id,
    type,
    source,
    target,
    data,
    style,
    zIndex,
    animated,
    selected,
    selectable,
    deletable,
    hidden,
    label,
    labelStyle,
    markerStart,
    markerEnd,
    sourceHandle,
    targetHandle,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    ariaLabel,
    interactionWidth,
    class: className
  });
  pop();
}
function CallOnMount($$payload, $$props) {
  push();
  let _onMount = fallback($$props["onMount"], void 0);
  let _onDestroy = fallback($$props["onDestroy"], void 0);
  bind_props($$props, { onMount: _onMount, onDestroy: _onDestroy });
  pop();
}
function MarkerDefinition($$payload, $$props) {
  push();
  var $$store_subs;
  const { markers } = useStore();
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$markers", markers));
  $$payload.out += `<defs><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let marker = each_array[$$index];
    Marker($$payload, spread_props([marker]));
  }
  $$payload.out += `<!--]--></defs>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Marker($$payload, $$props) {
  push();
  let id = $$props["id"];
  let type = $$props["type"];
  let width = fallback($$props["width"], 12.5);
  let height = fallback($$props["height"], 12.5);
  let markerUnits = fallback($$props["markerUnits"], "strokeWidth");
  let orient = fallback($$props["orient"], "auto-start-reverse");
  let color = fallback($$props["color"], void 0);
  let strokeWidth = fallback($$props["strokeWidth"], void 0);
  $$payload.out += `<marker class="svelte-flow__arrowhead"${attr("id", id)}${attr("markerWidth", `${width}`)}${attr("markerHeight", `${height}`)} viewBox="-10 -10 20 20"${attr("markerUnits", markerUnits)}${attr("orient", orient)} refX="0" refY="0">`;
  if (type === MarkerType.Arrow) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<polyline${attr("stroke", color)} stroke-linecap="round" stroke-linejoin="round"${attr("stroke-width", strokeWidth)} fill="none" points="-5,-4 0,0 -5,4"></polyline>`;
  } else {
    $$payload.out += "<!--[!-->";
    if (type === MarkerType.ArrowClosed) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<polyline${attr("stroke", color)} stroke-linecap="round" stroke-linejoin="round"${attr("stroke-width", strokeWidth)}${attr("fill", color)} points="-5,-4 0,0 -5,4 -5,-4"></polyline>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></marker>`;
  bind_props($$props, {
    id,
    type,
    width,
    height,
    markerUnits,
    orient,
    color,
    strokeWidth
  });
  pop();
}
function EdgeRenderer($$payload, $$props) {
  push();
  var $$store_subs;
  let defaultEdgeOptions = $$props["defaultEdgeOptions"];
  const {
    visibleEdges,
    edgesInitialized,
    edges: { setDefaultOptions },
    elementsSelectable
  } = useStore();
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$visibleEdges", visibleEdges));
  $$payload.out += `<div class="svelte-flow__edges"><svg class="svelte-flow__marker">`;
  MarkerDefinition($$payload);
  $$payload.out += `<!----></svg> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let edge = each_array[$$index];
    EdgeWrapper($$payload, {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      data: edge.data,
      style: edge.style,
      animated: edge.animated,
      selected: edge.selected,
      selectable: edge.selectable ?? store_get($$store_subs ??= {}, "$elementsSelectable", elementsSelectable),
      deletable: edge.deletable,
      hidden: edge.hidden,
      label: edge.label,
      labelStyle: edge.labelStyle,
      markerStart: edge.markerStart,
      markerEnd: edge.markerEnd,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
      sourceX: edge.sourceX,
      sourceY: edge.sourceY,
      targetX: edge.targetX,
      targetY: edge.targetY,
      sourcePosition: edge.sourcePosition,
      targetPosition: edge.targetPosition,
      ariaLabel: edge.ariaLabel,
      interactionWidth: edge.interactionWidth,
      class: edge.class,
      type: edge.type || "default",
      zIndex: edge.zIndex
    });
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$visibleEdges", visibleEdges).length > 0) {
    $$payload.out += "<!--[-->";
    CallOnMount($$payload, {
      onMount: () => {
        store_set(edgesInitialized, true);
      },
      onDestroy: () => {
        store_set(edgesInitialized, false);
      }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { defaultEdgeOptions });
  pop();
}
function Selection($$payload, $$props) {
  let x = fallback($$props["x"], 0);
  let y = fallback($$props["y"], 0);
  let width = fallback($$props["width"], 0);
  let height = fallback($$props["height"], 0);
  let isVisible = fallback($$props["isVisible"], true);
  if (isVisible) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${add_styles({
      width: typeof width === "string" ? width : `${width}px`,
      height: typeof height === "string" ? height : `${height}px`,
      transform: `translate(${x}px, ${y}px)`
    })} class="svelte-flow__selection svelte-1iugwpu"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { x, y, width, height, isVisible });
}
function UserSelection($$payload, $$props) {
  push();
  var $$store_subs;
  const { selectionRect, selectionRectMode } = useStore();
  Selection($$payload, {
    isVisible: !!(store_get($$store_subs ??= {}, "$selectionRect", selectionRect) && store_get($$store_subs ??= {}, "$selectionRectMode", selectionRectMode) === "user"),
    width: store_get($$store_subs ??= {}, "$selectionRect", selectionRect)?.width,
    height: store_get($$store_subs ??= {}, "$selectionRect", selectionRect)?.height,
    x: store_get($$store_subs ??= {}, "$selectionRect", selectionRect)?.x,
    y: store_get($$store_subs ??= {}, "$selectionRect", selectionRect)?.y
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function NodeSelection($$payload, $$props) {
  push();
  var $$store_subs;
  const store = useStore();
  const { selectionRectMode, nodes, nodeLookup } = store;
  let bounds = null;
  if (store_get($$store_subs ??= {}, "$selectionRectMode", selectionRectMode) === "nodes") {
    bounds = getInternalNodesBounds(store_get($$store_subs ??= {}, "$nodeLookup", nodeLookup), { filter: (node) => !!node.selected });
    store_get($$store_subs ??= {}, "$nodes", nodes);
  }
  if (store_get($$store_subs ??= {}, "$selectionRectMode", selectionRectMode) === "nodes" && bounds && isNumeric(bounds.x) && isNumeric(bounds.y)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="selection-wrapper nopan svelte-5pxri"${attr("style", `width: ${stringify(bounds.width)}px; height: ${stringify(bounds.height)}px; transform: translate(${stringify(bounds.x)}px, ${stringify(bounds.y)}px)`)} role="button" tabindex="-1">`;
    Selection($$payload, { width: "100%", height: "100%", x: 0, y: 0 });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function KeyHandler($$payload, $$props) {
  push();
  let selectionKey = fallback($$props["selectionKey"], "Shift");
  let multiSelectionKey = fallback($$props["multiSelectionKey"], () => isMacOs() ? "Meta" : "Control", true);
  let deleteKey = fallback($$props["deleteKey"], "Backspace");
  let panActivationKey = fallback($$props["panActivationKey"], " ");
  let zoomActivationKey = fallback($$props["zoomActivationKey"], () => isMacOs() ? "Meta" : "Control", true);
  useStore();
  bind_props($$props, {
    selectionKey,
    multiSelectionKey,
    deleteKey,
    panActivationKey,
    zoomActivationKey
  });
  pop();
}
function ConnectionLine($$payload, $$props) {
  push();
  var $$store_subs;
  let containerStyle = fallback($$props["containerStyle"], "");
  let style = fallback($$props["style"], "");
  let isCustomComponent = fallback($$props["isCustomComponent"], false);
  const {
    width,
    height,
    connection,
    connectionLineType
  } = useStore();
  let path = null;
  if (store_get($$store_subs ??= {}, "$connection", connection).inProgress && !isCustomComponent) {
    const { from, to, fromPosition, toPosition } = store_get($$store_subs ??= {}, "$connection", connection);
    const pathParams = {
      sourceX: from.x,
      sourceY: from.y,
      sourcePosition: fromPosition,
      targetX: to.x,
      targetY: to.y,
      targetPosition: toPosition
    };
    switch (store_get($$store_subs ??= {}, "$connectionLineType", connectionLineType)) {
      case ConnectionLineType.Bezier:
        [path] = getBezierPath(pathParams);
        break;
      case ConnectionLineType.Step:
        [path] = getSmoothStepPath({ ...pathParams, borderRadius: 0 });
        break;
      case ConnectionLineType.SmoothStep:
        [path] = getSmoothStepPath(pathParams);
        break;
      default:
        [path] = getStraightPath(pathParams);
    }
  }
  if (store_get($$store_subs ??= {}, "$connection", connection).inProgress) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg${attr("width", store_get($$store_subs ??= {}, "$width", width))}${attr("height", store_get($$store_subs ??= {}, "$height", height))} class="svelte-flow__connectionline"${attr("style", containerStyle)}><g${attr("class", clsx(cc([
      "svelte-flow__connection",
      getConnectionStatus(store_get($$store_subs ??= {}, "$connection", connection).isValid)
    ])))}><!---->`;
    slot($$payload, $$props, "connectionLine", {}, null);
    $$payload.out += `<!---->`;
    if (!isCustomComponent) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<path${attr("d", path)}${attr("style", style)} fill="none" class="svelte-flow__connection-path"></path>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></g></svg>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { containerStyle, style, isCustomComponent });
  pop();
}
function Panel($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["position", "style", "class"]);
  push();
  var $$store_subs;
  let positionClasses;
  let position = fallback($$props["position"], "top-right");
  let style = fallback($$props["style"], void 0);
  let className = fallback($$props["class"], void 0);
  const { selectionRectMode } = useStore();
  positionClasses = `${position}`.split("-");
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cc([
        "svelte-flow__panel",
        className,
        ...positionClasses
      ])),
      style,
      ...$$restProps
    },
    void 0,
    {
      "pointer-events": store_get($$store_subs ??= {}, "$selectionRectMode", selectionRectMode) ? "none" : ""
    }
  )}><!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { position, style, class: className });
  pop();
}
function Attribution($$payload, $$props) {
  push();
  let proOptions = fallback($$props["proOptions"], void 0);
  let position = fallback($$props["position"], "bottom-right");
  if (!proOptions?.hideAttribution) {
    $$payload.out += "<!--[-->";
    Panel($$payload, {
      position,
      class: "svelte-flow__attribution",
      "data-message": "Feel free to remove the attribution or check out how you could support us: https://svelteflow.dev/support-us",
      children: ($$payload2) => {
        $$payload2.out += `<a href="https://svelteflow.dev" target="_blank" rel="noopener noreferrer" aria-label="Svelte Flow attribution">Svelte Flow</a>`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { proOptions, position });
  pop();
}
function updateStore(store, { nodeTypes, edgeTypes, minZoom, maxZoom, translateExtent, paneClickDistance }) {
  if (nodeTypes !== void 0) {
    store.setNodeTypes(nodeTypes);
  }
  if (edgeTypes !== void 0) {
    store.setEdgeTypes(edgeTypes);
  }
  if (minZoom !== void 0) {
    store.setMinZoom(minZoom);
  }
  if (maxZoom !== void 0) {
    store.setMaxZoom(maxZoom);
  }
  if (translateExtent !== void 0) {
    store.setTranslateExtent(translateExtent);
  }
  if (paneClickDistance !== void 0) {
    store.setPaneClickDistance(paneClickDistance);
  }
}
const getKeys = (obj) => Object.keys(obj);
function updateStoreByKeys(store, keys) {
  getKeys(keys).forEach((prop) => {
    const update = keys[prop];
    if (update !== void 0) {
      store[prop].set(update);
    }
  });
}
function getMediaQuery() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return null;
  }
  return window.matchMedia("(prefers-color-scheme: dark)");
}
function useColorModeClass(colorMode = "light") {
  const colorModeClass = readable("light", (set) => {
    if (colorMode !== "system") {
      set(colorMode);
      return;
    }
    const mediaQuery = getMediaQuery();
    const updateColorModeClass = () => set(mediaQuery?.matches ? "dark" : "light");
    set(mediaQuery?.matches ? "dark" : "light");
    mediaQuery?.addEventListener("change", updateColorModeClass);
    return () => {
      mediaQuery?.removeEventListener("change", updateColorModeClass);
    };
  });
  return colorModeClass;
}
function SvelteFlow($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "id",
    "nodes",
    "edges",
    "fitView",
    "fitViewOptions",
    "minZoom",
    "maxZoom",
    "initialViewport",
    "viewport",
    "nodeTypes",
    "edgeTypes",
    "selectionKey",
    "selectionMode",
    "panActivationKey",
    "multiSelectionKey",
    "zoomActivationKey",
    "nodesDraggable",
    "nodesConnectable",
    "nodeDragThreshold",
    "elementsSelectable",
    "snapGrid",
    "deleteKey",
    "connectionRadius",
    "connectionLineType",
    "connectionMode",
    "connectionLineStyle",
    "connectionLineContainerStyle",
    "onMoveStart",
    "onMove",
    "onMoveEnd",
    "isValidConnection",
    "translateExtent",
    "nodeExtent",
    "onlyRenderVisibleElements",
    "panOnScrollMode",
    "preventScrolling",
    "zoomOnScroll",
    "zoomOnDoubleClick",
    "zoomOnPinch",
    "panOnScroll",
    "panOnDrag",
    "selectionOnDrag",
    "autoPanOnConnect",
    "autoPanOnNodeDrag",
    "onerror",
    "ondelete",
    "onedgecreate",
    "attributionPosition",
    "proOptions",
    "defaultEdgeOptions",
    "width",
    "height",
    "colorMode",
    "onconnect",
    "onconnectstart",
    "onconnectend",
    "onbeforedelete",
    "oninit",
    "nodeOrigin",
    "paneClickDistance",
    "nodeClickDistance",
    "defaultMarkerColor",
    "style",
    "class"
  ]);
  push();
  var $$store_subs;
  let colorModeClass;
  let id = fallback($$props["id"], "1");
  let nodes = $$props["nodes"];
  let edges = $$props["edges"];
  let fitView2 = fallback($$props["fitView"], void 0);
  let fitViewOptions = fallback($$props["fitViewOptions"], void 0);
  let minZoom = fallback($$props["minZoom"], void 0);
  let maxZoom = fallback($$props["maxZoom"], void 0);
  let initialViewport = fallback($$props["initialViewport"], void 0);
  let viewport = fallback($$props["viewport"], void 0);
  let nodeTypes = fallback($$props["nodeTypes"], void 0);
  let edgeTypes = fallback($$props["edgeTypes"], void 0);
  let selectionKey = fallback($$props["selectionKey"], void 0);
  let selectionMode = fallback($$props["selectionMode"], void 0);
  let panActivationKey = fallback($$props["panActivationKey"], void 0);
  let multiSelectionKey = fallback($$props["multiSelectionKey"], void 0);
  let zoomActivationKey = fallback($$props["zoomActivationKey"], void 0);
  let nodesDraggable = fallback($$props["nodesDraggable"], void 0);
  let nodesConnectable = fallback($$props["nodesConnectable"], void 0);
  let nodeDragThreshold = fallback($$props["nodeDragThreshold"], void 0);
  let elementsSelectable = fallback($$props["elementsSelectable"], void 0);
  let snapGrid = fallback($$props["snapGrid"], void 0);
  let deleteKey = fallback($$props["deleteKey"], void 0);
  let connectionRadius = fallback($$props["connectionRadius"], void 0);
  let connectionLineType = fallback($$props["connectionLineType"], void 0);
  let connectionMode = fallback($$props["connectionMode"], () => ConnectionMode.Strict, true);
  let connectionLineStyle = fallback($$props["connectionLineStyle"], "");
  let connectionLineContainerStyle = fallback($$props["connectionLineContainerStyle"], "");
  let onMoveStart = fallback($$props["onMoveStart"], void 0);
  let onMove = fallback($$props["onMove"], void 0);
  let onMoveEnd = fallback($$props["onMoveEnd"], void 0);
  let isValidConnection = fallback($$props["isValidConnection"], void 0);
  let translateExtent = fallback($$props["translateExtent"], void 0);
  let nodeExtent = fallback($$props["nodeExtent"], void 0);
  let onlyRenderVisibleElements = fallback($$props["onlyRenderVisibleElements"], void 0);
  let panOnScrollMode = fallback($$props["panOnScrollMode"], () => PanOnScrollMode.Free, true);
  let preventScrolling = fallback($$props["preventScrolling"], true);
  let zoomOnScroll = fallback($$props["zoomOnScroll"], true);
  let zoomOnDoubleClick = fallback($$props["zoomOnDoubleClick"], true);
  let zoomOnPinch = fallback($$props["zoomOnPinch"], true);
  let panOnScroll = fallback($$props["panOnScroll"], false);
  let panOnDrag = fallback($$props["panOnDrag"], true);
  let selectionOnDrag = fallback($$props["selectionOnDrag"], void 0);
  let autoPanOnConnect = fallback($$props["autoPanOnConnect"], true);
  let autoPanOnNodeDrag = fallback($$props["autoPanOnNodeDrag"], true);
  let onerror = fallback($$props["onerror"], void 0);
  let ondelete = fallback($$props["ondelete"], void 0);
  let onedgecreate = fallback($$props["onedgecreate"], void 0);
  let attributionPosition = fallback($$props["attributionPosition"], void 0);
  let proOptions = fallback($$props["proOptions"], void 0);
  let defaultEdgeOptions = fallback($$props["defaultEdgeOptions"], void 0);
  let width = fallback($$props["width"], void 0);
  let height = fallback($$props["height"], void 0);
  let colorMode = fallback($$props["colorMode"], "light");
  let onconnect = fallback($$props["onconnect"], void 0);
  let onconnectstart = fallback($$props["onconnectstart"], void 0);
  let onconnectend = fallback($$props["onconnectend"], void 0);
  let onbeforedelete = fallback($$props["onbeforedelete"], void 0);
  let oninit = fallback($$props["oninit"], void 0);
  let nodeOrigin = fallback($$props["nodeOrigin"], void 0);
  let paneClickDistance = fallback($$props["paneClickDistance"], 0);
  let nodeClickDistance = fallback($$props["nodeClickDistance"], 0);
  let defaultMarkerColor = fallback($$props["defaultMarkerColor"], "#b1b1b7");
  let style = fallback($$props["style"], void 0);
  let className = fallback($$props["class"], void 0);
  const initViewport = store_get($$store_subs ??= {}, "$viewport", viewport) || initialViewport;
  const store = hasContext(key) ? useStore() : createStoreContext({
    nodes: get(nodes),
    edges: get(edges),
    width,
    height,
    fitView: fitView2,
    nodeOrigin,
    nodeExtent
  });
  const { initialized } = store;
  let onInitCalled = false;
  {
    if (!onInitCalled && store_get($$store_subs ??= {}, "$initialized", initialized)) {
      oninit?.();
      onInitCalled = true;
    }
  }
  {
    const updatableProps = {
      flowId: id,
      connectionLineType,
      connectionRadius,
      selectionMode,
      snapGrid,
      defaultMarkerColor,
      nodesDraggable,
      nodesConnectable,
      elementsSelectable,
      onlyRenderVisibleElements,
      isValidConnection,
      autoPanOnConnect,
      autoPanOnNodeDrag,
      onerror,
      ondelete,
      onedgecreate,
      connectionMode,
      nodeDragThreshold,
      onconnect,
      onconnectstart,
      onconnectend,
      onbeforedelete,
      nodeOrigin
    };
    updateStoreByKeys(store, updatableProps);
  }
  updateStore(store, {
    nodeTypes,
    edgeTypes,
    minZoom,
    maxZoom,
    translateExtent,
    paneClickDistance
  });
  colorModeClass = useColorModeClass(colorMode);
  $$payload.out += `<div${spread_attributes(
    {
      style,
      class: clsx(cc([
        "svelte-flow",
        className,
        store_get($$store_subs ??= {}, "$colorModeClass", colorModeClass)
      ])) + " svelte-12wlba6",
      "data-testid": "svelte-flow__wrapper",
      ...$$restProps,
      role: "application"
    },
    { "svelte-12wlba6": true }
  )}>`;
  KeyHandler($$payload, {
    selectionKey,
    deleteKey,
    panActivationKey,
    multiSelectionKey,
    zoomActivationKey
  });
  $$payload.out += `<!----> `;
  Zoom($$payload, {
    initialViewport: initViewport,
    onMoveStart,
    onMove,
    onMoveEnd,
    panOnScrollMode: panOnScrollMode === void 0 ? PanOnScrollMode.Free : panOnScrollMode,
    preventScrolling: preventScrolling === void 0 ? true : preventScrolling,
    zoomOnScroll: zoomOnScroll === void 0 ? true : zoomOnScroll,
    zoomOnDoubleClick: zoomOnDoubleClick === void 0 ? true : zoomOnDoubleClick,
    zoomOnPinch: zoomOnPinch === void 0 ? true : zoomOnPinch,
    panOnScroll: panOnScroll === void 0 ? false : panOnScroll,
    panOnDrag: panOnDrag === void 0 ? true : panOnDrag,
    paneClickDistance: paneClickDistance === void 0 ? 0 : paneClickDistance,
    children: ($$payload2) => {
      Pane($$payload2, {
        panOnDrag: panOnDrag === void 0 ? true : panOnDrag,
        selectionOnDrag,
        children: ($$payload3) => {
          Viewport($$payload3, {
            children: ($$payload4) => {
              EdgeRenderer($$payload4, { defaultEdgeOptions });
              $$payload4.out += `<!----> `;
              ConnectionLine($$payload4, {
                containerStyle: connectionLineContainerStyle,
                style: connectionLineStyle,
                isCustomComponent: $$slots.connectionLine,
                $$slots: {
                  connectionLine: ($$payload5) => {
                    $$payload5.out += `<!---->`;
                    slot($$payload5, $$props, "connectionLine", {}, null);
                    $$payload5.out += `<!---->`;
                  }
                }
              });
              $$payload4.out += `<!----> <div class="svelte-flow__edgelabel-renderer"></div> <div class="svelte-flow__viewport-portal"></div> `;
              NodeRenderer($$payload4, { nodeClickDistance });
              $$payload4.out += `<!----> `;
              NodeSelection($$payload4);
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          UserSelection($$payload3);
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Attribution($$payload, { proOptions, position: attributionPosition });
  $$payload.out += `<!----> <!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    id,
    nodes,
    edges,
    fitView: fitView2,
    fitViewOptions,
    minZoom,
    maxZoom,
    initialViewport,
    viewport,
    nodeTypes,
    edgeTypes,
    selectionKey,
    selectionMode,
    panActivationKey,
    multiSelectionKey,
    zoomActivationKey,
    nodesDraggable,
    nodesConnectable,
    nodeDragThreshold,
    elementsSelectable,
    snapGrid,
    deleteKey,
    connectionRadius,
    connectionLineType,
    connectionMode,
    connectionLineStyle,
    connectionLineContainerStyle,
    onMoveStart,
    onMove,
    onMoveEnd,
    isValidConnection,
    translateExtent,
    nodeExtent,
    onlyRenderVisibleElements,
    panOnScrollMode,
    preventScrolling,
    zoomOnScroll,
    zoomOnDoubleClick,
    zoomOnPinch,
    panOnScroll,
    panOnDrag,
    selectionOnDrag,
    autoPanOnConnect,
    autoPanOnNodeDrag,
    onerror,
    ondelete,
    onedgecreate,
    attributionPosition,
    proOptions,
    defaultEdgeOptions,
    width,
    height,
    colorMode,
    onconnect,
    onconnectstart,
    onconnectend,
    onbeforedelete,
    oninit,
    nodeOrigin,
    paneClickDistance,
    nodeClickDistance,
    defaultMarkerColor,
    style,
    class: className
  });
  pop();
}
function ControlButton($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  let bgColor = void 0;
  let bgColorHover = void 0;
  let color = void 0;
  let colorHover = void 0;
  let borderColor = void 0;
  $$payload.out += `<button${spread_attributes(
    {
      type: "button",
      class: clsx(cc(["svelte-flow__controls-button", className])),
      ...$$restProps
    },
    void 0,
    {
      "--xy-controls-button-background-color-props": bgColor,
      "--xy-controls-button-background-color-hover-props": bgColorHover,
      "--xy-controls-button-color-props": color,
      "--xy-controls-button-color-hover-props": colorHover,
      "--xy-controls-button-border-color-props": borderColor
    }
  )}><!---->`;
  slot($$payload, $$props, "default", { class: "button-svg" }, null);
  $$payload.out += `<!----></button>`;
  bind_props($$props, { class: className });
  pop();
}
function Plus($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"></path></svg>`;
}
function Minus($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 5"><path d="M0 0h32v4.2H0z"></path></svg>`;
}
function Fit($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30"><path d="M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"></path></svg>`;
}
function Lock($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32"><path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"></path></svg>`;
}
function Unlock($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32"><path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"></path></svg>`;
}
function Controls($$payload, $$props) {
  push();
  var $$store_subs;
  let isInteractive, minZoomReached, maxZoomReached, orientationClass;
  let position = fallback($$props["position"], "bottom-left");
  let showZoom = fallback($$props["showZoom"], true);
  let showFitView = fallback($$props["showFitView"], true);
  let showLock = fallback($$props["showLock"], true);
  let buttonBgColor = fallback($$props["buttonBgColor"], void 0);
  let buttonBgColorHover = fallback($$props["buttonBgColorHover"], void 0);
  let buttonColor = fallback($$props["buttonColor"], void 0);
  let buttonColorHover = fallback($$props["buttonColorHover"], void 0);
  let buttonBorderColor = fallback($$props["buttonBorderColor"], void 0);
  let ariaLabel = fallback($$props["ariaLabel"], void 0);
  let style = fallback($$props["style"], void 0);
  let orientation = fallback($$props["orientation"], "vertical");
  let fitViewOptions = fallback($$props["fitViewOptions"], void 0);
  let className = fallback($$props["class"], "");
  const {
    zoomIn,
    zoomOut,
    fitView: fitView2,
    viewport,
    minZoom,
    maxZoom,
    nodesDraggable,
    nodesConnectable,
    elementsSelectable
  } = useStore();
  const buttonProps = {
    bgColor: buttonBgColor,
    bgColorHover: buttonBgColorHover,
    color: buttonColor,
    colorHover: buttonColorHover,
    borderColor: buttonBorderColor
  };
  isInteractive = store_get($$store_subs ??= {}, "$nodesDraggable", nodesDraggable) || store_get($$store_subs ??= {}, "$nodesConnectable", nodesConnectable) || store_get($$store_subs ??= {}, "$elementsSelectable", elementsSelectable);
  minZoomReached = store_get($$store_subs ??= {}, "$viewport", viewport).zoom <= store_get($$store_subs ??= {}, "$minZoom", minZoom);
  maxZoomReached = store_get($$store_subs ??= {}, "$viewport", viewport).zoom >= store_get($$store_subs ??= {}, "$maxZoom", maxZoom);
  orientationClass = orientation === "horizontal" ? "horizontal" : "vertical";
  Panel($$payload, {
    class: cc([
      "svelte-flow__controls",
      orientationClass,
      className
    ]),
    position,
    "data-testid": "svelte-flow__controls",
    "aria-label": ariaLabel ?? "Svelte Flow controls",
    style,
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      slot($$payload2, $$props, "before", {}, null);
      $$payload2.out += `<!----> `;
      if (showZoom) {
        $$payload2.out += "<!--[-->";
        ControlButton($$payload2, spread_props([
          {
            class: "svelte-flow__controls-zoomin",
            title: "zoom in",
            "aria-label": "zoom in",
            disabled: maxZoomReached
          },
          buttonProps,
          {
            children: ($$payload3) => {
              Plus($$payload3);
            },
            $$slots: { default: true }
          }
        ]));
        $$payload2.out += `<!----> `;
        ControlButton($$payload2, spread_props([
          {
            class: "svelte-flow__controls-zoomout",
            title: "zoom out",
            "aria-label": "zoom out",
            disabled: minZoomReached
          },
          buttonProps,
          {
            children: ($$payload3) => {
              Minus($$payload3);
            },
            $$slots: { default: true }
          }
        ]));
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (showFitView) {
        $$payload2.out += "<!--[-->";
        ControlButton($$payload2, spread_props([
          {
            class: "svelte-flow__controls-fitview",
            title: "fit view",
            "aria-label": "fit view"
          },
          buttonProps,
          {
            children: ($$payload3) => {
              Fit($$payload3);
            },
            $$slots: { default: true }
          }
        ]));
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (showLock) {
        $$payload2.out += "<!--[-->";
        ControlButton($$payload2, spread_props([
          {
            class: "svelte-flow__controls-interactive",
            title: "toggle interactivity",
            "aria-label": "toggle interactivity"
          },
          buttonProps,
          {
            children: ($$payload3) => {
              if (isInteractive) {
                $$payload3.out += "<!--[-->";
                Unlock($$payload3);
              } else {
                $$payload3.out += "<!--[!-->";
                Lock($$payload3);
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          }
        ]));
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <!---->`;
      slot($$payload2, $$props, "default", {}, null);
      $$payload2.out += `<!----> <!---->`;
      slot($$payload2, $$props, "after", {}, null);
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    position,
    showZoom,
    showFitView,
    showLock,
    buttonBgColor,
    buttonBgColorHover,
    buttonColor,
    buttonColorHover,
    buttonBorderColor,
    ariaLabel,
    style,
    orientation,
    fitViewOptions,
    class: className
  });
  pop();
}
var BackgroundVariant;
(function(BackgroundVariant2) {
  BackgroundVariant2["Lines"] = "lines";
  BackgroundVariant2["Dots"] = "dots";
  BackgroundVariant2["Cross"] = "cross";
})(BackgroundVariant || (BackgroundVariant = {}));
function DotPattern($$payload, $$props) {
  push();
  let radius = fallback($$props["radius"], 5);
  let className = fallback($$props["class"], "");
  $$payload.out += `<circle${attr("cx", radius)}${attr("cy", radius)}${attr("r", radius)}${attr("class", clsx(cc([
    "svelte-flow__background-pattern",
    "dots",
    className
  ])))}></circle>`;
  bind_props($$props, { radius, class: className });
  pop();
}
function LinePattern($$payload, $$props) {
  push();
  let lineWidth = fallback($$props["lineWidth"], 1);
  let dimensions = $$props["dimensions"];
  let variant = fallback($$props["variant"], void 0);
  let className = fallback($$props["class"], "");
  $$payload.out += `<path${attr("stroke-width", lineWidth)}${attr("d", `M${dimensions[0] / 2} 0 V${dimensions[1]} M0 ${dimensions[1] / 2} H${dimensions[0]}`)}${attr("class", clsx(cc([
    "svelte-flow__background-pattern",
    variant,
    className
  ])))}></path>`;
  bind_props($$props, {
    lineWidth,
    dimensions,
    variant,
    class: className
  });
  pop();
}
const defaultSize = {
  [BackgroundVariant.Dots]: 1,
  [BackgroundVariant.Lines]: 1,
  [BackgroundVariant.Cross]: 6
};
function Background($$payload, $$props) {
  push();
  var $$store_subs;
  let patternId, scaledGap, scaledSize, patternDimensions, patternOffset;
  let id = fallback($$props["id"], void 0);
  let variant = fallback($$props["variant"], () => BackgroundVariant.Dots, true);
  let gap = fallback($$props["gap"], 20);
  let size = fallback($$props["size"], 1);
  let lineWidth = fallback($$props["lineWidth"], 1);
  let bgColor = fallback($$props["bgColor"], void 0);
  let patternColor = fallback($$props["patternColor"], void 0);
  let patternClass = fallback($$props["patternClass"], void 0);
  let className = fallback($$props["class"], "");
  const { viewport, flowId } = useStore();
  const patternSize = size || defaultSize[variant];
  const isDots = variant === BackgroundVariant.Dots;
  const isCross = variant === BackgroundVariant.Cross;
  const gapXY = Array.isArray(gap) ? gap : [gap, gap];
  patternId = `background-pattern-${store_get($$store_subs ??= {}, "$flowId", flowId)}-${id ? id : ""}`;
  scaledGap = [
    gapXY[0] * store_get($$store_subs ??= {}, "$viewport", viewport).zoom || 1,
    gapXY[1] * store_get($$store_subs ??= {}, "$viewport", viewport).zoom || 1
  ];
  scaledSize = patternSize * store_get($$store_subs ??= {}, "$viewport", viewport).zoom;
  patternDimensions = isCross ? [scaledSize, scaledSize] : scaledGap;
  patternOffset = isDots ? [scaledSize / 2, scaledSize / 2] : [
    patternDimensions[0] / 2,
    patternDimensions[1] / 2
  ];
  $$payload.out += `<svg${add_styles({
    "--xy-background-color-props": bgColor,
    "--xy-background-pattern-color-props": patternColor
  })}${attr("class", clsx(cc(["svelte-flow__background", className])) + " svelte-1r7pe8d")} data-testid="svelte-flow__background"><pattern${attr("id", patternId)}${attr("x", store_get($$store_subs ??= {}, "$viewport", viewport).x % scaledGap[0])}${attr("y", store_get($$store_subs ??= {}, "$viewport", viewport).y % scaledGap[1])}${attr("width", scaledGap[0])}${attr("height", scaledGap[1])} patternUnits="userSpaceOnUse"${attr("patternTransform", `translate(-${patternOffset[0]},-${patternOffset[1]})`)}>`;
  if (isDots) {
    $$payload.out += "<!--[-->";
    DotPattern($$payload, { radius: scaledSize / 2, class: patternClass });
  } else {
    $$payload.out += "<!--[!-->";
    LinePattern($$payload, {
      dimensions: patternDimensions,
      variant,
      lineWidth,
      class: patternClass
    });
  }
  $$payload.out += `<!--]--></pattern><rect x="0" y="0" width="100%" height="100%"${attr("fill", `url(#${patternId})`)}></rect></svg>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    id,
    variant,
    gap,
    size,
    lineWidth,
    bgColor,
    patternColor,
    patternClass,
    class: className
  });
  pop();
}
function MinimapNode($$payload, $$props) {
  push();
  let x = $$props["x"];
  let y = $$props["y"];
  let width = fallback($$props["width"], 0);
  let height = fallback($$props["height"], 0);
  let borderRadius = fallback($$props["borderRadius"], 5);
  let color = fallback($$props["color"], void 0);
  let shapeRendering = $$props["shapeRendering"];
  let strokeColor = fallback($$props["strokeColor"], void 0);
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let selected = fallback($$props["selected"], false);
  let className = fallback($$props["class"], "");
  $$payload.out += `<rect${attr("class", `${stringify(clsx(cc(["svelte-flow__minimap-node", className])))} ${stringify([selected ? "selected" : ""].filter(Boolean).join(" "))}`)}${attr("x", x)}${attr("y", y)}${attr("rx", borderRadius)}${attr("ry", borderRadius)}${attr("width", width)}${attr("height", height)}${attr("style", `${color ? `fill: ${color};` : ""}${strokeColor ? `stroke: ${strokeColor};` : ""}${strokeWidth ? `stroke-width: ${strokeWidth};` : ""}`)}${attr("shape-rendering", shapeRendering)}></rect>`;
  bind_props($$props, {
    x,
    y,
    width,
    height,
    borderRadius,
    color,
    shapeRendering,
    strokeColor,
    strokeWidth,
    selected,
    class: className
  });
  pop();
}
const getAttrFunction = (func) => func instanceof Function ? func : () => func;
function Minimap($$payload, $$props) {
  push();
  var $$store_subs;
  let viewBB, elementWidth, elementHeight, scaledWidth, scaledHeight, viewScale, viewWidth, viewHeight, offset, x, y, viewboxWidth, viewboxHeight;
  let position = fallback($$props["position"], "bottom-right");
  let ariaLabel = fallback($$props["ariaLabel"], "Mini map");
  let nodeStrokeColor = fallback($$props["nodeStrokeColor"], "transparent");
  let nodeColor = fallback($$props["nodeColor"], void 0);
  let nodeClass = fallback($$props["nodeClass"], "");
  let nodeBorderRadius = fallback($$props["nodeBorderRadius"], 5);
  let nodeStrokeWidth = fallback($$props["nodeStrokeWidth"], 2);
  let bgColor = fallback($$props["bgColor"], void 0);
  let maskColor = fallback($$props["maskColor"], void 0);
  let maskStrokeColor = fallback($$props["maskStrokeColor"], void 0);
  let maskStrokeWidth = fallback($$props["maskStrokeWidth"], void 0);
  let width = fallback($$props["width"], void 0);
  let height = fallback($$props["height"], void 0);
  let pannable = fallback($$props["pannable"], true);
  let zoomable = fallback($$props["zoomable"], true);
  let inversePan = fallback($$props["inversePan"], void 0);
  let zoomStep = fallback($$props["zoomStep"], void 0);
  let style = fallback($$props["style"], "");
  let className = fallback($$props["class"], "");
  const defaultWidth = 200;
  const defaultHeight = 150;
  const {
    nodes,
    nodeLookup,
    viewport,
    width: containerWidth,
    height: containerHeight,
    flowId,
    panZoom,
    translateExtent
  } = useStore();
  const nodeColorFunc = nodeColor === void 0 ? void 0 : getAttrFunction(nodeColor);
  const nodeStrokeColorFunc = getAttrFunction(nodeStrokeColor);
  const nodeClassFunc = getAttrFunction(nodeClass);
  const shapeRendering = (
    // @ts-expect-error - TS doesn't know about chrome
    typeof window === "undefined" || !!window.chrome ? "crispEdges" : "geometricPrecision"
  );
  const labelledBy = `svelte-flow__minimap-desc-${store_get($$store_subs ??= {}, "$flowId", flowId)}`;
  let boundingRect = viewBB;
  viewBB = {
    x: -store_get($$store_subs ??= {}, "$viewport", viewport).x / store_get($$store_subs ??= {}, "$viewport", viewport).zoom,
    y: -store_get($$store_subs ??= {}, "$viewport", viewport).y / store_get($$store_subs ??= {}, "$viewport", viewport).zoom,
    width: store_get($$store_subs ??= {}, "$containerWidth", containerWidth) / store_get($$store_subs ??= {}, "$viewport", viewport).zoom,
    height: store_get($$store_subs ??= {}, "$containerHeight", containerHeight) / store_get($$store_subs ??= {}, "$viewport", viewport).zoom
  };
  {
    boundingRect = store_get($$store_subs ??= {}, "$nodeLookup", nodeLookup).size > 0 ? getBoundsOfRects(getInternalNodesBounds(store_get($$store_subs ??= {}, "$nodeLookup", nodeLookup)), viewBB) : viewBB;
    store_get($$store_subs ??= {}, "$nodes", nodes);
  }
  elementWidth = width ?? defaultWidth;
  elementHeight = height ?? defaultHeight;
  scaledWidth = boundingRect.width / elementWidth;
  scaledHeight = boundingRect.height / elementHeight;
  viewScale = Math.max(scaledWidth, scaledHeight);
  viewWidth = viewScale * elementWidth;
  viewHeight = viewScale * elementHeight;
  offset = 5 * viewScale;
  x = boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset;
  y = boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset;
  viewboxWidth = viewWidth + offset * 2;
  viewboxHeight = viewHeight + offset * 2;
  Panel($$payload, {
    position,
    style: style + (bgColor ? `;--xy-minimap-background-color-props:${bgColor}` : ""),
    class: cc(["svelte-flow__minimap", className]),
    "data-testid": "svelte-flow__minimap",
    children: ($$payload2) => {
      if (store_get($$store_subs ??= {}, "$panZoom", panZoom)) {
        $$payload2.out += "<!--[-->";
        const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$nodes", nodes));
        $$payload2.out += `<svg${add_styles({
          "--xy-minimap-mask-background-color-props": maskColor,
          "--xy-minimap-mask-stroke-color-props": maskStrokeColor,
          "--xy-minimap-mask-stroke-width-props": maskStrokeWidth ? maskStrokeWidth * viewScale : void 0
        })}${attr("width", elementWidth)}${attr("height", elementHeight)}${attr("viewBox", `${stringify(x)} ${stringify(y)} ${stringify(viewboxWidth)} ${stringify(viewboxHeight)}`)} class="svelte-flow__minimap-svg" role="img"${attr("aria-labelledby", labelledBy)}>`;
        if (ariaLabel) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<title${attr("id", labelledBy)}>${escape_html(ariaLabel)}</title>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let userNode = each_array[$$index];
          const node = store_get($$store_subs ??= {}, "$nodeLookup", nodeLookup).get(userNode.id);
          if (node && nodeHasDimensions(node)) {
            $$payload2.out += "<!--[-->";
            const nodeDimesions = getNodeDimensions(node);
            MinimapNode($$payload2, spread_props([
              {
                x: node.internals.positionAbsolute.x,
                y: node.internals.positionAbsolute.y
              },
              nodeDimesions,
              {
                selected: node.selected,
                color: nodeColorFunc?.(node),
                borderRadius: nodeBorderRadius,
                strokeColor: nodeStrokeColorFunc(node),
                strokeWidth: nodeStrokeWidth,
                shapeRendering,
                class: nodeClassFunc(node)
              }
            ]));
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]-->`;
        }
        $$payload2.out += `<!--]--><path class="svelte-flow__minimap-mask"${attr("d", `M${stringify(x - offset)},${stringify(y - offset)}h${stringify(viewboxWidth + offset * 2)}v${stringify(viewboxHeight + offset * 2)}h${stringify(-viewboxWidth - offset * 2)}z
      M${stringify(viewBB.x)},${stringify(viewBB.y)}h${stringify(viewBB.width)}v${stringify(viewBB.height)}h${stringify(-viewBB.width)}z`)} fill-rule="evenodd" pointer-events="none"></path></svg>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    position,
    ariaLabel,
    nodeStrokeColor,
    nodeColor,
    nodeClass,
    nodeBorderRadius,
    nodeStrokeWidth,
    bgColor,
    maskColor,
    maskStrokeColor,
    maskStrokeWidth,
    width,
    height,
    pannable,
    zoomable,
    inversePan,
    zoomStep,
    style,
    class: className
  });
  pop();
}
function ColorSelectorNode($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let isConnectable = $$props["isConnectable"];
  const { color } = data;
  Handle($$payload, {
    type: "target",
    position: Position.Left,
    style: "background: #555;",
    isConnectable
  });
  $$payload.out += `<!----> <div>Custom Color Picker Node: <strong>${escape_html(store_get($$store_subs ??= {}, "$color", color))}</strong></div> <input class="nodrag" type="color"${attr("value", store_get($$store_subs ??= {}, "$color", color))}> `;
  Handle($$payload, {
    type: "source",
    position: Position.Right,
    id: "a",
    style: "top: 10px; background: #555;",
    isConnectable
  });
  $$payload.out += `<!----> `;
  Handle($$payload, {
    type: "source",
    position: Position.Right,
    id: "b",
    style: "bottom: 10px; top: auto; background: #555;",
    isConnectable
  });
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data, isConnectable });
  pop();
}
function Graph($$payload, $$props) {
  push();
  var $$store_subs;
  const nodeTypes = { selectorNode: ColorSelectorNode };
  const bgColor = writable("#1A192B");
  const initialNodes = [
    {
      id: "1",
      type: "input",
      data: { label: "An input node" },
      position: { x: 0, y: 50 },
      sourcePosition: Position.Right
    },
    {
      id: "2",
      type: "selectorNode",
      data: { color: bgColor },
      style: "border: 1px solid #777; padding: 10px;",
      position: { x: 300, y: 50 }
    },
    {
      id: "3",
      type: "output",
      data: { label: "Output A" },
      position: { x: 650, y: 25 },
      targetPosition: Position.Left
    },
    {
      id: "4",
      type: "output",
      data: { label: "Output B" },
      position: { x: 650, y: 100 },
      targetPosition: Position.Left
    }
  ];
  const initialEdges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      style: "stroke: #fff;"
    },
    {
      id: "e2a-3",
      source: "2",
      target: "3",
      sourceHandle: "a",
      animated: true,
      style: "stroke: #fff;"
    },
    {
      id: "e2b-4",
      source: "2",
      target: "4",
      sourceHandle: "b",
      animated: true,
      style: "stroke: #fff;"
    }
  ];
  const nodes = writable(initialNodes);
  const edges = writable(initialEdges);
  $$payload.out += `<div style="height:100vh;">`;
  SvelteFlow($$payload, {
    nodes,
    edges,
    nodeTypes,
    style: `background: ${stringify(store_get($$store_subs ??= {}, "$bgColor", bgColor))}`,
    fitView: true,
    children: ($$payload2) => {
      Background($$payload2, {});
      $$payload2.out += `<!----> `;
      Controls($$payload2, {});
      $$payload2.out += `<!----> `;
      Minimap($$payload2, {});
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload) {
  Graph($$payload);
}
export {
  _page as default
};
