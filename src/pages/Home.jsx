import AddTodo from "../components/AddTodo";
import TodoCard from "../components/TodoCard";

export default function Home() {
  return (
    <>
      <header className="text-center my-10">
        <AddTodo />
      </header>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
      </div>
    </>
  );
}
