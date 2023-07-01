import {useState, useEffect} from "react";
import {Navigate} from "react-router-dom";


async function getInstitutions() {
    return await fetch('http://localhost:3000/ca/list')
        .then(response => response.json())
}

export const TenderForm = (props) => {
    const [institutions, setInstitutions] = useState('');
    const [added, setAdded] = useState('');

    useEffect(() => {
        document.title='Dodaj przetarg';

        const institutionsServer= getInstitutions()
        institutionsServer.then((inst)=>{setInstitutions(inst)})
        })

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

    /*
       const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ username: formData.get("name")})
        };
        fetch('http://localhost:3000/login', requestOptions)
            .then(function(response){
                if(response.status===200) {setAdded(true)}
                else{setWrong(true)}
            });
  */

        setAdded(true)
    }


    /*

                    <label>Instytuacja zamawiająca:{' '}
                    <select name="ca">
                        <option value="">--Wybierz instytucję--</option>
                        {institutions.map((institution) =>
                            (<option value={institution.id}>
                                {institution.name} &nbsp;
                            </option>))}
                    </select>
                </label>
                <br />
     */

    return (
        <div>
            {added && <p><Navigate to="/addedSuccessful" state={props.value}/></p>}

            <h1>Formularz dodawania przetargu</h1>

            <form method="post" onSubmit={handleSubmit}>
                <label>Nazwa przetargu:{' '}
                    <input type="text" placeholder="Podaj nazwę przetargu" name="tender_name"/>
                </label>
                <br />

                <label>Data rozpoczęcia przetargu:{' '}
                    <input type="datetime-local" name="start_date"/>
                </label>
                <br />

                <label>Data zakończenia przetargu:{' '}
                    <input type="datetime-local" name="end_date"/>
                </label>
                <br />

                <label>Opis przetargu (opcjonalnie):{' '}
                    <input type="text" placeholder="Krótki opis przetargu" name="description"/>
                </label>
                <br />

                <label>Budżet:{' '}
                    <input type="number" step="0.01" min="0" name="budget"/>
                </label>
                <br />



                <button type="submit">Prześlij</button>
            </form>
        </div>
    )
}