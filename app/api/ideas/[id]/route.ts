import { StartupTypeCard } from "@/components/StartupCard"
import { client } from "@/sanity/lib/client";
import { STARTUPS_FIND } from "@/sanity/lib/queries"
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";
 
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {

  const id = (await params).id
  const post: StartupTypeCard = await client.fetch(STARTUPS_FIND, { id })
  
  if(!post) return notFound();
  const author = post.author;
  if(!author) return notFound();
  
  return Response.json({ data: post })
}