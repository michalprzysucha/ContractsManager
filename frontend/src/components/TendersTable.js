import React, { useEffect, useState } from 'react';

const TendersTable = () => {
  // const [tenders, setTenders] = useState([]);
  const [activeTenders, setActiveTenders] = useState([]);
  const [inactiveTenders, setInactiveTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveTenders();
    fetchInactiveTenders();
  }, []);

  const fetchActiveTenders = async () => {
    try {
      const response = await fetch('http://localhost:3000/tenders/');
      const data = await response.json();
      setActiveTenders(data);
      setLoading(false);
    } catch (error) {
      console.error('Nastąpił błąd podczas ładowania przetargów:', error);
      setLoading(false);
    }
  };

  const fetchInactiveTenders = async () => {
    try {
      const response = await fetch('http://localhost:3000/tenders/closed');   
      const data = await response.json();
      setInactiveTenders(data);
      setLoading(false);
    } catch (error) {
      console.error('Nastąpił błąd podczas ładowania przetargów:', error);
      setLoading(false);
    }
  };

  // const fetchTenders = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/tenders');
  //     const data = await response.json();
  //     setTenders(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Nastąpił błąd podczas ładowania przetargów:', error);
  //     setLoading(false);
  //   }
  // };


  // const getStatusString = (tenderDate) => {
  //   const currentDate = new Date();
  //   return currentDate > tenderDate ? 'Wygasł' : 'Aktywny';
  // };

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div>
      <h1>Przetargi</h1>
      <h2>Aktywne przetargi</h2>
      <table>
        <thead>
          <tr>
            <th>LP</th>
            <th>Nazwa przetargu</th>
            <th>Data rozpoczęcia</th>
            <th>Data zakończenia</th>
            <th>Opis</th>
            <th>Budżet</th>
          </tr>
        </thead>
        <tbody>
          {activeTenders.map((a_tender, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{a_tender.name}</td>
              <td>{new Date(a_tender.startDate).toLocaleDateString("pl")} {new Date(a_tender.startDate).toLocaleTimeString("pl")}</td>
              <td>{new Date(a_tender.endDate).toLocaleDateString("pl")} {new Date(a_tender.endDate).toLocaleTimeString("pl")}</td>
              <td>{a_tender.description}</td>
              <td>{a_tender.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Niekatywne przetargi</h2>
      <table>
        <thead>
          <tr>
            <th>LP</th>
            <th>Nazwa przetargu</th>
            <th>Data rozpoczęcia</th>
            <th>Data zakończenia</th>
            <th>Opis</th>
            <th>Budżet</th>
          </tr>
        </thead>
        <tbody>
          {inactiveTenders.map((i_tender, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{i_tender.name}</td>
              {/* <td>{new Date(i_tender.startDate).toLocaleDateString("pl")} {new Date(i_tender.startDate).toLocaleTimeString("pl")}</td> */}
              <td>{i_tender.startDate}</td>
              <td>{new Date(i_tender.endDate).toLocaleDateString("pl")} {new Date(i_tender.endDate).toLocaleTimeString("pl")}</td>
              <td>{i_tender.description}</td>
              <td>{i_tender.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TendersTable;