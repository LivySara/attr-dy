import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import prettier from "prettier";
// import tableConfig from "./com-config/bk/table/index.js";

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tableConfigPath = path.join(__dirname, "./com-config-vue3/bk/table/index.js");

// 网页 URL
const url = "https://bkui-vue.woa.com/table";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    // 获取页面内容
    const html = await page.content();
    const $ = cheerio.load(html);

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
    // 解析组件属性表格
    const extractedProperties = {};
    const formatProps = Object.keys(tableConfig.props).map((item) =>
      camelCase(item)
    );
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
            (key.includes("modelValue") || key.includes("vModel")) &&
            formatProps.includes("modelValue")
          )
        ) {
          const opVal = [];
          opVal.push(columns[3]);
          extractedProperties[key] = {
            type: columns[2].toLocaleLowerCase(),
            options: opVal,
            val: columns[4]?.replace(/'/g, '"'),
            displayName: columns[1].replace(/\s+/g, ""),
            tips: columns[1].replace(/\s+/g, ""),
          };
        }
      });

    // 比对属性配置，找出缺少的部分
    const missingProperties = {};
    Object.keys(extractedProperties).forEach((extractedKey) => {
      if (!formatProps.includes(extractedKey)) {
        missingProperties[extractedKey] = extractedProperties[extractedKey];
      }
    });

    // 读取原始配置文件内容
    const originalConfigContent = fs.readFileSync(tableConfigPath, "utf8");

    // // 将缺少的属性添加到原始配置对象的 props 部分
    // Object.assign(tableConfig.props, missingProperties);

    // // 提取原始 props 部分
    // const originalPropsMatch = originalConfigContent.match(
    //   /props\s*:\s*\{([\s\S]*?)\n\s*\}/
    // );
    // const originalPropsContent = originalPropsMatch
    //   ? originalPropsMatch[1]
    //   : "";

    // 生成新的 props 内容
    const newPropsContent = `export default ${JSON.stringify(missingProperties, null, 2)};\n`;
    // // 插入缺少的属性到 props 对象末尾
    // const updatedConfigContent = originalConfigContent.replace(
    //   /(\n\s*props\s*:\s*\{[\s\S]*?)(\n\s*\})/,
    //   `$1,\n${newPropsContent}$2`
    // );

    // // 合并原始和新增的 props 内容
    // const combinedPropsContent = originalPropsContent + ",\n" + newPropsContent;

    // // 使用正则表达式替换 props 部分
    // const updatedConfigContent = originalConfigContent.replace(
    //   /props\s*:\s*\{([\s\S]*?)\n\s*\}/,
    //   `props: {\n${combinedPropsContent}\n}`
    // );

    // 使用 Prettier 格式化新属性部分
    const formattedContent = await prettier.format(newPropsContent, {
      parser: "babel",
      ...(await prettier.resolveConfig(tableConfigPath)),
    });

    // // 写回更新后的配置文件内容
    fs.writeFileSync(tableConfigPath, formattedContent, "utf8");

    // console.log("Updated with missing properties.", updatedConfigContent);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
})();

const camelCase = function (name) {
  return name.replace(/([\-]+(.))/g, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  });
};
