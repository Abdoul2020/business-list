'use client'

import React, { useState, useEffect } from "react";
import { supabaseForClientComponent } from '@/lib/supabase.client';
import { logout } from '@/lib/supabase.auth.client';
import { User } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";




export default function Header() {

    const router = useRouter();


    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {

        // function to check the session
        const checkSession = async () => {
            const response = await supabaseForClientComponent.auth.getSession();
            const currentUser: User | null = response.data.session?.user ?? null;
            setUser(currentUser);
        };


        // Execute the checkSession
        checkSession();
        // Add a listener when auh chnage
        const { data } = supabaseForClientComponent.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            data.subscription.unsubscribe();
        };

    }, []);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        router.push('/');
    };


    const redirectToLogin = () => {
        router.push('/signin');
        
    };

    const redirectTobisnessList = () => {
        router.push('/business-list');
    };


    return (
        <header className=" bg-gray-800 p-6 rounded-lg shadow-lg text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src="https://assets-global.website-files.com/63217423f3f0f6c53321b537/6321751b0caa32a0eaa5408f_default-monochrome-white.svg"
                        alt="Logo"
                        className="w-8 h-8"
                    />
                    <h1 className="ml-2 text-xl font-bold">Business List</h1>
                </div>
                {user ? (
                    <div className="flex items-center">

                        <button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2" onClick={redirectTobisnessList}>
                            My Account
                        </button>

                        <button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2" onClick={handleLogout}>
                            Sign out
                        </button>

                    </div>
                ) : (
                    <button className="bg-white text-blue-500 px-4 py-2 rounded-full" onClick={redirectToLogin} > Sign in</button>
                )}
            </div>
        </header>

    );




}