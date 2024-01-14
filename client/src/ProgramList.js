import React, { useState } from 'react';

const ProgramList = ({ programs, onProgramClick, onAddProgram,setPrograms,onDelete,setEditProgram }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleProgramClick = (program) => {
        onProgramClick(program);
        setEditProgram(false); // Turn off edit mode when a program is clicked
    };
    const handleDeleteClick = async (program) => {
        // Your delete logic here
        onDelete(program.id);
        // Update the programs state by removing the deleted program
        setEditProgram(false);
    };
    const filteredPrograms = programs
        .filter((program) => program.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            // Move the matched program to the top
            if (a.name.toLowerCase().startsWith(searchTerm.toLowerCase())) return -1;
            if (b.name.toLowerCase().startsWith(searchTerm.toLowerCase())) return 1;
            return 0;
        });

    

    return (
        <div className="program-list">
            <h2>Programs</h2>
            <input
                type="text"
                placeholder="Search by Program Name"
                value={searchTerm}
                onChange={handleSearchChange}
            />
             <button onClick={onAddProgram}>+</button>
            <ul>
                {filteredPrograms.map((program) => (
                    <li className="program-list-container" key={program.id} onClick={() => handleProgramClick(program)}>
                        {program.name}
                      <button onClick={() => handleDeleteClick(program)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProgramList;
