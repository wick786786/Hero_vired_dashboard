// ProgramForm.js
import React, { useState, useEffect } from 'react';
import api from './api'; // Adjust the path if needed
const initialFormData = {
    name: '',
    price: '',
    domain: '',
    program_type: '',
    registrations_status: '',
    description: '',
    placement_assurance: false,
    image_url: '',
    university_name: '',
    faculty_profile_url: '',
    learning_hours: '',
    duration: '',
    certificate_diploma: '',
    eligibility_criteria: '',
};

const ProgramForm = ({ program, onSave,onCancel }) => {
    const [formData, setFormData] = useState(program);

    useEffect(() => {
        setFormData(program);
    }, [program]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const  handleSave = async () => {
        await onSave(formData);
        // Reset the form data after saving changes
        setFormData({ ...initialFormData })
    };
    
    

    return (
        <form>
            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>Price:</label>
            <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>Domain:</label>
            <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>Program Type:</label>
            <input
                type="text"
                name="program_type"
                value={formData.program_type}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>Registrations Status:</label>
            <input
                type="text"
                name="registrations_status"
                value={formData.registrations_status}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>Description:</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>Placement Assurance:</label>
            <input
                type="checkbox"
                name="placement_assurance"
                checked={formData.placement_assurance}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>Image URL:</label>
            <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>University Name:</label>
            <input
                type="text"
                name="university_name"
                value={formData.university_name}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>Faculty Profile URL:</label>
            <input
                type="text"
                name="faculty_profile_url"
                value={formData.faculty_profile_url}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>Learning Hours:</label>
            <input
                type="text"
                name="learning_hours"
                value={formData.learning_hours}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>Duration:</label>
            <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>Certificate/Diploma:</label>
            <input
                type="text"
                name="certificate_diploma"
                value={formData.certificate_diploma}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            <label>Eligibility Criteria:</label>
            <textarea
                name="eligibility_criteria"
                value={formData.eligibility_criteria}
                onChange={handleChange}
                readOnly={!program.isEditMode}
            />

            {formData.isEditMode && (
            
                <button type="button" onClick={handleSave}>
                    Save
                </button>
                
            
                
            )}
            
             
            <button type="button" onClick={onCancel}>
                {formData.isEditMode ? 'Cancel' : 'Edit'}
            </button>
        </form>
    );
};

export default ProgramForm;
