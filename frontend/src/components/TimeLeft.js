import {useState, useEffect} from "react";


const TimeLeft = (props) => {
    const [secondsDiff, setSecondsDiff] = useState((new Date(props.value)- new Date())/1000);

    useEffect(() => {
        const intervalID = setInterval(() => setSecondsDiff((new Date(props.value)- new Date())/1000), 100);
        return () => clearInterval(intervalID);
    });

    return (
        <div>
            <h4>Do zakończnie przetargu pozostało: </h4>
            <p>dni: {Math.trunc((secondsDiff)/(60*60*24))}, godzin: {Math.trunc((secondsDiff)/(60*60))%24},
                minut: {Math.trunc((secondsDiff)/(60))%60}, sekund: {Math.trunc(secondsDiff)%60}</p>
        </div>
    );
}

export default TimeLeft;
