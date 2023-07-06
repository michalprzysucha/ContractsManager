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

        const formTenderName = formData.get("tender_name")
        const formStartDate = formData.get("start_date")
        const formEndDate = formData.get("end_date")
        const formBudget = formData.get("budget")
        const formCA = formData.get("ca")
        if (/^$|^\s+$/.test(formTenderName)) {
            alert("Proszę wpisać nazwę!")
        }
        else if(/^$|^\s+$/.test(formBudget)){
            alert("Proszę wpisać budżet!")
        }
        else if(formStartDate>=formEndDate){
            alert("Data rozpoczęcia powinna być wcześniejsza od daty zakończenia!")
        }
        else if(formCA==="-1"){
            alert("Proszę wpisać instytucję zamawiającą!")
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(
                    {
                        tender_name: formTenderName,
                        start_date: formStartDate,
                        end_date: formEndDate,
                        description: formData.get("description"),
                        budget: formBudget,
                        ca: formCA
                    }
                )
            }

            fetch('http://localhost:3000/tenders/add', requestOptions)
                .then((response) => {
                    if (response.status === 200) {
                        setAdded(true)
                    } else {
                        setServerError(true)
                    }
                })
        }
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

                    <label>Instytucja zamawiająca:{' '}
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