import React, { useState, useEffect } from 'react';

const MostActiveTenders = () => {
    const [tenders, setTenders] = useState(null);

    useEffect(() => {
        getTopActiveTenders();
    }, []);

    const getTopActiveTenders = async() => {
        const response = await fetch(`http://localhost:3000/tenders/top-active`);
        const temp = await response.json();
        setTenders(temp);
    }

    if (!tenders) {
        return <div>Ładowanie przetargów...</div>;
    }

    return (
        <>
            <p>{tenders}</p>
            {/*{tenders.map((tender, index) => {*/}
            {/*    return (*/}
            {/*        <tr key={index}>*/}
            {/*            <td>{index + 1}</td>*/}
            {/*            <td>{company.name}</td>*/}
            {/*            <td>{formattedSubmissionDate}</td>*/}
            {/*            <td>{price.toFixed(2)} zł</td>*/}
            {/*        </tr>*/}
            {/*    );*/}
            {/*})}*/}
        </>
    );
}

export default MostActiveTenders;
