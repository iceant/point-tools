'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var ElScrollbar = require('../el-scrollbar');
var ElCheckbox = require('../el-checkbox');
var ElRadio = require('../el-radio');
var locale = require('../locale');
var util = require('../utils/util');
var isEqual = require('lodash/isEqual');
var aria = require('../utils/aria');
var constants = require('../utils/constants');
var isServer = require('../utils/isServer');
var scrollIntoView = require('../utils/scroll-into-view');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElScrollbar__default = /*#__PURE__*/_interopDefaultLegacy(ElScrollbar);
var ElCheckbox__default = /*#__PURE__*/_interopDefaultLegacy(ElCheckbox);
var ElRadio__default = /*#__PURE__*/_interopDefaultLegacy(ElRadio);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);
var scrollIntoView__default = /*#__PURE__*/_interopDefaultLegacy(scrollIntoView);

(function (ExpandTrigger) {
    ExpandTrigger["CLICK"] = "click";
    ExpandTrigger["HOVER"] = "hover";
})(exports.ExpandTrigger || (exports.ExpandTrigger = {}));
const CASCADER_PANEL_INJECTION_KEY = Symbol();

var script = vue.defineComponent({
    name: 'ElCascaderNode',
    components: {
        ElCheckbox: ElCheckbox__default['default'],
        ElRadio: ElRadio__default['default'],
        NodeContent: {
            render() {
                const { node, panel } = this.$parent;
                const { data, label } = node;
                const { renderLabelFn } = panel;
                return vue.h('span', { class: 'el-cascader-node__label' }, renderLabelFn ? renderLabelFn({ node, data }) : label);
            },
        },
    },
    props: {
        node: {
            type: Object,
            required: true,
        },
        menuId: String,
    },
    emits: ['expand'],
    setup(props, { emit }) {
        const panel = vue.inject(CASCADER_PANEL_INJECTION_KEY);
        const isHoverMenu = vue.computed(() => panel.isHoverMenu);
        const multiple = vue.computed(() => panel.config.multiple);
        const checkStrictly = vue.computed(() => panel.config.checkStrictly);
        const checkedNodeId = vue.computed(() => { var _a; return (_a = panel.checkedNodes[0]) === null || _a === void 0 ? void 0 : _a.uid; });
        const isDisabled = vue.computed(() => props.node.isDisabled);
        const isLeaf = vue.computed(() => props.node.isLeaf);
        const expandable = vue.computed(() => checkStrictly.value && !isLeaf.value || !isDisabled.value);
        const inExpandingPath = vue.computed(() => isInPath(panel.expandingNode));
        const inCheckedPath = vue.computed(() => checkStrictly.value && panel.checkedNodes.some(isInPath));
        const isInPath = (node) => {
            var _a;
            const { level, uid } = props.node;
            return ((_a = node === null || node === void 0 ? void 0 : node.pathNodes[level - 1]) === null || _a === void 0 ? void 0 : _a.uid) === uid;
        };
        const doExpand = () => {
            if (inExpandingPath.value)
                return;
            panel.expandNode(props.node);
        };
        const doCheck = (checked) => {
            const { node } = props;
            if (checked === node.checked)
                return;
            panel.handleCheckChange(node, checked);
        };
        const doLoad = () => {
            panel.lazyLoad(props.node, () => {
                if (!isLeaf.value)
                    doExpand();
            });
        };
        const handleHoverExpand = (e) => {
            if (!isHoverMenu.value)
                return;
            handleExpand();
            !isLeaf.value && emit('expand', e);
        };
        const handleExpand = () => {
            const { node } = props;
            if (!expandable.value || node.loading)
                return;
            node.loaded ? doExpand() : doLoad();
        };
        const handleClick = () => {
            if (isHoverMenu.value && !isLeaf.value)
                return;
            if (isLeaf.value && !isDisabled.value && !checkStrictly.value && !multiple.value) {
                handleCheck(true);
            }
            else {
                handleExpand();
            }
        };
        const handleCheck = (checked) => {
            if (!props.node.loaded) {
                doLoad();
            }
            else {
                doCheck(checked);
                !checkStrictly.value && doExpand();
            }
        };
        return {
            panel,
            isHoverMenu,
            multiple,
            checkStrictly,
            checkedNodeId,
            isDisabled,
            isLeaf,
            expandable,
            inExpandingPath,
            inCheckedPath,
            handleHoverExpand,
            handleExpand,
            handleClick,
            handleCheck,
        };
    },
});

