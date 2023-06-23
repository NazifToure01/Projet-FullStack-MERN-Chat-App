import React from "react";

const MyMessageItem = ({message, username}) => {

    return (
        <div className="w-full flex justify-start items-center py-2 text-justify">
            <div className="w-80  bg-green-300 text-black px-2 py-2 rounded-xl">
                <p className="text-[15px] pt-2 font-bold text-start">{username?? username}</p>
                {message?? message}
                <p className="text-[9px] pt-2 text-end">12/12/2023</p>
            </div>

        </div>
    )
}

export default MyMessageItem