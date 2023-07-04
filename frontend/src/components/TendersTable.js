import React, { useEffect, useState } from 'react';

const TendersTable = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      const response = await fetch('http://localhost:3000/tenders');
      const data = await response.json();
      setTenders(data);
      setLoading(false);
    } catch (error) {
      console.error('Nastąpił błąd podczas ładowania przetargów:', error);
      setLoading(false);
    }
  };

  const getStatusString = (tenderDate) => {
    const currentDate = new Date();
    return currentDate > tenderDate ? 'Wygasł' : 'Aktywny';
  };

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div>
      <h1>Przetargi</h1>
      <table>
        <thead>
          <tr>
            <th>LP</th>
            <th>Nazwa przetargu</th>
            <th>Data rozpoczęcia</th>
            <th>Data zakończenia</th>
            <th>Opis</th>
            <th>Budżet</th>
            <th>Status aktywności</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{tender.name}</td>
              <td>{new Date(tender.startDate).toLocaleDateString("pl")} {new Date(tender.startDate).toLocaleTimeString("pl")}</td>
              <td>{new Date(tender.endDate).toLocaleDateString("pl")} {new Date(tender.endDate).toLocaleTimeString("pl")}</td>
              <td>{tender.description}</td>
              <td>{tender.budget}</td>
              <td>{getStatusString(tender.endDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TendersTable;