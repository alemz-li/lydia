import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBitesRequest } from "../api/bite";
import Pagination from "../components/Pagination";
import Bite from "../components/Bite";
import { Link } from "react-router-dom";

const BitesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["bites", currentPage],
    queryFn: () => getBitesRequest(currentPage, 10),
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error {error.message}</div>;

  return (
    <section>
      {data.bites.length === 0 ? (
        <div className="mt-24 flex flex-col items-center justify-center rounded-md border p-8 shadow-md dark:border-none dark:bg-gray-800">
          <h2 className="mb-4 text-2xl dark:text-zinc-100">
            Create your first bite
          </h2>
          <Link
            to="/bites/add"
            className="rounded bg-blue-500 p-2 text-center text-white hover:bg-blue-600 focus:outline-none"
          >
            Add Bite
          </Link>
        </div>
      ) : (
        <>
          {data.bites.map((bite) => (
            <Bite key={bite._id} bite={bite} />
          ))}
          <Pagination
            currentPage={currentPage}
            totalCount={data.info.total}
            pageSize={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </section>
  );
};

export default BitesPage;
