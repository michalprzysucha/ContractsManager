import {useState, useEffect} from "react";

const DateAndTime = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => setDate(new Date()), 100);
        return () => clearInterval(intervalID);
    });

    return (
        <>
            <p>Aktualna data i czas: {date.toLocaleDateString("pl")} {date.toLocaleTimeString("pl")}</p>
        </>
    );
}

export default DateAndTime;
