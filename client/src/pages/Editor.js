import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import io from "socket.io-client";

const socket = io("http://localhost:2026");

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [text, setText] = useState();
  const [docs, setDocs] = useState({});
  const [updateDocs, setUpdateDocs] = useState(false);
  const [view, setView] = useState(false);

  const handleSaveDocument = async (e) => {
    e.preventDefault();
    try {
      // const contentState = editorState.getCurrentContent();
      // const plainText = contentState.getPlainText();

      if (text != undefined) {
        const response = await axios.post("http://localhost:2026/api/docs", {
          id: id,
          content: text,
        });

        if (response.data.success) {
          alert("Docs save successfully");
          localStorage.setItem(
            "docsId",
            JSON.stringify(response.data.docs._id)
          );
          navigate("/");
          // return response;
        } else {
          throw Error("Error in creating docs");
        }
      } else {
        alert("Docs is Empty");
      }
    } catch (error) {
      console.log("Error in save documents", error);
    }
  };

  // const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Fetch document on load
  async function fetchData() {
    try {
      const id = localStorage.getItem("docsId");

      const getDocs = await axios.get(
        `http://localhost:2026/api/docs/${JSON.parse(id)}`
      );
      setDocs(getDocs.data.docs);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
    socket.on("connect", (text) => {
      console.log(text)
      socket.emit("change", (text) => {
        console.log(text);
        setText(text);
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  //   Handle editor changes
  // const handleEditorChange = (state) => {
  //   setEditorState(state);
  //   // const content =
  //   // JSON.stringify(convertToRaw(state.getCurrentContent()));
  //   // return res;
  //   // socket.emit("editDocument", { docId: id, content });
  // };

  const handleUpdate = async () => {
    setText(docs.content);
    setUpdateDocs(true);
  };

  const handleDocsUpdation = async () => {
    try {
      setText(docs.content);
      const res = await axios.put(
        `http://localhost:2026/api/docs/${docs._id}`,
        { content: text }
      );
      setDocs(res.data);
      setUpdateDocs(false);
      setText("");
    } catch (error) {
      console.log("Error in updating docs", error);
    }
  };

  return (
    <>
      <div
        className={
          view
            ? "flex justify-center items-center z-10 absolute m-auto w-full top-auto h-full opacity-100"
            : "hidden"
        }
      >
        <div className="w-80 p-4 border rounded-md border-black m-4 absolute">
          <button
            className="absolute -top-6 -right-2 "
            onClick={() => setView(false)}
          >
            ✖️
          </button>
          <p>{docs?.content}</p>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center p-4 -z-0">
        <h2 className="text-2xl font-bold mb-4">Document Editor</h2>
        <textarea
          className={
            !view
              ? "w-full border-2 rounded p-2 min-h-96 capitalize"
              : "opacity-5 w-full border-2 rounded p-2 min-h-96 capitalize"
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="border border-2 rounded p-2"
        editorClassName="min-h-[300px]"
      /> */}
        <button
          type="submit"
          onClick={!updateDocs ? handleSaveDocument : handleDocsUpdation}
          className="px-6 py-2 bg-blue-500 text-white rounded-md my-4"
        >
          {!updateDocs ? "Save Document" : "Update Document"}
        </button>

        {!docs._id ? (
          <h1 className="my-4">Document is not found!</h1>
        ) : (
          <div
            key={docs._id}
            className="flex items-center justify-between border-2 p-2 w-full"
          >
            <p className="">{docs ? docs.content.slice(0, 20) : ""}....</p>
            <div>
              <button
                className="px-4 py-1 bg-blue-500 m-1 rounded-md text-white"
                onClick={() => setView(true)}
              >
                View
              </button>
              <button
                className="px-2 py-1 bg-blue-500 m-1 rounded-md text-white"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditorPage;
