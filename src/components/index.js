import Loading from "@common/Loading";
import reactLoadable from "react-loadable";

// 上报管理
const Reporting = reactLoadable({
    loader:()=>import("./Administration/Reporting"),
    loading:Loading
})
const NotReported = reactLoadable({
    loader:()=>import("./Administration/NotReported"),
    loading:Loading
})
// 上报管理-上报任务
const ReportingTask = reactLoadable({
    loader:()=>import("./Administration/ReportingTask"),
    loading:Loading
})
// 上报管理-上报任务-新增上报任务
const NewReportingTask = reactLoadable({
    loader:()=>import("./Administration/ReportingTask/NewReportingTask"),
    loading:Loading
})

// 检核规则页面的
const RuleImporting = reactLoadable({
    loader:()=>import("./Historical/RuleImporting"),
    loading:Loading
})
const RuleManagement = reactLoadable({
    loader:()=>import("./Historical/RuleManagement"),
    loading:Loading
})
const ExceptionRule = reactLoadable({
    loader:()=>import("./Historical/ExceptionRule"),
    loading:Loading
})

// 系统管理页面的
const Department = reactLoadable({
    loader:()=>import("./Home/Department"),
    loading:Loading
})
const Organizational = reactLoadable({
    loader:()=>import("./Home/Organizational"),
    loading:Loading
})
const NewInstitution = reactLoadable({
    loader:()=>import("./Home/Organizational/NewInstitution"),
    loading:Loading
})
const EditInstitution = reactLoadable({
    loader:()=>import("./Home/Organizational/EditInstitution"),
    loading:Loading
})
const RoleManagement = reactLoadable({
    loader:()=>import("./Home/RoleManagement"),
    loading:Loading
})
const NewRole = reactLoadable({
    loader:()=>import("./Home/RoleManagement/NewRole"),
    loading:Loading
})
const EditFrom = reactLoadable({
    loader:()=>import("./Home/RoleManagement/EditFrom"),
    loading:Loading
})
// 权限管理页面
const Jurisdiction = reactLoadable({
    loader:()=>import("./Home/Jurisdiction"),
    loading:Loading
})


// 用户管理
const UserAdministration = reactLoadable({
    loader:()=>import("./Home/UserAdministration"),
    loading:Loading
})
// 用户管理-新增用户
const NewUser = reactLoadable({
    loader:()=>import("./Home/UserAdministration/NewUser"),
    loading:Loading
})

export {
    Reporting,
    Department,
    RuleImporting,
    RuleManagement,
    Organizational,
    NewInstitution,
    EditInstitution,
    NotReported,
    RoleManagement,
    NewRole,
    EditFrom,
    ExceptionRule,
    Jurisdiction,
    UserAdministration,
    NewUser,
    ReportingTask,
    NewReportingTask
}