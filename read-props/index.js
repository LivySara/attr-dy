import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

// 获取当前模块文件的路径
const __filename = fileURLToPath(import.meta.url);

// 获取当前模块文件所在的目录
const __dirname = path.dirname(__filename);
// 假定你的文件路径如下
const filePath = path.join(__dirname, 'data.txt');
console.log(filePath, 'lll')
// 读取文件内容
fs.readFile(filePath, 'utf8', (err, data) => {
console.log(data, ';;;;+++')
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // 解析文件内容为JavaScript对象
  // 用Function构造函数来安全地解析并执行对象字面量
  let jsonObject;
  try {
    jsonObject = new Function('return ' + data)();
  } catch (error) {
    console.error('Error parsing custom format:', error);
    return;
  }

  // 动态添加键值对
  jsonObject.props.newKey = {
    type: 'string',
    val: 'newValue',
    displayName: '新属性',
    tips: '这是一个新添加的属性'
  };

  // 将修改后的对象转换回自定义格式字符串
  const updatedData = stringifyCustomFormat(jsonObject);

  // 写回文件
  fs.writeFile(filePath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }

    console.log('File successfully updated!');
  });
});

// 自定义字符串化函数
function stringifyCustomFormat(obj) {
  const replacer = (key, value) => {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };
  const jsonString = JSON.stringify(obj, replacer, 4);
  return jsonString
    .replace(/"(\w+)":/g, '$1:')
    .replace(/'/g, "'");
}