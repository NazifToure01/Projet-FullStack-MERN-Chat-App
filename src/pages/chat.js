import React, {useContext} from "react";
import Cookies from 'js-cookie';
import OtherMessageItem from "../components/otherMessageItem";
import MyMessageItem from "../components/myMessageItem";
import MessageInput from "../components/messageInput";
import {MessageContext} from "../context";

export default function Chat() {
    const { messages, addMessage } = useContext(MessageContext);

    //get cookie here for username
    const username = Cookies.get('username');

    if (!username) {
        window.location.href = '/';
    }

    const onDeconnexion = () => {
        Cookies.remove('username');
        window.location.href = '/';
    }

    return (
        <div className="flex flex-col items-center justify-center h- px-6">
            <h1 className="text-2xl font-bold my-4 text-gray-900 dark:text-white">Messages</h1>
            <div className="text-lg font-bold my-4 text-gray-900 dark:text-white">Bienvenue <span className="text-blue-500"> {username??  username}</span></div>
            <div className="flex  w-full max-w-4xl ">
                <button onClick={onDeconnexion} className="w-full text-end py-4 text-red-700 font-bold px-2">Deconnexion</button>
            </div>
           <div className="w-full bg-gray-100 max-w-4xl px-6 py-5 overflow-auto h-[750px]">
               {
                     messages.map((message, index) => {
                        if (message.username === username) {
                            return <MyMessageItem key={index} message={message.content} username={message.username} />
                        } else {
                            return <OtherMessageItem key={index} message={message.content} username={message.username} />
                        }
                    })
               }
           </div>
            <MessageInput />
        </div>
    )
}