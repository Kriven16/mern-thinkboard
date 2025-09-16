import Note from "../models/Notes.js";

//fetch notes

export async function getAllNodes(_, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//fetch note by id
export async function getNoteById(req,res){

  try {
    
    const {title,content} = req.body
    const getNote = await Note.findById(req.params.id);
    if(!getNote){return res.status(404).json("Note not found")}
    res.status(200).json(getNote)
  } catch (error) {
    console.error("Error in getNoteById",error)
    res.status(500).json({message:"Internal server error"})
    
  }

}
//create notes
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json({ message: savedNote });
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//update notes
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content },{new:true,});
    if(!updatedNote) return res.status(404).json({message:"Note not found"})

    res.status(200).json({ updatedNote });
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//delete notes
export async function deleteNote(req, res) {
  try {
    const {title,content}= req.body
    const deletedNode = await Note.findByIdAndDelete(req.params.id ,{title,content},{new:true})
    if(!deletedNode){return res.status(404).json({message:"Node not found"})}
    res.status(200).json({deletedNode})
  } catch (error) {
    console.error("Error in deleteNote controller",error)
    res.status(500).json({message:"Internal server error"})
    
  }
}
