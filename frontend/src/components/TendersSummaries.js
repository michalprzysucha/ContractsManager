import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import TimeLeft from "./TimeLeft";

const MostActiveTenders = (props) => {
    const [tenders, setTenders] = useState(null);
    let url = `http://localhost:3000/tenders/${props.value}`;

    useEffect(() => {
        getExpiringTenders();
    }, []);

    const getExpiringTenders = async() => {
        const response = await fetch(url);
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
                            <Link to={`/tenders/${tender.id}`}> {tender.name} </Link>
                            {props.value==="expiring" ? (
                                <TimeLeft value={tender.endDate} />
                            ) : (
                                props.value==="top-budget" && (
                                    <>{tender.budget} zł</>
                                )
                            )}
                        </p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default MostActiveTenders;
