import Document from "../model/documentSModel.js";

// Create a new document
export const createDoc = async (req, res) => {
  try {
    const { id, content } = req.body;

    const docs = new Document({ _id: id, content });
    await docs.save();

    res.status(200).json({
      success: true,
      message: "Document created successfully",
      docs,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error in create document",
      error,
    });
  }
};

// Fetch a document by ID
export const fetchDoc = async (req, res) => {
  try {
    const docs = await Document.findById(req.params.id);
    if (!docs) return res.status(404).json({ error: "Document not found" });
    res.status(200).json({
      success: true,
      message: "Document fetch successfully",
      docs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching document",
      error,
    });
  }
};

// Update document content
export const updateDoc = async (req, res) => {
  try {
    const { content } = req.body;
    const updatedDoc = await Document.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!updatedDoc)
      return res.status(404).json({ error: "Document not found" });
    res.json(updatedDoc);
  } catch (error) {
    res.status(500).json({ error: "Error updating document" });
  }
};
