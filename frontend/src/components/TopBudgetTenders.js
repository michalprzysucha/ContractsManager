import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const TopBudgetTenders = () => {
    const [tenders, setTenders] = useState(null);

    useEffect(() => {
        getTopBudgetTenders();
    }, []);

    const getTopBudgetTenders = async() => {
        const response = await fetch(`http://localhost:3000/tenders/top-budget`);
        setTenders(await response.json());
    }

    if (!tenders) {
        return <div>Ładowanie przetargów...</div>;
    }

    return (
        <>
            <ul>
                {tenders.map((tender, index) => (
                    <li key={index}>
                        <p>
                            <Link to={`/tenders/${tender.id}`}> {tender.name} </Link> {tender.budget} zł
                        </p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TopBudgetTenders;
