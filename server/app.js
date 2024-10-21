const express = require('express');
const app = express();
const gemini = require('./gemini');
const bodyParser = require('body-parser');

// Configurações
app.use(bodyParser.json());

// Rota principal da API de teste vocacional
app.post('/api/vocational-test', async (req, res) => {
    const { responses } = req.body;

    if (!Array.isArray(responses) || responses.length !== 32) {
        return res.status(400).json({ error: "Por favor, preencha todas as perguntas." });
    }

    // Aqui chamamos a função que faz a análise e a comunicação com a API do Gemini
    try {
        const result = await gemini.analyzeTest(responses);
        res.json({ suggestedCourses: result });
    } catch (error) {
        res.status(500).json({ error: "Erro na comunicação com a API do Gemini." });
    }
});

// Inicializar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});