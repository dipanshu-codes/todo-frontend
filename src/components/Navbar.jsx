import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logout());
    toast.success("Logged out");
    navigate("/");
  }

  return (
    <>
      <Toaster richColors />
      {/*<!-- Component: Navbar with CTA --> */}
      <header className="border-b-1 relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-center justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <Link to={user ? "/dashboard" : "/"}>
              <span className="flex justify-center items-center gap-2 whitespace-nowrap py-3 text-md md:text-lg focus:outline-none lg:flex-1">
                Todo&apos;s App
              </span>
            </Link>
            <div className="ml-auto flex gap-4 md:gap-10 justify-center items-center px-6 lg:ml-0 lg:p-0">
              {user ? (
                <>
                  <div className="flex items-center lg:ml-0 lg:p-0">
                    {/*        <!-- Avatar --> */}
                    <a
                      href="#"
                      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
                    >
                      <img
                        src="https://i.pravatar.cc/40?img=35"
                        alt="user name"
                        title="user name"
                        width="40"
                        height="40"
                        className="max-w-full rounded-full"
                      />
                      <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 p-1 text-sm text-white">
                        <span className="sr-only"> 7 new emails </span>
                      </span>
                    </a>
                    {/*        <!-- End Avatar --> */}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white shadow-md shadow-emerald-200 transition duration-300 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                  >
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link to="/signup">
                  <button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white shadow-md shadow-emerald-200 transition duration-300 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                    <span>Try it free</span>
                  </button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with CTA --> */}
    </>
  );
}
