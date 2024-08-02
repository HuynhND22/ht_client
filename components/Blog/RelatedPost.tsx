"use client";
import React from "react";
import Link from "next/link";
import BlogData from "./blogData";
import axiosClient from "@/config/axiosClient";

const RelatedPost = ({ categoryId }) => {
  const [posts, setPosts] = React.useState<any>([]);

  React.useEffect(() => {
    const id = categoryId;
    console.log(categoryId);
    async function fetchPosts() {
      const res = await axiosClient(`/posts/category/${id}`);
      setPosts(res.data);
      console.log(res.data);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <div className="animate_top rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
          Bài viết liên quan
        </h4>

        <div>
          {posts.slice(0, 3).map((post, key) => (
            <div
              className="mb-7.5 flex flex-wrap gap-4 xl:flex-nowrap 2xl:gap-6"
              key={key}
            >
              <div className="max-w-45 relative h-18 w-45">
                {post.cover ? (
                  <img
                    width={"50%"}
                    src={process.env.NEXT_PUBLIC_BUCKET + "/" + post.cover}
                    alt="Blog"
                  />
                ) : (
                  "No image"
                )}
              </div>
              <h5 className="text-md font-medium text-black transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
                <Link href={`/blog/blog-details`}>
                  {" "}
                  {post.name.slice(0, 40)}...
                </Link>
              </h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedPost;
