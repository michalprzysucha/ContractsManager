import {useState, useEffect} from "react";
import {Navigate} from "react-router-dom";

export const OfferForm = (props) => {
    const [error, setError] = useState(null);
    const [serverError, setServerError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [added, setAdded] = useState(false);
    const [institutions, setInstitutions] = useState('');
    const date = new Date();


    useEffect(() => {
        document.title='Dodaj ofertę do przetargu';

        fetch('http://localhost:3000/ca/list')
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setInstitutions(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    function handleSubmit(e) {
        // Prevent the browser from reloading the page
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
                    submission_date: date,
                    price: formData.get("cena"),
                    
                }
            )
        }

        fetch('http://localhost:3000/tenders/add', requestOptions)   //path to be chceked!!
            .then((response)=> {
                if (response.status === 200) {
                    setAdded(true)
                } else {
                    setServerError(true)
                }
            })
    }


    if(error){
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Ładowanie...</div>
    } else {

        return (
            <div>
                {added && <p><Navigate to="/addedSuccessful" state={props.value}/></p>}
                {serverError && <p>Wystąpił błąd!</p>}

                <h1>Formularz dodawania oferty do przetargu</h1>

                <form method="post" onSubmit={handleSubmit}>
                    <label>Wysokość oferty:{' '}
                        <input type="number" step="0.01" min="0" name="cena"/>
                    </label>
                    <br/>

                    <label>Instytuacja zamawiająca:{' '}
                        <select name="ca">
                            <option value={-1}>--Wybierz instytucję--</option>
                            {institutions.map((institution) =>
                                (<option value={institution.id} key={institution.id}>
                                    {institution.name} &nbsp;
                                </option>))}
                        </select>
                    </label>
                    <br />

                    <button type="submit">Prześlij</button>
                </form>
            </div>
        )
    }
}