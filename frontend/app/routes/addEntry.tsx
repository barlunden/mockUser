import { Label } from "@radix-ui/react-label";
import type { ReceiptRussianRuble } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useAuth } from "../lib/AuthContext";

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
      <title>Add comment</title>
      <section className="container bg-gradient-to-br from-amber-100 to-amber-300 rounded-2xl border-1 border-amber-500">
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
          <p className="text-red-500">
            You must be logged in to post an entry.
          </p>
        )}
      </section>
    </>
  );
}
