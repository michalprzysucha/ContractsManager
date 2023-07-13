import React, { useEffect, useState } from 'react';

const TendersTable = () => {
  const [activeTenders, setActiveTenders] = useState([]);
  const [inactiveTenders, setInactiveTenders] = useState([]);
  const [closedTenders, setClosedTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveTenders();
    fetchInactiveTenders();
    fetchClosedTenders();
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
      const response = await fetch('http://localhost:3000/tenders/inactive');
      const data = await response.json();
      setInactiveTenders(data);
      setLoading(false);
    } catch (error) {
      console.error('Nastąpił błąd podczas ładowania przetargów:', error);
      setLoading(false);
    }
  };

  const fetchClosedTenders = async () => {
    try {
      const response = await fetch('http://localhost:3000/tenders/closed');
      const data = await response.json();
      setClosedTenders(data);
      setLoading(false);
    } catch (error) {
      console.error('Nastąpił błąd podczas ładowania przetargów:', error);
      setLoading(false);
    }
  };


  if (loading) {
    return <>Ładowanie...</>;
  }
  return (
    <>
      <h1>Przetargi</h1>
      <h2>Aktywne przetargi</h2>
      <table>
        <thead>
          <tr>
            <th>LP</th>
            <th>Nazwa przetargu</th>
            <th>Data rozpoczęcia</th>
            <th>Data zakończenia</th>
          </tr>
        </thead>
        <tbody>
          {activeTenders.map((a_tender, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><a href={`/tenders/${a_tender.id}`}>{a_tender.name}</a></td>
              <td>{new Date(a_tender.startDate).toLocaleDateString("pl")} {new Date(a_tender.startDate).toLocaleTimeString("pl")}</td>
              <td>{new Date(a_tender.endDate).toLocaleDateString("pl")} {new Date(a_tender.endDate).toLocaleTimeString("pl")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Nieaktywne przetargi</h2>
      <table>
        <thead>
          <tr>
            <th>LP</th>
            <th>Nazwa przetargu</th>
          </tr>
        </thead>
        <tbody>
          {inactiveTenders.map((i_tender, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><a href={`/tenders/${i_tender.id}`}>{i_tender.name}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Zamkniete przetargi</h2>
      <table>
        <thead>
          <tr>
            <th>LP</th>
            <th>Nazwa przetargu</th>
          </tr>
        </thead>
        <tbody>
          {closedTenders.map((c_tender, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><a href={`/tenders/${c_tender.id}`}>{c_tender.name}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TendersTable;