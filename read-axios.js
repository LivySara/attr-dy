/**
 * axios 无法获取 动态加载的网页内容
 */

import main from "./com-config/index.js";
import axios from "axios";
import cheerio from "cheerio";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

// 获取当前模块文件的路径
const __filename = fileURLToPath(import.meta.url);

// 获取当前模块文件所在的目录
const __dirname = path.dirname(__filename);

async function getSingleEntireProps(pathName, item) {
  const { document, name, props } = item;
  const url = `https://bkui-vue.woa.com/${getUrlTail(document) || name}`;
  // 获取页面内容
  const res = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });
  console.log(res.data, ";;;");
  const $ = cheerio.load(res.data);
  let table = null;
  const commonBoxes = $(".common-box").has(".header-title");
  // 使用正则表达式筛选出文本内容以“属性”结尾的 .common-box 元素
  const selectedBoxes = commonBoxes.filter((index, element) => {
    const headerTitle = $(element).find(".header-title").text().trim();
    return /属性$/.test(headerTitle);
  });
  // 输出筛选出的元素
  selectedBoxes.each((index, element) => {
    !index ? (table = $(element).first().find("table")) : null;
  });
  const formatProps = Object.keys(props).map((item) => camelCase(item));
  // 提取表格数据
  const tableData = {};
  //   !table && console.log(`${name}属性`);
  table &&
    table.find("tbody tr").map((_, row) => {
      const columns = $(row)
        .find("td")
        .map((_, col) => $(col).text().trim())
        .get();
      const key = camelCase(columns[0]);
      if (
        !formatProps.includes(key) &&
        !(
          key.includes("modelValue") &&
          (formatProps.includes("modelValue") || formatProps.includes("vModel"))
        )
      ) {
        tableData[key] = {
          type: columns[2],
          options: [columns[3]],
          val: columns[4],
          displayName: columns[1],
          tips: columns[1],
        };
      }
    });
  JSON.stringify(tableData) !== "{}" && writePropsStr(pathName, tableData);
}

const camelCase = function (name) {
  return name.replace(/([\-]+(.))/g, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  });
};

const getUrlTail = function (url) {
  if (!url) return false;
  const regex = /\/([^\/]+)$/;
  const match = url.match(regex);

  if (match && match[0]) {
    return match[0].replace("/", "");
  } else {
    return false;
  }
};

async function writePropsStr(pathName, propObj) {
  try {
    const filePath = path.join(__dirname, `com-config/bk/${pathName}/index.js`); // 替换为你的文件路径
    const data = await fs.readFile(filePath, "utf8");
    const updatedContent = matchProps2(data, propObj);
    await fs.writeFile(filePath, updatedContent, "utf8");
  } catch (error) {
    console.log(error);
  }
}

function matchProps2(data, propObj) {
  // 找到 'props:' 的位置
  const propsIndex = data.indexOf("props:");
  if (propsIndex === -1) {
    console.log("No props object found.");
    return;
  }

  // 找到第一个大括号的位置
  const firstBraceIndex = data.indexOf("{", propsIndex);
  if (firstBraceIndex === -1) {
    console.log("Malformed props object.");
    return;
  }

  const closingBraceIndex = findClosingBraceIndex(data, firstBraceIndex);
  if (closingBraceIndex === -1) {
    console.log("Malformed props object.");
    return;
  }
  let tailPropContent = "";
  const propList = Object.keys(propObj);
  propList.forEach((key, index) => {
    tailPropContent +=
      insertProp(key, propObj[key]) +
      `${index !== propList.length - 1 ? ",\n" : ""}`;
  });
  let prefixContent = data.substring(0, closingBraceIndex);
  const bigBracketPos = prefixContent.lastIndexOf("}");
  let newPrefixContent = "\n";
  if (prefixContent[bigBracketPos + 1] !== ",") {
    newPrefixContent = prefixContent.substring(0, bigBracketPos + 1) + ",\n";
  }
  const newData =
    newPrefixContent +
    tailPropContent +
    prefixContent.substring(bigBracketPos + 1) +
    data.substring(closingBraceIndex);
  return newData;
}
// 递归函数寻找闭合大括号匹配
function findClosingBraceIndex(str, startIndex) {
  let braceCount = 0;
  for (let i = startIndex; i < str.length; i++) {
    if (str[i] === "{") braceCount++;
    if (str[i] === "}") braceCount--;
    if (braceCount === 0) return i;
  }
  return -1; // Malformed object
}
// 插入缺少的属性
function insertProp(prop, val) {
  let propStr = `${prop}`;
  if (propStr.includes("-")) {
    propStr = `'${propStr}'`;
  }
  const tabHalf = " ".repeat(4);
  const tab = tabHalf.repeat(2);
  const tabOneHalf = tabHalf.repeat(3);
  return `${tab}${propStr}: {\n${tabOneHalf}type: '${val.type}',\n${tabOneHalf}options: '${val.options}',\n${tabOneHalf}val: '${val.val}',\n${tabOneHalf}displayName: '${val.displayName}',\n${tabOneHalf}tips: '${val.tips}'\n${tab}}`;
}
(async () => {
  const bkVue3ComponentList = await main().catch(console.error);
  Object.keys(bkVue3ComponentList).forEach(async (key) => {
    const item = bkVue3ComponentList[key];
    if (item.name === "search-select") {
      if (item.type.includes("bk-") && !item.type.includes("chart")) {
        await getSingleEntireProps(key, item);
      }
    }
  });
})();

