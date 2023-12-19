import { Database } from "@/lib/database.types";



export default function ListPanel({ businessList }: { businessList: Database[] }) {



    return (
        <div className="container mx-auto mt-8">
            <div className="mt-4 space-y-4">
                {businessList.map((business, index) => {

                    //date format for created_at
                    function formatDate(datetimeString: string): string {
                        const date = new Date(datetimeString);
                        return date.toISOString().split('T')[0];
                    }
                    const dateString: string = formatDate(business.created_at.toString());

                    return (
                        <div key={index} className="bg-gray-800 p-6 mb-6 rounded-lg shadow-lg">



                            <h3 className="text-xl font-semibold grid">

                                <span>{business.name} </span>
                                <span className="mb-1">Owner: {business.user_email} </span>
                                <span className="mb-1">Created_at: {dateString}</span>

                            </h3>

                        </div>
                    )




                }


                )}
            </div>
        </div>
    );


}