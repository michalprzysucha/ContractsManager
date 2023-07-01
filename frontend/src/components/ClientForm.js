import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

export const ClientForm = (props) => {
    useEffect(() => {
        document.title='Formularz';
    }, []);

    const [added, setAdded] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        let url;
        if(props.value==="company") {
            url='http://localhost:3000/companies/add'
        }
        else{
            url='http://localhost:3000/ca/add'
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ name: formData.get("name")})
        };

        fetch(url, requestOptions)
            .then(function (response) {
                if (response.status === 200) {
                    setAdded(true)
                } else {
                    setError(true);
                }
            })
    }

    return (
        <div>
            {added && <p><Navigate to="/addedSuccessful" state={props.value}/></p>}
            {error && <p>Wystąpił błąd!</p>}

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
        </div>
    )
}

export default ClientForm;