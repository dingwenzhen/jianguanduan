import http from "@utils/http";

// 上报任务查询
export const queryApi = (val) => http.get(`${window.apiUrl}/fileup/nreport`,{
    'page':val.page,
    'cjrq':val.collectionData,
    'bmCn':val.fileData,
    'taskNumber':val.TaskData,
    'yhjgmc':val.BankName
})