// app/blog/BlogList.tsx (Client Component)
"use client";
import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import Image from "next/image";
import { useEffect, useState } from "react";
import axiosClient from "@/config/axiosClient";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function PostDetails({ id }: any) {
  const [posts, setPosts] = useState<any>([]);
  const [search, setSearch] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      const res = await axiosClient("/posts/id/" + id);
      setPosts(res.data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
      <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
        <div className="md:w-1/2 lg:w-[32%]">
          <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-3.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
            <form
              onSubmit={(value: any) => {
                value.preventDefault();
                try {
                  if (search) {
                    router.push(`/posts?search=${encodeURIComponent(search)}`);
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  name="search"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="w-full rounded-lg border border-stroke px-6 py-4 shadow-solid-12 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                />

                <button
                  className="absolute right-0 top-0 p-5"
                  aria-label="search-icon"
                >
                  <svg
                    className="fill-black transition-all duration-300 hover:fill-primary dark:fill-white dark:hover:fill-primary"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {posts.categoryId && <RelatedPost categoryId={posts.categoryId} />}
        </div>

        <div className="lg:w-2/3">
          <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
            <div className="mb-10 w-full overflow-hidden ">
              <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                <img
                  src={`${process.env.NEXT_PUBLIC_BUCKET + "/" + posts.cover}`}
                  alt={posts.name}
                  width={`100%`}
                  className="rounded-md object-cover object-center"
                />
              </div>
            </div>
            <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
              {posts?.name}
            </h2>
            <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
              {/* <li>
                <span className="text-black dark:text-white">Author: </span>{" "}
                Jhon Doe
              </li> */}
              <li>
                <span className="text-black dark:text-white">
                  Ngày đăng: {dayjs(posts?.createdAt).format("DD/MM/YYYY")}
                </span>{" "}
              </li>
              <li>
                <span className="text-black dark:text-white">
                  Danh mục: {posts?.category?.name}
                </span>
                {/* Events */}
              </li>
            </ul>
            <p>{posts.description}</p>
            <div className="blog-details">
              <div dangerouslySetInnerHTML={{ __html: posts?.content }}></div>
            </div>
            <SharePost view={posts.view} />
          </div>
        </div>
      </div>
    </div>
  );
}
