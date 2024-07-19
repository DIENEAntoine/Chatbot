import React, { useState } from 'react';
import axios from 'axios';
import "./chatbot.css";

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const input = event.target.elements.message.value.trim();

        if (!input) {
            setError('Le champ de saisie ne peut pas être vide.');
            return;
        }
    
        // Ajouter le message saisi à la liste des messages
        const newMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        
        // Effacer le champ de saisie
        event.target.elements.message.value = '';
    
        // Envoyer le message au back-end
        axios.post('http://localhost:3001/chat', { message: input })
        .then(response => {
            const botMessage = response.data.message;
            // Mettre à jour les messages avec la réponse du chatbot
            setMessages(prevMessages => [...prevMessages, { id: Date.now(), text: botMessage, sender: 'bot' }]);
        })
        .catch(error => console.error('There was an error!', error));
        // setMessages([...messages, newMessage]);
        // setMessage('');
    };    

    return (
        <div className="chatbot-container">
            <h2 className="chatbot-title">ChatBot Sport</h2>
            <ul className="chat-messages">
                {messages.map((msg) => (
                    <li key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                        {msg.sender === 'user' ? `Vous: ${msg.text}` : `ChatBot: ${msg.text}`}
                        {/* <span className="message-sender">{msg.sender === 'user' ? 'Vous' : 'ChatBot'}</span> */}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input type="text" name="message" className="input-message" placeholder="Posez votre question ici..." />
                    <button type="submit" className="send-button">Envoyer</button>
                </div>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default ChatBot;