import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicBitesRequest } from "../api/bite";
import Pagination from "../components/Pagination";
import Bite from "../components/Bite";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";

const ProfilePage = () => {
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["public_bites", currentPage],
    queryFn: () => getPublicBitesRequest(params?.username, currentPage, 10),
  });

  if (isLoading) return <Loader />;
  else if (isError)
    return (
      <div className="mt-24 flex flex-col items-center justify-center rounded-md border p-8 shadow-md dark:border-none dark:bg-gray-800 dark:text-zinc-100">
        {error.message}
      </div>
    );

  return (
    <section>
      <h1 className="pt-3 text-4xl font-semibold dark:text-zinc-100">
        {params?.username} Public Bites
      </h1>
      {data.bites.length === 0 ? (
        <div className="dark:text-zinc-100">No bites...</div>
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

export default ProfilePage;
