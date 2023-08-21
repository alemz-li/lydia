import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBitesRequest } from "../api/bite";
import Pagination from "../components/Pagination";
import Bite from "../components/Bite";

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
        <div>No bites...</div>
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
