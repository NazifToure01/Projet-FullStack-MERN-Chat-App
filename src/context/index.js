import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { io } from "socket.io-client";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null); // New state for the socket

    useEffect(() => {
        setSocket(io("http://localhost:4000")); // Initialise the socket
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/messages');
                setMessages(res.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchMessages();
    }, []);


    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const value = {
        messages,
        addMessage,
        socket // Pass the socket as part of the context value
    };

    return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    );
}
