import { MenuListApi } from '@api'
import { layoutRoute } from "@router"
import renderTabBar from "@utils/renderTabBar"
export const TableList = async ()=>{
    let data = await MenuListApi()
    console.log(renderTabBar(layoutRoute,data.data),'123')
    return renderTabBar(layoutRoute,data.data)
}