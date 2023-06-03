import { BuildPlugin } from "../@types";
import { PACKAGE_NAME } from "./const";

export const load: BuildPlugin.load = function () {
  console.debug(`${PACKAGE_NAME} builder流程开始`);
};

export const unload: BuildPlugin.load = function () {
  console.debug(`${PACKAGE_NAME} builder流程结束`);
};

export const configs: BuildPlugin.Configs = {
  "web-mobile": {
    hooks: "./hooks",
    doc: "editor/publish/custom-build-plugin.html",
    options: {
      removeHtmlFile: {
        label: `i18n:${PACKAGE_NAME}.options.removeHtmlFile`,
        description: `i18n:${PACKAGE_NAME}.options.removeHtmlFile`,
        default: true,
        render: {
          ui: "ui-checkbox",
        },
        verifyRules: ["required"],
      },
      removeCssFile: {
        label: `i18n:${PACKAGE_NAME}.options.removeCssFile`,
        description: `i18n:${PACKAGE_NAME}.options.removeCssFile`,
        default: true,
        render: {
          ui: "ui-checkbox",
        },
        verifyRules: ["required"],
      },
      renameAssetsToRemote: {
        label: `i18n:${PACKAGE_NAME}.options.renameAssetsToRemote`,
        description: `i18n:${PACKAGE_NAME}.options.renameAssetsToRemote`,
        default: true,
        render: {
          ui: "ui-checkbox",
        },
        verifyRules: ["required"],
      },
      renameCconbExtension: {
        label: `i18n:${PACKAGE_NAME}.options.renameCconbExtension`,
        description: `i18n:${PACKAGE_NAME}.options.renameCconbExtension`,
        default: ".cconb.bin",
        render: {
          ui: "ui-select",
          items: [
            {
              label: `i18n:${PACKAGE_NAME}.options.renameCconbExtensionToBin`,
              value: ".cconb.bin",
            },
            {
              label: `i18n:${PACKAGE_NAME}.options.noRenameCconbExtension`,
              value: "",
            },
          ],
        },
        verifyRules: ["required"],
      },
    },
  },
};

// export const assetHandlers: BuildPlugin.AssetHandlers = "./asset-handlers";
