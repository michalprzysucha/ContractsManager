import {Link} from "react-router-dom";

function Menu(){
    return(
        <>
            <nav>
                <ul>
                    <li><Link to="/">Strona główna</Link></li>
                    <li><Link to="/companies/add">Dodaj firmę</Link></li>
                </ul>
            </nav>
        </>
    );
}

export default Menu;