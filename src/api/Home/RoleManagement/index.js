import http from "@utils/http";

// 角色管理-查询
export const TotalListApi = (val) => http.get(`${window.apiUrl}/role/findRoles`,{
    'name':val.RoleName,
    'description':val.RoleDescription,
    'permissionName':val.PermissionName,
    'page':val.page
})

// 角色管理-权限列表默认全部的
export const JurisdictionAllApi = (val)=>http.get(`${window.apiUrl}/role/findAllPermissions`)

// 角色管理-新增角色
export const NewRoleApi = (val)=>http.post(`${window.apiUrl}/role/addRoles`,{
    'name':val.RoleName,
    'description':val.describe,
    'permissionids':val.permissionids
})

// 角色管理-删除角色
export const DeleteRoleApi = (val)=>http.post(`${window.apiUrl}/role/delRoles`,{
    'ids':val
})

// 角色管理-点击编辑进行回填
export const EditBackfillApi = (val)=>http.post(`${window.apiUrl}/role/assignAuthority`,{
    'id':val
})
// 角色管理-编辑修改
export const EditApi = (val)=>http.post(`${window.apiUrl}/role/updRoles`,{
    'id':val.id,
    'name':val.RoleName,
    'description':val.describe,
    'permissionids':val.permissionids
})