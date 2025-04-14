import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
// import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: {
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query;

  // const posts: StartupTypeCard[] = await client.fetch(STARTUPS_QUERY);
  const { data: posts }: { data: StartupTypeCard[] } = await sanityFetch({query: STARTUPS_QUERY})

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
          { posts.length > 0 ? posts.map((post: StartupTypeCard) => (
            <StartupCard key={post._id} post={post} />
          )) : "No Content"}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
