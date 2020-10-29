// 检测数据类型的方法封装
(function() {
  var class2type = {};
  var toString = class2type.toString;

  [
    "Boolean",
    "Number",
    "String",
    "Symbol",
    "BigInt",
    "Function",
    "Array",
    "Date",
    "RegExp",
    "Object",
    "Error"
  ].forEach(function(name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

  function toType(obj) {
    if (obj == null) {
      return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[toString.call(obj)] || "object" :
      typeof obj;
  }
  window.toType = toType;
})();