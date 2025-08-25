
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { SEO } from "@/components/SEO";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/Loader";
import { useCallback } from "react";

interface Post { id: string; title: string; selftext: string }

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<{[id:string]:boolean}>({});

  const getWords = useCallback((text: string, count: number) => {
    const words = text.split(/\s+/);
    return words.slice(0, count).join(" ");
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use your Cloudflare Worker URL here
        const res = await fetch("https://reddit-proxy.gamingtycoon25.workers.dev/");
        if (!res.ok) throw new Error("Failed to fetch blog posts");
        const json = await res.json();
        const mapped: Post[] = (json.data.children || []).map((c: any) => ({
          id: c.data.id,
          title: c.data.title,
          selftext: c.data.selftext || ""
        }));
        setPosts(mapped.slice(0, 12));
      } catch (e: any) {
        setError("Failed to load blog posts. Please try again later.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <SEO title="Insights & Updates | Talha Musharraf" description="Latest real estate posts from Reddit." canonical="/blog" />
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-playfair text-3xl">Blog</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader loading={true} size={25} />
          </div>
        ) : error ? (
          <p className="mt-8 text-center text-muted-foreground">{error}</p>
        ) : posts.length === 0 ? (
          <p className="mt-8 text-center text-muted-foreground">No blog posts found.</p>
        ) : (
          <section className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(expanded).some(Boolean)
              ? posts.filter(p => expanded[p.id]).map((p) => (
                  <div key={p.id} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                    <article className="max-w-2xl w-full rounded-xl border border-border bg-card p-8 shadow-elevated overflow-y-auto max-h-[90vh]">
                      <div className="font-bold mb-4 text-2xl">{p.title}</div>
                      <div className="text-muted-foreground whitespace-pre-line mb-6">{p.selftext}</div>
                      <button
                        className="block mx-auto mt-2 text-xs text-yellow-400 underline focus:outline-none"
                        onClick={() => setExpanded(e => ({ ...e, [p.id]: false }))}
                      >
                        Close
                      </button>
                    </article>
                  </div>
                ))
              : posts.map((p) => {
                  const wordCount = p.selftext.trim().split(/\s+/).length;
                  const displayText = wordCount <= 20 ? p.selftext : getWords(p.selftext, 20) + "...";
                  return (
                    <article key={p.id} className="rounded-xl border border-border bg-card p-4 shadow-elevated">
                      <div className="font-bold mb-2 text-lg">{p.title}</div>
                      <div className="text-muted-foreground whitespace-pre-line">{displayText}</div>
                      {wordCount > 20 && (
                        <button
                          className="mt-2 text-xs text-yellow-400 underline focus:outline-none"
                          onClick={() => setExpanded({ [p.id]: true })}
                        >
                          See more
                        </button>
                      )}
                    </article>
                  );
                })}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
