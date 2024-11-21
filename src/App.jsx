import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBook,
  deleteBook,
  editBook,
  fetchBook,
} from "./features/books/bookSlice";
import View_books from "./components/View_books";

function App() {
  const [book, setBook] = useState({});
  const dispatch = useDispatch();
  const [editId, setEditId] = useState("");

  let handleInput = (e) => {
    let { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  useEffect(() => {
    dispatch(fetchBook());
  }, []);

  let handleSubmit = (e) => {
    e.preventDefault();
    setBook({});
    if (editId == "") {
      dispatch(createBook(book));
    } else {
      dispatch(editBook(book));
      setEditId("");
    }
  };

  let handleEdit = (book) => {
    setBook(book);
    setEditId(book.id);
  };

  return (
    <>
      <div className="container">
        <form className="mx-auto mt-3 w-50" onSubmit={handleSubmit}>
          <h2>Form</h2>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={book.title || ""}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={book.description || ""}
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <View_books handleEdit={handleEdit} />
      </div>
    </>
  );
}

export default App;
