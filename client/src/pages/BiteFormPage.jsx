import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addBiteRequest, getBiteRequest, updateBiteRequest } from "../api/bite";
import { useNavigate, useParams } from "react-router-dom";

const BiteFormPage = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const createBiteMutation = useMutation({
    mutationFn: addBiteRequest,
    onSuccess: () => {
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
    console.log(values);
    try {
      if (params.id) {
        updateBiteMutation.mutate({ ...values, _id: params.id });
      } else {
        createBiteMutation.mutate(values);
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
      setValue("code", bite.code);
      setValue("isPublic", bite.isPublic);
    },
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="border-grey-light mb-4 block w-full rounded border p-3"
            name="title"
            autoComplete="off"
            {...register("title", { required: true })}
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            className="border-grey-light mb-4 block w-full rounded border p-3"
            name="description"
            autoComplete="off"
            {...register("description")}
          />
        </div>
        <div>
          <label htmlFor="language">Language</label>
          <select
            className="border-grey-light mb-4 block w-full rounded border bg-white p-3"
            name="language"
            {...register("language", { required: true })}
          >
            <option value="Javascript">Javascript</option>
            <option value="Python">Python</option>
            <option value="Lua">Lua</option>
          </select>
          {errors.language && <p className="text-red-500">Title is required</p>}
        </div>
        <div>
          <textarea
            className="border-grey-light mb-4 block w-full rounded border bg-white p-3"
            rows="10"
            autoComplete="off"
            name="code"
            {...register("code", { required: true })}
          />
          {errors.code && (
            <p className="text-red-500">Code snippet cannot be empty</p>
          )}
        </div>
        <div>
          <label htmlFor="isPublic">Public</label>
          <input
            className="block"
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
