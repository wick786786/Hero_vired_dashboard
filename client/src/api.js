const apiUrl = 'http://localhost:5000/programs';

const api = {
    getProgram: async (id) => {
        const response = await fetch(`${apiUrl}/${id}`);
        const data = await response.json();
        return data;
    },
    getAllPrograms: async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    },
    updateProgram: async (id, updatedData) => {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Failed to update program');
        }
    },
};

export default api;
