import StartupCard, { StartupTypeCard } from '@/components/StartupCard'
import { client } from '@/sanity/lib/client';
import { STARTUPS_FIND } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation';
import React from 'react'

export const experimental_ppr = true;

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
  const id = (await params).id
  const post: StartupTypeCard = await client.fetch(STARTUPS_FIND, { id })
  
  if(!post) return notFound();

  return (
    <>
      <h1 className="text-3xl">This is  a startup number: { id }</h1>
      <StartupCard key={post._id} post={post} />
    </>
  )
}
