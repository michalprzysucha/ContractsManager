import {useState, useEffect} from "react";
import {Navigate} from "react-router-dom";

export const TenderForm = (props) => {
    const [error, setError] = useState(null);
    const [serverError, setServerError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [institutions, setInstitutions] = useState('');
    const [added, setAdded] = useState(false);

    useEffect(() => {
        document.title='Dodaj przetarg';

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
                    tender_name: formData.get("tender_name"),
                    start_date: formData.get("start_date"),
                    end_date: formData.get("end_date"),
                    description: formData.get("description"),
                    budget: formData.get("budget"),
                    ca: formData.get("ca")
                }
            )
        }

        fetch('http://localhost:3000/tenders/add', requestOptions)
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
        return <div>Loading...</div>
    } else {

        return (
            <div>
                {added && <p><Navigate to="/addedSuccessful" state={props.value}/></p>}
                {serverError && <p>Wystąpił błąd!</p>}

                <h1>Formularz dodawania przetargu</h1>

                <form method="post" onSubmit={handleSubmit}>
                    <label>Nazwa przetargu:{' '}
                        <input type="text" placeholder="Podaj nazwę przetargu" name="tender_name"/>
                    </label>
                    <br/>

                    <label>Data rozpoczęcia przetargu:{' '}
                        <input type="datetime-local" name="start_date"/>
                    </label>
                    <br/>

                    <label>Data zakończenia przetargu:{' '}
                        <input type="datetime-local" name="end_date"/>
                    </label>
                    <br/>

                    <label>Opis przetargu (opcjonalnie):{' '}
                        <input type="text" placeholder="Krótki opis przetargu" name="description"/>
                    </label>
                    <br/>

                    <label>Budżet:{' '}
                        <input type="number" step="0.01" min="0" name="budget"/>
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

export default TenderForm;