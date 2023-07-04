import {useState, useEffect} from "react";

const DateAndTime = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => setDate(new Date()), 250);
        return () => clearInterval(intervalID);
    });

    return (
        <div>
            <p>Aktualna data: {date.toLocaleDateString("pl")}</p>
            <p>Aktualny czas: {date.toLocaleTimeString("pl")}</p>
        </div>
    );
}

export default DateAndTime;
