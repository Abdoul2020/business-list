
'use server'

import { createSupabaseForServerAction } from "@/lib/supabase.server";
import { toast } from 'react-toastify';



export async function getData() {
    try {
        const supabase = createSupabaseForServerAction();
        const {
            data: { session },
        } = await supabase.auth.getSession();
        const user = session?.user;

        if (!user) {
            console.error(
                "User is not authenticated within addBusiness server action"
            );
            return;
        }

        return user;
    } catch (error: any) {
        console.error("Error in loader:", error);
        return error;
    }
}




export async function deleteBusiness(formData: FormData) {

    const businessId = formData.get('id');


    const userAuthData = await getData();

    const supabase = createSupabaseForServerAction();


    if (userAuthData) {
        const { data, error } = await supabase.from("businesses").delete().match({ id: businessId, user_id: userAuthData.id })

        if (error) {
            return { status: false, error: error.message };
        }

       
        return { status: true, message: "Success" };

    }






}