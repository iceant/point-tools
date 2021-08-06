'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var locale = require('../locale');
var ElButton = require('../el-button');
var ElCheckbox = require('../el-checkbox');
var ElCheckboxGroup = require('../el-checkbox-group');
var ElInput = require('../el-input');
var constants = require('../utils/constants');
var form = require('../el-form');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElButton__default = /*#__PURE__*/_interopDefaultLegacy(ElButton);
var ElCheckbox__default = /*#__PURE__*/_interopDefaultLegacy(ElCheckbox);
var ElCheckboxGroup__default = /*#__PURE__*/_interopDefaultLegacy(ElCheckboxGroup);
var ElInput__default = /*#__PURE__*/_interopDefaultLegacy(ElInput);

const CHECKED_CHANGE_EVENT = 'checked-change';
const useCheck = (props, panelState, emit) => {
    const labelProp = vue.computed(() => props.props.label || 'label');
    const keyProp = vue.computed(() => props.props.key || 'key');
    const disabledProp = vue.computed(() => props.props.disabled || 'disabled');
    const filteredData = vue.computed(() => {
        return props.data.filter(item => {
            if (typeof props.filterMethod === 'function') {
                return props.filterMethod(panelState.query, item);
            }
            else {
                const label = item[labelProp.value] || item[keyProp.value].toString();
                return label.toLowerCase().includes(panelState.query.toLowerCase());
            }
        });
    });
    const checkableData = vue.computed(() => {
        return filteredData.value.filter(item => !item[disabledProp.value]);
    });
    const checkedSummary = vue.computed(() => {
        const checkedLength = panelState.checked.length;
        const dataLength = props.data.length;
        const { noChecked, hasChecked } = props.format;
        if (noChecked && hasChecked) {
            return checkedLength > 0
                ? hasChecked
                    .replace(/\${checked}/g, checkedLength.toString())
                    .replace(/\${total}/g, dataLength.toString())
                : noChecked.replace(/\${total}/g, dataLength.toString());
        }
        else {
            return `${checkedLength}/${dataLength}`;
        }
    });
    const isIndeterminate = vue.computed(() => {
        const checkedLength = panelState.checked.length;
        return checkedLength > 0 && checkedLength < checkableData.value.length;
    });
    const updateAllChecked = () => {
        const checkableDataKeys = checkableData.value.map(item => item[keyProp.value]);
        panelState.allChecked = checkableDataKeys.length > 0 && checkableDataKeys.every(item => panelState.checked.includes(item));
    };
    const handleAllCheckedChange = (value) => {
        panelState.checked = value ? checkableData.value.map(item => item[keyProp.value]) : [];
    };
    vue.watch(() => panelState.checked, (val, oldVal) => {
        updateAllChecked();
        if (panelState.checkChangeByUser) {
            const movedKeys = val
                .concat(oldVal)
                .filter(v => !val.includes(v) || !oldVal.includes(v));
            emit(CHECKED_CHANGE_EVENT, val, movedKeys);
        }
        else {
            emit(CHECKED_CHANGE_EVENT, val);
            panelState.checkChangeByUser = true;
        }
    });
    vue.watch(checkableData, () => {
        updateAllChecked();
    });
    vue.watch(() => props.data, () => {
        const checked = [];
        const filteredDataKeys = filteredData.value.map(item => item[keyProp.value]);
        panelState.checked.forEach(item => {
            if (filteredDataKeys.includes(item)) {
                checked.push(item);
            }
        });
        panelState.checkChangeByUser = false;
        panelState.checked = checked;
    });
    vue.watch(() => props.defaultChecked, (val, oldVal) => {
        if (oldVal && val.length === oldVal.length && val.every(item => oldVal.includes(item)))
            return;
        const checked = [];
        const checkableDataKeys = checkableData.value.map(item => item[keyProp.value]);
        val.forEach(item => {
            if (checkableDataKeys.includes(item)) {
                checked.push(item);
            }
        });
        panelState.checkChangeByUser = false;
        panelState.checked = checked;
    }, {
        immediate: true,
    });
    return {
        labelProp,
        keyProp,
        disabledProp,
        filteredData,
        checkableData,
        checkedSummary,
        isIndeterminate,
        updateAllChecked,
        handleAllCheckedChange,
    };
};

