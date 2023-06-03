import fs from "fs";
import path from "path";

import { PACKAGE_NAME } from "./const";

export const renameDir = (oldPath: string, newDirName: string) => {
  const stat = fs.statSync(oldPath);
  if (stat.isDirectory()) {
    const newPath = path.join(path.dirname(oldPath), newDirName);
    fs.renameSync(oldPath, newPath);

    console.info(`[${PACKAGE_NAME}] 目录重命名: ${oldPath} => ${newPath}`);
  }
};

export const renameFiles = (dir: string, oldExt: string, newExt: string) => {
  let currentPath: string;

  const files = fs.readdirSync(dir);
  for (const k in files) {
    currentPath = path.join(dir, files[k]);
    const stat = fs.statSync(currentPath);

    if (stat.isDirectory()) {
      renameFiles(currentPath, oldExt, newExt);
    } else if (stat.isFile()) {
      if (path.extname(currentPath) === oldExt) {
        const newPath = path.join(
          path.dirname(currentPath),
          `${path.basename(currentPath, oldExt)}${newExt}`
        );
        fs.renameSync(currentPath, newPath);

        console.info(
          `[${PACKAGE_NAME}] 文件重命名: ${currentPath} => ${newPath}`
        );
      }
    }
  }
};

export const removeFile = (dir: string, fileName: string) => {
  const filePath = path.join(dir, fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.info(`[${PACKAGE_NAME}] 文件删除: ${filePath}`);
  }
};
