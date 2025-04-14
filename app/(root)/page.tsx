import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query;

  const posts = [{
    _createdAt: new Date(),
    views: 55,
    author: { _id: 1, name: 'Tempor Amet' },
    _id: 1,
    description: 'Adipisicing et non consequat elit velit in mollit culpa veniam et.',
    image: 'https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Lighting',
    title: 'We Flashlights'
  }]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Welcome to Next.js</h1>
        <p className="sub-heading !max-w-3xl">
          Learning NextJS 15
        </p>
        <SearchForm query={query}/>
      </section>
      <section className="section_container">
        <p className="text-30 semibold">
          { query ? `Search results for "${query}"` : 'All startups'}
        </p>

        <ul className="mt-7 card_grid">
          { posts.length > 0 ? posts.map((post, index) => (
            <StartupCard key={post._id} post={post} />
          )) : "No Content"}
        </ul>
      </section>
    </>
  );
}
