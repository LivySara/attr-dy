export default {
    name: 'textarea',
    type: 'bk-input',
    displayName: '文本框',
    icon: 'bk-drag-input',
    group: '表单',
    order: 2,
    document: 'https://magicbox.bk.tencent.com/static_api/v3/components_vue/2.0/example/index.html#/input',
    events: [
        {
            displayName: '文本框内容变化',
            name: 'change',
            tips: '文本框内容变化时调用该事件函数，事件回调参数 (value: String, event: Event)'
        },
        {
            displayName: '文本框输入',
            name: 'input',
            tips: '文本框输入时调用该事件函数，事件回调参数 (value: String, event: Event)'
        },
        {
            displayName: '文本框聚焦',
            name: 'focus',
            tips: '文本框获取焦点时调用该事件函数，事件回调参数 (value: String, event: Event)'
        },
        {
            displayName: '文本框失焦',
            name: 'blur',
            tips: '文本框失去焦点时调用该事件函数，事件回调参数 (value: String, event: Event)'
        },
        {
            displayName: '文本框输入按下键盘',
            name: 'keypress',
            tips: '文本框输入按下键盘时调用该事件函数，事件回调参数 (value: String, event: Event)'
        },
        {
            displayName: '文本框输入按下键盘',
            name: 'keydown',
            tips: '文本框输入按下键盘时调用该事件函数，事件回调参数 (value: String, event: Event)'
        },
        {
            displayName: '文本框输入按下键盘后松开',
            name: 'keyup',
            tips: '文本框输入按下键盘按键松开时调用该事件函数，事件回调参数 (value: String, event: Event)'
        },
        {
            displayName: '文本框聚焦后按下回车',
            name: 'enter',
            tips: '文本框获取焦点时，按下回车时调用该事件函数，事件回调参数 (value: String, event: Event)'
        },
        {
            displayName: '文本框粘贴内容',
            name: 'paste',
            tips: '文本框粘贴内容时调用该事件函数，事件回调参数 (value: String, event: Event)'
        },
        {
            displayName: '点击文本框上清除图标',
            name: 'clear',
            tips: '点击文本框的清除图标时调用该事件函数，事件回调参数 (value: String, event: Event)'
        },
        {
            displayName: '点击文本框上左图标',
            name: 'left-icon-click',
            tips: '点击配置的左图标时调用该事件函数，事件回调参数 (value: String, event: Event)'
        },
        {
            displayName: '点击文本框上右图标',
            name: 'right-icon-click',
            tips: '点击配置的右图标时调用该事件函数，事件回调参数 (value: String, event: Event)'
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
        verticalAlign: 'middle',
        width: '300px'
    },
    directives: [
        {
            type: 'v-model',
            prop: 'value'
        }
    ],
    props: {
        value: {
            type: 'text',
            val: '',
            displayName: '输入框内容'
        },
        type: {
            type: 'hidden',
            val: 'textarea',
            displayName: '输入框类型',
            tips: '输入框样式'
        },
        'font-size': {
            type: 'string',
            options: ['normal', 'medium', 'large'],
            val: 'normal',
            displayName: '输入框内容字体大小',
            tips: '设置输入框内容字体大小：normal--12px；medium--14px；large--16px'
        },
        placeholder: {
            type: 'text',
            displayName: '空值时提示文案',
            tips: '空白提示'
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
        maxlength: {
            type: 'number',
            displayName: '最大输入长度',
            tips: '最大输入长度'
        },
        minlength: {
            type: 'number',
            displayName: '最小输入长度',
            tips: '最小输入长度'
        },
        name: {
            type: 'string',
            displayName: '输入框名称',
            tips: 'html 原生属性 name'
        },
        'left-icon': {
            type: 'icon',
            displayName: '左侧图标'
        },
        'right-icon': {
            type: 'icon',
            displayName: '右侧图标'
        }
    }
    
}
