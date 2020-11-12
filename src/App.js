import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(res => {
      setRepositories(res.data);
    });
  }, []);


  async function handleAddRepository() {
    const res = await api.post("repositories", { 
      title: `React App ${Date.now()}`,
      url: "www.google.com",
      techs: ["NodeJS", "ReactJS", "ReactNative"]
    });

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)

    const repositorieIndex = repositories.findIndex(repository => repository.id === id);

    repositories.splice(repositorieIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
        
      <ul data-testid="repository-list">
        {repositories.map(repositorie => {
          return (
            <li key={repositorie.id} >{repositorie.title}
              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>
            </li>
          );
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
