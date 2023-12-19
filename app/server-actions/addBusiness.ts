"use server";

import { createSupabaseForServerAction } from "@/lib/supabase.server";

interface addprops {
  name: string;
}

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

export async function addBusiness(formData: any) {
  console.log("nameMe", formData);

  const name: string = formData.get("businessName");

  console.log("businessName", name);

  const userAuthData = await getData();

  console.log("userAuth::", userAuthData);

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
      console.error("Error inserting data", error);
      return;
    }


    return { status: true, message: "Success" };
  }
}
