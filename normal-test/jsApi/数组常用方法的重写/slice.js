Array.prototype.slice = function slice(start, end) {
  if (!start) start = 0;
  if (start < 0) start = this.length + start;
  if (start > this.length) return [];
  if (!end) end = this.length;
  if (end < 0) end = this.length + end;
  if (end > this.length) end = this.length;
  var arr = new Array(end - start);
  for (var i = start; i < end; i++) {
    if (this[i]) arr[i] = this[i];
  }
  return arr;
}

// test
var arr = {
  0: '0',
  2: '1',
  4: '3',
  length: 2
}
console.log([].slice.call(arr));
console.log([].slice.call(arr, 1));
console.log([].slice.call(arr, 2));
console.log([].slice.call(arr, -1));
console.log([].slice.call(arr, -2));