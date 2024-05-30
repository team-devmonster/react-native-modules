/** 유저 로그인 데이터 */
import AsyncStorage from "@react-native-async-storage/async-storage";
const User_Storage = 'USER_STORAGE';


export const getAutoLogin = async():Promise<{ auto_login:boolean }|null> => {
  const data = await AsyncStorage.getItem('autoLogin');
  if(typeof data === 'string') {
    return JSON.parse(data);
  }
  else {
    return null;
  }
}

const getUserFromStorage = async() => {
  const { auto_login } = await getAutoLogin() || {};
  if(auto_login) {
    return await AsyncStorage.getItem(User_Storage);
  }
  else {
    return await AsyncStorage.getItem(User_Storage);
  }
}

export const removeUser = async() => {
  await AsyncStorage.removeItem(User_Storage);
}

export const setUser = async(data:any) => {
  const { auto_login } = await getAutoLogin() || {};
  if(auto_login) {
    return AsyncStorage.setItem(User_Storage, JSON.stringify(data));
  }
  else {
    return AsyncStorage.setItem(User_Storage, JSON.stringify(data));
  }
}

export const getUser = async():Promise<any|null> => {
  const user = await getUserFromStorage();

  if(typeof user === 'string') {
    return JSON.parse(user);
  }
  else {
    return null;
  }
}