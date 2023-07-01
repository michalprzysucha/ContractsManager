import {Outlet} from "react-router-dom";
import Menu from "./Menu";

const Layout = () => {
    return (
        <div className="wrapper">
            <Menu />
            <Outlet />
        </div>
    );
};
export default Layout;