var script = vue.defineComponent({
    name: 'ElTransferPanel',
    components: {
        ElCheckboxGroup: ElCheckboxGroup__default['default'],
        ElCheckbox: ElCheckbox__default['default'],
        ElInput: ElInput__default['default'],
        OptionContent: ({ option }) => option,
    },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        optionRender: Function,
        placeholder: String,
        title: String,
        filterable: Boolean,
        format: Object,
        filterMethod: Function,
        defaultChecked: Array,
        props: Object,
    },
    emits: [CHECKED_CHANGE_EVENT],
    setup(props, { emit, slots }) {
        const panelState = vue.reactive({
            checked: [],
            allChecked: false,
            query: '',
            inputHover: false,
            checkChangeByUser: true,
        });
        const { labelProp, keyProp, disabledProp, filteredData, checkedSummary, isIndeterminate, handleAllCheckedChange, } = useCheck(props, panelState, emit);
        const hasNoMatch = vue.computed(() => {
            return panelState.query.length > 0 && filteredData.value.length === 0;
        });
        const inputIcon = vue.computed(() => {
            return panelState.query.length > 0 && panelState.inputHover
                ? 'circle-close'
                : 'search';
        });
        const hasFooter = vue.computed(() => !!slots.default()[0].children.length);
        const clearQuery = () => {
            if (inputIcon.value === 'circle-close') {
                panelState.query = '';
            }
        };
        const { checked, allChecked, query, inputHover, checkChangeByUser, } = vue.toRefs(panelState);
        return {
            labelProp,
            keyProp,
            disabledProp,
            filteredData,
            checkedSummary,
            isIndeterminate,
            handleAllCheckedChange,
            checked,
            allChecked,
            query,
            inputHover,
            checkChangeByUser,
            hasNoMatch,
            inputIcon,
            hasFooter,
            clearQuery,
            t: locale.t,
        };
    },
});

