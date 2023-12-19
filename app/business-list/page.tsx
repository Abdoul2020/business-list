// app/(app)/(public)/business-list/page.tsx

import { Database } from "@/lib/database.types";
import { createSupabaseForServerComponent } from "@/lib/supabase.server";
import BusinessForm from "@/app/components/BusinessForm";



interface LoaderData {
    businesses: Database[];
    error: string | null;
}




export async function getData() {

    try {
        const supabase = createSupabaseForServerComponent();
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;

        if (!user) {

            return { businesses: [], error: 'User not found' };
        }

        const { data: businesses, error } = await supabase
            .from('businesses')
            .select('*')
            .eq('user_id', user.id)
            .order('name', { ascending: true });


        if (error) {
            console.error("Error fetching businesses:", error.message);
            return { businesses: [], error: error.message };
        }

        console.log("Fetched businesses:", businesses);
        return { businesses: businesses || [], error: null };
    } catch (error: any) {
        console.error("Error in loader:", error);
        return { businesses: [], error: error.message || "An error occurred" };
    }

    // Default return statement
    return { businesses: businesses || [], error: null };

}


export default async function BusinessList() {

    const data = await getData();

    


    if (data?.error) {
        return <div>Error: {data?.error}</div>;
    }


    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6 sm:p-12">
                <div className="flex justify-between items-start">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">My Business List</h1>
                    <form action="/auth/signout" method="post">
                        <button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Sign out
                        </button>
                    </form>
                </div>
                <BusinessForm />
                <div className="mt-6">
                    {data?.businesses.map((business) => (
                        <div key={business.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
                            <h2 className="text-xl text-white mb-2">{business.name} - {business.user_email}</h2>
                            <div className="flex space-x-2">
                                <form action={"deleteWatch"}>
                                    <input type="hidden" name="id" value="{watch.id}" />
                                    <button
                                        type="submit"
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                </form>
                                {/* <EditWatch watch={watch} /> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
