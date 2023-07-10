import {useState, useEffect} from "react";
import {Navigate} from "react-router-dom";

const OfferForm = (props) => {
    const [error, setError] = useState(null);
    const [serverError, setServerError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [added, setAdded] = useState(false);
    const [companies, setCompanies] = useState('');
    let id = window.location.href.substring(window.location.href.lastIndexOf('/')+1)
    console.log(id);
    const date = new Date();


    useEffect(() => {
        document.title='Dodaj ofertę do przetargu';

        fetch('http://localhost:3000/companies/list_comp')
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCompanies(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(
                {
                    submissionDate: date,
                    price: formData.get("cena"),
                    company: formData.get("comp")
                }
            )
        }

        fetch(`http://localhost:3000/offers/add/${id}`, requestOptions) 
            .then((response)=> {
                if (response.status === 200) {
                    setAdded(true)
                } else {
                    setServerError(true)
                }
            })
    }


    if(error){
        return <>Error: {error.message}</>
    } else if (!isLoaded) {
        return <>Ładowanie...</>
    } else {

        return (
            <>
                {added && <p><Navigate to="/addedSuccessful" state={props.value}/></p>}
                {serverError && <p>Wystąpił błąd!</p>}

                <h1>Formularz dodawania oferty do przetargu</h1>

                <form method="post" onSubmit={handleSubmit}>
                    <label>Wysokość oferty:{' '}
                        <input type="number" step="0.01" min="0" name="cena"/>
                    </label>
                    <br/>

                    <label>Firma zamawiająca:{' '}
                        <select name="comp">
                            <option value={-1}>--Wybierz firmę--</option>
                            {companies.map((company) =>
                                (<option value={company.id} key={company.id}>
                                    {company.name} &nbsp;
                                </option>))}
                        </select>
                    </label>
                    <br />

                    <button type="submit">Prześlij</button>
                </form>
            </>
        )
    }
}

export default OfferForm;