const _hoisted_1 = { class: "el-transfer-panel" };
const _hoisted_2 = { class: "el-transfer-panel__header" };
const _hoisted_3 = {
  key: 0,
  class: "el-transfer-panel__footer"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = vue.resolveComponent("el-checkbox");
  const _component_el_input = vue.resolveComponent("el-input");
  const _component_option_content = vue.resolveComponent("option-content");
  const _component_el_checkbox_group = vue.resolveComponent("el-checkbox-group");

  return (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    vue.createVNode("p", _hoisted_2, [
      vue.createVNode(_component_el_checkbox, {
        modelValue: _ctx.allChecked,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.allChecked = $event)),
        indeterminate: _ctx.isIndeterminate,
        onChange: _ctx.handleAllCheckedChange
      }, {
        default: vue.withCtx(() => [
          vue.createTextVNode(vue.toDisplayString(_ctx.title) + " ", 1 /* TEXT */),
          vue.createVNode("span", null, vue.toDisplayString(_ctx.checkedSummary), 1 /* TEXT */)
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["modelValue", "indeterminate", "onChange"])
    ]),
    vue.createVNode("div", {
      class: ['el-transfer-panel__body', _ctx.hasFooter ? 'is-with-footer' : '']
    }, [
      (_ctx.filterable)
        ? (vue.openBlock(), vue.createBlock(_component_el_input, {
            key: 0,
            modelValue: _ctx.query,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (_ctx.query = $event)),
            class: "el-transfer-panel__filter",
            size: "small",
            placeholder: _ctx.placeholder,
            onMouseenter: _cache[4] || (_cache[4] = $event => (_ctx.inputHover = true)),
            onMouseleave: _cache[5] || (_cache[5] = $event => (_ctx.inputHover = false))
          }, {
            prefix: vue.withCtx(() => [
              vue.createVNode("i", {
                class: ['el-input__icon', 'el-icon-' + _ctx.inputIcon],
                onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.clearQuery && _ctx.clearQuery(...args)))
              }, null, 2 /* CLASS */)
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["modelValue", "placeholder"]))
        : vue.createCommentVNode("v-if", true),
      vue.withDirectives(vue.createVNode(_component_el_checkbox_group, {
        modelValue: _ctx.checked,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => (_ctx.checked = $event)),
        class: [{ 'is-filterable': _ctx.filterable }, "el-transfer-panel__list"]
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.filteredData, (item) => {
            return (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
              key: item[_ctx.keyProp],
              class: "el-transfer-panel__item",
              label: item[_ctx.keyProp],
              disabled: item[_ctx.disabledProp]
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_option_content, {
                  option: _ctx.optionRender(item)
                }, null, 8 /* PROPS */, ["option"])
              ]),
              _: 2 /* DYNAMIC */
            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["label", "disabled"]))
          }), 128 /* KEYED_FRAGMENT */))
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["modelValue", "class"]), [
        [vue.vShow, !_ctx.hasNoMatch && _ctx.data.length > 0]
      ]),
      vue.withDirectives(vue.createVNode("p", { class: "el-transfer-panel__empty" }, vue.toDisplayString(_ctx.hasNoMatch ? _ctx.t('el.transfer.noMatch') : _ctx.t('el.transfer.noData')), 513 /* TEXT, NEED_PATCH */), [
        [vue.vShow, _ctx.hasNoMatch || _ctx.data.length === 0]
      ])
    ], 2 /* CLASS */),
    (_ctx.hasFooter)
      ? (vue.openBlock(), vue.createBlock("p", _hoisted_3, [
          vue.renderSlot(_ctx.$slots, "default")
        ]))
      : vue.createCommentVNode("v-if", true)
  ]))
}

script.render = render;
script.__file = "packages/transfer/src/transfer-panel.vue";

const useComputedData = (props) => {
    const propsKey = vue.computed(() => props.props.key);
    const dataObj = vue.computed(() => {
        return props.data.reduce((o, cur) => (o[cur[propsKey.value]] = cur) && o, {});
    });
    const sourceData = vue.computed(() => {
        return props.data.filter(item => !props.modelValue.includes(item[propsKey.value]));
    });
    const targetData = vue.computed(() => {
        if (props.targetOrder === 'original') {
            return props.data.filter(item => props.modelValue.includes(item[propsKey.value]));
        }
        else {
            return props.modelValue.reduce((arr, cur) => {
                const val = dataObj.value[cur];
                if (val) {
                    arr.push(val);
                }
                return arr;
            }, []);
        }
    });
    return {
        propsKey,
        sourceData,
        targetData,
    };
};

const LEFT_CHECK_CHANGE_EVENT = 'left-check-change';
const RIGHT_CHECK_CHANGE_EVENT = 'right-check-change';
const useCheckedChange = (checkedState, emit) => {
    const onSourceCheckedChange = (val, movedKeys) => {
        checkedState.leftChecked = val;
        if (movedKeys === undefined)
            return;
        emit(LEFT_CHECK_CHANGE_EVENT, val, movedKeys);
    };
    const onTargetCheckedChange = (val, movedKeys) => {
        checkedState.rightChecked = val;
        if (movedKeys === undefined)
            return;
        emit(RIGHT_CHECK_CHANGE_EVENT, val, movedKeys);
    };
    return {
        onSourceCheckedChange,
        onTargetCheckedChange,
    };
};

const UPDATE_MODEL_EVENT = 'update:modelValue';

