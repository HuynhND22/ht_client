"use client";
import React from "react";
import SectionHeader from "../Common/SectionHeader";
import BlogItem from "./BlogItem";
import BlogData from "./blogData";
import axiosClient from "@/config/axiosClient";

const Blog = () => {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    async function fetchPosts() {
      const res = await axiosClient(`/posts/client?limit=3`);
      setPosts(res.data);
      console.log(res.data);
    }
    fetchPosts();
  }, []);

  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        {/* <!-- Section Title Start --> */}
        <div className="animate_top mx-auto text-center">
          <SectionHeader
            headerInfo={{
              title: `Bài viết`,
              subtitle: `Bài viết mới nhất`,
              description: ``,
            }}
          />
        </div>
        {/* <!-- Section Title End --> */}
      </div>

      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
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
      </div>
    </section>
  );
};

export default Blog;
