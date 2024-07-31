import React from "react";
import getPost from "@/service/getPost";
import PostDetails from "./dataList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gác văn | Chi tiết bài viết",
  description: "chi tiết bài viết",
};

const SingleBlogPage = ({ params: { id } }: any) => {
  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <PostDetails id={id} />
      </section>
    </>
  );
};

export default SingleBlogPage;
