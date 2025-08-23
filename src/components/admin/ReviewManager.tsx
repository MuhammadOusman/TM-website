import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2, Edit, Plus, Star } from "lucide-react";
import { Loader } from "@/components/ui/Loader"; // Import Loader

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  source: string;
  created_at: string;
  updated_at?: string; // Add updated_at as optional
}

export const ReviewManager = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false); // For form submission
  const [fetchingReviews, setFetchingReviews] = useState(true); // For data fetching

  const [formData, setFormData] = useState({
    name: "",
    text: "",
    rating: 5,
    source: "user"
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setFetchingReviews(true); // Set fetching to true
    try {
      const { data, error } = await (supabase as any)
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
      setReviews([]); // Clear reviews on error
    } finally {
      setFetchingReviews(false); // Set fetching to false
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingReview) {
        const updatedReview = {
          ...formData,
          rating: Number(formData.rating),
          updated_at: new Date().toISOString() // Re-add updated_at
        };
        console.log('Attempting to update review with ID:', editingReview.id, 'and payload:', updatedReview);
        const { data, error } = await (supabase as any)
          .from('reviews')
          .update(updatedReview)
          .eq('id', editingReview.id)
          .select(); // Add .select() to get data back on update

        if (error) {
          console.error('Supabase update error:', error);
          toast.error('Failed to update review: ' + error.message);
          setLoading(false);
          return;
        }

        console.log('Supabase update data:', data);
        if (!data || data.length === 0) {
          console.warn('Supabase update affected 0 rows. Review might not exist or ID is incorrect.');
          toast.error('Update failed: Review not found or no changes made.');
          setLoading(false);
          return;
        }

        toast.success('Review updated successfully');
      } else {
        const { error } = await (supabase as any)
          .from('reviews')
          .insert([{ ...formData, rating: Number(formData.rating) }]);

        if (error) throw error;
        toast.success('Review created successfully');
      }

      setIsOpen(false);
      resetForm();
      fetchReviews();
    } catch (error) {
      console.error('Error saving review:', error);
      toast.error('Failed to save review');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review: Review) => {
    console.log('Editing review with ID:', review.id, 'and data:', review); // Log review data on edit
    setEditingReview(review);
    setFormData({
      name: review.name,
      text: review.text,
      rating: review.rating,
      source: review.source
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const { error } = await (supabase as any)
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      text: "",
      rating: 5,
      source: "user"
    });
    setEditingReview(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Review
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingReview ? 'Edit Review' : 'Add New Review'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="text">Review Text</Label>
                <Textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select 
                    key={editingReview?.id || 'new-rating'} // Add key to force re-render on edit
                    value={formData.rating.toString()} 
                    onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                  <Label htmlFor="source">Source</Label>
                  <Select 
                    key={editingReview?.id || 'new-source'} // Add key to force re-render on edit
                    value={formData.source} 
                    onValueChange={(value) => setFormData({ ...formData, source: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : editingReview ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {fetchingReviews ? (
        <div className="flex justify-center items-center h-64">
          <Loader loading={true} size={25} />
        </div>
      ) : reviews.length === 0 ? (
        <p className="mt-8 text-center text-muted-foreground">No reviews found.</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={review.text}>
                      {review.text}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{review.source}</TableCell>
                  <TableCell>
                    {new Date(review.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(review)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(review.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
