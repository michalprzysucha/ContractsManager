import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import TimeLeft from "./TimeLeft";

const TenderDetails = () => {
    const [tender, setTender] = useState(null);
    const [now, setNow] = useState(new Date());
    let {id} = useParams();
    let hasOfferWithinBudget = false;

    useEffect(() => {
        const intervalID = setInterval(() => setNow(new Date()), 100);
        getTenderDetails();
        return () => clearInterval(intervalID);
    }, [id]);

    const getTenderDetails = async() => {
        const response = await fetch(`http://localhost:3000/tenders/${id}`);
        setTender(await response.json());
    }

    if (!tender) {
        return <div>Ładowanie szczegółów przetargu...</div>;
    }


    return (
        <>
            <h1>{tender.name}</h1>
            <p><b>Instytucja zamawiająca:</b> {tender.contractingAuthority.name} </p>
            <p><b>Data i godzina rozpoczęcia przetargu:</b> {new Date(tender.startDate).toLocaleDateString("pl")} {new Date(tender.startDate).toLocaleTimeString("pl")}</p>
            <p><b>Data i godzina zakończenia przetargu:</b> {new Date(tender.endDate).toLocaleDateString("pl")} {new Date(tender.endDate).toLocaleTimeString("pl")}</p>
            {tender.description &&
                <>
                    <p><b>Opis</b>:</p>
                    <p>{tender.description}</p>
                </>
            }
            <p><b>Maksymalny budżet zamawiającego: </b>{tender.budget.toFixed(2)} zł</p>

            {new Date(tender.endDate) > now && new Date(tender.startDate) <= now &&
                <>
                    <p><b>Do zakończenia przetargu pozostało:</b> <TimeLeft value={tender.endDate}/></p>
                </>}

            {new Date(tender.endDate) > now ? (
                <>
                    {new Date(tender.startDate) <= now ? (
                        <>
                            <h4> Przetarg jest aktywny. Możesz dodać ofertę! </h4>
                            <a href={`/offers/add/${tender.id}`}>
                                <button type="button">Dodaj ofertę</button>
                            </a>
                        </>
                    ) : (
                        <h4> Przetarg jeszcze się nie zaczął! </h4>
                    )}
                </>
            ) : (
                <>
                    {tender.offers.length !== 0 ?
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
                        <h4>Brak ofert dla tego przetargu</h4>
                    }
                    {hasOfferWithinBudget ? (
                        <h4>Przetarg zakończony</h4>
                    ) : (
                        <h4>Przetarg zakończony bez roztrzygnięcia</h4>
                    )}
                </>
            )}
        </>
    );
};

export default TenderDetails;