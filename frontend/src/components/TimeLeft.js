import {useState, useEffect} from "react";


const TimeLeft = (props) => {
    const [date, setDate] = useState(new Date(new Date(props.value)- new Date()).toISOString().substring(11,19));

    useEffect(() => {
        const intervalID = setInterval(() => setDate(new Date(new Date(props.value)- new Date()).toISOString().substring(11,19)), 100);
        return () => clearInterval(intervalID);
    });

    return (
        <div>
            <h4>UWAGA</h4>
            <p>Przetarg niebawem się zakończy. Pozostało czasu: {date}</p>
        </div>
    );
}

export default TimeLeft;
