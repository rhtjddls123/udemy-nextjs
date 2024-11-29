"use client";

import { createPost } from "@/actions/post";
import FormSubmit from "@/components/form-submit";
import { useActionState } from "react";

export default function NewPostPage() {
  const [state, formAction] = useActionState(createPost, { errors: [] });

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>
        <div className="form-control">
          <label htmlFor="image">Image URL</label>
          <input type="file" accept="image/png, image/jpeg" id="image" name="image" />
        </div>
        <div className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </div>
        <div className="form-actions">
          <FormSubmit />
        </div>
      </form>
      {state.errors && (
        <ul className="form-errors">
          {state.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </>
  );
}
