import TendersSummaries from "./TendersSummaries";

const Home = () => {
    return(
        <>
            <h1>Witamy na stronie do zarządzania przetargami</h1>
            <div id="summaries_wrapper">
                <div className="summary_box">
                    <h3>Aktywne przetargi z największą liczbą ofert</h3>
                    <TendersSummaries value="top-active"/>
                </div>
                <div className="summary_box">
                    <h3>Przetargi bliskie zakończenia</h3>
                    <TendersSummaries value="expiring"/>
                </div>
                <div className="summary_box">
                    <h3>Przetargi o największym budżecie</h3>
                    <TendersSummaries value="top-budget"/>
                </div>
            </div>
        </>
    );
}

export default Home;
