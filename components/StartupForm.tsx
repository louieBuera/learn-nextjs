"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function StartupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isPending = false;

  return (
    <form action={() => {}} className="startup-form">
      <div>
        <label htmlFor="title" className='startup-form_label'>Title</label>
        <Input id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        { errors.title && <p className="startup-form_error">
          { errors.title }
        </p> }
      </div>
      <div>
        <label htmlFor="description" className='startup-form_label'>Description</label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        { errors.description && <p className="startup-form_error">
          { errors.description }
        </p> }
      </div>
      <div>
        <label htmlFor="category" className='startup-form_label'>Category</label>
        <Input id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education)"
        />
        { errors.category && <p className="startup-form_error">
          { errors.category }
        </p> }
      </div>
      <div>
        <label htmlFor="link" className='startup-form_label'>Image URL</label>
        <Input id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup URL"
        />
        { errors.link && <p className="startup-form_error">
          { errors.link }
        </p> }
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className='startup-form_label'>Startup Pitch</label>
        <Textarea
          id="pitch"
          name="pitch"
          className="startup-form_textarea"
          required
          placeholder="Your Pitch Here!"
          rows={15}
        />
        { errors.pitch && <p className="startup-form_error">
          { errors.pitch }
        </p> }
      </div>
      <Button type="submit" className="startup-form_btn"
        disabled={isPending}
      >{ isPending ? 'Submitting...' : 'Submit' }</Button>
    </form>
  )
}
