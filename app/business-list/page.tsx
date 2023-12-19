
import BusinessForm from "@/app/components/BusinessForm";
import EditBusiness from "../components/EditBusiness";
import MainPageButton from "../components/mainpage/MainPageButton";
import { getdata } from "@/lib/getdata";














export default async function BusinessList() {




    const data = await getdata();





    if (data?.error) {
        return (
            <>
                <div>Error: {data?.error}</div>
            </>
        );
    }







    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6 sm:p-12">
                <div className="flex justify-between items-start">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">My Business List</h1>

                    <MainPageButton />

                </div>
                <BusinessForm />
                <div className="mt-6">
                    {data?.businesses.map((business) => {

                        //date format for created_at
                        function formatDate(datetimeString: string): string {
                            const date = new Date(datetimeString);
                            return date.toISOString().split('T')[0];
                        }
                        const dateString: string = formatDate(business.created_at);


                        return (
                            <div key={business.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
                                <h2 className="text-xl text-white grid  mb-1">
                                    <span>{business.name} </span>
                                    <span className="mb-1">Owner: {business.user_email} </span>
                                    <span className="mb-1">Created_at: {dateString}</span>
                                </h2>

                                <div className="flex space-x-2">
                                    <EditBusiness business={business} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
