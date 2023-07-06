import {useState, useEffect} from "react";


const TimeLeft = (props) => {
    const [dateDiff, setDateDiff] = useState(new Date(props.value)- new Date());

    useEffect(() => {
        const intervalID = setInterval(() => setDateDiff(new Date(props.value)- new Date()), 500);
        return () => clearInterval(intervalID);
    });

    return (
        <div>
            <h4>Do zakończenia przetargu pozostało: </h4>
            <p>{Math.trunc((dateDiff)/(3600000*24))}:{new Date(dateDiff).toISOString().substring(11,16)} (dni:godzin:minut)</p>
        </div>
    );
}

export default TimeLeft;
