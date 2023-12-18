import React from "react"


interface HeaderProps {
    isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps) {

    return (
        <header className=" bg-gray-800 p-6 rounded-lg shadow-lg text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src="https://assets-global.website-files.com/63217423f3f0f6c53321b537/6321751b0caa32a0eaa5408f_default-monochrome-white.svg"
                        alt="Logo"
                        className="w-8 h-8"
                    />
                    <h1 className="ml-2 text-xl font-bold">Business Market</h1>
                </div>
                {isLoggedIn ? (
                    <div className="flex items-center">
                        <img
                            src="https://assets-global.website-files.com/63217423f3f0f6c53321b537/6321751b0caa32a0eaa5408f_default-monochrome-white.svg"
                            alt="User"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="ml-2">User Name</span>
                    </div>
                ) : (
                    <button className="bg-white text-blue-500 px-4 py-2 rounded-full">Login</button>
                )}
            </div>
        </header>

    );




}