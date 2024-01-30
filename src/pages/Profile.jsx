import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";

import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../slices/authApiSlice";
import { toast } from "sonner";

export default function Profile() {
  const { data, refetch } = useProfileQuery();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onUpdate(data) {
    const { fullName, email, password } = data;

    try {
      await updateProfile({
        fullName,
        email,
        password,
      });

      toast.success("Updated profile success...");

      refetch();
    } catch (err) {
      console.log(err?.data?.message || err.error);
      toast.error(err?.data?.message || err.error);
    }
    reset();
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-extrabold text-3xl text-slate-800 my-10">
        Profile Page
      </h1>

      <form
        onSubmit={handleSubmit(onUpdate)}
        className="lg:max-w-2xl w-full overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200"
      >
        {/*  <!-- Body--> */}
        <div className="p-6">
          <div className="flex flex-col space-y-8">
            {/*      <!-- Input field --> */}
            <div className="relative mt-6">
              <label
                htmlFor="name"
                className="text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Your full name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder={data && data.user.fullName}
                {...register("fullName")}
                className="h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-slate-700 font-bold outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>
            {/*      <!-- Input field --> */}
            <div className="relative mt-6">
              <label
                htmlFor="email"
                className="text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Your email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder={data && data.user.email}
                {...register("email")}
                className="h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-slate-700 font-bold outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>
            {/*      <!-- Input field --> */}
            <div className="relative mt-6">
              <label
                htmlFor="password"
                className="text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Your password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder={data && "•••••••••••••"}
                {...register("password")}
                className="h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-slate-700 font-bold outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>
          </div>
        </div>
        {/*  <!-- Action base sized basic button --> */}
        <div className="flex justify-end p-6 flex-col gap-2">
          {isLoading && (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          )}
          <button
            disabled={isLoading}
            className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          >
            <span>Update details</span>
          </button>
        </div>
      </form>
    </div>
  );
}
