import { useForm } from "react-hook-form";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { LANGUAGUES } from "../data/languages";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBiteRequest, updateBiteRequest } from "../api/bite.js";
import { useNavigate } from "react-router-dom";

export const FORM_STATE = {
  CREATE: "create",
  UPDATE: "update",
};

const Form = ({ bite, state, resetDashboard }) => {
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState(FORM_STATE.CREATE);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createBiteMutation = useMutation({
    mutationFn: addBiteRequest,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const updateBiteMutation = useMutation({
    mutationFn: updateBiteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["bites"]);
      resetDashboard();
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setError(null);

    try {
      if (!code) {
        setError("Code snippet is required");
        return;
      }

      const biteSnippet = { ...values, code };
      if (formState === FORM_STATE.CREATE) {
        createBiteMutation.mutate(biteSnippet);
      } else if (formState === FORM_STATE.UPDATE) {
        updateBiteMutation.mutate({ ...biteSnippet, _id: bite._id });
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    setFormState(state);
  }, [state]);

  useEffect(() => {
    if (bite) {
      setValue("title", bite.title);
      setValue("description", bite.description);
      setValue("language", bite.language);
      setValue("isPublic", bite.isPublic);
      setCode(bite.code);
      setLanguage(bite.language);
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title" className="font-semibold dark:text-zinc-100">
          Title
        </label>
        <input
          className="border-grey-light mb-4 block w-full rounded border p-3 dark:border-neutral-900 dark:bg-neutral-800"
          name="title"
          autoComplete="off"
          {...register("title", { required: true })}
        />
        {errors.title && <p className="text-red-500">Title is required</p>}
      </div>
      <div>
        <CodeEditor
          language={language}
          value={code}
          placeholder="Insert your code here..."
          className="my-6 block w-full rounded py-4"
          style={{
            overflowX: "visible",
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
          htmlFor="description"
          className="font-semibold dark:text-zinc-100"
        >
          Description
        </label>
        <input
          className="border-grey-light mb-4 block w-full resize-y rounded border p-3 dark:border-neutral-900 dark:bg-neutral-800"
          name="description"
          autoComplete="off"
          {...register("description")}
        />
      </div>
      <div>
        <label htmlFor="language" className="font-semibold dark:text-zinc-100">
          Language
        </label>
        <select
          className="border-grey-light mb-4 block w-full rounded border bg-white p-3 dark:border-neutral-900 dark:bg-neutral-800"
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
        <label htmlFor="isPublic" className="font-semibold dark:text-zinc-100">
          Public
        </label>
        <input
          className="mx-2 mb-2"
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
  );
};

export default Form;
