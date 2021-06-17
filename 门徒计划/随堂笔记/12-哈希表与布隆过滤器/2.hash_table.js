// 哈希表冲突解决 - 公共溢出区

class HashTable {

    cnt = 0 //记录哈希表存储的元素数量，用于判断是否需要扩容（大于总容量的75%时就需要寇蓉）

    buff = new Set()//公共缓冲区（不知道红黑树如何实现，先用Set代替）

    constructor(n = 100) {
        this.data = new Array(n);
        this.flag = new Array(n);//用于记录每个位置是否存储了数据
    }

    insert(s) {
        let ind = this.hash_func(s) % this.data.length;//计算哈希值
        if (this.flag[ind] == false) {
            this.data[ind] = s;
            this.flag[ind] = true;
            this.cnt += 1;
            if (this.cnt * 100 > this.data.length * 75) {//装填因子：0.75
                this.expand();
            }
        } else {//已经有值，放入公共溢出区
            this.buff.add(s);
        }
        return;
    }

    expand() { // 扩容操作
        let n = this.data.length * 2;
        let h = new HashTable(n);
        // 把原哈希表中的元素插入到扩容后的哈希表中
        for (let i = 0; i < this.data.length; i++) {
            if (this.flag[ind] == false) continue;
            h.insert(this.data[i]);
        }
        // 把公共溢出区的元素也插入到扩容后的哈希表中
        for (let x of this.buff) {
            h.insert(x);
        }
        this.data = h.data;
        this.flag = h.flag;
        this.buff = h.buff;
        this.cnt = h.cnt;
        return;
    }

    find(s) {
        let ind = this.hash_func(s) % this.data.length;
        if (this.flag[ind] == false) return false;
        if (this.data[ind] === s) return true;//如果当前元素等于s，返回true
        //否则需要到公共溢出区中进行查找
        return this.buff.has(s);
    }

    hash_func(s) { //哈希函数，根据源值经过一系列计算，产生哈希值的方法
        // BKDR Hash
        let seed = 131, hash = 0;
        for (let i = 0; s[i]; i++) {
            hash = hash * seed + s[i].codePointAt();
        }
        return hash & 0x7fffffff;//将一个数转为正整数
    }
}

// test
let hashTable = new HashTable();
hashTable.insert('hello')
hashTable.insert('world');
hashTable.insert('javascript');
console.log(hashTable.find('world'))