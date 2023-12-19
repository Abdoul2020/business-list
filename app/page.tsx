import ListPanel from "./components/ListPanels";
import Header from "@/app/components/layout/Header";
import { getallbusiness } from "@/lib/getallbusiness";




export default async function Page() {


  const data = await getallbusiness();




  if (data?.error) {


    return (
      <>
        <div>Error: {data?.error}</div>
      </>
    );
  }



  const isLoggedIn = false;

  return (


    <div className="min-h-screen bg-gray-900 text-gray-300">


      <Header />
      <div className="container mx-auto p-6 sm:p-12">

        <p className="text-lg md:text-xl text-white mb-6">
          Your personal space to curate and manage a wishlist of your favorite businesses.
          Sign in to create, edit, and delete items from your businesses.
        </p>

        <div >
          <ListPanel businessList={data?.businesses} />
        </div>

      </div>
    </div>


  )
}
