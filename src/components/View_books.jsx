import React from "react";
import { deleteBook } from "../features/books/bookSlice";
import { useDispatch, useSelector } from "react-redux";

function View_books({ handleEdit }) {
  const { books, error, loading } = useSelector((state) => state.book);

  const dispatch = useDispatch();
  if (loading) return <div>Loading...</div>;
  if (books.length == 0) return <div>No books found</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="row mt-3 justify-content-center">
        {books.map((book) => (
          <div className="col-3">
            <div className="card" style={{ width: "18rem" }}>
              {/* <img src="..." className="card-img-top" alt="..." /> */}
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.description}</p>
                <button
                  className="btn btn-danger me-1"
                  onClick={() => dispatch(deleteBook(book.id))}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default View_books;
