import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import { useAuth } from "~/lib/AuthContext";
import { useOutletContext } from "react-router";
import LoginStatusMarker from "~/components/LoginStatusMarker";

// Define the context type for useOutletContext
type OutletContextType = {
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
};

// Meta information for the route (used by React Router for document head)
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Message Board" },
    { name: "description", content: "Welcome to my message board!" },
  ];
}

// Main Home component
export default function Home() {
  const { isLoggedIn } = useAuth();
  const { sheetOpen, setSheetOpen } = useOutletContext<OutletContextType>();

  return (
    <>
      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-amber-200 via-amber-100 to-white py-16 mb-10 rounded-b-3xl">
        <div className="container mx-auto flex flex-col items-center justify-center text-center gap-4">
          <img
            src="/logo.png"
            alt="Proper Posts Logo"
            className="h-32 w-auto mb-4 drop-shadow-lg"
          />
          <h1 className="text-5xl font-extrabold text-amber-700 drop-shadow">
            Proper Posts
          </h1>
          <p className="text-xl text-slate-700 max-w-xl mx-auto">
            The best app for every bored afternoon. Share your thoughts, read
            others’ posts, and join the conversation!
          </p>
          <div className="mt-4">
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full shadow transition"
              onClick={() => setSheetOpen(true)}
              disabled={isLoggedIn}
            >
              Get Started
            </Button>
          </div>
        </div>
        {/* Optional: Decorative SVG wave at bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ pointerEvents: "none" }}
        >
          <path
            fill="#fff"
            d="M0,32 C360,80 1080,0 1440,48 L1440,80 L0,80 Z"
          />
        </svg>
      </section>

      {/* Resten av Home-innhaldet */}
      <div className="angle">
        <section className="container pb-36">
          {/* Main heading */}
          <blockquote className="relative bg-amber-50 border-l-8 border-amber-400 rounded-r-xl shadow-md px-8 py-6 my-8 text-lg italic text-amber-900 font-serif">
            <span className="absolute -left-6 -top-4 text-6xl text-amber-300 select-none">
              “
            </span>
            Why did the bobbin visit the login page? To weave itself into the
            conversation.
            <span className="absolute -right-6 -bottom-4 text-6xl text-amber-300 select-none">
              ”
            </span>
          </blockquote>

          <h4>Your friendly mockup-hosts are:</h4>
          {/* Static table with example users */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Password
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Example user rows */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    Willy Wonka
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    ww@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    chocolate
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    Alice Wonderland
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    alice@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    wonderland
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-6 py-3 text-gray-600 text-sm" colSpan={3}>
                    {/* Note about example users */}
                    Note: The users above will happily lend you their login
                    credentials. However, you may also create your own unique
                    user.
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>

      {/* Login status marker */}
      <LoginStatusMarker />
    </>
  );
}
