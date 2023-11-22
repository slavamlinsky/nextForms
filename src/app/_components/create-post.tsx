"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
import Loader from "./loader";

interface CreatePostProps {
  onSuccess?: ((text: string) => void) | undefined;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onSuccess }) => {
  const [formShow, setFormShow] = useState(false);
  const [inputText, setInputText] = useState<string>("");  

  const showForm = () => {
    setFormShow((prev) => !prev);
  };

  const mutation = api.post.create.useMutation({
    onSuccess: () => {
      if (onSuccess) {
        onSuccess(inputText);
        
        // clear input field
        setInputText("");
        // hide form
        setFormShow(false);
      }
    },
  });

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText) {
      try {        
        await mutation.mutateAsync({ name: inputText });
      } catch (error) {
        console.error("Mutation failed:", error);
      }       
    }
    // props.onClick(inputText);
    // setInputText("");
    // setFormShow(false);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.target as HTMLDivElement;
    const insideModal = el.closest("[data-id=modalbox]");
    ;
    if (insideModal) return;

    setFormShow(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText: string = event.target.value;
    setInputText(newText);
  };

  return (
    <div className="p-3">
      <button
        onClick={showForm}
        className="rounded-md border border-gray-800 bg-gray-500 p-2"
      >
        Add Post
      </button>

      <p>^ open dialog with post form</p>

      {formShow && (
        <div
          onClick={handleModalClick}
          className="fixed left-0 top-0 flex min-h-screen w-full items-center justify-center bg-slate-300 opacity-90 backdrop-blur-2xl"
        >
          {mutation.isLoading && <Loader />}
          {!mutation.isLoading && (
            <div data-id="modalbox" className=" w-2/3 md:w-1/3">
            <form               
              className="flex flex-col items-center gap-3 rounded-lg bg-slate-500 p-3 text-lg w-full"
              onSubmit={addPost}
            >
              Add new record
              <input
                value={inputText}
                onChange={handleTextChange}
                type="text"
                placeholder="new record title"
                className="w-full px-3 py-2"
              />
              <input
                type="submit"
                value="add"
                className="cursor-pointer rounded-md bg-slate-300 px-5 py-1 hover:bg-slate-200 hover:px-6"
              />
            </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
