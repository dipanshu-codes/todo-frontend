import { toast } from "sonner";
import EditTodo from "./EditTodo";

export default function TodoCard({ todo }) {
  async function onComplete() {
    const request = await fetch(
      `https://todos-backend-d8sc.onrender.com/api/todo/${todo._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isComplete: true,
        }),
      }
    );

    const response = await request.json();

    if (request.status === 200) {
      toast.success("Completed todo...");
    } else {
      toast.error(response.msg);
    }
  }

  async function onDelete() {
    const request = await fetch(
      `https://todos-backend-d8sc.onrender.com/api/todo/${todo._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
        },
      }
    );

    const response = await request.json();

    if (request.status === 200) {
      toast.success("Deleted todo...");
    } else {
      toast.error(response.msg);
    }
  }

  return (
    <>
      {/*<!-- Component: Basic card --> */}
      <div
        className={`overflow-hidden rounded ${
          todo.isComplete ? "bg-gray-700 text-white" : "bg-white text-slate-500"
        } shadow-md shadow-slate-200`}
      >
        <div className="p-6">
          <h3
            className={`mb-4 text-xl font-medium ${
              todo.isComplete ? "text-white" : "text-slate-700"
            }`}
          >
            {todo.title}
          </h3>
          <p>{todo.description}</p>
        </div>
        <div className="grid gap-4 xl:grid-cols-3 p-4">
          <EditTodo todoId={todo._id} />

          <button
            onClick={onComplete}
            className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          >
            <span>Completed</span>
          </button>

          <button
            onClick={onDelete}
            className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-rose-500 hover:bg-rose-600 focus:bg-rose-700 disabled:cursor-not-allowed disabled:border-rose-300 disabled:bg-rose-300 disabled:shadow-none"
          >
            <span>Delete</span>
          </button>
        </div>
      </div>
      {/*<!-- End Basic card --> */}
    </>
  );
}
