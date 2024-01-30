import { toast } from "sonner";
import EditTodo from "./EditTodo";
import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../slices/todoApiSlice";

export default function TodoCard({ todo }) {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo, { isSuccess, reset }] = useDeleteTodoMutation();

  async function onComplete(todoId) {
    try {
      await updateTodo({ id: todoId, data: { isComplete: true } });
      toast.success("Todo completed...");
    } catch (err) {
      console.log(err?.data?.message || err.error);
      toast.error(err?.data?.message || err.error);
    }
  }

  async function onDelete(todoId) {
    try {
      await deleteTodo(todoId);

      if (isSuccess) {
        reset();
        toast.success("Deleted todo...");
      }
    } catch (err) {
      console.log(err?.data?.message || err.error);
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
      {/*<!-- Component: Basic card --> */}
      <div
        className={`overflow-hidden rounded ${
          todo.isComplete ? "bg-gray-700 text-white" : "bg-white text-slate-500"
        } shadow-md shadow-slate-200 transition-all duration-300`}
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
          <EditTodo todoId={todo._id} isComplete={todo.isComplete} />

          <button
            onClick={() => onComplete(todo._id)}
            disabled={todo.isComplete}
            className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-800 disabled:bg-emerald-900 disabled:shadow-none"
          >
            <span>Completed</span>
          </button>

          <button
            onClick={() => onDelete(todo._id)}
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
