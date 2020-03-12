import http from "@utils/http";

// 部门管理-查询
export const TotalListApi = (val) => http.get(`${window.apiUrl}/dept/findDepts`, {
    'page': val.page,
    'title': val.DepartmentValue
})

// 部门管理-删除部门
export const DeleteIdApi = (val) => http.post(`${window.apiUrl}/dept/delDept`, {
    'ids': val
})

// 部门管理-新增部门
export const NewDepartmentApi = (val) => http.post(`${window.apiUrl}/dept/addDept`, {
    "title": val.title,
    "zVoList": val.tableList
})

// 部门管理添加和编辑页面监管员和执行人下拉框接口
export const findSuperviseApi = ()=>http.get(`${window.apiUrl}/dept/findSupervise`)

// 部门管理  点击回填的 给信息
export const EditInformationApi = (val)=>http.post(`${window.apiUrl}/dept/detailsDept`,{
    'id':val
})

// 部门管理-修改
export const EditApi = (val)=>http.post(`${window.apiUrl}/dept/updDept`,{
    'id':val.id,
    "title": val.DepartmentName,
    "zVoList": val.tableList
})