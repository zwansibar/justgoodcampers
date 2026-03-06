import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "NZ Campervan Travel Blog | Road Trip Tips | JustGoodCampers",
  description:
    "Road trip guides, freedom camping tips, and practical travel advice for exploring New Zealand by camper — from the JustGoodCampers team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "NZ Campervan Travel Blog | JustGoodCampers",
    description: "Road trip guides and freedom camping tips for exploring New Zealand by camper.",
    url: "https://justgoodcampers.com/blog",
    siteName: "JustGoodCampers",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NZ Campervan Travel Blog | JustGoodCampers",
    description: "Road trip guides and freedom camping tips for exploring New Zealand by camper.",
    images: ["/og-image.png"],
  },
};

export default function BlogPage() {
  return (
    <main className="pt-20">
      <section className="bg-dark py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-body text-accent text-sm font-medium tracking-[0.2em] uppercase mb-4">Travel tips</p>
          <h1 className="font-display font-bold text-heading text-white max-w-2xl animate-fade-up" style={{ animationDelay: "100ms" }}>
            From the road
          </h1>
          <p className="font-body text-white/50 text-lg mt-4 max-w-xl animate-fade-up" style={{ animationDelay: "250ms" }}>
            Practical guides and honest advice for exploring New Zealand by camper.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {blogPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: i === 0 ? "16/9" : "16/10" }}>
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-body text-xs text-muted">{post.date}</span>
                    <span className="text-border">·</span>
                    <span className="font-body text-xs text-muted">{post.readTime}</span>
                  </div>
                  <h2 className="font-display font-bold text-lg text-dark mb-2 group-hover:text-nature transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
