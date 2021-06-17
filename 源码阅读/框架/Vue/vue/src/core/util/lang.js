/* @flow */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/

/**
 * Check if a string starts with $ or _
 */
export function isReserved (str: string): boolean {
  const c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * Parse simple path.
 */
//unicodeRegExp.source获取正则对象的内容，字符串格式
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)
//返回值是一个函数，函数执行结果是一个属性值
export function parsePath (path: string): any {
  //path仅能包含指定的字符,除这些字符外不允许存在其他字符
  if (bailRE.test(path)) {
    return
  }
  //用“.”分隔成数组，没有点则数组为1项
  const segments = path.split('.')
  //返回一个函数，函数执行时，如果传递了一个对象，则一级一级获取对象的属性值，获取到最后一层属性值返回
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