const _hoisted_1 = /*#__PURE__*/vue.createVNode("span", null, null, -1 /* HOISTED */);
const _hoisted_2 = {
  key: 2,
  class: "el-icon-check el-cascader-node__prefix"
};
const _hoisted_3 = {
  key: 0,
  class: "el-icon-loading el-cascader-node__postfix"
};
const _hoisted_4 = {
  key: 1,
  class: "el-icon-arrow-right el-cascader-node__postfix"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = vue.resolveComponent("el-checkbox");
  const _component_el_radio = vue.resolveComponent("el-radio");
  const _component_node_content = vue.resolveComponent("node-content");

  return (vue.openBlock(), vue.createBlock("li", {
    id: `${_ctx.menuId}-${_ctx.node.uid}`,
    role: "menuitem",
    "aria-haspopup": !_ctx.isLeaf,
    "aria-owns": _ctx.isLeaf ? null : _ctx.menuId,
    "aria-expanded": _ctx.inExpandingPath,
    tabindex: _ctx.expandable ? -1 : null,
    class: [
      'el-cascader-node',
      _ctx.checkStrictly && 'is-selectable',
      _ctx.inExpandingPath && 'in-active-path',
      _ctx.inCheckedPath && 'in-checked-path',
      _ctx.node.checked && 'is-active',
      !_ctx.expandable && 'is-disabled'
    ],
    onMouseenter: _cache[3] || (_cache[3] = (...args) => (_ctx.handleHoverExpand && _ctx.handleHoverExpand(...args))),
    onFocus: _cache[4] || (_cache[4] = (...args) => (_ctx.handleHoverExpand && _ctx.handleHoverExpand(...args))),
    onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args)))
  }, [
    vue.createCommentVNode(" prefix "),
    (_ctx.multiple)
      ? (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
          key: 0,
          "model-value": _ctx.node.checked,
          indeterminate: _ctx.node.indeterminate,
          disabled: _ctx.isDisabled,
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {}, ["stop"])),
          "onUpdate:modelValue": _ctx.handleCheck
        }, null, 8 /* PROPS */, ["model-value", "indeterminate", "disabled", "onUpdate:modelValue"]))
      : (_ctx.checkStrictly)
        ? (vue.openBlock(), vue.createBlock(_component_el_radio, {
            key: 1,
            "model-value": _ctx.checkedNodeId,
            label: _ctx.node.uid,
            disabled: _ctx.isDisabled,
            "onUpdate:modelValue": _ctx.handleCheck,
            onClick: _cache[2] || (_cache[2] = vue.withModifiers(() => {}, ["stop"]))
          }, {
            default: vue.withCtx(() => [
              vue.createCommentVNode("\n        Add an empty element to avoid render label,\n        do not use empty fragment here for https://github.com/vuejs/vue-next/pull/2485\n      "),
              _hoisted_1
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["model-value", "label", "disabled", "onUpdate:modelValue"]))
        : (_ctx.isLeaf && _ctx.node.checked)
          ? (vue.openBlock(), vue.createBlock("i", _hoisted_2))
          : vue.createCommentVNode("v-if", true),
    vue.createCommentVNode(" content "),
    vue.createVNode(_component_node_content),
    vue.createCommentVNode(" postfix "),
    (!_ctx.isLeaf)
      ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 3 }, [
          (_ctx.node.loading)
            ? (vue.openBlock(), vue.createBlock("i", _hoisted_3))
            : (vue.openBlock(), vue.createBlock("i", _hoisted_4))
        ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
      : vue.createCommentVNode("v-if", true)
  ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["id", "aria-haspopup", "aria-owns", "aria-expanded", "tabindex"]))
}

script.render = render;
script.__file = "packages/cascader-panel/src/node.vue";

