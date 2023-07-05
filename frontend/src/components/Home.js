import DateAndTime from "./DateAndTime";
import MostActiveTenders from "./MostActiveTenders";
import ExpiringTenders from "./ExpiringTenders";
import TopBudgetTenders from "./TopBudgetTenders";

function Home(){
    return(
        <>
            <h1>Witamy na stronie do zarządzania przetargami</h1>
            <div id="summaries_wrapper">
                <div className="summary_box">
                    <h3>Aktywne przetargi z największą liczbą ofert</h3>
                    <MostActiveTenders />
                </div>
                <div className="summary_box">
                    <h3>Przetargi bliskie zakończenia</h3>
                    <ExpiringTenders />
                </div>
                <div className="summary_box">
                    <h3>Przetargi o największym budżecie</h3>
                    <TopBudgetTenders />
                </div>
            </div>
        </>
    );
}

export default Home;
