"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 约定参数：
 * cmd：用于设置命令行语句
 * config：用于指定命令行语句配置文件
 */
var util = require("util"); //node内置的工具包
var path = require("path"); //node内置的工具包
var getParams = require('./utils').getParams; //自己的工具
var childProcess = require('child_process'); //子进程（node中都是用子进程来处理任务的）
var exec = util.promisify(childProcess.exec); // 这里把exec promisify，exec执行返回一个promise
function execute(cmd) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, stdout, stderr;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('执行"' + cmd + '"命令...');
                    return [4 /*yield*/, exec(cmd)];
                case 1:
                    _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                    console.log('success!');
                    console.log(stdout);
                    return [2 /*return*/, stdout];
            }
        });
    });
}
//传入一个包含多个命令字符串的数组，依次执行
function mulExec(command) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, command_1, cmd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, command_1 = command;
                    _a.label = 1;
                case 1:
                    if (!(_i < command_1.length)) return [3 /*break*/, 4];
                    cmd = command_1[_i];
                    return [4 /*yield*/, execute(cmd)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var args = getParams();
//获取命令行参数中的cmd属性的值（-cmd=后面到单词边界之间的内容）
if (args.cmd) {
    mulExec(args.cmd.split(','));
}
//通过读取配置文件的方式执行多个命令
if (args.config) {
    //process.cwd()获取当前Node.js进程的当前工作目录
    var configPath = path.resolve(process.cwd(), args.config) + '--';
    try {
        var config = require(configPath);
        mulExec(config.command);
    }
    catch (error) {
        console.error('加载配置文件出错\r\n', '工作目录：' + process.cwd(), "\r\n设置文件的地址:" + configPath);
    }
}
