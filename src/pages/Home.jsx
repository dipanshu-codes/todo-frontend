import AddTodo from "../components/AddTodo";
import TodoCard from "../components/TodoCard";
import { Toaster, toast } from "sonner";
import Spinner from "../components/Spinner";

import { useGetTodosQuery } from "../slices/todoApiSlice";

export default function Home() {
  const { data, isLoading, isError } = useGetTodosQuery();

  if (isError) {
    return toast.error(isError);
  }

  return (
    <>
      <Toaster richColors />
      <header className="text-center my-10">
        <AddTodo />
      </header>

      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 my-10">
        {data?.todos &&
          data?.todos.map((todo) => <TodoCard key={todo._id} todo={todo} />)}
      </div>
    </>
  );
}
