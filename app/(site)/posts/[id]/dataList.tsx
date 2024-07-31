// app/blog/BlogList.tsx (Client Component)
"use client";

import { useEffect, useState } from "react";
import BlogItem from "@/components/Blog/BlogItem";
import axiosClient from "@/config/axiosClient";

export default function PostList({ id }: any) {
  const [posts, setPosts] = useState([]);
  console.log(id);
  useEffect(() => {
    async function fetchPosts() {
      const res = await axiosClient("/posts/all");
      setPosts(res.data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
      {posts.map((post: any, key) => (
        <BlogItem
          key={key}
          blog={{
            _id: post.postId,
            title: post.name,
            metadata: post.description,
            mainImage: `${process.env.NEXT_PUBLIC_BUCKET}/${post.cover}`,
          }}
        />
      ))}
    </div>
  );
}
