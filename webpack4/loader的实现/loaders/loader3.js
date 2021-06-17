function loader(resource) {
  console.log(3);
  return resource;
}
//pitch先于loader函数执行
loader.pitch = function () {
  console.log("loader-pitch3");
};
module.exports = loader;
