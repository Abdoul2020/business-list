
// import { createSupabaseForRouteHandler } from "@/lib/supabase.server";
// import { NextApiRequest, NextApiResponse } from 'next';


// export async function POST(req: NextApiRequest, res: NextApiResponse) {
    
//     const supabase = createSupabaseForRouteHandler();

//     try{

//         const { data: { session } } = await supabase.auth.getSession();

//         if (session) {
//             await supabase.auth.signOut();
//         }
    
    
//         res.status(302).redirect('/');


//     } catch (error){

//         console.error('Error signing out:', error);
//         // Handle error, maybe send a different response or status code
//         res.status(500).send('Internal Server Error');


//     }

  

// }
