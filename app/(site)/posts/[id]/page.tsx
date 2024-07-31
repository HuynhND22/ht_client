import BlogData from "@/components/Blog/blogData";
import BlogItem from "@/components/Blog/BlogItem";
import { Metadata } from "next";
import getPost from "@/service/getPost";
import React from "react";
import PostList from "./dataList";

export const metadata: Metadata = {
  title: "Gác Văn | Bài viết",
  description: "Bài viết của Gác Văn",
  // other metadata
};

const BlogPage = ({ params: { id } }: any) => {
  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <PostList id={id} />
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
