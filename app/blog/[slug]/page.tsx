export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Blog Post: {params.slug}</h1>
    </main>
  );
}
