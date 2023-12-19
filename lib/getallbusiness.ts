import { createSupabaseForServerComponent } from "@/lib/supabase.server";




export async function getallbusiness() {

    
    try {
      const supabase = createSupabaseForServerComponent();
  
      const { data: businesses, error } = await supabase
        .from('businesses')
        .select('*')
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
  }