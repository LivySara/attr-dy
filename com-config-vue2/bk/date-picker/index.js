/**
 * Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
 * Copyright (C) 2017-2019 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

export default {
    name: 'date-picker',
    type: 'bk-date-picker',
    displayName: '日期选择',
    icon: 'bk-drag-date',
    group: '表单',
    order: 1,
    document: 'https://magicbox.bk.tencent.com/static_api/v3/components_vue/2.0/example/index.html#/date-picker',
    events: [
        {
            displayName: '日期改变',
            name: 'change',
            tips: '日期改变时调用该事件函数，事件回调参数 (date: Date | String | Array, type: String)'
        },
        {
            displayName: '点击日历面板上清空图标',
            name: 'clear',
            tips: '日历面板点击清空时调用该事件函数，暂无事件回调参数'
        },
        {
            displayName: '日历面板弹出或收起时',
            name: 'open-change',
            tips: '日历面板弹出或收起时调用该事件函数，事件回调参数 (state: Boolean)'
        },
        {
            displayName: '选中日期后点击确定按钮',
            name: 'pick-success',
            tips: '日历面板选择日期后，点击确定选择成功时调用该事件函数，暂无事件回调参数'
        },
        {
            displayName: '快捷键改变',
            name: 'shortcut-change',
            tips: '快捷项改变时调用该事件函数，事件回调参数 (value: Object, index: Number)'
        }
    ],
    styles: [
        'position',
        {
            name: 'size',
            exclude: ['height', 'maxHeight', 'minHeight']
        },
        'margin',
        'pointer',
        'opacity'
    ],
    renderStyles: {
        display: 'inline-block',
        width: '300px',
        verticalAlign: 'middle'
    },
    directives: [
        {
            type: 'v-model',
            prop: 'value'
        }
    ],
    props: {
        // 日历组件的值，可以是 Date 或字符串或数组，只有在 daterange 和 datetimerange 类型时才支持数组
        value: {
            type (renderProps) {
                return ['daterange', 'datetimerange'].includes(renderProps?.type?.renderValue) ? 'array' : 'string'
            },
            regExp: /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
            // 正则校验错误时的提示文本，默认值为"格式错误，请重新输入"
            regErrorText: '请输入正确的日期格式，如"2020-01-01"',
            displayName: '日历值',
            tips: '日期，如"2020-01-01"'
        },
        placeholder: {
            type: 'string',
            displayName: '空值时提示文案',
            tips: '占位文案'
        },
        type: {
            type: 'string',
            options: ['date', 'daterange', 'datetime', 'datetimerange', 'month', 'year'],
            val: 'date',
            clearable: false,
            trigger: 'change-format',
            displayName: '日历类型'
        },
        format: {
            type: 'string',
            options: ['yyyy-MM-dd', 'yyyy-MM', 'yyyy', 'yyyy-MM-dd HH:mm:ss', 'HH:mm:ss', 'mm:ss'],
            val: 'yyyy-MM-dd',
            listener: 'change-format',
            displayName: '日期值格式'
        },
        'font-size': {
            type: 'string',
            options: ['normal', 'medium', 'large'],
            val: 'normal',
            displayName: '日期值字体大小',
            tips: '设置组件主体内容字体大小：normal--12px；medium--14px；large--16px'
        },
        placement: {
            type: 'string',
            options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
            val: 'bottom-start',
            displayName: '日历面板出现的位置',
            tips: '日历面板出现的位置'
        },
        behavior: {
            type: 'string',
            options: ['normal', 'simplicity'],
            val: 'normal',
            displayName: '显示风格设置',
            tips: '设置simplicity为简约风格'
        },
        editable: {
            type: 'boolean',
            val: true,
            displayName: '是否编辑'
        },
        disabled: {
            type: 'boolean',
            val: false,
            displayName: '是否禁用'
        },
        readonly: {
            type: 'boolean',
            val: false,
            displayName: '是否只读'
        },
        clearable: {
            type: 'boolean',
            val: true,
            displayName: '是否清空'
        }
    }
}
