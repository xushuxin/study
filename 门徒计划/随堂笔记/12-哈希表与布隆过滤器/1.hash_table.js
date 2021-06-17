// 哈希表冲突解决 - 开放定址法

class HashTable {

    cnt = 0 //记录哈希表存储的元素数量，用于判断是否需要扩容（大于总容量的75%时就需要寇蓉）
    constructor(n = 100) {
        this.data = new Array(n);
        this.flag = new Array(n);//用于记录每个位置是否存储了数据
    }

    insert(s) {
        let ind = this.hash_func(s) % this.data.length;//计算哈希值
        console.log(this.hash_func(s), this.data.length, this.hash_func(s) % this.data.length)
        ind = this.recalc_ind(ind, s);//冲突处理
        if (this.flag[ind] == false) {
            this.data[ind] = s;
            this.flag[ind] = true;
            this.cnt += 1;
            if (this.cnt * 100 > this.data.length * 75) {
                this.expand();
            }
        }
        return;
    }

    expand() { // 扩容操作
        let n = this.data.length * 2;
        let h = new HashTable(n);
        for (let i = 0; i < this.data.length; i++) {
            if (this.flag[ind] == false) continue;
            h.insert(this.data[i]);
        }
        this.data = h.data;
        this.flag = h.flag;
        this.cnt = h.cnt;
        return;
    }

    find(s) {
        console.log('find', this.data);
        let ind = this.hash_func(s) % this.data.length;
        ind = this.recalc_ind(ind, s);
        return !!this.flag[ind];
    }

    hash_func(s) { //哈希函数，根据源值经过一系列计算，产生哈希值的方法
        // BKDR Hash
        let seed = 131, hash = 0;
        for (let i = 0; s[i]; i++) {
            hash = hash * seed + s[i].codePointAt();
        }
        console.log(hash, seed, s[i])
        return hash & 0x7fffffff;//将一个数转为正整数
    }

    /* 开放定址法解决哈希冲突 */
    recalc_ind(ind, s) {
        let t = 1;
        //当要插入的位置已经存储了值，并且和当前要插入的值不同，我们要去查找到可插入位置
        while (this.flag[ind] && this.data[ind] != s) {
            ind += t * t;//平方探测法
            t += 1;
            ind %= this.data.length;//对数组长度取余，可得到合法的数组索引
        }
        return ind;
    }
}

// test
let hashTable = new HashTable();
hashTable.insert('hello')
hashTable.insert('world');
hashTable.insert('javascript');
console.log(hashTable.find('world'))