var script$1 = vue.defineComponent({
    name: 'ElCascaderMenu',
    components: {
        ElScrollbar: ElScrollbar__default['default'],
        ElCascaderNode: script,
    },
    props: {
        nodes: {
            type: Array,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const instance = vue.getCurrentInstance();
        const id = util.generateId();
        let activeNode = null;
        let hoverTimer = null;
        const panel = vue.inject(CASCADER_PANEL_INJECTION_KEY);
        const hoverZone = vue.ref(null);
        const isEmpty = vue.computed(() => !props.nodes.length);
        const menuId = vue.computed(() => `cascader-menu-${id}-${props.index}`);
        const handleExpand = (e) => {
            activeNode = e.target;
        };
        const handleMouseMove = (e) => {
            if (!panel.isHoverMenu || !activeNode || !hoverZone.value)
                return;
            if (activeNode.contains(e.target)) {
                clearHoverTimer();
                const el = instance.vnode.el;
                const { left } = el.getBoundingClientRect();
                const { offsetWidth, offsetHeight } = el;
                const startX = e.clientX - left;
                const top = activeNode.offsetTop;
                const bottom = top + activeNode.offsetHeight;
                hoverZone.value.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${top} L${offsetWidth} 0 V${top} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${bottom} L${offsetWidth} ${offsetHeight} V${bottom} Z" />
        `;
            }
            else if (!hoverTimer) {
                hoverTimer = window.setTimeout(clearHoverZone, panel.config.hoverThreshold);
            }
        };
        const clearHoverTimer = () => {
            if (!hoverTimer)
                return;
            clearTimeout(hoverTimer);
            hoverTimer = null;
        };
        const clearHoverZone = () => {
            if (!hoverZone.value)
                return;
            hoverZone.value.innerHTML = '';
            clearHoverTimer();
        };
        return {
            panel,
            hoverZone,
            isEmpty,
            menuId,
            t: locale.t,
            handleExpand,
            handleMouseMove,
            clearHoverZone,
        };
    },
});

const _hoisted_1$1 = {
  key: 0,
  class: "el-cascader-menu__empty-text"
};
const _hoisted_2$1 = {
  key: 1,
  ref: "hoverZone",
  class: "el-cascader-menu__hover-zone"
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_cascader_node = vue.resolveComponent("el-cascader-node");
  const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");

  return (vue.openBlock(), vue.createBlock(_component_el_scrollbar, {
    id: _ctx.menuId,
    tag: "ul",
    role: "menu",
    class: "el-cascader-menu",
    "wrap-class": "el-cascader-menu__wrap",
    "view-class": [
      'el-cascader-menu__list',
      _ctx.isEmpty && 'is-empty'
    ],
    onMousemove: _ctx.handleMouseMove,
    onMouseleave: _ctx.clearHoverZone
  }, {
    default: vue.withCtx(() => [
      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.nodes, (node) => {
        return (vue.openBlock(), vue.createBlock(_component_el_cascader_node, {
          key: node.uid,
          node: node,
          "menu-id": _ctx.menuId,
          onExpand: _ctx.handleExpand
        }, null, 8 /* PROPS */, ["node", "menu-id", "onExpand"]))
      }), 128 /* KEYED_FRAGMENT */)),
      (_ctx.isEmpty)
        ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, vue.toDisplayString(_ctx.t('el.cascader.noData')), 1 /* TEXT */))
        : (_ctx.panel.isHoverMenu)
          ? (vue.openBlock(), vue.createBlock("svg", _hoisted_2$1, null, 512 /* NEED_PATCH */))
          : vue.createCommentVNode("v-if", true)
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["id", "view-class", "onMousemove", "onMouseleave"]))
}

script$1.render = render$1;
script$1.__file = "packages/cascader-panel/src/menu.vue";

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
const EMPTY_OBJ = (process.env.NODE_ENV !== 'production')
    ? Object.freeze({})
    : {};
const EMPTY_ARR = (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
const NOOP = () => { };
const isFunction = (val) => typeof val === 'function';

let uid = 0;
const calculatePathNodes = (node) => {
    const nodes = [node];
    let { parent } = node;
    while (parent) {
        nodes.unshift(parent);
        parent = parent.parent;
    }
    return nodes;
};
class Node {
    constructor(data, config, parent, root = false) {
        this.data = data;
        this.config = config;
        this.parent = parent;
        this.root = root;
        this.uid = uid++;
        this.checked = false;
        this.indeterminate = false;
        this.loading = false;
        const { value: valueKey, label: labelKey, children: childrenKey } = config;
        const childrenData = data[childrenKey];
        const pathNodes = calculatePathNodes(this);
        this.level = root ? 0 : parent ? parent.level + 1 : 1;
        this.value = data[valueKey];
        this.label = data[labelKey];
        this.pathNodes = pathNodes;
        this.pathValues = pathNodes.map(node => node.value);
        this.pathLabels = pathNodes.map(node => node.label);
        this.childrenData = childrenData;
        this.children = (childrenData || []).map(child => new Node(child, config, this));
        this.loaded = !config.lazy || this.isLeaf || !util.isEmpty(childrenData);
    }
    get isDisabled() {
        const { data, parent, config } = this;
        const { disabled, checkStrictly } = config;
        const isDisabled = isFunction(disabled) ? disabled(data, this) : !!data[disabled];
        return isDisabled || !checkStrictly && (parent === null || parent === void 0 ? void 0 : parent.isDisabled);
    }
    get isLeaf() {
        const { data, config, childrenData, loaded } = this;
        const { lazy, leaf } = config;
        const isLeaf = isFunction(leaf) ? leaf(data, this) : data[leaf];
        return util.isUndefined(isLeaf)
            ? lazy && !loaded ? false : !Array.isArray(childrenData)
            : !!isLeaf;
    }
    get valueByOption() {
        return this.config.emitPath ? this.pathValues : this.value;
    }
    appendChild(childData) {
        const { childrenData, children } = this;
        const node = new Node(childData, this.config, this);
        if (Array.isArray(childrenData)) {
            childrenData.push(childData);
        }
        else {
            this.childrenData = [childData];
        }
        children.push(node);
        return node;
    }
    calcText(allLevels, separator) {
        const text = allLevels ? this.pathLabels.join(separator) : this.label;
        this.text = text;
        return text;
    }
    broadcast(event, ...args) {
        const handlerName = `onParent${util.capitalize(event)}`;
        this.children.forEach(child => {
            if (child) {
                child.broadcast(event, ...args);
                child[handlerName] && child[handlerName](...args);
            }
        });
    }
    emit(event, ...args) {
        const { parent } = this;
        const handlerName = `onChild${util.capitalize(event)}`;
        if (parent) {
            parent[handlerName] && parent[handlerName](...args);
            parent.emit(event, ...args);
        }
    }
    onParentCheck(checked) {
        if (!this.isDisabled) {
            this.setCheckState(checked);
        }
    }
    onChildCheck() {
        const { children } = this;
        const validChildren = children.filter(child => !child.isDisabled);
        const checked = validChildren.length
            ? validChildren.every(child => child.checked)
            : false;
        this.setCheckState(checked);
    }
    setCheckState(checked) {
        const totalNum = this.children.length;
        const checkedNum = this.children.reduce((c, p) => {
            const num = p.checked ? 1 : (p.indeterminate ? 0.5 : 0);
            return c + num;
        }, 0);
        this.checked = this.loaded && this.children.every(child => child.loaded && child.checked) && checked;
        this.indeterminate = this.loaded && checkedNum !== totalNum && checkedNum > 0;
    }
    doCheck(checked) {
        if (this.checked === checked)
            return;
        const { checkStrictly, multiple } = this.config;
        if (checkStrictly || !multiple) {
            this.checked = checked;
        }
        else {
            this.broadcast('check', checked);
            this.setCheckState(checked);
            this.emit('check');
        }
    }
}

const flatNodes = (nodes, leafOnly) => {
    return nodes.reduce((res, node) => {
        if (node.isLeaf) {
            res.push(node);
        }
        else {
            !leafOnly && res.push(node);
            res = res.concat(flatNodes(node.children, leafOnly));
        }
        return res;
    }, []);
};
class Store {
    constructor(data, config) {
        this.config = config;
        const nodes = (data || []).map(nodeData => new Node(nodeData, this.config));
        this.nodes = nodes;
        this.allNodes = flatNodes(nodes, false);
        this.leafNodes = flatNodes(nodes, true);
    }
    getNodes() {
        return this.nodes;
    }
    getFlattedNodes(leafOnly) {
        return leafOnly ? this.leafNodes : this.allNodes;
    }
    appendNode(nodeData, parentNode) {
        const node = parentNode
            ? parentNode.appendChild(nodeData)
            : new Node(nodeData, this.config);
        if (!parentNode)
            this.nodes.push(node);
        this.allNodes.push(node);
        node.isLeaf && this.leafNodes.push(node);
    }
    appendNodes(nodeDataList, parentNode) {
        nodeDataList.forEach(nodeData => this.appendNode(nodeData, parentNode));
    }
    getNodeByValue(value, leafOnly = false) {
        if (!value && value !== 0)
            return null;
        const nodes = this.getFlattedNodes(leafOnly)
            .filter(node => node.value === value || isEqual__default['default'](node.pathValues, value));
        return nodes[0] || null;
    }
    getSameNode(node) {
        if (!node)
            return null;
        const nodes = this.getFlattedNodes(false)
            .filter(({ value, level }) => node.value === value && node.level === level);
        return nodes[0] || null;
    }
}

const CommonProps = {
    modelValue: [Number, String, Array],
    options: {
        type: Array,
        default: () => [],
    },
    props: {
        type: Object,
        default: () => ({}),
    },
};
const DefaultProps = {
    expandTrigger: exports.ExpandTrigger.CLICK,
    multiple: false,
    checkStrictly: false,
    emitPath: true,
    lazy: false,
    lazyLoad: NOOP,
    value: 'value',
    label: 'label',
    children: 'children',
    leaf: 'leaf',
    disabled: 'disabled',
    hoverThreshold: 500,
};
const useCascaderConfig = (props) => {
    return vue.computed(() => (Object.assign(Object.assign({}, DefaultProps), props.props)));
};

const isLeaf = (el) => !el.getAttribute('aria-owns');
const getSibling = (el, distance) => {
    const { parentNode } = el;
    if (!parentNode)
        return null;
    const siblings = parentNode.querySelectorAll('.el-cascader-node[tabindex="-1"]');
    const index = Array.prototype.indexOf.call(siblings, el);
    return siblings[index + distance] || null;
};
const getMenuIndex = (el) => {
    if (!el)
        return 0;
    const pieces = el.id.split('-');
    return Number(pieces[pieces.length - 2]);
};
const focusNode = el => {
    if (!el)
        return;
    el.focus();
    !isLeaf(el) && el.click();
};
const checkNode = el => {
    if (!el)
        return;
    const input = el.querySelector('input');
    if (input) {
        input.click();
    }
    else if (isLeaf(el)) {
        el.click();
    }
};
const sortByOriginalOrder = (oldNodes, newNodes) => {
    const newNodesCopy = newNodes.slice(0);
    const newIds = newNodesCopy.map(node => node.uid);
    const res = oldNodes.reduce((acc, item) => {
        const index = newIds.indexOf(item.uid);
        if (index > -1) {
            acc.push(item);
            newNodesCopy.splice(index, 1);
            newIds.splice(index, 1);
        }
        return acc;
    }, []);
    res.push(...newNodesCopy);
    return res;
};

var script$2 = vue.defineComponent({
    name: 'ElCascaderPanel',
    components: {
        ElCascaderMenu: script$1,
    },
    props: Object.assign(Object.assign({}, CommonProps), { border: {
            type: Boolean,
            default: true,
        }, renderLabel: Function }),
    emits: [
        constants.UPDATE_MODEL_EVENT,
        constants.CHANGE_EVENT,
        'close',
        'expand-change',
    ],
    setup(props, { emit, slots }) {
        let initialLoaded = true;
        let manualChecked = false;
        const config = useCascaderConfig(props);
        const store = vue.ref(null);
        const menuList = vue.ref([]);
        const checkedValue = vue.ref(null);
        const menus = vue.ref([]);
        const expandingNode = vue.ref(null);
        const checkedNodes = vue.ref([]);
        const isHoverMenu = vue.computed(() => config.value.expandTrigger === exports.ExpandTrigger.HOVER);
        const renderLabelFn = vue.computed(() => props.renderLabel || slots.default);
        const initStore = () => {
            const { options } = props;
            const cfg = config.value;
            manualChecked = false;
            store.value = new Store(options, cfg);
            menus.value = [store.value.getNodes()];
            if (cfg.lazy && util.isEmpty(props.options)) {
                initialLoaded = false;
                lazyLoad(null, () => {
                    initialLoaded = true;
                    syncCheckedValue(false, true);
                });
            }
            else {
                syncCheckedValue(false, true);
            }
        };
        const lazyLoad = (node, cb) => {
            const cfg = config.value;
            node = node || new Node({}, cfg, null, true);
            node.loading = true;
            const resolve = (dataList) => {
                const parent = node.root ? null : node;
                dataList && store.value.appendNodes(dataList, parent);
                node.loading = false;
                node.loaded = true;
                cb && cb(dataList);
            };
            cfg.lazyLoad(node, resolve);
        };
        const expandNode = (node, silent) => {
            var _a;
            const { level } = node;
            const newMenus = menus.value.slice(0, level);
            let newExpandingNode;
            if (node.isLeaf) {
                newExpandingNode = node.pathNodes[level - 2];
            }
            else {
                newExpandingNode = node;
                newMenus.push(node.children);
            }
            if (((_a = expandingNode.value) === null || _a === void 0 ? void 0 : _a.uid) !== (newExpandingNode === null || newExpandingNode === void 0 ? void 0 : newExpandingNode.uid)) {
                expandingNode.value = node;
                menus.value = newMenus;
                !silent && emit('expand-change', (node === null || node === void 0 ? void 0 : node.pathValues) || []);
            }
        };
        const handleCheckChange = (node, checked, emitClose = true) => {
            const { checkStrictly, multiple } = config.value;
            const oldNode = checkedNodes.value[0];
            manualChecked = true;
            !multiple && (oldNode === null || oldNode === void 0 ? void 0 : oldNode.doCheck(false));
            node.doCheck(checked);
            calculateCheckedValue();
            emitClose && !multiple && !checkStrictly && emit('close');
        };
        const getFlattedNodes = (leafOnly) => {
            return store.value.getFlattedNodes(leafOnly);
        };
        const getCheckedNodes = (leafOnly) => {
            return getFlattedNodes(leafOnly)
                .filter(node => node.checked !== false);
        };
        const clearCheckedNodes = () => {
            checkedNodes.value.forEach(node => node.doCheck(false));
            calculateCheckedValue();
        };
        const calculateCheckedValue = () => {
            var _a;
            const { checkStrictly, multiple } = config.value;
            const oldNodes = checkedNodes.value;
            const newNodes = getCheckedNodes(!checkStrictly);
            const nodes = sortByOriginalOrder(oldNodes, newNodes);
            const values = nodes.map(node => node.valueByOption);
            checkedNodes.value = nodes;
            checkedValue.value = multiple ? values : ((_a = values[0]) !== null && _a !== void 0 ? _a : null);
        };
        const syncCheckedValue = (loaded = false, forced = false) => {
            const { modelValue } = props;
            const { lazy, multiple, checkStrictly } = config.value;
            const leafOnly = !checkStrictly;
            if (!initialLoaded ||
                manualChecked ||
                !forced && isEqual__default['default'](modelValue, checkedValue.value))
                return;
            if (lazy && !loaded) {
                const values = util.deduplicate(util.arrayFlat(util.coerceTruthyValueToArray(modelValue)));
                const nodes = values.map(val => store.value.getNodeByValue(val))
                    .filter(node => !!node && !node.loaded && !node.loading);
                if (nodes.length) {
                    nodes.forEach(node => {
                        lazyLoad(node, () => syncCheckedValue(false, forced));
                    });
                }
                else {
                    syncCheckedValue(true, forced);
                }
            }
            else {
                const values = multiple ? util.coerceTruthyValueToArray(modelValue) : [modelValue];
                const nodes = util.deduplicate(values.map(val => store.value.getNodeByValue(val, leafOnly)));
                syncMenuState(nodes, false);
                checkedValue.value = modelValue;
            }
        };
        const syncMenuState = (newCheckedNodes, reserveExpandingState = true) => {
            const { checkStrictly } = config.value;
            const oldNodes = checkedNodes.value;
            const newNodes = newCheckedNodes.filter(node => !!node && (checkStrictly || node.isLeaf));
            const oldExpandingNode = store.value.getSameNode(expandingNode.value);
            const newExpandingNode = reserveExpandingState && oldExpandingNode || newNodes[0];
            if (newExpandingNode) {
                newExpandingNode.pathNodes.forEach(node => expandNode(node, true));
            }
            else {
                expandingNode.value = null;
            }
            oldNodes.forEach(node => node.doCheck(false));
            newNodes.forEach(node => node.doCheck(true));
            checkedNodes.value = newNodes;
            vue.nextTick(scrollToExpandingNode);
        };
        const scrollToExpandingNode = () => {
            if (isServer__default['default'])
                return;
            menuList.value.forEach(menu => {
                const menuElement = menu === null || menu === void 0 ? void 0 : menu.$el;
                if (menuElement) {
                    const container = menuElement.querySelector('.el-scrollbar__wrap');
                    const activeNode = menuElement.querySelector('.el-cascader-node.is-active') ||
                        menuElement.querySelector('.el-cascader-node.in-active-path');
                    scrollIntoView__default['default'](container, activeNode);
                }
            });
        };
        const handleKeyDown = (e) => {
            const target = e.target;
            const { code } = e;
            switch (code) {
                case aria.EVENT_CODE.up:
                case aria.EVENT_CODE.down:
                    const distance = code === aria.EVENT_CODE.up ? -1 : 1;
                    focusNode(getSibling(target, distance));
                    break;
                case aria.EVENT_CODE.left:
                    const preMenu = menuList.value[getMenuIndex(target) - 1];
                    const expandedNode = preMenu === null || preMenu === void 0 ? void 0 : preMenu.$el.querySelector('.el-cascader-node[aria-expanded="true"]');
                    focusNode(expandedNode);
                    break;
                case aria.EVENT_CODE.right:
                    const nextMenu = menuList.value[getMenuIndex(target) + 1];
                    const firstNode = nextMenu === null || nextMenu === void 0 ? void 0 : nextMenu.$el.querySelector('.el-cascader-node[tabindex="-1"]');
                    focusNode(firstNode);
                    break;
                case aria.EVENT_CODE.enter:
                    checkNode(target);
                    break;
                case aria.EVENT_CODE.esc:
                case aria.EVENT_CODE.tab:
                    emit('close');
                    break;
            }
        };
        vue.provide(CASCADER_PANEL_INJECTION_KEY, vue.reactive({
            config,
            expandingNode,
            checkedNodes,
            isHoverMenu,
            renderLabelFn,
            lazyLoad,
            expandNode,
            handleCheckChange,
        }));
        vue.watch([config, () => props.options], initStore, { deep: true, immediate: true });
        vue.watch(() => props.modelValue, () => {
            manualChecked = false;
            syncCheckedValue();
        });
        vue.watch(checkedValue, val => {
            if (!isEqual__default['default'](val, props.modelValue)) {
                emit(constants.UPDATE_MODEL_EVENT, val);
                emit(constants.CHANGE_EVENT, val);
            }
        });
        vue.onBeforeUpdate(() => menuList.value = []);
        vue.onMounted(() => !util.isEmpty(props.modelValue) && syncCheckedValue());
        return {
            menuList,
            menus,
            checkedNodes,
            handleKeyDown,
            handleCheckChange,
            getFlattedNodes,
            getCheckedNodes,
            clearCheckedNodes,
            calculateCheckedValue,
            scrollToExpandingNode,
        };
    },
});

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_cascader_menu = vue.resolveComponent("el-cascader-menu");

  return (vue.openBlock(), vue.createBlock("div", {
    class: [
      'el-cascader-panel',
      _ctx.border && 'is-bordered'
    ],
    onKeydown: _cache[1] || (_cache[1] = (...args) => (_ctx.handleKeyDown && _ctx.handleKeyDown(...args)))
  }, [
    (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.menus, (menu, index) => {
      return (vue.openBlock(), vue.createBlock(_component_el_cascader_menu, {
        key: index,
        ref: item => _ctx.menuList[index] = item,
        index: index,
        nodes: menu
      }, null, 8 /* PROPS */, ["index", "nodes"]))
    }), 128 /* KEYED_FRAGMENT */))
  ], 34 /* CLASS, HYDRATE_EVENTS */))
}

script$2.render = render$2;
script$2.__file = "packages/cascader-panel/src/index.vue";

script$2.install = (app) => {
    app.component(script$2.name, script$2);
};
const _CascaderPanel = script$2;

exports.CASCADER_PANEL_INJECTION_KEY = CASCADER_PANEL_INJECTION_KEY;
exports.CommonProps = CommonProps;
exports.DefaultProps = DefaultProps;
exports.default = _CascaderPanel;
exports.useCascaderConfig = useCascaderConfig;
