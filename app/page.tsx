import { Database } from "@/lib/database.types";
import ListPanel from "./components/ListPanels";
import Header from "@/app/components/layout/Header";



// const businessData: Database = {
//   businessList: [],
// };

export default async function Page() {





  const businesses: Database[] = [
    { id: 1, user_id: "2", user_email: "abd@gmail.com", name: 'Business 1', created_at: new Date("12-12-2023") },
    { id: 2, user_id: "3", user_email: "xyz@gmail.com", name: 'Business 2', created_at: new Date("12-12-2023") },
    { id: 3, user_id: "4", user_email: "abc@gmail.com", name: 'Business 3', created_at: new Date("12-12-2023") },
    { id: 4, user_id: "5", user_email: "def@gmail.com", name: 'Business 4', created_at: new Date("12-12-2023") },
   
  ];

  const isLoggedIn = false;

  return (


    <div className="min-h-screen bg-gray-900 text-gray-300">

      
      <Header isLoggedIn={isLoggedIn} />
      <div className="container mx-auto p-6 sm:p-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
          Businesses List
        </h1>
        <p className="text-lg md:text-xl text-white mb-6">
          Your personal space to curate and manage a wishlist of your favorite watches.
          Sign in to create, view, edit, and delete items from your watchlist.
        </p>

        <div >
          <ListPanel businessList={businesses} />
        </div>

      </div>
    </div>


  )
}
