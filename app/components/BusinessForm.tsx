'use client';
import React, { FormEvent } from 'react';
import { addBusiness } from "../server-actions/addBusiness";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';



export default function BusinessForm() {

    const router = useRouter();


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget); // Or construct formData as needed
        const result = await addBusiness(formData);

        //redirect when on success
        if (result && result.status) {
            router.push('/');
            toast.success("Successfully added Business !");
        } else {
            toast.error(`Error: ${result && result.error}`);
        }
    };







    return (
        <form onSubmit={handleSubmit} className="mb-6">

            <div className="mb-4">
                <label htmlFor="businessName" className="block text-white mb-2">Name</label>
                <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white"
                    required
                />
            </div>
            <button type="submit" className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded">
                Add Business
            </button>
        </form>
    )
}