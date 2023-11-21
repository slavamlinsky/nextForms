"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { Post } from "~/types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([{ id: 1, name: "hello" }]);
  
  const onCreatePost = (title: string): void => {
    setPosts([...posts,{ id: +posts.length+1, name: title }]);
  }


  return (
    <main>
      <div className="space-y-1 p-3">
        {posts.map((post) => (
          <div key={post.id} className="border-gay-400 border p-1">
            {post.name}
          </div>
        ))}
      </div>

      <CreatePost onSuccess={onCreatePost} />
    </main>
  );
}
