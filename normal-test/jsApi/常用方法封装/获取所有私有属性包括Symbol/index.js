// 获取所有的私有属性(可迭代的)，包含Symbol私有属性
function getOwnPropertys(obj) {
  if (obj == null) return [];
  return [
    ...Object.keys(obj),
    ...Object.getOwnPropertySymbols(obj)
  ];
};