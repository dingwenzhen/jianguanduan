
import http from "@utils/http";

// 登录
export const LoginApi = (val) => http.post(`${window.apiUrl}/login`, {
    "username": val.username,
    "password": val.password
})
// 获取用户名
export const UserNameApi = () => http.get(`${window.apiUrl}/loginByUserName`)

// 获取菜单列表
export const MenuListApi = () => http.get(`${window.apiUrl}/permission/findMenu`)

// 个人信息
export const EditUser = () => http.get(`${window.apiUrl}/users/findOwnUsers`)

// 修改个人信息
export const ModifyPersonalApi = (val) => http.post(`${window.apiUrl}/users/updOwnUsers`, {
    "id": val.id,
    "name": val.name,
    "phone": val.phone,
    "email": val.email
})

// 修改密码
export const ChangePasswordApi = (val) => http.post(`${window.apiUrl}/users/userOwnUpdPassword`, {
    "oldPassword": val.oldPassword,
    "newPassword": val.newPassword,
    "confirmNewPassword": val.confirmNewPassword
})