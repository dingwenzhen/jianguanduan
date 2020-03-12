import { Home, Login, Administration, Historical,EditInformation } from "@pages/index.js"
import { Reporting, Department,RuleImporting,RuleManagement,Organizational,NewInstitution,NotReported,RoleManagement
,NewRole,EditFrom ,ExceptionRule,Jurisdiction,UserAdministration,NewUser,
ReportingTask,NewReportingTask,EditInstitution} from '@components/index.js'
export const PagesComponent = [
    {
        key: "/Login",
        path: "/Login",
        component: Login,
        icon: "",
        name: "Login",
        meta: {
            flag: true
        }
    },
    {
        key: "/EditInformation",
        path: "/EditInformation",
        component: EditInformation,
        icon: "",
        name: "EditInformation",
        meta: {
            flag: true
        }
    }
]
export const layoutRoute = [
    {
        key: "/Administration",
        path: "/Administration",
        class: 'Administration',
        component: Administration,
        icon: "folder-open",
        name: "上报管理",
        meta: {
            flag: true
        },
        children: [
            {
                key: "/Administration/Reporting",
                path: "/Administration/Reporting",
                component: Reporting,
                icon: "folder-open",
                name: "上报情况",
                class:'Reporting',
                meta: {
                    flag: true
                }
            },
            {
                key: "/Administration/NotReported",
                path: "/Administration/NotReported",
                component: NotReported,
                icon: "folder-open",
                name: "未上报列表",
                class:'NotReported',
                meta: {
                    flag: true
                }
            },
            {
                key: "/Administration/ReportingTask",
                path: "/Administration/ReportingTask",
                component: ReportingTask,
                icon: "folder-open",
                name: "上报任务",
                class:'ReportingTask',
                meta: {
                    flag: true
                }
            } ,
            {
                key: "/Administration/NewReportingTask",
                path: "/Administration/NewReportingTask",
                component: NewReportingTask,
                icon: "folder-open",
                name: "上报任务-新增上报任务",
                class:'NewReportingTask',
                meta: {
                    flag: true
                }
            }
        ]
    },
    {
        key: "/Historical",
        path: "/Historical",
        class: 'Historical',
        component: Historical,
        icon: "folder-open",
        name: "检核规则",
        meta: {
            flag: true
        },
        children: [
            {
                key: "/Historical/RuleImporting",
                path: "/Historical/RuleImporting",
                component: RuleImporting,
                icon: "fund",
                name: "规则导入",
                class:'RuleImporting',
                meta: {
                    flag: true
                }
            },
            {
                key: "/Historical/RuleManagement",
                path: "/Historical/RuleManagement",
                component: RuleManagement,
                icon: "fund",
                name: "规则管理",
                class:'RuleManagement',
                meta: {
                    flag: true
                }
            },
            {
                key: "/Historical/ExceptionRule",
                path: "/Historical/ExceptionRule",
                component: ExceptionRule,
                icon: "fund",
                name: "例外规则",
                class:'ExceptionRule',
                meta: {
                    flag: true
                }
            }
        ]
    },
    {
        key: "/Home",
        path: "/Home",
        class: 'Home',
        icon: "fund",
        name: "系统管理",
        component: Home,
        children: [
            {
                key: "/Home/Department",
                path: "/Home/Department",
                component: Department,
                icon: "fund",
                name: "部门管理",
                class:'Department',
                meta: {
                    flag: true
                }
            },
            {
                key: "/Home/Organizational",
                path: "/Home/Organizational",
                component: Organizational,
                class:'Organizational',
                icon: "fund",
                name: "机构管理",
                meta: {
                    flag: true
                }
            },
            {
                key: "/Home/NewInstitution",
                path: "/Home/NewInstitution",
                component: NewInstitution,
                icon: "fund",
                name: "添加机构",
                class:'NewInstitution',
                meta: {
                    flag: true
                }
            },
            {
                key: "/Home/EditInstitution",
                path: "/Home/EditInstitution",
                component: EditInstitution,
                icon: "fund",
                name: "编辑机构",
                class:'EditInstitution',
                meta: {
                    flag: true
                }
            },
            {
                key: "/Home/RoleManagement",
                path: "/Home/RoleManagement",
                component: RoleManagement,
                icon: "fund",
                name: "角色管理",
                class:'RoleManagement',
                meta: {
                    flag: true
                }
            },
            {
                key: "/Home/EditFrom",
                path: "/Home/EditFrom",
                component: EditFrom,
                icon: "fund",
                name: "角色修改权限",
                class:'EditFrom',
                meta: {
                    flag: true
                }
            },
            {
                key: "/Home/NewRole",
                path: "/Home/NewRole",
                component: NewRole,
                icon: "fund",
                name: "新增角色",
                class:'NewRole',
                meta: {
                    flag: true
                }
            },
            {
                key: "/Home/Jurisdiction",
                path: "/Home/Jurisdiction",
                component: Jurisdiction,
                icon: "fund",
                name: "权限管理",
                class:'Jurisdiction',
                meta: {
                    flag: true
                }
            },
            {
                key: "/Home/UserAdministration",
                path: "/Home/UserAdministration",
                component: UserAdministration,
                icon: "fund",
                name: "用户管理",
                class:'UserAdministration',
                meta: {
                    flag: true
                }
            },
            {
                key: "/Home/NewUser",
                path: "/Home/NewUser",
                component: NewUser,
                icon: "fund",
                name: "用户管理-新增用户",
                class:'NewUser',
                meta: {
                    flag: true
                }
            }
        ]
    }

]


export const EachWhole = PagesComponent.concat(layoutRoute)