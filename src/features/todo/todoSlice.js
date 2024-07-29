import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos: [],
    items: [],
    status: 'idle',
    error: null,    
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const response = await axios.get('https://dummyjson.com/posts');
    return response.data.posts;
})


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload )
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const newTodo = state.todos.find((todo) => todo.id === id)
            if(newTodo) {
                newTodo.text = text
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.status = 'loading';
        }).addCase(fetchData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
            console.log('Data fetched successfully:', action.payload);
        }).addCase(fetchData.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
        })
    }
})


export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;