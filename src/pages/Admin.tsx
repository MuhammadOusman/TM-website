import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { SEO } from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyManager } from "@/components/admin/PropertyManager";
import { ReviewManager } from "@/components/admin/ReviewManager";

const Admin = () => (
  <div>
    <SEO title="Admin Panel | Talha Musharraf" description="Manage properties, reviews, and blog posts (Supabase)." canonical="/admin" />
    <Navbar />
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage properties and reviews for your real estate website.</p>
      </div>
      
      <Tabs defaultValue="properties" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="properties">
          <PropertyManager />
        </TabsContent>
        
        <TabsContent value="reviews">
          <ReviewManager />
        </TabsContent>
      </Tabs>
    </main>
    <Footer />
  </div>
);

export default Admin;
