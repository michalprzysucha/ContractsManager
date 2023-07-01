import React from "react";

export const CompanyForm = () => {
    return (
        <div>
            <h1>Formularz dodawania firmy</h1>
            <form>
                <label>Nazwa firmy{' '}
                    <input type="text" placeholder="Podaj nazwę firmy"/>
                </label>
                {' '}
                <button type="submit">Prześlij</button>
            </form>
        </div>
    )
}

export default CompanyForm;