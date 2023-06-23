import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Chat from "./pages/chat";
import SignIn from "./pages/signin";
import {MessageProvider} from "./context";

export default function App() {
    return (

        <MessageProvider>
            <Router>
                <Routes>
                    <Route path="/chat" element={<Chat/>}/>
                    <Route path="/" element={<SignIn/>}/>
                </Routes>
            </Router>
        </MessageProvider>
    )
}