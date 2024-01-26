import { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import TodoCard from "../components/TodoCard";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const request = await fetch("/api/todos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
      },
    });

    const response = await request.json();

    if (request.status === 200) {
      setTodos(response.todos);
    } else {
      toast.error(response.msg);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <Toaster richColors />
      <header className="text-center my-10">
        <AddTodo />
      </header>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {todos && todos.map((todo) => <TodoCard key={todo._id} todo={todo} />)}
      </div>
    </>
  );
}
