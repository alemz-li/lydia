import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  addBiteRequest,
  deleteBiteRequest,
  getBiteRequest,
  updateBiteRequest,
} from "../api/bite";
import { useNavigate, useParams } from "react-router-dom";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { LANGUAGUES } from "../data/languages";

const BiteFormPage = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [error, setError] = useState(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();

  const createBiteMutation = useMutation({
    mutationFn: addBiteRequest,
    onSuccess: () => {
      navigate("/bites");
    },
  });

  const deleteBiteMutation = useMutation({
    mutationFn: deleteBiteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["bites"]);
      navigate("/bites");
    },
  });

  const updateBiteMutation = useMutation({
    mutationFn: updateBiteRequest,
    onSuccess: () => {
      navigate("/bites");
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setError(null);

    try {
      if (!code) {
        setError("Code snippet is required");
        return;
      }

      if (params.id) {
        updateBiteMutation.mutate({ ...values, code, _id: params.id });
      } else {
        createBiteMutation.mutate({ ...values, code });
      }
    } catch (error) {
      console.log(error);
    }
  });

  useQuery({
    queryKey: params.id ? ["bite", params.id] : null,
    queryFn: () => getBiteRequest(params.id),
    keepPreviousData: false,
    enabled: !!params.id,
    onSuccess: (bite) => {
      setValue("title", bite.title);
      setValue("description", bite.description);
      setValue("language", bite.language);
      setValue("isPublic", bite.isPublic);
      setCode(bite.code);
      setLanguage(bite.language);
    },
  });

  return (
    <div>
      {params?.id && (
        <div className="flex justify-end">
          <button
            className="rounded bg-red-500 p-3 text-center text-white hover:bg-red-600 focus:outline-none"
            onClick={() => deleteBiteMutation.mutate(params.id)}
          >
            Delete
          </button>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title" className="font-semibold dark:text-zinc-100">
            Title
          </label>
          <input
            className="border-grey-light mb-4 block w-full rounded border p-3"
            name="title"
            autoComplete="off"
            {...register("title", { required: true })}
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>
        <div>
          <label
            htmlFor="description"
            className="font-semibold dark:text-zinc-100"
          >
            Description
          </label>
          <input
            className="border-grey-light mb-4 block w-full rounded border p-3"
            name="description"
            autoComplete="off"
            {...register("description")}
          />
        </div>
        <div>
          <label
            htmlFor="language"
            className="font-semibold dark:text-zinc-100"
          >
            Language
          </label>
          <select
            className="border-grey-light mb-4 block w-full rounded border bg-white p-3"
            name="language"
            {...register("language", { required: true })}
            onChange={(ev) => setLanguage(ev.target.value.toLowerCase())}
          >
            {Object.keys(LANGUAGUES).map((key) => (
              <option value={key} key={key}>
                {LANGUAGUES[key]}
              </option>
            ))}
          </select>
          {errors.language && <p className="text-red-500">Title is required</p>}
        </div>
        <div>
          <CodeEditor
            value={code}
            language={language}
            placeholder="Insert your code here..."
            className="my-6 block w-full rounded py-4"
            style={{
              fontSize: 14,
              backgroundColor: "#292929",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
            onChange={(ev) => setCode(ev.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div>
          <label
            htmlFor="isPublic"
            className="font-semibold dark:text-zinc-100"
          >
            Public
          </label>
          <input
            className="mx-2"
            type="checkbox"
            name="isPublic"
            {...register("isPublic")}
          />
        </div>
        <button
          type="submit"
          className="my-1 rounded bg-blue-500 p-3 text-center text-white hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BiteFormPage;
