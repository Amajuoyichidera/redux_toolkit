import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoSlice';

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState('');
  
  const handleUpdate = (todo) => {
    setInput(todo.text);
    setSelectedTodo(todo);
    setModal(true);
  }

  const handleSave = () => {
    if(selectedTodo) {
        dispatch(updateTodo({
            id: selectedTodo.id,
            text: input,
        }))
        setModal(false)
    }
  }
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
            <h1>{todo.text}</h1>
            <button onClick={() => dispatch(removeTodo(todo.id))}>delete</button>
            <button onClick={() => handleUpdate(todo)}>Edit</button>
        </div>
      ))}

    {modal && <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleSave}>save</button>
        <button onClick={() => setModal(false)}>close</button>
    </div> }
    </div>
  )
}

export default Todos
