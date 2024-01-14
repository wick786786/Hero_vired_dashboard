import React, { useState, useEffect } from 'react';
import ProgramList from './ProgramList';
import ProgramDetails from './ProgramDetails';
import './App.css';

const App = () => {
    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isAddingProgram, setAddingProgram] = useState(false);

    useEffect(() => {
        // Fetch programs from the API
        fetch('http://localhost:5000/programs')
            .then((response) => response.json())
            .then((data) => setPrograms(data))
            .catch((error) => console.error('Error fetching programs:', error));
    }, []);

    const handleProgramClick = (program) => {
        setSelectedProgram(program);
        setAddingProgram(false);
    };

    const handleAddProgram = () => {
        setSelectedProgram(null);
        setAddingProgram(true);
    };

    const handleSaveProgram = (newProgram) => {
        fetch('http://localhost:5000/programs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProgram),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the programs state with the new program
                setPrograms([...programs, data]);
            })
            .catch((error) => console.error('Error adding program:', error));
    
        setAddingProgram(false); // Close the add program form
    };
    

    return (
        <div className="app-container">
            <ProgramList
                programs={programs}
                onProgramClick={handleProgramClick}
                onAddProgram={handleAddProgram}
                setPrograms={setPrograms}
            />
            {isAddingProgram ? (
                <ProgramDetails
                    program={null}
                    onEdit={() => {}}
                    onSave={handleSaveProgram}
                    onDelete={() => {}}
                    isAddingNew
                />
            ) : (
                <ProgramDetails
                    program={selectedProgram}
                    onEdit={() => {}}
                    onSave={() => {}}
                    onDelete={() => {}}
                    setPrograms={setPrograms}
                />
            )}
        </div>
    );
};

export default App;
