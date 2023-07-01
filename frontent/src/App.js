import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {ClientForm} from "./components/ClientForm";
import {AddedSuccessful} from "./components/AddedSuccessful";
import {TenderForm} from "./components/TenderForm";
import {useEffect} from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li><Link to="/">Strona główna</Link></li>
          <li><Link to="/tenders/add">Dodaj przetarg</Link></li>
          <li><Link to="/companies/add">Dodaj firmę</Link></li>
          <li><Link to="/ca/add">Dodaj instytucję publiczną</Link></li>
        </ul>
        <Routes>
          <Route path="/tenders/add" element={<TenderForm value={"tender"}/>} />
          <Route path="/companies/add" element={<ClientForm value={"company"}/>} />
          <Route path="/ca/add" element={<ClientForm value={"institution"}/>} />
          <Route path="/addedSuccessful" element={<AddedSuccessful/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
