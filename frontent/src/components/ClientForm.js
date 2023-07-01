import {useState} from "react";
import {Navigate} from "react-router-dom";

export const ClientForm = (props) => {
    const [added, setAdded] = useState('');
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
      //  console.log(formData.get("name"));

        setAdded(true)
    }

    return (
        <div>
            {added && <p><Navigate to="/addedSuccessful" state={props.value}/></p>}

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