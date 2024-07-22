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

import alert from './alert/index.js'
import animateNumber from './animate-number/index.js'
import badge from './badge/index.js'
import block from './block/index.js'
import breadCrumb from './bread-crumb/index.js'
import button from './button/index.js'
import card from './card/index.js'
import cascader from './cascader/index.js'
import checkbox from './checkbox/index.js'
import checkboxGroup from './checkbox-group/index.js'
// import codeDiff from './code-diff/index.js'
import collapse from './collapse/index.js'
import colorPicker from './color-picker/index.js'
import dataManageContainer from './data-manage-container/index.js'
import datePicker from './date-picker/index.js'
import dialog from './dialog/index.js'
import divider from './divider/index.js'
import exception from './exception/index.js'
import form from './form/index.js'
import formContainer from './form-container/index.js'
import fromItem from './form-item/index.js'
import freeLayout from './free-layout/index.js'
import grid from './grid/index.js'
import column from './column/index.js'
import icon from './icon/index.js'
import image from './image/index.js'
import text from './text/index.js'
import input from './input/index.js'
import inputTextarea from './input-textarea/index.js'
import link from './link/index.js'
import pagination from './pagination/index.js'
import paragraph from './paragraph/index.js'
// import popover from './popover/index.js'
import process from './process/index.js'
import progress from './progress/index.js'
import radioGroup from './radio-group/index.js'
import rate from './rate/index.js'
import searchSelect from './search-select/index.js'
import select from './select/index.js'

import sideslider from './sideslider/index.js'
import slider from './slider/index.js'
import steps from './steps/index.js'
import swiper from './swiper/index.js'
import switcher from './switcher/index.js'
import tab from './tab/index.js'
import tabPanel from './tab-panel/index.js'
import table from './table/index.js'
import tagInput from './tag-input/index.js'
import timePicker from './time-picker/index.js'
import timeline from './timeline/index.js'
import transfer from './transfer/index.js'
import tree from './tree/index.js'
import upload from './upload/index.js'

import chartsLine from './charts-line/index.js'
import chartsBar from './charts-bar/index.js'
import chartsPie from './charts-pie/index.js'
import bkChartsLine from './bk-charts-line/index.js'
import bkChartsBar from './bk-charts-bar/index.js'
import bkChartsPie from './bk-charts-pie/index.js'
import bkChartsRadar from './bk-charts-radar/index.js'
import bkChartsBubble from './bk-charts-bubble/index.js'
import bkChartsScatter from './bk-charts-scatter/index.js'

// 这个对象里组件的顺序与页面左侧待选组件区的顺序一致，从左至右，从上至下
// 是为了要保证 Array.from(new Set(bkComponents.map(item => item.group))) 得到的结果是
// ['布局', '基础', '表单', '导航', '数据', '反馈', '图表']
const bkComponents = Object.seal([
    grid,
    column,
    freeLayout,
    formContainer,
    paragraph,
    button,
    cascader,
    breadCrumb,
    animateNumber,
    alert,
    badge,
    block,
    card,
    checkbox,
    checkboxGroup,
    // codeDiff,
    collapse,
    colorPicker,
    dataManageContainer,
    datePicker,
    dialog,
    divider,
    exception,
    form,
    fromItem,
    icon,
    image,
    text,
    inputTextarea,
    input,
    link,
    pagination,
    // popover,
    process,
    progress,
    radioGroup,
    rate,
    searchSelect,
    select,
    sideslider,
    slider,
    steps,
    swiper,
    switcher,
    tab,
    tabPanel,
    table,
    tagInput,
    timePicker,
    timeline,
    transfer,
    tree,
    upload,
    chartsLine,
    chartsBar,
    chartsPie,
    bkChartsLine,
    bkChartsBar,
    bkChartsPie,
    bkChartsRadar,
    bkChartsBubble,
    bkChartsScatter
])

export const bkVue3ComponentList = bkComponents.filter((item) => {
    if (item.type.includes('bk-') && !item.type.includes('chart')) {
        return true
    }
})
