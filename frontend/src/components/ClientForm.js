import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

const ClientForm = (props) => {
    useEffect(() => {
        document.title='Formularz';
    }, []);

    const [added, setAdded] = useState(false);
    const [serverError, setServerError] = useState(false);

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formName = formData.get("name")
        if (/^$|^\s+$/.test(formName)) {
            alert("Proszę wpisać nazwę!")
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({name: formName})
            };

            let url;
            if (props.value === "company") {
                url = 'http://localhost:3000/companies/add'
            } else {
                url = 'http://localhost:3000/ca/add'
            }

            fetch(url, requestOptions)
                .then((response) => {
                    if (response.status === 200) {
                        setAdded(true)
                    } else if (response.status === 409) {
                        if(props.value === "company") {
                            alert("Istnieje już firma o podanej nazwie!")
                        }
                        else{
                            alert("Istnieje już instytucja o podanej nazwie!")
                        }
                    }
                    else{
                        setServerError(true);
                    }
                })
        }
    }

    return (
        <>
            {added && <p><Navigate to="/addedSuccessful" state={props.value}/></p>}
            {serverError && <p>Wystąpił błąd!</p>}

            { props.value==="company" ?
                <h1>Formularz dodawania firmy</h1>
                :
                <h1>Formularz dodawania instytucji publicznej</h1>
            }
            <form method="post" onSubmit={handleSubmit}>
                { props.value==="company" ?
                    <label>Nazwa firmy:<br />
                        <input type="text" placeholder="Podaj nazwę firmy" name="name"/>
                    </label>
                    :
                    <label>Nazwa instytucji:<br />
                        <input type="text" placeholder="Podaj nazwę instytucji" name="name"/>
                    </label>
                }
                <br />
                <button type="reset">Wyczyść</button>
                {' '}
                <button type="submit">Prześlij</button>
            </form>
        </>
    )
}

export default ClientForm;