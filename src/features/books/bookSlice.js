import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance from "../../api/apiInstance";

const initialState = {
    books: [],
    error: null,
    loading: false
}

export const createBook = createAsyncThunk('books/createBook', async (newBook, { rejectWithValue }) => {
    try {
        const res = await apiInstance.post('/books.json', newBook);
        console.log(res);
        return { ...newBook, id: res.data.name }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const fetchBook = createAsyncThunk('books/fetchBook', async (_, { rejectWithValue }) => {
    try {
        const res = await apiInstance.get('/books.json');
        return Object.keys(res.data).map((key) => ({ id: key, ...res.data[key] }))
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const deleteBook = createAsyncThunk('books/deleteBook', async (id, { rejectWithValue }) => {
    try {
        await apiInstance.delete(`/books/${id}.json`);
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const editBook = createAsyncThunk('books/editBook', async (book, { rejectWithValue }) => {
    try {
        let obj = {
            title: book.title,
            description: book.description
        }
        await apiInstance.patch(`/books/${book.id}.json`, obj);
        return book;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books.push(action.payload);
            })
            .addCase(createBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBook.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                state.books = action.payload;
            })
            .addCase(fetchBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.books = state.books.filter((item) => item.id != action.payload);
            })
            .addCase(editBook.pending, (state) => {
                state.loading = true
                state.error = null;
            })
            .addCase(editBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books = state.books.filter((book) => {
                    let { id, title, description } = action.payload;
                    if (book.id == id) {
                        book.title = title,
                            book.description = description
                    }
                    return book;
                })
            })
            .addCase(editBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default bookSlice.reducer;