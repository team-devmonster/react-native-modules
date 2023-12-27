
// import { AxiosResponse } from 'axios';
// import { getUser, removeUser, setUser } from '../user';
// import { Toast } from "@team-devmonster/react-native-router";
// import { instance } from './axios_instance';


// type ReqDataType = {
//   resultCode: number;
//   resultHash: any;
// };

// const REFRESH_API = '/login/refresh_token';

// // const setUser = async (data: DATA_LOGIN) => {
// //   return sessionStorage.setItem('user', JSON.stringify(data));
// // };

// export function AuthInterceptors ({ holder, router, toastRef, lock }:{ holder:any, router:any, toastRef:any, lock:any }) {
//   instance.interceptors.request.use(async (config) => {
//     const { access_token, refresh_token } = await getUser() || {};

//     if (config.url === REFRESH_API) {
//       if (refresh_token) {
//         config.headers.Authorization = `Bearer ${refresh_token}`;
//       } else {
//         // 아예 refreshToken이 없으면 로그인 페이지로 이동
//         removeUser();
//         toastRef.current?.close();
//         toastRef.current = Toast({ message: '[세션 만료] - 로그인을 다시 해 주세요.' });
//         router.reset('/login');
//       }
//     } else {
//       if (access_token) {
//         config.headers.Authorization = `Bearer ${access_token}`;
//       }
//     }

//     if (lock && config.url !== REFRESH_API) await holder.promise; // accessToken 재발급 요청 중에는 다른 요청을 잠시 hold 함

//     return config;
//   });

//   instance.interceptors.response.use(
//     async (response: AxiosResponse): Promise<any> => {
//       const { resultCode }: ReqDataType = response.data;

//       const { user } = await getUser() || {};

//       console.log('code -', resultCode);

//       if (resultCode === 9834) {
//         try {
//           if (!lock.current) {
//             lock.current = true;
//             holder.hold();
//             // console.log('홀드할게요!');
//             try {
//               const res = await instance.post(REFRESH_API);
//               console.log('🦋refresh🦋', res);

//               if (res.data.resultCode === 0 && user) {
//                 await setUser(res.data.resultHash);

//                 // 너무 많은 요청이 들어올 경우를 생각해서 조금만 더 홀드하다가 풀도록 할게요.
//                 setTimeout(() => {
//                   holder.resolve();
//                   lock.current = false;
//                 }, 900);
//               } else {
//                 throw new Error('Refresh token renewal failed');
//               }
//             } catch (err) {
//               holder.reject();
//               lock.current = false;
//               throw err;
//             }
//           } else {
//             // 이미 accessToken 재발급 요청을 했다면 hold
//             await holder.promise;
//           }

//           // 리프래시 이후 실패했었던 요청들 다시 보내기
//           return instance(response.config);
//         } catch (error) {
//           console.log('interceptor error ', error);
//         }
//       } else if (resultCode === 9835) {
//         // refreshToken도 만료 되면 유저 정보 없애고 로그인 페이지로 이동
//         removeUser();
//         toastRef.current?.close();
//         toastRef.current = Toast({ message: '[세션 만료] - 로그인을 다시 해 주세요.' });
//         // useRouter().reset('/login');
//         router.reset('/login');
//       } else {
//         return Promise.resolve(response);
//       }
//     },
//     async (axiosError) => {
//       const {
//         response: { data: error, status },
//         config,
//       } = axiosError;

//       /** 우리는 error statusCode로 받고 있지 않으니 안 쓸게요 */

//       return Promise.reject(axiosError);
//     }
//   );
// };