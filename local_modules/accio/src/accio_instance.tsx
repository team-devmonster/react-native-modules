import axios from 'axios';
import { env } from '@env';

/** config */
export const FORMDATA_HEADERS_CONFIG = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

/** types */

export type ResponseType<DATA> = {
  // config?: CONFIG | any;
  data: DATA;
  // headers?: HEADERS | any;
};

export type ResultHashListType<T> = {
  data: {
    resultCode: number;
    resultHash: {
      list_count: number;
      list: T;
    };
  };
};

export type ResultHashDetailType<T> = {
  data: {
    resultCode: number;
    resultHash: {
      detail: T;
    };
  };
};

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: env.API_URL, // 기본 URL 설정
  timeout: 300000, // 요청 타임아웃 (300초)
});

export { instance };