import axios from "axios";

// Here we are hitting the Python backend that is returning the embeddings
// of the text we're giving using jiva model from hugging face.
export const getEmbedding = async (text) => {
  const response = await axios.post("http://127.0.0.1:8000/embed", {
    text,
  });

  return response.data.embedding; // array of 768 floats
};
