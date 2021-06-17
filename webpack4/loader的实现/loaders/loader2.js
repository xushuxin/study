function loader(resource) {
  console.log(2);
  return resource;
}
//pitch先于loader函数执行
loader.pitch = function () {
  console.log("loader-pitch2");
  // return "a";//
};
module.exports = loader;
