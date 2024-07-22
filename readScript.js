const fs = require("fs").promises;
const XLSX = require("xlsx");
const path = require("path");

(async () => {
  const directoryPath = path.join(__dirname, "bk"); // 替换为你的文件夹路径

  try {
    const filesAndFolders = await fs.readdir(directoryPath);
    const subdirectories = [];
    for (const name of filesAndFolders) {
      const fullPath = path.join(directoryPath, name);
      const stats = await fs.lstat(fullPath);
      if (stats.isDirectory()) {
        subdirectories.push(name);
      }
    }
    const supplyComName = getTableProps();
    subdirectories.forEach(async (pathName, index) => {
      if (supplyComName.has(pathName)) {
        const filePath = path.join(__dirname, `bk/${pathName}/index.js`); // 替换为你的文件路径
        const data = await fs.readFile(filePath, "utf8");
        const updatedContent = matchProps2(data, supplyComName.get(pathName));
        await fs.writeFile(filePath, updatedContent, 'utf8');
      }
    });
  } catch (err) {
    console.error("Error reading directory:", err);
  }
})();

// 获取props:{}中大括号内容
// 方法一
function matchProps(data, pathName) {
  // /props:\s*\{([^\{\}]*?(\{[^\{\}]*\}[^\{\}]*?)*)\}/
  // /props:\s*\{[^]*?(\{[^]*?\}[^]*?)*\}/
  // /props:\s*({[\s\S]*?})\s*}/
  const propsMatch = data.match(/props:\s*({[\s\S]*?})\s*}/);
  // console.log(data, ';;')
  // console.log(propsMatch[1], "kkk");
  if (propsMatch && propsMatch[0]) {
    let propsString = propsMatch[0];

    // 去掉 "props: " 前缀
    propsString = propsString
      .replace(/^props:\s*/, "")
      .replace(/'/g, '"')
      .replace(/(\w+):/g, '"$1":')
      .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "")
      .replace(/\/(.*?)\/([gimsuy]*)/g, (match) => `"${match}"`);

    console.log("props field not found", pathName);
  } else {
    console.log("props field not found", pathName);
  }
}
// 方法二
function matchProps2(data, propList) {
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
  let tailPropContent = ''
  propList.forEach((item, index) => {
    tailPropContent += insertProp(item) + `${index !== propList.length - 1 ? ',\n' : ''}`
  })
  let prefixContent = data.substring(0, closingBraceIndex);
  const bigBracketPos = prefixContent.lastIndexOf('}')
  let newPrefixContent = '\n'
  if(prefixContent[bigBracketPos+1] !== ',') {
    newPrefixContent = prefixContent.substring(0, bigBracketPos+1) + ',\n'
  }
  const newData = newPrefixContent + tailPropContent + prefixContent.substring(bigBracketPos+1) + data.substring(closingBraceIndex)
  return newData
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
function insertProp(prop) {
  let propStr = `${prop}`
  if(propStr.includes('-')) {
    propStr = `'${propStr}'`
  }
  const tabHalf = ' '.repeat(4);
  const tab = tabHalf.repeat(2)
  const tabOneHalf = tabHalf.repeat(3)
  return `${tab}${propStr}: {\n${tabOneHalf}type: '',\n${tabOneHalf}val: '',\n${tabOneHalf}displayName: '',\n${tabOneHalf}tips: ''\n${tab}}`;
}
// 获取需要补充组件属性
function getTableProps() {
  // 读取 Excel 文件
  const workbook = XLSX.readFile(path.join(__dirname, "vue3_table.xlsx"));

  // 获取第一个工作表的名称
  const sheetName = workbook.SheetNames[0];

  // 获取工作表对象
  const sheet = workbook.Sheets[sheetName];

  // 获取工作表的范围
  const range = XLSX.utils.decode_range(sheet["!ref"]);

  // 获取合并单元格信息
  const merges = sheet["!merges"] || [];
  // console.log(merges);
  // 存储合并单元格的映射
  const mergeMap = {};

  // 解析合并单元格，将起始单元格内容扩展到整个合并区域
  for (const merge of merges) {
    const startCell = XLSX.utils.encode_cell({ c: merge.s.c, r: merge.s.r });
    const startValue = sheet[startCell] ? sheet[startCell].v : null;

    for (let rowIndex = merge.s.r; rowIndex <= merge.e.r; rowIndex++) {
      for (let colIndex = merge.s.c; colIndex <= merge.e.c; colIndex++) {
        const cellRef = XLSX.utils.encode_cell({ c: colIndex, r: rowIndex });
        mergeMap[cellRef] = startValue;
      }
    }
  }
  // console.log(mergeMap);

  // 要读取的列（例如，第2列，索引从0开始，也就是B列）
  const targetColumnIndex = 1;

  // 存储列数据的数组
  const map = new Map();

  // 遍历工作表的所有行
  for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
    if (rowIndex === 0) continue;
    // 获取组件名
    const cellAddressOne = { c: targetColumnIndex, r: rowIndex };
    const cellRefOne = XLSX.utils.encode_cell(cellAddressOne);
    const comNameCell = sheet[cellRefOne] || {
      v: mergeMap[cellRefOne] || null,
    }; // 从表或合并映射中获取内容
    // 获取属性
    const cellAddressTwo = { c: 2, r: rowIndex };
    const cellRefTwo = XLSX.utils.encode_cell(cellAddressTwo);
    const propNameCell = sheet[cellRefTwo]; // 从表或合并映射中获取内容
    // 组件名 标准化
    let comName = removeChineseCharacters(comNameCell.v);
    comName = camelCaseToSnakeCase(comName);

    if (!map.has(comName)) {
      map.set(comName, [propNameCell.v]);
    } else {
      map.get(comName).push(propNameCell.v);
    }
  }
  return map;
}
function removeChineseCharacters(str) {
  // 匹配汉字的正则表达式
  const chineseCharRegex = /[\u4e00-\u9fa5]/g;
  // 使用空字符串替换所有匹配的汉字
  return str.replace(chineseCharRegex, "");
}
function camelCaseToSnakeCase(str) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}
