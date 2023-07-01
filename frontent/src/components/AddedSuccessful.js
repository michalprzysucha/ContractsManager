import { useLocation } from "react-router-dom";

export const AddedSuccessful = () => {
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

