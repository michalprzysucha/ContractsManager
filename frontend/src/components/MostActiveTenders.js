import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const MostActiveTenders = () => {
    const [tenders, setTenders] = useState(null);

    useEffect(() => {
        getTopActiveTenders();
    }, []);

    const getTopActiveTenders = async() => {
        const response = await fetch(`http://localhost:3000/tenders/top-active`);
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
                        <Link to={`/tenders/${tender.id}`}> {tender.name} </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default MostActiveTenders;
