'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";




export default function MainPageButton() {

    const router = useRouter();

    const redirectToIndex = () => {
        router.push('/');
    };


    return (
        <div className="flex items-center">

            <button type="submit" onClick={redirectToIndex} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2" >
                Main Page
            </button>




        </div>

    );




}