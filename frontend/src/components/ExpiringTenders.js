import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import TimeLeft from "./TimeLeft";

const MostActiveTenders = () => {
    const [tenders, setTenders] = useState(null);

    useEffect(() => {
        getExpiringTenders();
    }, []);

    const getExpiringTenders = async() => {
        const response = await fetch(`http://localhost:3000/tenders/expiring`);
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
                            <Link to={`/tenders/${tender.id}`}> {tender.name} </Link> <TimeLeft value={tender.endDate} />
                        </p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default MostActiveTenders;
