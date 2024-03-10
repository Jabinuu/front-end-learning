class LruCache {
  constructor(capacity) {
    this.map = new Map();
    this.capacity = capacity;
  }

  // 添加缓存项
  put(key, val) {
    if (this.map.has(key)) {
      this.map.delete(key);
      this.map.set(key, val);
    }
    if (1 + this.map.size > this.capacity) {
      const iter = this.map.keys();
      const first = iter.next();
      this.map.delete(first.value);
    }
    this.map.set(key, val);
  }

  // 获取缓存项
  get(key) {
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
}

const lru = new LruCache(2);
lru.put(1, "aa");
lru.put(2, "bb");
lru.put(3, "cc");
