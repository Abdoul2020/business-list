import { Database } from "@/lib/database.types";



export default function ListPanel({ businessList }: { businessList: Database[] }) {



    return (
        <div className="container mx-auto mt-8">
            <div className="mt-4 space-y-4">
                {businessList.map((business, index) => (
                    <div key={index} className="bg-gray-800 p-6 mb-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold">{business.name}</h3>
                        <p className="text-gray-500">{business.user_email}</p>
                    </div>
                ))}
            </div>
        </div>
    );


}