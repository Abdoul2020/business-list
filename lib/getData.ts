
import { createSupabaseForServerComponent } from "@/lib/supabase.server";


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

        return { businesses: businesses || [], error: null };
    } catch (error: any) {
        console.error("Error in loader:", error);
        return { businesses: [], error: error.message || "An error occurred" };
    }

    // Default return 
    // return { businesses: businesses || [], error: null };

}