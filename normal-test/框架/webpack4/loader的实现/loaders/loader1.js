function loader(resource) {
  console.log(1);
  return resource;
}
//pitch先于loader函数执行
loader.pitch = function () {
  console.log("loader-pitch1");
};
module.exports = loader;
