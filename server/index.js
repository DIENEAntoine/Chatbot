require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const OpenAI = require('openai');

const openai = new OpenAI();


app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    // Validation simple pour s'assurer que le message est fourni
    if (!userMessage) {
        return res.status(400).json({ message: "Le message ne peut pas être vide." });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {"role": "system", "content": "Tu es un expert en sportifs professionnels. A chaque fois que tu me réponds je veux que tu me donnes : le nom et prénom, la date de naissance, le poste favoris, 2 fun facts"},
                {"role": "user", "content": userMessage}
            ],
        model: "gpt-3.5-turbo",
        });
        

        const chatGptResponse = response.data.choices[0].text.trim();

        res.json({ message: chatGptResponse });
    } catch (error) {
        console.error("Erreur lors de la requête à l'API OpenAI:", error.response ? error.response.data : error.message);
        // Envoyer un message d'erreur plus spécifique si disponible
        const errorMessage = error.response ? error.response.data.error.message : "Erreur lors de la récupération des informations";
        res.status(500).json({ message: errorMessage });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
