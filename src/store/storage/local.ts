const prefix = "app";
const local = {
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(`${prefix}:${key}`) as any);
    } catch (e) {}
    return null;
  },
  set: (key, value) => {
    localStorage.setItem(`${prefix}:${key}`, JSON.stringify(value));
    return value;
  },
  del: (key) => {
    let value = local.get(key);
    localStorage.removeItem(`${prefix}:${key}`);
    return value;
  },
  clear: (pre = "") => {
    let deleted = {};
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i) || "";
      if (key.startsWith(`${prefix}:${pre}`)) {
        deleted[key] = localStorage.getItem(key);
        localStorage.removeItem(key);
      }
    }
    return deleted;
  },
};

export default local;
