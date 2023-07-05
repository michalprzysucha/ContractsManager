import {useState, useEffect} from "react";

const DateAndTime = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => setDate(new Date()), 100);
        return () => clearInterval(intervalID);
    });

    return (
        <div>
            <p>Aktualna data i czas: {date.toLocaleDateString("pl")} {date.toLocaleTimeString("pl")}</p>
        </div>
    );
}

export default DateAndTime;
