import {Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import Home from "./components/Home";
import {ClientForm} from "./components/ClientForm";
import {AddedSuccessful} from "./components/AddedSuccessful";
import {TenderForm} from "./components/TenderForm";
import TenderDetails from "./components/TenderDetails";
import TendersTable from "./components/TendersTable";
import OfferForm from "./components/OfferForm";

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
                    {/* OfferForm ściezka do sprawdzeniea */}
                    <Route path="offer/add" element={<OfferForm value={"offer"}/>} /> 
                    <Route path=":id" element={<TenderDetails/>} />
                    <Route path="/" element={<TendersTable/>} />
                </Route>
                <Route path="/addedSuccessful" element={<AddedSuccessful/>}/>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default Router;

