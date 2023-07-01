import {Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound";
import CompanyForm from "./components/CompanyForm";
import Layout from "./components/Layout";
import Home from "./components/Home";

function Router(){
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="companies">
                    <Route path="add" element={<CompanyForm />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default Router;

