import StartupCard, { StartupTypeCard } from '@/components/StartupCard'
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUPS_FIND } from '@/sanity/lib/queries'
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'

export const experimental_ppr = true;

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
  const id = (await params).id
  const post: StartupTypeCard = await client.fetch(STARTUPS_FIND, { id })
  
  if(!post) return notFound();
  const author = post.author;
  if(!author) return notFound();

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h1 className="heading">{ post.title }</h1>
        <p className="sub-heading !max-w-5xl">{ post.description }</p>
      </section>

      <section className="section_container">
        <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl"/>

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${author._id}`} className="flex gap-2 items-center mb-3">
              { author.image && <Image src={author.image} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg"/> }
              <div>
                <p className="text-20-medium">{ author.name}</p>
                <p className="text-16-medium !text-black-30">@{ author.username}</p>
              </div>
            </Link>

            <p className="category-tag">{ post.category }</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>

          <article className='prose max-w-4xl font-work-sans break-all'>
            { post.pitch }
          </article>
        </div>

        <hr className="divider"/>

        {/* TODO: EDITOR SELECTED STARTUPS */}
      </section>
    </>
  )
}
