// import { Dispatch, useContext, useRef, useState } from "react";
// import { Platform } from "react-native";
// import { FORMDATA_HEADERS_CONFIG, instance } from "./axios_instance";
// import AppContext from "@components/context";
// import { AuthInterceptors } from "./axios_Interceptors";
// import { ToastReturn, useRouter } from "@team-devmonster/react-native-router";
// import { Holder } from "./axios_holder";
// import { PlatformType, extentions } from "./types";

// /** types */
// export type AxiosReq<Hash> = {
//   url:string;
//   type:'get'|'post'|'put'|'delete'|'patch';
// }

// export interface AxiosReqMiddleWare<Form, Hash> {
//   url:string;
//   type:'get'|'post'|'put'|'delete'|'patch';
//   params?:Form | (() => Form);
//   loading?:{ isLoading:boolean, setIsLoading:Dispatch<boolean> };
//   loadingLocal?:{ isLoading:boolean, setIsLoading:Dispatch<boolean> };
//   loading_state?:boolean;
// }

// export type AxiosRes<Form, Hash> = {
//   fetch: ({ params, loading_state }:{ params?:Form, loading_state?:boolean }) => Promise<{ code: number; data: Hash; }>;
//   loading: boolean;
// };

// export function AxiosAPI<Form = any, Hash = any>({ url, type = 'post' }:AxiosReq<Hash>):AxiosRes<Form, Hash> {
//   const router = useRouter();
//   const holder = new Holder();
//   const toastRef = useRef<ToastReturn>();
//   const lock = useRef<boolean>(false);
//   const { loading, instanceInit } = useContext(AppContext);
//   const [loadingLocal, setLoadingLocal] = useState<boolean>(false);
  
  
//   const fetchData = async({ params, loading_state = true }:{ params?:Form, loading_state?:boolean }) => {
//     if(!instanceInit.current){
//       await AuthInterceptors({ holder, router, toastRef, lock });
//       instanceInit.current = true;
//     }

//     return await axiosMiddleWare({url, type, params, loading, loadingLocal: { isLoading: loadingLocal, setIsLoading: setLoadingLocal }, loading_state});
//   }

//   return {
//     fetch: fetchData,
//     loading: loadingLocal
//   }
// }

// const axiosMiddleWare = async<Form = any, Hash = any>({ url, type = 'post', params, loading, loadingLocal, loading_state = true }:AxiosReqMiddleWare<Form, Hash>):Promise<{ code: number, data:Hash }> => {
//   // let transInstance = instance;
//   console.log("🚀 " + url + ' ' +  type + '\n', JSON.stringify(params));

//   let axios_params:any = {
//     platform_type: Platform.OS === 'android' ? PlatformType.ANDROID : PlatformType.IOS,
//     ...params
//   }

//   if(type === 'post' || type === 'put') axios_params = objToForm(axios_params);

//   const contentType = type === 'post' ? FORMDATA_HEADERS_CONFIG : (type === 'put' ? FORMDATA_HEADERS_CONFIG : {});

//   console.log('contentType - ', axios_params);

//   if(loading_state && !loading?.isLoading) loading?.setIsLoading(true);
//   if(!loading_state && !loadingLocal?.isLoading) loadingLocal?.setIsLoading(true);
//   // console.log('zero - ', loading?.isLoading);
//   try {
//     // console.log(url, type === 'post' ? axios_params: (type === 'put' ? axios_params : { params: { ...axios_params } }), contentType);
//     // console.log('error - 1');
//     const { data } = await instance[type](url, type === 'post' ? axios_params : (type === 'put' ? axios_params : { params: { ...axios_params } }), contentType);
//     // console.log('error - 2');
//     console.log('response - ', data);
//     const res:Hash = data.resultHash;
//     return { data: res, code: data.resultCode };
//   } catch(e) {
//     console.log('catch error - ', e);
//     throw { data: e, code: undefined };
//   } finally {
//     loading?.setIsLoading(false);
//     loadingLocal?.setIsLoading(false);
//   }
// }

// const objToForm = (json: any) => {
//   let form = new FormData();
//   for (let prompt in json) {
//     if (json[prompt] === null || json[prompt] === undefined) {
//       form.append(prompt, "");
//       continue;
//     }

//     if (typeof json[prompt] !== "object") {
//       form.append(prompt, json[prompt]);
//       continue;
//     }

//     // typeof json[prompt] === 'object'
//     if (json[prompt].constructor.name === "File") {
//       form.append(prompt, json[prompt]);
//       continue;
//     }

//     if (json[prompt].constructor.name === "Blob") {
//       const extension = extentions[json[prompt].type];
//       form.append(
//         prompt,
//         json[prompt],
//         "attaches" + new Date().getTime() + `.${extension}`,
//       );
//       continue;
//     }

//     // not file end blob
//     if (!Array.isArray(json[prompt])) {
//       form.append(prompt, JSON.stringify(json[prompt]));
//       continue;
//     }

//     if (Array.isArray(json[prompt])) {
//       if (!json[prompt]?.length) {
//         form.append(prompt, "[]");
//         continue;
//       }
//       // typeof json[prompt][0] === 'object'
//       if (json[prompt][0].type && json[prompt][0].name && json[prompt][0].uri) {
//         for (let i = 0; i < json[prompt].length; i++) {
//           // console.log('test - ', json[prompt][i]);
//           form.append(prompt, json[prompt][i]);
//         }
//         continue;
//       }

//       if (json[prompt][0].constructor.name === "Blob") {
//         for (let i = 0; i < json[prompt].length; i++) {
//           const extension = extentions[json[prompt][i].type];
//           if (!extension)
//             throw `extension not matched: ${json[prompt][i].type}`;
//           form.append(
//             prompt,
//             json[prompt],
//             "attaches" + new Date().getTime() + `.${extension}`,
//           );
//         }
//         continue;
//       }

//       for (let i = 0; i < json[prompt].length; i++) {
//         // console.log('test - ', json[prompt][i]);
//         form.append(prompt, json[prompt][i]);
//       }
//       continue;
//     }

//     // array value part
//     if (typeof json[prompt][0] !== "object") {
//       form.append(prompt, JSON.stringify(json[prompt]));
//       continue;
//     }

//     form.append(prompt, JSON.stringify(json[prompt]));
//     console.log("form data - ", form);
//   }
//   return form;
// };