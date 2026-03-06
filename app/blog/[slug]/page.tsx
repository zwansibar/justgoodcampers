import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://justgoodcampers.com/blog/${post.slug}`,
      images: [{ url: post.image, alt: post.imageAlt }],
      type: "article",
      siteName: "JustGoodCampers",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.dateISO,
        image: post.image,
        author: {
          "@type": "Organization",
          name: "JustGoodCampers",
          url: "https://justgoodcampers.com",
        },
        publisher: {
          "@type": "Organization",
          name: "JustGoodCampers",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://justgoodcampers.com" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://justgoodcampers.com/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: `https://justgoodcampers.com/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero image */}
      <div className="relative h-[50vh] md:h-[60vh] bg-dark overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <time dateTime={post.dateISO} className="font-body text-sm text-white/60">{post.date}</time>
              <span className="text-white/30">·</span>
              <span className="font-body text-sm text-white/60">{post.readTime}</span>
            </div>
            <h1 className="font-display font-bold text-heading text-white max-w-2xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="py-16 md:py-20 bg-light">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-6 mb-16">
            {post.content.map((paragraph, i) => (
              <p key={i} className="font-body text-ink text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author */}
          <div className="border-t border-border pt-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <span className="font-display font-bold text-white text-sm">JGC</span>
            </div>
            <div>
              <p className="font-display font-bold text-sm text-dark">Written by the JustGoodCampers team</p>
              <p className="font-body text-xs text-muted mt-0.5">
                Family-owned camper rental in New Zealand.{" "}
                <Link href="/" className="text-nature hover:underline">justgoodcampers.com</Link>
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display font-bold text-subheading text-dark mb-8">More from the blog</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group block bg-light rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src={rel.image}
                      alt={rel.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-body text-xs text-muted mb-2">{rel.date}</p>
                    <h3 className="font-display font-bold text-base text-dark group-hover:text-nature transition-colors duration-200">
                      {rel.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-dark text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display font-bold text-subheading text-white mb-4">Ready to see it yourself?</h2>
          <p className="font-body text-white/50 mb-8">Check availability and start planning your New Zealand road trip.</p>
          <Link href="/book" className="inline-flex items-center bg-accent text-white px-8 py-4 rounded-full font-display font-bold text-sm hover:bg-accent/90 transition-colors duration-200">
            Check Availability
          </Link>
        </div>
      </section>
    </main>
  );
}
