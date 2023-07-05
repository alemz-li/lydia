import { useQuery } from "@tanstack/react-query";
import { getBitesRequest } from "../api/bite";
import Bite from "../components/Bite";

const BitesPage = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["bites"],
    queryFn: () => getBitesRequest(1, 10),
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error {error.message}</div>;

  return (
    <section>
      {data.bites.length === 0 ? (
        <div>No bites...</div>
      ) : (
        data.bites.map((bite) => <Bite key={bite._id} bite={bite} />)
      )}
    </section>
  );
};

export default BitesPage;
