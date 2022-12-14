/*
进行local数据存储的工具模块
*/
const USER_NAME = 'user';

export const storageUtils = {
    //save user
    saveUser(user){
        localStorage.setItem(USER_NAME, JSON.stringify(user));
        // localStorage.setItem(USER_NAME, user);
    },
    //read user
    getUser(){
        return JSON.parse(localStorage.getItem(USER_NAME) || '{}');
        // return localStorage.getItem(USER_NAME) || '';
    },
    //delate user
    removeUser(){
        localStorage.removeItem(USER_NAME);
    }
}