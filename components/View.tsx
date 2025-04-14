import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUPS_VIEWS } from '@/sanity/lib/queries'

export default async function View({ id }: { id: string }) {

  const { _id: string, views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_VIEWS, { id });

  // TODO: Update the number of views

  return <div className="view-container">
    <div className="absolute -top-2 -right-2">
      <Ping />
    </div>

    <p className="view-text">
      <span className="font-black">Views: { totalViews }</span>
    </p>
  </div>
}
