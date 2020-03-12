import http from "@utils/http";

// 选择机构的
export const SelectBankApi = (val) => http.get(`${window.apiUrl}/bank/list`,{
    'yxjgmc':val
})
// 查询
export const TableQueryApi = (val)=>http.get(`${window.apiUrl}/rule/list`,{
    'ruleSeq':val.ruleData,
    'ruleDesc':val.ruleDescribe,
    'ruleType':val.ruleType,
    'standardType':val.ruleSelect,
    'page':val.page
})
// 配置标准的-规则标准
export const SelectDataApi = ()=>http.get(`${window.apiUrl}/rule/queryStandardType`)

// 规则类型 rule/queryGroupByRuleType
export const GroupByRuleType = ()=>http.get(`${window.apiUrl}/rule/queryGroupByRuleType`)

// 保存
export const PreservationApi = (val)=>http.post(`${window.apiUrl}/exception/save`,{
    'cjrq':val.Time,
    'yhjgmc':val.TwoData,
    'dDqGzEntities':val.ThreeData
})
