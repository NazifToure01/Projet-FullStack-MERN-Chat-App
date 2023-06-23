import React from "react";
import Cookies from 'js-cookie';

const OtherMessageItem = ({message, username}) => {

    return (
        <div className="w-full flex justify-end items-center py-2 text-justify">
            <div className="w-80  bg-green-600 text-white px-2 py-2 rounded-xl">
                <p className="text-[15px] pt-2 text-black font-bold text-start">{username?? username}</p>
                {message?? message}
                <p className="text-[9px] pt-2 text-end">12/12/2023</p>
            </div>

        </div>
    )
}

export default OtherMessageItem