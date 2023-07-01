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
    else if (state==="institution"){
        return(
            <p>Pomyślnie dodano instytucję!</p>
        )
    }
    else if (state==="tender"){
        return(
            <p>Pomyślnie dodano przetarg!</p>
        )
    }
    else{
        return(
            <p>Pomyślnie dodano!</p>
        )
    }
}

