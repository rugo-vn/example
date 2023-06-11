import axios from 'axios';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import {
  API_LOGIN,
  API_MODEL,
  ENV_API_BASE,
  NOTICE_TIMEOUT,
  STORAGE_AUTH_TOKEN,
  STORAGE_AUTH_USER,
} from '../constants.js';
import { reactive } from 'vue';

const validateStatus = (status) => status >= 200 && status < 500;

export const useRugoStore = defineStore('rugo', () => {
  // private
  let currentNoticeId = 1;

  // state
  const token = useLocalStorage(STORAGE_AUTH_TOKEN, null);
  const user = useLocalStorage(STORAGE_AUTH_USER, {});
  const notices = reactive([
    {
      id: 1,
      type: 'info',
      title: 'Welcome',
      detail: 'Nice to meet you. This is an example about Vue + Rugo.',
      at: new Date(),
    },
  ]);

  // notice
  const pushNotice = (type, title, detail) => {
    notices.push({
      id: ++currentNoticeId,
      type,
      title,
      detail,
      at: new Date(),
    });
  };

  setInterval(() => {
    const now = Date.now();

    do {
      let notice = notices[0];
      if (!notice) break;

      if (now - notice.at > NOTICE_TIMEOUT) notices.shift();
      else break;
    } while (notices.length > 0);
  }, 100);

  // http
  const createHttp = () =>
    axios.create({
      baseURL: import.meta.env[ENV_API_BASE],
      validateStatus,
      headers: {
        ...(token.value ? { authorization: `Bearer ${token.value}` } : {}),
      },
    });

  const handleResponse = (res) => {
    if (res.status === 403) {
      token.value = null;
    }

    if (res.status !== 200) {
      pushNotice('danger', 'Error', res.data.error);
      throw new Error(res.data.error);
    }

    return res.data;
  };

  // auth
  const login = async ({ email, password }) => {
    const http = createHttp();
    const res = await http.post(API_LOGIN, {
      email,
      password,
    });
    const { token: nextToken, user: nextUser } = handleResponse(res);

    if (!nextToken) return false;

    token.value = nextToken;
    user.value = nextUser;

    pushNotice('success', 'Success', 'Login successfully');

    return true;
  };

  const logout = () => {
    token.value = null;
    user.value = {};
  };

  // model

  const model = (modelName) => {
    return {
      async find(id) {
        const http = createHttp();
        const res = await http.get(
          `${API_MODEL}/${modelName}${id ? '/' + id : ''}`
        );
        return handleResponse(res).data;
      },

      async create(data) {
        const http = createHttp();
        const res = await http.post(`${API_MODEL}/${modelName}`, data);
        return handleResponse(res);
      },
    };
  };

  // return
  return {
    token,
    user,
    notices,
    pushNotice,
    login,
    logout,
    model,
  };
});
