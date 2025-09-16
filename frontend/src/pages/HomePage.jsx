import { useEffect, useState } from "react";
import Nav from "../compoenents/Nav";
import RateLimitedUI from "../compoenents/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../compoenents/NoteCard.jsx";
import api from "../lib/axios.js"
import NotesNotFound from "../compoenents/NotesNotFound.jsx";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        //fetch data
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false); //doesnt show the tag
      } catch (error) {
        console.log("Error fetching notes", error);
        //if the error is =429 then its a rate limit error
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Nav />
      {isRateLimited && <RateLimitedUI />}


      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading notes...{" "}
          </div>
        )}
        {notes.length === 0 && !isRateLimited && <NotesNotFound/> }
        {notes.length > 0 && !isRateLimited && (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
