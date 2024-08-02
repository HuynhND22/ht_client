// app/blog/BlogList.tsx (Client Component)
"use client";

import { useEffect, useState } from "react";
import BlogItem from "@/components/Blog/BlogItem";
import axiosClient from "@/config/axiosClient";
import { useSearchParams } from "next/navigation";

export default function PostList({ id }: any) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      if (categoryQuery) {
        const res = await axiosClient(
          `/posts/category/${categoryQuery}&search=${searchQuery}`,
        );
        setPosts(res.data);
      } else {
        const res = await axiosClient(`/posts/client?search=${searchQuery}`);
        setPosts(res.data);
      }
    }
    fetchPosts();
  }, [categoryQuery]);

  return (
    <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
      {posts &&
        posts?.map((post: any, key) => (
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
