import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";

const TenderDetails = () => {
    const [tender, setTender] = useState(null);
    const now = new Date();
    let {id} = useParams();
    let hasOfferWithinBudget = false;

    useEffect(() => {
        getTenderDetails();
    }, [id]);

    const getTenderDetails = async() => {
        const response = await fetch(`http://localhost:3000/tenders/${id}`);
        const temp = await response.json();
        setTender(temp[0]);
    }

    if (!tender) {
        return <div>Ładowanie szczegółów przetargu...</div>;
    }


    return (
        <>
            <h1>{tender.name}</h1>
            <p><b>Instytucja zamawiająca: </b> {tender.contractingAuthority.name} </p>
            <p><b>Data i godzina rozpoczęcia przetargu:</b> {new Date(tender.startDate).toLocaleDateString("pl")} {new Date(tender.startDate).toLocaleTimeString("pl")}</p>
            <p><b>Data i godzina zakończenia przetargu:</b> {new Date(tender.endDate).toLocaleDateString("pl")} {new Date(tender.endDate).toLocaleTimeString("pl")}</p>
            {tender.description ?
                <>
                    <p><b>Opis</b>:</p>
                    <p>{tender.description}</p>
                </>
            :
                <></>
            }
            <p><b>Maksymalny budżet zamawiającego: </b>{tender.budget.toFixed(2)} zł</p>
            {tender.offers ?
                <>
                    <h2>Tabela ofert</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>LP</th>
                            <th>Nazwa firmy</th>
                            <th>Data i czas wpłynięcia oferty</th>
                            <th>Proponowana cena</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tender.offers.map((offer, index) => {
                            const { company, submissionDate, price } = offer;
                            const formattedSubmissionDate = `${new Date(submissionDate).toLocaleDateString("pl")} ${new Date(submissionDate).toLocaleTimeString("pl")}`;
                            if (price <= tender.budget)
                                hasOfferWithinBudget = true

                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{company.name}</td>
                                    <td>{formattedSubmissionDate}</td>
                                    <td>{price.toFixed(2)} zł</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </>
                :
                <p>Brak ofert dla tego przetargu</p>
            }

            {new Date(tender.startDate) <= now && new Date(tender.endDate) > now ? (
                <>
                    <p>Przetarg jest aktywny. Możesz dodać ofertę!</p>
                    <a href={`/offers/add/${tender.id}`}>
                        <button type="button">Dodaj ofertę</button>
                    </a>
                </>
            ) : (
                <>
                    {hasOfferWithinBudget ? (
                        <p>Przetarg zakończony</p>
                    ) : (
                        <p>Przetarg zakończony bez roztrzygnięcia</p>
                    )}
                </>
            )}
        </>
    );
};

export default TenderDetails;