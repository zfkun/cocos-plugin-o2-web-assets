import { IBuildTaskOption, BuildHook, IBuildResult } from "../@types";
import { PACKAGE_NAME } from "./const";
import { removeFile, renameDir, renameFiles } from "./helpers";

interface IOptions {
  removeHtmlFile: boolean;
  removeCssFile: boolean;
  renameAssetsToRemote: boolean;
  renameCconbExtension: string;
}

interface ITaskOptions extends IBuildTaskOption {
  packages: {
    [PACKAGE_NAME]: IOptions;
  };
}

export const throwError: BuildHook.throwError = true;

export const load: BuildHook.load = async function () {
  console.log(`[${PACKAGE_NAME}] hook流程开始`);
  const allAssets = await Editor.Message.request("asset-db", "query-assets");
  console.info(`[${PACKAGE_NAME}] 所有资源: `, allAssets);
};

export const onAfterBuild: BuildHook.onAfterBuild = async function (
  options: ITaskOptions,
  result: IBuildResult
) {
  const {
    removeHtmlFile,
    removeCssFile,
    renameAssetsToRemote,
    renameCconbExtension,
  } = options.packages[PACKAGE_NAME];

  if (removeHtmlFile) {
    console.log(`[${PACKAGE_NAME}] 清理 *.html 文件: `, result.paths.dir);
    removeFile(result.paths.dir, "index.html");
  }

  if (removeCssFile) {
    console.log(`[${PACKAGE_NAME}] 清理 *.css 文件: `, result.paths.dir);
    removeFile(result.paths.dir, "style.css");
  }

  if (renameCconbExtension) {
    console.log(
      `[${PACKAGE_NAME}] 处理 .cconb 文件重命名: `,
      renameCconbExtension
    );
    renameFiles(result.paths.assets, ".cconb", renameCconbExtension);
  }

  if (renameAssetsToRemote) {
    console.log(`[${PACKAGE_NAME}] 处理资源目录改名: `, result.paths.assets);
    renameDir(result.paths.assets, "remote");
  }
};

export const unload: BuildHook.unload = async function () {
  console.log(`[${PACKAGE_NAME}] hook流程结束`);
};

export const onError: BuildHook.onError = async function (options, result) {
  console.warn(`${PACKAGE_NAME} hook流程发生错误: `, options, result);
};
