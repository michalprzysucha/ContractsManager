import {Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import Home from "./components/Home";
import {ClientForm} from "./components/ClientForm";
import {AddedSuccessful} from "./components/AddedSuccessful";
import {TenderForm} from "./components/TenderForm";
import TenderDetails from "./components/TenderDetails";

function Router(){
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="companies">
                    <Route path="add" element={<ClientForm value={"company"}/>} />
                </Route>
                <Route path="ca">
                    <Route path="add" element={<ClientForm value={"institution"}/>} />
                </Route>
                <Route path="tenders">
                    <Route path="add" element={<TenderForm value={"tender"}/>} />
                    <Route path=":id" element={<TenderDetails/>} />
                </Route>
                <Route path="/addedSuccessful" element={<AddedSuccessful/>}/>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default Router;

