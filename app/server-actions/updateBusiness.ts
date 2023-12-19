'use server'


import { createSupabaseForServerAction } from "@/lib/supabase.server";


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


//update
export async function updateBusiness(formData: FormData) {


    const id = formData.get('id')
    const name = formData.get('name');

    const userAuthData = await getData();

    const supabase = createSupabaseForServerAction();


    if (userAuthData) {
        const { data, error } = await supabase.from("businesses").update(
            {
                name,
                user_email: userAuthData.email
            },
        ).match({ id, user_id: userAuthData.id })

        if (error) {
            return { status: false, error: error.message };
        }

        
        return { status: true, message: "Success" };
    }









}