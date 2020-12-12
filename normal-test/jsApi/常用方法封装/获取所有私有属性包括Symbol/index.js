// 获取所有的私有属性(可枚举的)，包含Symbol私有属性
function getOwnProperties(obj) {
  if (obj == null) return [];
  return [
    ...Object.keys(obj),
    ...Object.getOwnPropertySymbols(obj)
  ];
};