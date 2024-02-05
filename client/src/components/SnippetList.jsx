import { useState } from "react";
import axios from "../api/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const getBitesRequest = async ({ pageParam }) => {
  const { data } = await axios.get(`/bites?page=${pageParam}&limit=10`);
  return data;
};

const SnippetList = ({ setBite, setIsUpdating }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const handleSideBar = () => {
    setIsOpen((prev) => !prev);
  };

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["bites"],
      queryFn: getBitesRequest,
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (!lastPage.info.hasNextPage) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      refetchOnMount: false,
    });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <div>{error.message}</div>;

  const allBites = data.pages.flatMap((page) => page.bites);

  return (
    <>
      <div className="relative">
        <button
          onClick={handleSideBar}
          className="absolute left-2 top-2 z-10 mx-auto inline-block"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          )}
        </button>
      </div>
      <aside
        className={`${isOpen ? "block" : "hidden"} mx-2 w-80 rounded-md bg-neutral-200 text-white drop-shadow-lg transition-all duration-300 ease-in-out dark:bg-neutral-950`}
      >
        <div className="h-full overflow-y-auto">
          <div className="my-4">
            <input
              className="border-grey-light mx-auto mb-4 block w-[80%] rounded border p-3 text-black outline-none dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
              placeholder="Search by title or language"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul>
            {allBites
              .filter((bite) => {
                return search.toLowerCase() === ""
                  ? bite
                  : bite.title.toLowerCase().includes(search.toLowerCase()) ||
                      bite.language
                        .toLowerCase()
                        .includes(search.toLowerCase());
              })
              .map((bite) => (
                <li
                  key={bite._id}
                  className="mx-4 cursor-pointer p-4 hover:bg-neutral-300 hover:dark:bg-neutral-900"
                  onClick={() => {
                    setBite(bite);
                    setIsUpdating(false);
                  }}
                >
                  <div className="rounded-md px-2 py-6 drop-shadow-lg md:px-4">
                    <h2 className="mb-2 break-words text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 md:text-2xl">
                      {bite.title}
                    </h2>
                    <div className="text-neutral-700 dark:text-neutral-400">
                      <p className="mb-2">{bite.language}</p>
                      <small className="text-xs">
                        {new Date(bite.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          {hasNextPage ? (
            <div className="w-full">
              <button className="mx-auto my-4 block" onClick={fetchNextPage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-neutral-400 dark:hover:text-neutral-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
};

export default SnippetList;
