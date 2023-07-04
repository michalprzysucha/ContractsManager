import DateAndTime from "./DateAndTime";

function Home(){
    return(
        <>
            <h1>Witamy na stronie do zarządzania przetargami</h1>
            <DateAndTime />
            <div id="summaries_wrapper">
                <div class="summary_box"><h3>Aktywne przetargi z największą liczbą ofert</h3></div>
                <div class="summary_box"><h3>Przetargi bliskie zakończenia</h3></div>
                <div class="summary_box"><h3>Przetargi o największym budżecie</h3></div>
            </div>
        </>
    );
}

export default Home;
