import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useState } from "react"; // Import useState
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import Input for name/email
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { Label } from "@/components/ui/label"; // Import Label
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components
import { Star } from "lucide-react"; // Import Star icon
import { toast } from "sonner"; // Import toast for notifications
import { supabase } from "@/integrations/supabase/client";

const ReviewForm = () => { // Convert to stateful component
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5); // Default rating to 5
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const renderStars = (numStars: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < numStars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name,
        email, // not stored, just for potential future use
        rating,
        text,
      };
      const { error } = await (supabase as any).from('reviews').insert({ name: payload.name, text: payload.text, rating: payload.rating });
      if (error) {
        console.error('Error submitting review:', error);
        toast.error('Failed to submit review: ' + error.message);
      } else {
        toast.success('Thanks for your review!');
        setName("");
        setEmail("");
        setRating(5);
        setText("");
      }
    } catch (error) {
      console.error('Error saving review:', error);
      toast.error('Failed to save review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SEO title="Leave a Review | Talha Musharraf" description="Share your experience working with Talha." canonical="/review" />
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="font-playfair text-3xl">Leave a Review</h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Your Email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select
              value={rating.toString()}
              onValueChange={(value) => setRating(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    <div className="flex items-center space-x-2">
                      <span>{num}</span>
                      <div className="flex">
                        {renderStars(num)}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Your Review</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              required
              placeholder="Share your experience"
            />
          </div>
          <Button variant="hero" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">Stored in Supabase for moderation.</p>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewForm;
