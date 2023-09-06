import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicBitesRequest } from "../api/bite";
import Pagination from "../components/Pagination";
import Bite from "../components/Bite";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["public_bites", currentPage],
    queryFn: () => getPublicBitesRequest(params?.username, currentPage, 10),
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error {error.message}</div>;

  return (
    <section>
      <h1>Public Bites</h1>
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

export default ProfilePage;
