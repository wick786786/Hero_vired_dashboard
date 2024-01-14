import React, { useState } from 'react';
import ProgramForm from './ProgramForm';
import api from './api'; // Import the api.js file

const ProgramDetails = ({ program, onEdit, onSave, onDelete, setPrograms ,isAddingNew}) => {
    const [isEditMode, setEditMode] = useState(isAddingNew);

    const handleToggleEdit = () => {
        setEditMode(!isEditMode);
    };

    const updateProgram = async (updatedData) => {
        try {
            await api.updateProgram(program.id, updatedData);
    
            // Fetch the updated program data
            const updatedProgram = await api.getProgram(program.id);
    
            // Handle the updated data as needed
            console.log('Program updated:', updatedProgram);
            setEditMode(false); 
            if(setPrograms){
            setPrograms((prevPrograms) => {
                const updatedPrograms = prevPrograms.map((p) =>
                    p.id === program.id ? updatedProgram : p
                );
                return updatedPrograms;
            });
    
        }
        } catch (error) {
            console.error('Error updating program:', error);
            // Handle error if needed
        }
    };
    

    const handleSave = (updatedData) => {
        onSave(updatedData);
        setEditMode(false);
    };

    return (
        <div className="program-details">
            {program ? (
                <>
                    {isEditMode ? (
                        <h2>Edit Program</h2>
                    ) : (
                        <h2>{program.name}</h2>
                    )}

                    <ProgramForm
                        program={{ ...program, isEditMode }}
                        onSave={updateProgram}
                        onCancel={handleToggleEdit}
                    />

                    {!isEditMode && (
                        <button onClick={onDelete}>Delete</button>
                    )}
                </>
            ) : (
                <>
                    <h2>Add New Program</h2>
                    <ProgramForm
                        program={{ isEditMode }}
                        onSave={handleSave}
                        onCancel={handleToggleEdit}
                    />
                </>
            )}
        </div>
    );
};

export default ProgramDetails;
