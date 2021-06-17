// 哈希表冲突解决 - 链式地址法

// 创建一个链表
class Node {
    next = null;
    data = null;
    constructor(data) {
        this.data = data;
    }

    insert(node) {
        node.next = this.next;
        this.next = node;
        return;
    }
}

class HashTable {

    cnt = 0 //记录哈希表存储的元素数量，用于判断是否需要扩容

    constructor(n = 100) {
        this.data = new Array(n);
    }

    insert(s) {
        let ind = this.hash_func(s) % this.data.length;//计算哈希值
        let p = this.data[ind];
        //遍历链表，查找s
        while (p.next && p.next.data !== s) p = p.next;
        // 如果链表中没有找到s，则将s作为一个节点插入链表
        if (p.next === null) {
            p.insert(new Node(s));
            this.cnt += 1;
            if (this.cnt > this.data.length * 3) this.expand();//装填因子设置为3
        }
        return;
    }

    expand() { // 扩容操作
        let n = this.data.length * 2;
        let h = new HashTable(n);
        // 把原哈希表中的元素插入到扩容后的哈希表中
        for (let i = 0; i < this.data.length; i++) {
            // 获取每个链表的所有节点的值，插入到新的哈希表
            let p = this.data[i].next;
            while (p) {
                h.insert(p.data);
                p = p.next;
            }
        }
        this.data = h.data;
        this.flag = h.flag;
        this.buff = h.buff;
        this.cnt = h.cnt;
        return;
    }

    find(s) {
        let ind = this.hash_func(s) % this.data.length;
        let p = this.data[ind].next;//头结点不存储值，所以从next开始查找
        while (p && p.data !== s) p = p.next;
        return p !== null;
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