import { bkVue3ComponentList } from "./bk/index.js";
import puppeteer from "puppeteer";
import cheerio from "cheerio";

async function getSingleEntireProps(item, index) {
  const browser = await puppeteer.launch({
    headless: true, // 启用无头模式
    timeout: 60000,
  });
  const page = await browser.newPage();
  const { document, name, props } = item;
  const url = `https://bkui-vue.woa.com/${getUrlTail(document) || name}`;
  await page.goto(url, { waitUntil: "networkidle0" }); // 替换为你要读取的页面网址

  // 获取页面内容
  const content = await page.content();
  const $ = cheerio.load(content);
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
  !table && console.log(`${name}属性`)
  table && table.find("tbody tr").map((_, row) => {
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
  // console.log(`${name + "->" + index} 缺失的属性：`);
  // console.log(tableData);

  await browser.close();
}

bkVue3ComponentList.forEach(async (item, index) => {
  // if (item.name === "search-select") {
  await getSingleEntireProps(item, index);
  // }
});

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
