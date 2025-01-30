import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { format } from "date-fns";
import Header from "./components/Header";

export default function DocumentHome() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((error) => console.error("Error fetching documents:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Your Documents
          </h2>
          <div className="flex items-center space-x-4">
            <Link to={`/documents/${uuidV4()}`}>
              <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-1 px-4 rounded">
                Create New
              </button>
            </Link>
            <button
              onClick={() => setIsGridView(true)}
              className={`px-3 py-1 rounded ${
                isGridView ? "bg-gray-600 text-white" : "bg-white text-black"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`px-3 py-1 rounded ${
                !isGridView ? "bg-gray-600 text-white" : "bg-white text-black"
              }`}
            >
              List
            </button>
          </div>
        </div>

        <div
          className={
            isGridView
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {documents.map((doc) => (
            <div
              key={doc._id}
              className={
                isGridView
                  ? "bg-white rounded-lg shadow overflow-hidden"
                  : "bg-white rounded-lg shadow overflow-hidden flex"
              }
              onClick={() => navigate(`/documents/${doc._id}`)}
            >
              <img
                src={"/document.webp" || doc.thumbnail}
                alt={doc.title}
                className={
                  isGridView
                    ? "w-full h-40 object-cover"
                    : "w-24 h-24 object-cover"
                }
              />
              <div className={isGridView ? "p-4" : "p-4 flex-grow"}>
                <h3 className="font-semibold text-lg mb-2">
                  {doc.title ? doc.title : "Untitled"}
                </h3>
                <p className="text-sm text-gray-500">
                  {doc.type === "slide" ? "Presentation" : "Design"} • Last
                  modified{" "}
                  {format(new Date(doc.lastModified), "yyyy-MM-dd HH:mm:ss")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
