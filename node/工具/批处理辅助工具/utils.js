"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParams = void 0;
// util.ts
/**
 * 获取命令行的参数
 * @param prefix 前缀
 */
function getParams(prefix) {
    if (prefix === void 0) { prefix = "-"; }
    return process.argv.slice(2).reduce(function (obj, it) {
        var sp = it.split("=");
        var key = sp[0].replace(prefix, "");
        obj[key] = sp[1] || true;
        return obj;
    }, {});
}
exports.getParams = getParams;
