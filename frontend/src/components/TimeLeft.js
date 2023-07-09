import {useState, useEffect} from "react";

const TimeLeft = (props) => {
    const [dateDiff, setDateDiff] = useState(new Date(props.value)- new Date());

    useEffect(() => {
        const intervalID = setInterval(() => setDateDiff(new Date(props.value)- new Date()), 100);
        return () => clearInterval(intervalID);
    });

    return (
        <>{Math.trunc((dateDiff)/(3600000*24))}:{new Date(dateDiff).toISOString().substring(11,16)} (dni:godzin:minut)</>
    );
}

export default TimeLeft;
