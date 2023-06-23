import React from "react";
import image from "../assets/images/image.png";

export default function classItem(){
    return(
        <div className="flex flex-row py-2 justify-center ">
            <div>
                <img className="w-6 h-6 rounded-full" src={image}
                     alt="Rounded avatar" />
            </div>
            <div className="border-b-2 border-gray-300">Master informatique developpement</div>
        </div>
    )}

