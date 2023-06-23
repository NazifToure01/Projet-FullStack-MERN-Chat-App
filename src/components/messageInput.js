import React, { useEffect } from 'react';
import axios from "axios";
import io from "socket.io-client";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import {useContext} from "react";
import {MessageContext} from "../context";
import {useState} from "react";

let socket;

const MessageInput = () => {
    const navigate = useNavigate();
    const { addMessage } = useContext(MessageContext);
    const [messages, setMessages] = useState([]); // New state for the socket
    const username = Cookies.get('username');

    useEffect(() => {
        // Connect to the server
        socket = io("http://localhost:4000");
        return () => {
            // Disconnect on cleanup
            socket.disconnect();
        };
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const values = {};
        for (let [key, value] of data) {
            values[key] = value;
        }

        if (values.message !== '') {
            await axios.post('http://localhost:4000/api/messages', {content: values.message, username: username})
                .catch((error) => {
                    console.log(error);
                });
            // Emit the message to the server
            socket.emit("new-message", values.message);

            // Add the message to the context
            addMessage({content: values.message, username: username});
            // Clear the input
            setMessages('');


        } else {
            const error = document.getElementById('error');
            error.innerHTML = 'Veuillez entrer un message';
        }

    }

    return (
        <div className="w-full flex justify-center items-center py-2 text-justify">
            <form onSubmit={sendMessage}>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre Message</label>
                <textarea id="message" rows="4" name="message"
                          value={messages}
                          onChange={(e) => setMessages(e.target.value)}
                          className="block p-2 my-2 w-[600px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your thoughts here..."></textarea>

                <div className="flex justify-center items-center">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[300px]  px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Envoyer
                    </button>
                </div>

            </form>
        </div>
    )
}

export default MessageInput