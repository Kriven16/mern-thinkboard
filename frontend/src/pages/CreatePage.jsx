import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../lib/axios.js";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const  handSubmit = async (e) => {
    
    e.preventDefault();
    if(!content.trim()|| !title.trim()){

      toast.error("All fields are required")
      return;
    }
    setLoading(true)
    try {
      await api.post("/notes",{
        title,content
      })
      toast.success("Note created Successfully");
      navigate('/')



      
    } catch (error) {
      if(error.response.status===429){
        toast.error("Slow down! You're creating notes to fast",{
          duration:4000,
          icon:"💀",
        })
      }else{
        toast.error("Failed to create note")

        console.log("Failed to create note",error)
      }
      
    }finally{
      setLoading(false)

    }
    
  };
  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="container mx-auto px-4 py-8 ">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card  bg-base-100">
            <div className="card-body ">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handSubmit}>
                {/* title */}
                <div className="form-control flex flex-col mb-4 gap-2">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input w-full "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {/* {textarea} */}
                <div className="form-control mb-4 flex flex-col gap-2">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    className="textarea  h-32 w-full"
                    placeholder="Write your note here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." :"Create Note"}

                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
