import http from "@utils/http";

// 机构管理-查询
export const TotalListApi = (val) => http.get(`${window.apiUrl}/permission/findPermission`, {
    'name': val.ruleName,
    'description': val.ruleDescribe,
})

// 删除
export const DeleteIdApi = (val) => http.post(`${window.apiUrl}/permission/delPermission`, {
    'ids': val
})

// 选择上一级菜单
export const UpperLevelApi = (val) => http.post(`${window.apiUrl}/permission/selectAllMenuName`, {
    'type': val
})
// 权限添加
export const NewAddApi = (val) => http.post(`${window.apiUrl}/permission/addPermission`, {
    "name": val.RoleName,
    "description": val.describe,
    "type": val.type,
    "parentId": val.parentId
})
// 编辑-回选
export const ReturnSelectionApi = (val) => http.post(`${window.apiUrl}/permission/detailsPermission`, {
    'id': val
})
// 修改
export const EditJurisdictionApi = (val) => http.post(`${window.apiUrl}/permission/updPermission`, {
    "id": val.id,
    "name": val.name,
    "description": val.description,
    "type": val.type,
    "parentId": val.parentId
})