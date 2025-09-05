import { Label } from "@radix-ui/react-label";
import type { ReceiptRussianRuble } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useAuth } from "../lib/AuthContext";
import LoginStatusMarker from "~/components/LoginStatusMarker";

// Main component for adding a new entry/post
export default function AddEntry() {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10);

  // State for form data (title, content, date)
  const [entryData, setEntryData] = useState({
    title: "",
    content: "",
    dateCreated: today,
  });

  // State for success and error messages
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Hent loginstatus frå AuthContext
  const { isLoggedIn } = useAuth();

  // Handles changes in input fields and updates state
  const handleFormChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setEntryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Sjekk om brukar er innlogga før validering
    if (!isLoggedIn) {
      setError("You must be logged in to post an entry.");
      return;
    }

    // Frontend validation
    if (entryData.title.length < 1 || entryData.title.length > 20) {
      setError("Title must be between 1 and 20 characters.");
      return;
    }
    if (entryData.content.length < 10 || entryData.content.length > 300) {
      setError("Content must be between 10 and 300 characters.");
      return;
    }

    // If validation passes, call submitEntry
    submit(e);
  };

  // Handles form submission: sends entry data to backend
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload on submit
    setSuccess(""); // Reset success message
    setError(""); // Reset error message

    const body = { ...entryData }; // Prepare data to send

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in."); // Show error if not logged in
        return;
      }

      // Send POST request to backend with entry data and token
      const response = await fetch("http://localhost:4000/add-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
      });

      // If response is not OK, show error message from backend
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to add comment.");
      }

      // If successful, show success message and reset form
      setSuccess("Comment added!");
      setEntryData({
        title: "",
        content: "",
        dateCreated: today,
      });
    } catch (err) {
      // Show error message if something goes wrong
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  // Render the form UI
  return (
    <>
      {/* Hero-liknande toppseksjon */}
      <section className="relative bg-gradient-to-br from-amber-200 via-amber-100 to-white py-12 mb-10 rounded-b-3xl">
        <div className="container mx-auto flex flex-col items-center justify-center text-center gap-4">
          <h1 className="text-4xl font-extrabold text-amber-700 drop-shadow">
            Add a New Entry
          </h1>
          <p className="text-lg text-slate-700 max-w-xl mx-auto">
            Share your thoughts with the world! Fill out the form below to post a
            new entry.
          </p>
        </div>
        {/* Dekorativ bølge i botn */}
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

      {/* Resten av addEntry-innhaldet, t.d. skjema */}
      <div className="container mx-auto max-w-xl">
        {/* Vis skjema berre om innlogga */}
        {isLoggedIn ? (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h3>Add comment</h3>
            {/* Title input field */}
            <Label htmlFor="title">
              Title (1-20 chars.)
              <Input
                name="title"
                className="bg-white"
                value={entryData.title}
                onChange={handleFormChange}
                required
              />
            </Label>
            {/* Content textarea field */}
            <Label htmlFor="content">
              Content (10-200 chars.)
              <Textarea
                name="content"
                className="bg-white"
                value={entryData.content}
                onChange={handleFormChange}
                required
              />
            </Label>
            {/* Submit button */}
            <Button type="submit">Submit entry</Button>
            {/* Show error message if any */}
            {error && <p className="text-red-500">{error}</p>}
            {/* Show success message if any */}
            {success && <p className="text-green-500">{success}</p>}
          </form>
        ) : (
          <div className="max-w-xl mx-auto my-8">
            <div className="flex items-center gap-3 bg-amber-100 border-l-4 border-amber-400 rounded-xl px-6 py-4 shadow-sm">
              <svg
                className="w-7 h-7 text-amber-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
              <span className="text-amber-800 font-semibold text-lg">
                You must be logged in to post an entry.
              </span>
            </div>
          </div>
        )}
      </div>
      <LoginStatusMarker />
    </>
  );
}
