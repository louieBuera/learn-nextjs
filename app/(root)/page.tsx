import SearchForm from "@/components/SearchForm";

export default async function Home({ searchParams }: {
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query;

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Welcome to Next.js</h1>
        <p className="sub-heading !max-w-3xl">
          Learning NextJS 15
        </p>
        <SearchForm query={query}/>
      </section>
        
    </>
  );
}
