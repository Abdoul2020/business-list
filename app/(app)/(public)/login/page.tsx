'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";



import { signupUsingPassword } from '@/lib/supabase.auth.client'; //signup 

import { authenticateUsingPassword } from '@/lib/supabase.auth.client';
import { User } from '@supabase/supabase-js';

//import the neccessary
import { supabaseForClientComponent } from '@/lib/supabase.client';




export default function Page() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();




  useEffect(() => {

    console.log("userLog", user);

  }, [user])




  // Check if the user is logged in
  useEffect(() => {


    // function to check the session
    const checkSession = async () => {
      const response = await supabaseForClientComponent.auth.getSession();
      const currentUser: User | null = response.data.session?.user ?? null;
      setUser(currentUser);
      setLoading(false);
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


  //signUp data
  const handleSignUp = async () => {
    setLoading(true);
    const response = await signupUsingPassword({
      email,
      password,
      full_name: fullName
    });

    if (response.error) {
      console.error('Error while signing up:', response.error.message);
    } else {
      setUser(response.data.user);
    }
    setLoading(false);
  };

  // SignIn function
  const handleSignIn = async () => {
    setLoading(true);
    const credentials = { email, password };
    const response = await authenticateUsingPassword(credentials);

    if (response.error) {
      console.error('Error signing in:', response.error.message);
    } else {
      setUser(response.data.user);
    }
    setLoading(false);
  };



  // LOGOUT
  // const handleLogout = async () => {

  //   await supabase.auth.signOut();
  //   setUser(null);
  //   router.push('/');
  // };

  // Loading style
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // User is logged in

  if (user) {

    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-96 text-center">
          <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-300">
            You're already logged in
          </h1>
          <button
            // onClick={handleLogout}
            className="w-full p-3 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>

    );
  }

  // Login form for non-authenticated users
  return (

    <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">

        {/* <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        /> */}


        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />


        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />


        {/* <button
          onClick={handleSignUp}
          className="w-full mb-2 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
        >
          Sign Up
        </button> */}

        <button
          onClick={handleSignIn}
          className="w-full p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
        >
          Sign In
        </button>

      </div>
    </main>
  );
}
