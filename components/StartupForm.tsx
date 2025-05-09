"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { z } from "zod";
import { startupFormSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

export default function StartupForm() {
  const [ errors, setErrors ] = useState<Record<string, string>>({});
  const [ pitch, setPitch ] = useState("");
  const  { toast } = useToast();
  const router = useRouter();


  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    const formValues = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      link: formData.get("link") as string,
      pitch,
    }
    try {
      

      await startupFormSchema.parseAsync(formValues);

      console.log(formValues)
      
      const result = await createPitch(prevState, formData, pitch);
      if(result.status == 'SUCCESS'){
        toast({
          title: `Success`,
          description: "Your startup pitch created successfully!",
          variant: "destructive"
        });

        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (error) {
      if(error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive"
        });

        return { ...prevState, formValues, error: "Validation Failed", status: "ERROR" }
      }
      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive"
      });
      return {
        ...prevState,
        formValues,
        error: "An unexpected error has occurred",
        status: "ERROR"
      }
    }
  };

  const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    { error: "", status: "INITIAL" }
  );

  return (
    <form action={formAction}
      className="startup-form">
      <div>
        <label htmlFor="title" className='startup-form_label'>Title</label>
        <Input id="title"
          defaultValue={ state?.formValues?.title }
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
          defaultValue={ state?.formValues?.description }
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
          defaultValue={ state?.formValues?.category }
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
          defaultValue={ state?.formValues?.link }
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
        <MDEditor value={pitch}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}

          onChange={value => setPitch(value ? value : '')}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        { errors.pitch && <p className="startup-form_error">
          { errors.pitch }
        </p> }
      </div>


      <Button type="submit" className="startup-form_btn text-white"
        disabled={isPending}
      >
        { isPending ? 'Submitting...' : 'Submit your Pitch!' }
        <Send className="size-6 ml-2"/>
      </Button>
    </form>
  )
}
