import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoSlice';
import { fetchData } from '../features/todo/todoSlice';

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

  const status = useSelector((state) => state.todos.status)
  const items = useSelector((state) => state.todos.items)
  const error = useSelector((state) => state.todos.error)

  useEffect(() => {
    if(status === 'idle') {
        dispatch(fetchData())
    }
  }, [status, dispatch])

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

    <h1>Fetched Items</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Todos
