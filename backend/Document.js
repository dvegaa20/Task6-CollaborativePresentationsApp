const { Schema, model } = require("mongoose");

const DocumentSchema = new Schema({
  _id: String,
  title: {
    type: String,
    required: true,
    default: "Untitled Document",
  },
  type: { type: String, default: "slide" },
  thumbnail: { type: String, default: "/placeholder.svg?height=150&width=200" },
  lastModified: { type: Date, default: Date.now },
  data: { type: Object, default: {} },
});

module.exports = model("Document", DocumentSchema);
