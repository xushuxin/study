// util.ts
/**
 * 获取命令行的参数
 * @param prefix 前缀
 */
export function getParams(prefix = "-"): { [k: string]: string | true } {
    
    return process.argv.slice(2).reduce((obj, it) => {
        const sp = it.split("=");
        const key = sp[0].replace(prefix, "");
        obj[key] = sp[1] || true;
        return obj;
    }, {} as ReturnType<typeof getParams>);
    
}