import EditTodo from "./EditTodo";

export default function TodoCard() {
  return (
    <>
      {/*<!-- Component: Basic card --> */}
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        <div className="p-6">
          <h3 className="mb-4 text-xl font-medium text-slate-700">
            Something to remember
          </h3>
          <p>
            All components can be copied and pasted and easily implemented in
            your tailwind css projects. You can choose which language you want
            to copy the desired component and just hover and click on the
            component you need and paste it on your project.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3 p-4">
          <EditTodo />

          <button class="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
            <span>Completed</span>
          </button>

          <button class="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-rose-500 hover:bg-rose-600 focus:bg-rose-700 disabled:cursor-not-allowed disabled:border-rose-300 disabled:bg-rose-300 disabled:shadow-none">
            <span>Delete</span>
          </button>
        </div>
      </div>
      {/*<!-- End Basic card --> */}
    </>
  );
}
