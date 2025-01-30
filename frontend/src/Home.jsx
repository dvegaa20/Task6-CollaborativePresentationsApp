import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

export default function DocumentHome() {
  const [documents, setDocuments] = useState([
    {
      id: "1",
      title: "Q4 Presentation",
      type: "slide",
      thumbnail: "/placeholder.svg?height=150&width=200",
      lastModified: "2 days ago",
    },
    {
      id: "2",
      title: "Marketing Flyer",
      type: "design",
      thumbnail: "/placeholder.svg?height=150&width=200",
      lastModified: "1 week ago",
    },
    {
      id: "3",
      title: "Product Roadmap",
      type: "slide",
      thumbnail: "/placeholder.svg?height=150&width=200",
      lastModified: "3 days ago",
    },
    {
      id: "4",
      title: "Social Media Post",
      type: "design",
      thumbnail: "/placeholder.svg?height=150&width=200",
      lastModified: "1 day ago",
    },
    {
      id: "5",
      title: "Annual Report",
      type: "slide",
      thumbnail: "/placeholder.svg?height=150&width=200",
      lastModified: "1 month ago",
    },
    {
      id: "6",
      title: "Event Invitation",
      type: "design",
      thumbnail: "/placeholder.svg?height=150&width=200",
      lastModified: "2 weeks ago",
    },
  ]);

  const [isGridView, setIsGridView] = useState(true);

  const handleCreateNew = () => {
    const newDocument = {
      id: (documents.length + 1).toString(),
      title: "Untitled Document",
      type: "slide",
      thumbnail: "/placeholder.svg?height=150&width=200",
      lastModified: "Just now",
    };
    setDocuments([newDocument, ...documents]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">DocCreator</h1>
        </div>
      </header>

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
              key={doc.id}
              className={
                isGridView
                  ? "bg-white rounded-lg shadow overflow-hidden"
                  : "bg-white rounded-lg shadow overflow-hidden flex"
              }
            >
              <img
                src={doc.thumbnail || "/placeholder.svg"}
                alt={doc.title}
                className={
                  isGridView
                    ? "w-full h-40 object-cover"
                    : "w-24 h-24 object-cover"
                }
              />
              <div className={isGridView ? "p-4" : "p-4 flex-grow"}>
                <h3 className="font-semibold text-lg mb-2">{doc.title}</h3>
                <p className="text-sm text-gray-500">
                  {doc.type === "slide" ? "Presentation" : "Design"} • Last
                  modified {doc.lastModified}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
