import { StartupTypeCard } from "@/components/StartupCard"
import { sanityFetch } from "@/sanity/lib/live"
import { STARTUPS_QUERY } from "@/sanity/lib/queries"
import { NextRequest } from "next/server";
 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  console.log(searchParams)
  searchParams.entries().map((pair, index) => {
    console.log(pair);
  })
  const query = searchParams.get('query')
  const params = { search: query ? `*${query}*` : null }
  console.log(params)
  const { data }: { data: StartupTypeCard[] }
    = await sanityFetch({query: STARTUPS_QUERY, params})
  
  return Response.json({ data })
}