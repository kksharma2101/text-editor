// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {nanoid} from "nanoid"
// import { v4 as uuidv4 } from "uuid";

const Home = () => {
  //   const [docId, setDocId] = useState("");
  const navigate = useNavigate();

  const createNewDocument = () => {
    const newId = nanoid(8); // Generate a unique document ID
   
    navigate(`/docs/${newId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Real-Time Text Editor</h1>
      <button
        onClick={createNewDocument}
        className="px-6 py-2 bg-blue-500 text-white rounded-md"
      >
        Create New Document
      </button>
    </div>
  );
};

export default Home;
