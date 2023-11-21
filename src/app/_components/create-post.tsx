"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { api } from "~/trpc/react";

interface CreatePostProps {
  onClick: (text: string) => void;
}


export function CreatePost(props: CreatePostProps) {
  const [formShow, setFormShow] = useState(true);  
  const [inputText, setInputText] = useState<string>("");

  const mutation = api.post.create.useMutation({
    onSuccess: () => null,
  });

  const showForm = () => {
    setFormShow((prev) => !prev);
  };

  const addPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    props.onClick(inputText);
    setInputText("");
    setFormShow(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {    
    const newText: string = event.target.value;
    setInputText(newText);
  };

  return (
    <div>
      <button
        onClick={showForm}
        className="border border-gray-800 bg-gray-500 p-2"
      >
        Post
      </button>

      <p>^ open dialog with post form</p>

      {formShow && (
        <div className="flex justify-center">
          <form
            className="flex w-1/4 flex-col items-center gap-3 rounded-lg bg-orange-300 p-3 text-lg"
            onSubmit={addPost}
          >
            Add new record
            <input
              value={inputText} onChange={handleTextChange} 
              type="text"
              placeholder="new task"
              className="w-full px-3 py-2"
            />
            <input
              type="submit"
              value="add"
              className="cursor-pointer rounded-md bg-slate-200 px-5 py-1 hover:bg-teal-200"
            />
          </form>
        </div>
      )}
    </div>
  );
}
