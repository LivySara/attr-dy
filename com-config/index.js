import { readdir } from "fs/promises";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";

// 获取当前模块文件的路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块文件所在的目录
const __dirname = dirname(__filename);

// 读取目录并动态导入模块
const importModulesRecursively = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const modules = {};

  for (const entry of entries) {
    const fullPath = join(dir, `${entry.name}/index.js`);
    // 动态导入模块
    const moduleName = entry.name;
    const moduleURL = pathToFileURL(fullPath).href;
    const module = await import(moduleURL);
    modules[moduleName] = module.default;
  }
  return modules;
};
let modules = null
const main = async () => {
  const modulesDir = join(__dirname, "bk");
  modules = await importModulesRecursively(modulesDir);
};

main().catch(console.error);

export default modules