const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors());

app.use(express.json()); // Pour parser les corps JSON des requêtes POST

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const options = {
            method: 'get',
            url: `https://v3.football.api-sports.io/status`,
            headers: {
                'x-rapidapi-key': '', // Remplacez VOTRE_CLÉ_API par votre clé API réelle
                'x-rapidapi-host': 'v3.football.api-sports.io'
            }
        };

        const response = await axios(options);
        
        // La structure de la réponse dépend de l'API. Vous devrez peut-être ajuster le code suivant.
        const playerInfo = response.data;
        
        // Envoyer les informations du joueur en réponse
        res.json({ message: playerInfo });
    } catch (error) {
        console.error("Erreur lors de la requête à l'API:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des informations" });
    }
    
    // // Simuler une réponse du ChatBot
    // const botResponse = `Echo: ${userMessage}`;
    
    // res.json({ message: botResponse });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});