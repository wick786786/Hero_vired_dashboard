import React, { useState, useEffect } from 'react';
import ProgramList from './ProgramList';
import ProgramDetails from './ProgramDetails';
import './App.css';

const App = () => {
    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isAddingProgram, setAddingProgram] = useState(false);
    const [editProgram, setEditProgram] = useState(false);
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
        setEditProgram(false);
    };

    const handleAddProgram = () => {
        setSelectedProgram(null);
        setAddingProgram(true);
        setEditProgram(true); 
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
    //remeber to remove this
    const handleDelete = async () => {
        if (!selectedProgram) {
            return;
        }
    
        try {
            // Make a DELETE request to your API endpoint
            await fetch(`http://localhost:5000/programs/${selectedProgram.id}`, {
                method: 'DELETE',
            });
    
            // Update the programs state by filtering out the deleted program
            const updatedPrograms = programs.filter(program => program.id !== selectedProgram.id);
            setPrograms(updatedPrograms);
    
            // Clear the selected program
            setSelectedProgram(null);
        } catch (error) {
            console.error('Error deleting program:', error);
            // Handle error if needed
        }
    };
    
    const handleDeleteProgram = async (programId) => {
        try {
            // Call the API to delete the program
            await fetch(`http://localhost:5000/programs/${programId}`, {
                method: 'DELETE',
            });

            // Update the programs state by filtering out the deleted program
            setPrograms((prevPrograms) => prevPrograms.filter((program) => program.id !== programId));
            setSelectedProgram(null); // Clear the selected program

            console.log(`Program with ID ${programId} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting program:', error);
            // Handle error if needed
        }
    };


    return (
        <div className="app-container">
            <ProgramList
                programs={programs}
                onProgramClick={handleProgramClick}
                onAddProgram={handleAddProgram}
                setPrograms={setPrograms}
                onDelete={handleDeleteProgram}
                setEditProgram={setEditProgram}
            />
            {isAddingProgram ? (
                <ProgramDetails
                    program={null}
                    onEdit={() => {}}
                    onSave={handleSaveProgram}
                    onDelete={handleDelete}
                    isAddingNew
                />
            ) : (
                <ProgramDetails
                    program={selectedProgram}
                    onEdit={() => {}}
                    onSave={() => {}}
                    onDelete={handleDelete}
                    setPrograms={setPrograms}
                />
            )}
        </div>
    );
};

export default App;
