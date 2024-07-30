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
    name: 'sideslider',
    type: 'bk-sideslider',
    displayName: '侧栏',
    icon: 'bk-drag-dialog',
    group: '反馈',
    order: 5,
    interactiveShow: true,
    document: 'https://magicbox.bk.tencent.com/static_api/v3/components_vue/2.0/example/index.html#/sideslider',
    events: [
        {
            displayName: '显示组件',
            name: 'show',
            tips: '显示组件后调用该事件函数，暂无事件回调参数'
        },
        {
            displayName: '关闭组件',
            name: 'hidden',
            tips: '关闭组件后调用该事件函数，暂无事件回调参数'
        },
        {
            displayName: '关闭组件后动画结束',
            name: 'animation-end',
            tips: '关闭组件后动画结束时调用该事件函数，暂无事件回调参数'
        }
    ],
    renderStyles: {
        display: 'inline-block'
    },
    props: {
        'is-show': {
            type: 'boolean',
            displayName: '是否显示侧栏',
            tips: '是否显示组件，请在右侧选择变量并绑定Boolean类型变量以正常使用（值类型的常量，无法控制其打开或关闭)',
            val: false,
            staticValue: true, // 静态值，表示只是代码和UI改变，画布内的值不变
            modifiers: ['sync'],
            asdasda: '',
            disableVariableType: ['expression'] // 不兼容的类型
        },
        'title': {
            type: 'string',
            val: '自定义组件标题',
            displayName: '标题内容'
        },
        'quick-close': {
            type: 'boolean',
            val: false,
            displayName: '是否可点击遮罩关闭侧栏',
            tips: '是否支持点击遮罩关闭组件'
        },
        'show-mask': {
            type: 'boolean',
            val: false,
            staticValue: false,
            displayName: '遮罩是否出现',
            tips: '是否允许出现遮罩'
        },
        'width': {
            type: 'number',
            val: 400,
            displayName: '侧栏宽度',
            tips: '组件的宽度'
        },
        'direction': {
            type: 'string',
            options: ['left', 'right'],
            val: 'right',
            displayName: '侧栏出现方向'
        }
    },
    slots: {
        content: {
            name: ['layout'],
            type: ['render-block']
        }
    }
}
