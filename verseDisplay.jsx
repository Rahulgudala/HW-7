import axios from "axios";

const VerseDisplay = async (reference, setSpecificVerse) => {
  if (!reference.trim()) {
    setSpecificVerse("Please enter a valid verse reference.");
    return;
  }

  try {
    const response = await axios.get(
      `https://labs.bible.org/api/?passage=${encodeURIComponent(reference)}&type=json`
    );
    if (response.data.length > 0) {
      const verseData = response.data[0];
      setSpecificVerse(
        `${verseData.bookname} ${verseData.chapter}:${verseData.verse} - ${verseData.text}`
      );
    } else {
      setSpecificVerse("No verse found for the given reference.");
    }
  } catch (error) {
    console.error("Error fetching specific verse:", error);
    setSpecificVerse("Failed to fetch the verse. Please try again.");
  }
};

export default VerseDisplay;