const useMove = (props, checkedState, propsKey, emit) => {
    const _emit = (value, type, checked) => {
        emit(UPDATE_MODEL_EVENT, value);
        emit(CHANGE_EVENT, value, type, checked);
    };
    const addToLeft = () => {
        const currentValue = props.modelValue.slice();
        checkedState.rightChecked.forEach(item => {
            const index = currentValue.indexOf(item);
            if (index > -1) {
                currentValue.splice(index, 1);
            }
        });
        _emit(currentValue, 'left', checkedState.rightChecked);
    };
    const addToRight = () => {
        let currentValue = props.modelValue.slice();
        const itemsToBeMoved = props.data
            .filter((item) => {
            const itemKey = item[propsKey.value];
            return checkedState.leftChecked.includes(itemKey) && !props.modelValue.includes(itemKey);
        })
            .map(item => item[propsKey.value]);
        currentValue = props.targetOrder === 'unshift'
            ? itemsToBeMoved.concat(currentValue)
            : currentValue.concat(itemsToBeMoved);
        _emit(currentValue, 'right', checkedState.leftChecked);
    };
    return {
        addToLeft,
        addToRight,
    };
};

const CHANGE_EVENT = 'change';
var script$1 = vue.defineComponent({
    name: 'ElTransfer',
    components: {
        TransferPanel: script,
        ElButton: ElButton__default['default'],
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        titles: {
            type: Array,
            default: () => [],
        },
        buttonTexts: {
            type: Array,
            default: () => [],
        },
        filterPlaceholder: {
            type: String,
            default: '',
        },
        filterMethod: Function,
        leftDefaultChecked: {
            type: Array,
            default: () => [],
        },
        rightDefaultChecked: {
            type: Array,
            default: () => [],
        },
        renderContent: Function,
        modelValue: {
            type: Array,
            default: () => [],
        },
        format: {
            type: Object,
            default: () => ({}),
        },
        filterable: {
            type: Boolean,
            default: false,
        },
        props: {
            type: Object,
            default: () => ({
                label: 'label',
                key: 'key',
                disabled: 'disabled',
            }),
        },
        targetOrder: {
            type: String,
            default: 'original',
            validator: (val) => {
                return ['original', 'push', 'unshift'].includes(val);
            },
        },
    },
    emits: [
        constants.UPDATE_MODEL_EVENT,
        CHANGE_EVENT,
        LEFT_CHECK_CHANGE_EVENT,
        RIGHT_CHECK_CHANGE_EVENT,
    ],
    setup(props, { emit, slots }) {
        const elFormItem = vue.inject(form.elFormItemKey, {});
        const checkedState = vue.reactive({
            leftChecked: [],
            rightChecked: [],
        });
        const { propsKey, sourceData, targetData, } = useComputedData(props);
        const { onSourceCheckedChange, onTargetCheckedChange, } = useCheckedChange(checkedState, emit);
        const { addToLeft, addToRight, } = useMove(props, checkedState, propsKey, emit);
        const leftPanel = vue.ref(null);
        const rightPanel = vue.ref(null);
        const clearQuery = (which) => {
            if (which === 'left') {
                leftPanel.value.query = '';
            }
            else if (which === 'right') {
                rightPanel.value.query = '';
            }
        };
        const hasButtonTexts = vue.computed(() => props.buttonTexts.length === 2);
        const leftPanelTitle = vue.computed(() => props.titles[0] || locale.t('el.transfer.titles.0'));
        const rightPanelTitle = vue.computed(() => props.titles[1] || locale.t('el.transfer.titles.1'));
        const panelFilterPlaceholder = vue.computed(() => props.filterPlaceholder || locale.t('el.transfer.filterPlaceholder'));
        vue.watch(() => props.modelValue, val => {
            var _a;
            (_a = elFormItem.formItemMitt) === null || _a === void 0 ? void 0 : _a.emit('el.form.change', val);
        });
        const optionRender = vue.computed(() => option => {
            if (props.renderContent)
                return props.renderContent(vue.h, option);
            if (slots.default)
                return slots.default({ option });
            return vue.h('span', option[props.props.label] || option[props.props.key]);
        });
        return Object.assign(Object.assign({ sourceData,
            targetData,
            onSourceCheckedChange,
            onTargetCheckedChange,
            addToLeft,
            addToRight }, vue.toRefs(checkedState)), { hasButtonTexts,
            leftPanelTitle,
            rightPanelTitle,
            panelFilterPlaceholder,
            clearQuery,
            optionRender });
    },
});

