import { useState } from "react";
import SnippetList from "../components/SnippetList";
import Bite from "../components/Bite";
import Form from "../components/Form";
import { FORM_STATE } from "../components/Form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteBiteRequest } from "../api/bite";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [bite, setBite] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const deleteBiteMutation = useMutation({
    mutationFn: deleteBiteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["bites"]);
    },
  });

  const resetDashboard = () => {
    setBite(() => {
      return null;
    });
    setIsUpdating(() => {
      return false;
    });
  };

  return (
    <section className="flex h-screen" id="dashboard">
      <SnippetList setBite={setBite} setIsUpdating={setIsUpdating} />
      <div className="flex flex-1 flex-col overflow-x-hidden px-8">
        {!bite ? (
          <div className="mx-auto text-2xl text-neutral-600 dark:text-neutral-400">
            <Link to="/create">
              <span>Create a new bite</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mx-2 inline-block h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <section className="my-8">
            <div
              aria-label="actions"
              className="flex items-center justify-end gap-6 px-2"
            >
              <button
                onClick={() => {
                  setIsUpdating(true);
                  if (isUpdating) setIsUpdating(false);
                }}
                className="transform rounded border border-gray-200 bg-transparent px-4 py-2 text-sm font-light transition duration-200 ease-in hover:-translate-y-1 hover:border-transparent hover:bg-black hover:text-white active:translate-y-0 dark:hover:bg-white dark:hover:text-black"
              >
                {!isUpdating ? "Update" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  deleteBiteMutation.mutate(bite._id);
                  resetDashboard();
                }}
                className="transform rounded border border-red-700 bg-transparent px-4 py-2 text-sm font-light transition duration-200 ease-in hover:-translate-y-1 hover:border-transparent hover:bg-red-600 active:translate-y-0"
              >
                Delete
              </button>
            </div>
            {!isUpdating ? (
              <Bite bite={bite} />
            ) : (
              <Form
                bite={bite}
                state={FORM_STATE.UPDATE}
                resetDashboard={resetDashboard}
              />
            )}
            <div className="w-full">
              <button
                className="mx-auto block"
                onClick={() => {
                  setBite(null);
                  setIsUpdating(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-neutral-400 dark:hover:text-neutral-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
