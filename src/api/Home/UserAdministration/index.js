import http from "@utils/http";

// 用户管理-查询
export const TotalListApi = (val) => http.get(`${window.apiUrl}/users/findUsers`,{
    'username':val.user,
    'name':val.userName,
    'page':val.page
})

// 修改密码
export const EditPasswordApi = (val)=>http.post(`${window.apiUrl}/users/updUsersPassword`,{
    'id':val.id,
    'password':val.password,
    'confirmPassword':val.confirmPassword
})

// 用户管理-删除
export const DeleteAPI = (val)=>http.post(`${window.apiUrl}/users/delUsers`,{
    'ids':val.id,
    'roleName':val.roleName
})

// 用户管理-点击编辑重新调后端接口获取
export const EditElectApi = (val)=>http.post(`${window.apiUrl}/users/findUsersById`,{
    'id':val
})

// 获取所有部门
export const TotalDepartment = ()=>http.get(`${window.apiUrl}/dept/deptAll`)

// 所有角色
export const TotalRoleApi = ()=>http.get(`${window.apiUrl}/role/findAllRoles`)

// 获取所有银行机构
export const TotalBanking =() =>http.get(`${window.apiUrl}/jgxxb/findAllOrgCode`)

// 新增
export const NewlyAddedApi = (val)=>http.post(`${window.apiUrl}/users/addUsers`,{
    "username":val.LoginName,
	"password":val.password,
	"confirmPassword":val.confirmPassword,
	"name":val.UserName,
	"phone":val.Iphone,
	"email":val.email,
	"deptId":val.Department,
	"roleId":val.roleId,
	"roleName":val.roleName,
	"orgCode":val.orgCode
})

// 修改
export const EditUserApi = (val)=>http.post(`${window.apiUrl}/users/updUsers`,{
    "id":val.id,
	"username":val.username,
	"name":val.name,
	"phone":val.phone,
	"email":val.email,
	"deptId":val.deptId,
	"roleId":val.roleId,
	"roleName":val.roleName,
	"orgCode":val.List
})
