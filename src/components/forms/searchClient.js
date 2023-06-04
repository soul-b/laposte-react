import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import JwtKeyContext from '../context/JwtKeyContext';

const ClientSearch = ({ onSelectClient }) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const jwtKey = useContext(JwtKeyContext);

  useEffect(() => {
    // Fetch the list of clients from an API endpoint
    // Update the 'clients' state with the fetched data
    const fetchClients = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8089/api/client', {
          headers: {
            'Authorization': `Bearer ${jwtKey}`
          }});
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleSelectClient = (selectedOption) => {
    setSelectedClient(selectedOption);
    onSelectClient(selectedOption.value); // Pass the selected client ID to the parent component
  };

  const options = clients.map((client) => ({
    value: client.id,
    label: client.nom,
  }));

  return (
    <Select
      options={options}
      value={selectedClient}
      onChange={handleSelectClient}
      isSearchable
      placeholder="Search clients..."
    />
  );
};

export default ClientSearch;
