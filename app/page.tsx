'use client'
import { useState } from "react";

export default async function Page() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const businesses = [
    { name: 'Business 1', email: 'business1@example.com' },
    { name: 'Business 2', email: 'business2@example.com' },
    { name: 'Business 3', email: 'business3@example.com' },
  ];

  return (

    <div>

      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <h1 className="ml-2 text-xl font-bold">Your App</h1>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center">
              <img src="/user-image.jpg" alt="User" className="w-8 h-8 rounded-full" />
              <span className="ml-2">User Name</span>
            </div>
          ) : (
            <button className="bg-white text-blue-500 px-4 py-2 rounded-full">Login</button>
          )}
        </div>
      </header>


      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold">Businesses</h2>
        <div className="mt-4 space-y-4">
          {businesses.map((business, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">{business.name}</h3>
              <p className="text-gray-500">{business.email}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
