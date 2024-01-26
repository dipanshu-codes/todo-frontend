import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const createTodoSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be atleast 4 characters long..." }),
  description: z
    .string()
    .min(10, { message: "Description must be atleast 10 characters long..." })
    .max(50)
    .optional(),
});

export default function AddTodo() {
  const [isShowing, setIsShowing] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    let html = document.querySelector("html");

    if (html) {
      if (isShowing && html) {
        html.style.overflowY = "hidden";

        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const modal = document.querySelector("#modal"); // select the modal by it's id

        const firstFocusableElement =
          modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal

        const focusableContent = modal.querySelectorAll(focusableElements);

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        document.addEventListener("keydown", function (e) {
          if (e.keyCode === 27) {
            setIsShowing(false);
          }

          let isTabPressed = e.key === "Tab" || e.keyCode === 9;

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus(); // add focus for the last focusable element
              e.preventDefault();
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus(); // add focus for the first focusable element
              e.preventDefault();
            }
          }
        });

        firstFocusableElement.focus();
      } else {
        html.style.overflowY = "visible";
      }
    }
  }, [isShowing]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(createTodoSchema),
  });

  async function onCreateTodo(data) {
    const { title, description } = data;

    const request = await fetch(
      "https://todos-backend-d8sc.onrender.com/api/todos",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      }
    );

    const response = await request.json();

    if (request.status === 201) {
      toast.success("Created todo...");
    } else {
      toast.error(response.msg);
    }

    reset();
  }

  return (
    <>
      <button
        onClick={() => setIsShowing(true)}
        className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
      >
        <span>Add Todo...</span>
      </button>

      {isShowing && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-4a content-4a"
              aria-modal="true"
              tabIndex="-1"
              role="dialog"
            >
              {/*    <!-- Modal --> */}
              <div
                ref={wrapperRef}
                className="flex max-h-[90vh] max-w-sm flex-col gap-4 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                id="modal"
                role="document"
              >
                {/*        <!-- Modal body --> */}
                <div id="content-4a" className="flex-1">
                  <form
                    onSubmit={handleSubmit(onCreateTodo)}
                    className="flex flex-col gap-6 m-10"
                  >
                    {/* <!-- Input field --> */}
                    <div className="relative">
                      <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="write your title"
                        {...register("title", { required: true })}
                        className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label
                        htmlFor="title"
                        className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Title
                      </label>

                      {errors.title && (
                        <span className="text-red-500">
                          {errors.title.message}
                        </span>
                      )}
                    </div>
                    {/* <!-- Component: Rounded base size basic textarea --> */}
                    <div className="relative">
                      <textarea
                        id="description"
                        type="text"
                        name="description"
                        placeholder="Write your description"
                        rows="3"
                        {...register("description")}
                        className="relative w-full px-4 py-2 text-sm placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      ></textarea>
                      <label
                        htmlFor="description"
                        className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Description
                      </label>

                      {errors.description && (
                        <span className="text-red-500">
                          {errors.description.message}
                        </span>
                      )}
                    </div>
                    {/* <!-- End Rounded base size basic textarea --> */}

                    {/* <!-- Modal actions --> */}
                    <div className="flex justify-center gap-2">
                      <button className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                        <span>Add</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