const _hoisted_1$1 = { class: "el-transfer" };
const _hoisted_2$1 = { class: "el-transfer__buttons" };
const _hoisted_3$1 = /*#__PURE__*/vue.createVNode("i", { class: "el-icon-arrow-left" }, null, -1 /* HOISTED */);
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = /*#__PURE__*/vue.createVNode("i", { class: "el-icon-arrow-right" }, null, -1 /* HOISTED */);

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_transfer_panel = vue.resolveComponent("transfer-panel");
  const _component_el_button = vue.resolveComponent("el-button");

  return (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [
    vue.createVNode(_component_transfer_panel, {
      ref: "leftPanel",
      data: _ctx.sourceData,
      "option-render": _ctx.optionRender,
      placeholder: _ctx.panelFilterPlaceholder,
      title: _ctx.leftPanelTitle,
      filterable: _ctx.filterable,
      format: _ctx.format,
      "filter-method": _ctx.filterMethod,
      "default-checked": _ctx.leftDefaultChecked,
      props: _ctx.props,
      onCheckedChange: _ctx.onSourceCheckedChange
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "left-footer")
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["data", "option-render", "placeholder", "title", "filterable", "format", "filter-method", "default-checked", "props", "onCheckedChange"]),
    vue.createVNode("div", _hoisted_2$1, [
      vue.createVNode(_component_el_button, {
        type: "primary",
        class: ['el-transfer__button', _ctx.hasButtonTexts ? 'is-with-texts' : ''],
        disabled: _ctx.rightChecked.length === 0,
        onClick: _ctx.addToLeft
      }, {
        default: vue.withCtx(() => [
          _hoisted_3$1,
          (_ctx.buttonTexts[0] !== undefined)
            ? (vue.openBlock(), vue.createBlock("span", _hoisted_4, vue.toDisplayString(_ctx.buttonTexts[0]), 1 /* TEXT */))
            : vue.createCommentVNode("v-if", true)
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["class", "disabled", "onClick"]),
      vue.createVNode(_component_el_button, {
        type: "primary",
        class: ['el-transfer__button', _ctx.hasButtonTexts ? 'is-with-texts' : ''],
        disabled: _ctx.leftChecked.length === 0,
        onClick: _ctx.addToRight
      }, {
        default: vue.withCtx(() => [
          (_ctx.buttonTexts[1] !== undefined)
            ? (vue.openBlock(), vue.createBlock("span", _hoisted_5, vue.toDisplayString(_ctx.buttonTexts[1]), 1 /* TEXT */))
            : vue.createCommentVNode("v-if", true),
          _hoisted_6
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["class", "disabled", "onClick"])
    ]),
    vue.createVNode(_component_transfer_panel, {
      ref: "rightPanel",
      data: _ctx.targetData,
      "option-render": _ctx.optionRender,
      placeholder: _ctx.panelFilterPlaceholder,
      filterable: _ctx.filterable,
      format: _ctx.format,
      "filter-method": _ctx.filterMethod,
      title: _ctx.rightPanelTitle,
      "default-checked": _ctx.rightDefaultChecked,
      props: _ctx.props,
      onCheckedChange: _ctx.onTargetCheckedChange
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "right-footer")
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["data", "option-render", "placeholder", "filterable", "format", "filter-method", "title", "default-checked", "props", "onCheckedChange"])
  ]))
}

script$1.render = render$1;
script$1.__file = "packages/transfer/src/index.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};
const _Transfer = script$1;

exports.default = _Transfer;
