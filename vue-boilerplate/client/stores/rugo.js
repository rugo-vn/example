import axios from 'axios';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import {
  API_LOGIN,
  ENV_API_BASE,
  STORAGE_AUTH_TOKEN,
  STORAGE_AUTH_USER,
} from '../constants.js';

const validateStatus = (status) => status >= 200 && status < 500;

export const useRugoStore = defineStore('rugo', () => {
  // state
  const token = useLocalStorage(STORAGE_AUTH_TOKEN, null);
  const user = useLocalStorage(STORAGE_AUTH_USER, {});

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

    return true;
  };

  const logout = () => {
    token.value = null;
    user.value = {};
  };

  // return
  return {
    token,
    user,
    login,
    logout,
    persist: true,
  };
});
