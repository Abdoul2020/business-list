'use client';
import { useState, FormEvent, useEffect } from "react";
import { Database } from "@/lib/database.types";
import { updateBusiness } from "../server-actions/updateBusiness";
import { useRouter } from "next/navigation";
import { deleteBusiness } from "../server-actions/deleteBusiness";
import { toast } from 'react-toastify';




interface EditBusinessProps {
    business: Database;
}


export default function EditBusiness({ business }: EditBusinessProps) {


  


    const router = useRouter();

    //show update Modal
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({

        name: business.name,
        id: business.id
    })



    const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleSubmitUpdate = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget); // Or construct formData as needed
        const result = await updateBusiness(formData);

        //redirect when on success
        if (result && result.status) {
            router.push('/');
            toast.success("Successfully Updated Business !");
        } else {
            toast.error(`Error: ${result && result.error}`);
        }
    };


    const handleSubmitDelete = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget); // Or construct formData as needed
        const result = await deleteBusiness(formData);

        //redirect when on success
        if (result && result.status) {
            router.push('/');
            toast.success("Successfully deleted Business !");
        } else {
            toast.error(`Error: ${result && result.error}`);
        }
    };



    return (

        <div>
            <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center px-4">
                    <div className="modal-content bg-gray-900 p-6 rounded-lg w-full max-w-md">

                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            Cancel
                        </button>
                        {/* <span className="close text-white text-xl leading-none hover:text-gray-300 cursor-pointer float-right" onClick={() => setShowModal(false)}>&times;</span> */}
                        <form onSubmit={(e) => { setShowModal(false); handleSubmitUpdate(e) }} className="mt-4">
                            <input
                                type="hidden"
                                name="id"
                                value={business.id}
                            />

                            <div className="mb-4">
                                <label htmlFor="businessName" className="block text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="businessName"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleUpdateChange}
                                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
                                />
                            </div>


                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Update Business
                            </button>

                        </form>

                        <div className="flex space-x-2 mt-2">
                            <form onSubmit={handleSubmitDelete}>
                                <input type="hidden" name="id" value={business.id} />
                                <button
                                    type="submit"

                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </form>


                        </div>

                    </div>
                </div>
            )}
        </div>


    )





}