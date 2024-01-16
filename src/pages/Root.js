import { Outlet } from "react-router-dom"
import { MyContextProvider } from "../context/MyContext"
import Headers from "../components/Multiverse/Headers"
const RootLayuout = () => {
    return <MyContextProvider>
        <Headers></Headers>
        <Outlet />
    </MyContextProvider>
}

export default RootLayuout