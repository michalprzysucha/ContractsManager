import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {CompanyForm} from "./components/CompanyForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li><Link to="/">Strona główna</Link></li>
          <li><Link to="/companies/add">Dodaj firmę</Link></li>
        </ul>
        <Routes>
          <Route path="/companies/add" element={<CompanyForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
