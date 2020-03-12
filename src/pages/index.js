import Loading from "@common/Loading";
import reactLoadable from "react-loadable"

const Home = reactLoadable({
    loader:()=>import("./Home"),
    loading:Loading
})
const Login = reactLoadable({
    loader:()=>import("./login"),
    loading:Loading
})


const Historical = reactLoadable({
    loader:()=>import("./Historical"),
    loading:Loading
})
const Administration = reactLoadable({
    loader:()=>import("./Administration"),
    loading:Loading
})

const EditInformation = reactLoadable({
    loader:()=>import("./EditInformation"),
    loading:Loading
})

export {
    Home,Login,Historical,Administration,EditInformation
}