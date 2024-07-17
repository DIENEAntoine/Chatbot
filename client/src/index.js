import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatBot from './ChatBot';

const App = () => (
    <div>
        <ChatBot />
    </div>
);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);