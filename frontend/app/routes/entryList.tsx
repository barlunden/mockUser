import { useEffect, useState } from "react";

type Entry = {
  id: string | number;
  title: string;
  content: string;
  author?: {
    fullName: string;
    email: string;
  };
};

export default function EntryList() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/entries")
      .then((res) => res.json())
      .then((data) =>
        Array.isArray(data)
          ? setEntries(data)
          : setError("Could not fetch entries")
      )
      .catch(() => setError("Could not fetch entries"));
  }, []);

  if (error) return <p className="text-red-500 font-semibold">{error}</p>;
  return (
    <>
    <title>The Entries</title>
      <div className="container mx-auto py-8">
        <h3 className="font-bold mb-6 text-amber-700 text-center">
          All entries
        </h3>
        <div className="flex flex-col gap-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="entries"
            >
              <h3 className="">
                {entry.title}
              </h3>
              <p className="">{entry.content}</p>
              <div className="">
                <span className="font-medium">{entry.author?.fullName}</span>
                {entry.author?.email && (
                  <span className="">
                    {entry.author.email}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
