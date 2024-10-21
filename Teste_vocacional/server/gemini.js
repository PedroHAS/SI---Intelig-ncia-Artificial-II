const axios = require('axios');

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';  
const GEMINI_API_KEY = 'AIzaSyB8SHExjHZDHvyqTOGr4LFEB19FMK70UKw';  // Substitua com a nova chave da API

async function analyzeTest(responses) {
    try {
        const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            contents: responses.map((response, index) => ({
                parts: [{ text: `Pergunta ${index + 1}: ${response}` }]
            }))
        });
        return response.data.suggestedCourses;  // Ajuste de acordo com o retorno da API
    } catch (error) {
        throw new Error('Erro ao comunicar com a API do Gemini');
    }
}

module.exports = { analyzeTest };
