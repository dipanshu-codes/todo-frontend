export default function Landing() {
  return (
    <header className="text-center">
      <h1 className="my-10 md:mx-10 lg:mx-18 text-slate-700 text-xl md:text-2xl lg:text-4xl font-bold">
        This is a full-stack todo web app build with Reactjs, Tailwindcss,
        RTK-Query, Express, MongoDB.
      </h1>
      <p className="text-lg font-normal my-10 text-slate-500">
        A todo app where user can signup, login, do CRUD operations. User can
        also edit their personal details like email, password, etc.
      </p>
    </header>
  );
}
