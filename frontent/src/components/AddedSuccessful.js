import { useLocation } from "react-router-dom";
import {useEffect} from "react";

export const AddedSuccessful = () => {
    useEffect(() => {
        document.title='Sukces!';
    }, []);

    const { state } = useLocation();

    if(state==="company"){
        return(
            <p>Pomyślnie dodano firmę!</p>
        )
    }
    else{
        return(
            <p>Pomyślnie dodano instytucję!</p>
        )
    }
}

