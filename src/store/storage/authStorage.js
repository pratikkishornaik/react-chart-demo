import local from "./local";

const prefix = "auth";
const expiryKey = "expiry";
const tokenKey = "token";
const now = () => new Date().valueOf() / 1000;
const authStorage = {
  token: () => {
    var cts = now();
    try {
      var ts = authStorage.get(expiryKey) || 0;
    } catch (e) {}
    if (ts + 3600 < cts) {
      return null;
    }
    let token = authStorage.get(tokenKey);
    if (token) {
      authStorage.refresh();
    }
    return token;
  },
  login: (accessToken) => {
    const { token } = accessToken;
    authStorage.set(tokenKey, token);
    authStorage.refresh();
    return token;
  },
  refresh: () => {
    authStorage.set(expiryKey, now());
  },
  logout: () => {
    authStorage.del(tokenKey);
    authStorage.del(expiryKey);
  },
  get: (key) => local.get(`${prefix}:${key}`),
  set: (key, value) => local.set(`${prefix}:${key}`, value),
  del: (key) => local.del(`${prefix}:${key}`),
  clear: () => local.clear(`${prefix}:`),
};

export default authStorage;
