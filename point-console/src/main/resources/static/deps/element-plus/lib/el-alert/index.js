'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

const TYPE_CLASSES_MAP = {
    'success': 'el-icon-success',
    'warning': 'el-icon-warning',
    'error': 'el-icon-error',
};
var script = vue.defineComponent({
    name: 'ElAlert',
    props: {
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'info',
        },
        closable: {
            type: Boolean,
            default: true,
        },
        closeText: {
            type: String,
            default: '',
        },
        showIcon: Boolean,
        center: Boolean,
        effect: {
            type: String,
            default: 'light',
            validator: (value) => ['light', 'dark'].indexOf(value) > -1,
        },
    },
    emits: ['close'],
    setup(props, ctx) {
        const visible = vue.ref(true);
        const typeClass = vue.computed(() => `el-alert--${props.type}`);
        const iconClass = vue.computed(() => TYPE_CLASSES_MAP[props.type] || 'el-icon-info');
        const isBigIcon = vue.computed(() => props.description || ctx.slots.default ? 'is-big' : '');
        const isBoldTitle = vue.computed(() => props.description || ctx.slots.default ? 'is-bold' : '');
        const close = evt => {
            visible.value = false;
            ctx.emit('close', evt);
        };
        return {
            visible,
            typeClass,
            iconClass,
            isBigIcon,
            isBoldTitle,
            close,
        };
    },
});

const _hoisted_1 = { class: "el-alert__content" };
const _hoisted_2 = {
  key: 1,
  class: "el-alert__description"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.Transition, { name: "el-alert-fade" }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode("div", {
        class: ["el-alert", [_ctx.typeClass, _ctx.center ? 'is-center' : '', 'is-' + _ctx.effect]],
        role: "alert"
      }, [
        (_ctx.showIcon)
          ? (vue.openBlock(), vue.createBlock("i", {
              key: 0,
              class: ["el-alert__icon", [ _ctx.iconClass, _ctx.isBigIcon ]]
            }, null, 2 /* CLASS */))
          : vue.createCommentVNode("v-if", true),
        vue.createVNode("div", _hoisted_1, [
          (_ctx.title || _ctx.$slots.title)
            ? (vue.openBlock(), vue.createBlock("span", {
                key: 0,
                class: ["el-alert__title", [ _ctx.isBoldTitle ]]
              }, [
                vue.renderSlot(_ctx.$slots, "title", {}, () => [
                  vue.createTextVNode(vue.toDisplayString(_ctx.title), 1 /* TEXT */)
                ])
              ], 2 /* CLASS */))
            : vue.createCommentVNode("v-if", true),
          (_ctx.$slots.default || !!_ctx.description)
            ? (vue.openBlock(), vue.createBlock("p", _hoisted_2, [
                vue.renderSlot(_ctx.$slots, "default", {}, () => [
                  vue.createTextVNode(vue.toDisplayString(_ctx.description), 1 /* TEXT */)
                ])
              ]))
            : vue.createCommentVNode("v-if", true),
          (_ctx.closable)
            ? (vue.openBlock(), vue.createBlock("i", {
                key: 2,
                class: ["el-alert__closebtn", { 'is-customed': _ctx.closeText !== '', 'el-icon-close': _ctx.closeText === '' }],
                onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.close && _ctx.close(...args)))
              }, vue.toDisplayString(_ctx.closeText), 3 /* TEXT, CLASS */))
            : vue.createCommentVNode("v-if", true)
        ])
      ], 2 /* CLASS */), [
        [vue.vShow, _ctx.visible]
      ])
    ]),
    _: 3 /* FORWARDED */
  }))
}

script.render = render;
script.__file = "packages/alert/src/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Alert = script;

exports.default = _Alert;
