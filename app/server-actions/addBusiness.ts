"use server";

import { createSupabaseForServerAction } from "@/lib/supabase.server";



// fetch the cookie data

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

// add business function

export async function addBusiness(formData: FormData) {

  const name = formData.get("businessName");


  const userAuthData = await getData();


  const supabase = createSupabaseForServerAction();

  if (userAuthData) {
    const { data, error } = await supabase.from("businesses").insert([
      {
        name,
        user_email: userAuthData.email,
        user_id: userAuthData.id,
      },
    ]);

    if (error) {

      return { status: false, error: error.message };
    }

    
    
    return { status: true, message: "Success" };
  }


}
