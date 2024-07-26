import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    'todos': [],
}

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
            const {id, text} = action.payload;
            const newTodo = state.todos.find((todo) => todo.id === id)
            if(newTodo) {
                newTodo.text = text;
            }
        }
    }
})


export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;