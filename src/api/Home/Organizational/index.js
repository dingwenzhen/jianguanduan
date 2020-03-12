import http from "@utils/http";

// 机构管理-查询
export const TotalListApi = (val) => http.get(`${window.apiUrl}/jgxxb/list`, {
    'yxjgmc': val.Institution,
    'page': val.page
})

// 机构管理-删除
export const DeleteApi = (val) => http.post(`${window.apiUrl}/jgxxb/delete`, {
    'yxjgdms': val
})

// 机构管理-点击编辑实现回填
export const EditBackfillApi = (val)=>http.post(`${window.apiUrl}/jgxxb/findDetails`,{
    'yxjgdm':val
})

// 机构管理-新增机构-全部的主监管员
export const ToltalChiefSupervisor = () => http.get(`${window.apiUrl}/jgxxb/querySupervise`)

// 机构管理-根据点击的主监管员来获取执行员
export const marshalApi = (val) => http.post(`${window.apiUrl}/jgxxb/queryExecutor`, {
    'supervisorId': val
})
// 机构管理-新增机构
export const NewSupervisorApi = (val) => http.post(`${window.apiUrl}/jgxxb/save`, {
    "yxjgmc": val.OrganizationName,
    "yxjgdm": val.OrganizationCode,
    "jrxkzh": val.LicenseLey,
    "jgdz": val.BankOffice,
    "fzrxm": val.ContactName,
    "fzrlxdh": val.ContactNumber,
    'txdz':val.PostalAddress,
    'lxrdzyx':val.ContactEmail,
    "zVoList":val.zVoList
})
// 机构管理-编辑机构
export const EditSupervisorApi = (val) => http.post(`${window.apiUrl}/jgxxb/update`, {
    "yxjgmc": val.OrganizationName,
    "yxjgdm": val.OrganizationCode,
    "jrxkzh": val.LicenseLey,
    "jgdz": val.BankOffice,
    "fzrxm": val.ContactName,
    "fzrlxdh": val.ContactNumber,
    'txdz':val.PostalAddress,
    'lxrdzyx':val.ContactEmail,
    "zVoList":val.zVoList,
    'nbjgh':val.nbjgh
})