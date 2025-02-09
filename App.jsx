import { useState } from "react";
import axios from "axios";
import VerseDisplay from "./VerseDisplay";

export default function App() {
  const [randomVerse, setRandomVerse] = useState("");
  const [specificVerse, setSpecificVerse] = useState("");
  const [reference, setReference] = useState("");

  // Function to get a random Bible verse
  const fetchRandomVerse = async () => {
    try {
      const response = await axios.get(
        "https://labs.bible.org/api/?passage=random&type=json"
      );
      const verseData = response.data[0];
      setRandomVerse(`${verseData.bookname} ${verseData.chapter}:${verseData.verse} - ${verseData.text}`);
    } catch (error) {
      console.error("Error fetching random verse:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Bible Verse App</h1>

      {/* Random Verse Section */}
      <button
        onClick={fetchRandomVerse}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Get Random Verse
      </button>
      {randomVerse && (
        <p className="mt-4 p-3 bg-white shadow-md rounded">{randomVerse}</p>
      )}

      {/* Specific Verse Section */}
      <div className="mt-6">
        <input
          type="text"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Enter verse (e.g. John 3:16)"
          className="border px-3 py-2 rounded shadow-md"
        />
        <button
          onClick={() => VerseDisplay(reference, setSpecificVerse)}
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Get Specific Verse
        </button>
      </div>
      {specificVerse && (
        <p className="mt-4 p-3 bg-white shadow-md rounded">{specificVerse}</p>
      )}
    </div>
  );
}
