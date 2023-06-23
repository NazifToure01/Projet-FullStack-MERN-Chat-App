import React from "react";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import {useEffect} from "react";

export default function SignIn() {

    const navigate = useNavigate();

    useEffect(() => {

        const username = Cookies.get('username');
        if (username) {
            navigate('/chat', {state: {username: username}});
        }

    }, [navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const values = {};
        for (let [key, value] of data) {
            values[key] = value;
        }
        if (values.username !== '') {
            //save cookie here for username
            Cookies.set('username', values.username);

            navigate('/chat', {state: {username: values.username}});
        } else {
            const error = document.getElementById('error');
            error.innerHTML = 'Veuillez entrer un nom d\'utilisateur';
        }
    }

    return (
        <div
            className="flex flex-col justify-center items-center w-full min-w-[200px]  h-screen bg-gray-50 dark:bg-gray-900">
            <form onSubmit={handleSubmit}>
                <p className="text-red-500" id="error"></p>
                <div className="mb-6">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre
                        nom d'utilisateur :</label>
                    <input type="text" id="username" name="username"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] md:w-[600px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="jhon220"/>
                </div>

                <div className="flex justify-center items-center">
                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Commencez
                    </button>
                </div>
            </form>
        </div>
    )
}
