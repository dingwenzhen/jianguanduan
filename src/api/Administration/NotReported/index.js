import http from "@utils/http";

// 选择机构的
export const queryApi = (val) => http.get(`${window.apiUrl}/fileup/nreport`,{
    'page':val.page,
    'cjrq':val.collectionData,
    'bmCn':val.fileData,
    'taskNumber':val.TaskData,
    'yhjgmc':val.BankName
})