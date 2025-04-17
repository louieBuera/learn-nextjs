"use server";

import { auth } from "@/auth";
import slugify from 'slugify';
import { parseServerAR } from "./utils";
import { writeClient } from "@/sanity/lib/write-cient";


export const createPitch = async (state: any, form: FormData, pitch: string) => {
  const session = await auth();

  if(!session) return parseServerAR({
    error: "Not signed in",
    status: "ERROR"
  });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key != 'pitch')
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title, description, category,
      image: link,
      slug: {
        _type: 'slug',
        current: slug
      },
      author: {
        _type: 'reference',
        _ref: session?.id
      },
      pitch,
      views: 0
    }

    const result = await writeClient.create({ _type: 'startup', ...startup });

    return parseServerAR({
      ...result,
      error: "",
      status: "SUCCESS"
    })
  } catch (error) {
    console.log(error)
    return parseServerAR({
      error: JSON.stringify(error),
      status: "ERROR"
    });
  }
}