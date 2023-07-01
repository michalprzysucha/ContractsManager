import {Link} from "react-router-dom";

function Menu(){
    return(
        <>
            <nav>
                <ul>
                    <li><Link to="/">Strona główna</Link></li>
                    <li><Link to="/tenders/add">Dodaj przetarg</Link></li>
                    <li><Link to="/companies/add">Dodaj firmę</Link></li>
                    <li><Link to="/ca/add">Dodaj instytucję publiczną</Link></li>
                </ul>
            </nav>
        </>
    );
}

export default Menu;