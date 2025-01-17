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
    name: 'upload',
    type: 'bk-upload',
    displayName: '文件上传',
    icon: 'bk-drag-upload',
    group: '表单',
    order: 1,
    document: 'https://magicbox.bk.tencent.com/static_api/v3/components_vue/2.0/example/index.html#/upload',
    events: [
        {
            displayName: '所有文件上传完毕',
            name: 'on-done',
            tips: '所有文件上传完毕后调用该事件函数，事件回调参数 (fileList: Array)'
        },
        {
            displayName: '文件上传进行',
            name: 'on-progress',
            tips: '文件上传进行时调用该事件函数，事件回调参数 (event: Event, file: Object, fileList: Array)'
        },
        {
            displayName: '文件上传成功',
            name: 'on-success',
            tips: '文件上传成功后调用该事件函数，事件回调参数 (file: Object, fileList: Array)'
        },
        {
            displayName: '文件上传失败',
            name: 'on-error',
            tips: '文件上传失败后调用该事件函数，事件回调参数 (file: Object, fileList: Array)'
        },
        {
            displayName: '文件上传个数超出限制',
            name: 'on-exceed',
            tips: '文件上传个数超出限制后调用该事件函数，事件回调参数 (file: Object, fileList: Array)'
        },
        {
            displayName: '文件上传成功后点击删除文件',
            name: 'on-delete',
            tips: '文件上传成功后，点击删除文件时调用该事件函数，事件回调参数 (file: Object, fileList: Array)'
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
    props: {
        accept: {
            type: 'string',
            val: '',
            displayName: '接受的文件类型',
            tips: '可选的文件类型，参考 input 元素的 accept 属性'
        },
        url: {
            type: 'string',
            val: 'https://jsonplaceholder.typicode.com/posts/',
            displayName: '服务地址',
            tips: '上传服务地址'
        },
        'handle-res-code': {
            type: 'function',
            displayName: '处理返回码的函数',
            tips: '处理上传请求返回码的函数，参数为 response，本函数需要返回 true 或 false 来判断是否上传成功',
            val: function (res) {
                if (res && res.code === 0) {
                    return true
                }
                return false
            }
        },
        'form-data-attributes': {
            type: 'array',
            val: [],
            displayName: '自定义上传属性',
            tips: '自定义上传属性，格式为<br>[{ name: \'KEY\', value: \'VALUE\' }, ...]'
        },
        // array object
        header: {
            type: ['array', 'object'],
            // type 为数组时才需要 defaultVals 配置
            defaultVals: [[], {}],
            val: [],
            displayName: '请求头设置',
            tips: '请求头 { name: " ", value: " " }'
        },
        name: {
            type: 'string',
            val: 'upload_file',
            displayName: '文件的名字',
            tips: '后台读取文件的 key'
        },
        // Number, Object 限制上传文件体积 { maxFileSize: 1, maxImgSize: 1 }
        size: {
            type: ['number', 'object'],
            defaultVals: [5, {}],
            val: 5,
            displayName: '限制文件大小',
            tips: '限制上传文件体积 { maxFileSize: 1, maxImgSize: 1 }'
        },
        tip: {
            type: 'string',
            displayName: '提示信息',
            tips: '提示信息'
        },
        'delay-time': {
            type: 'number',
            val: 0,
            displayName: '上传完后列表消失时间',
            tips: '上传完毕后列表消失时间'
        },
        multiple: {
            type: 'boolean',
            val: true,
            displayName: '是否支持多选',
            tips: '是否支持多选'
        },
        'with-credentials': {
            type: 'boolean',
            val: false,
            displayName: '是否允许带上cookie',
            tips: '是否允许带上 cookie'
        }
    }
}
