import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, updateTodo, fetchData } from '../features/todo/todoSlice';

const Todos = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleUpdate = (todo) => {
    setInput(todo.text);
    setSelectedTodo(todo);
    setModal(true);
  };

  const handleSave = () => {
    if (selectedTodo) {
      dispatch(updateTodo({
        id: selectedTodo.id,
        text: input,
      }));
      setModal(false);
    }
  };

  const status = useSelector((state) => state.todo.status);
  const items = useSelector((state) => state.todo.items);
  const error = useSelector((state) => state.todo.error);

  useEffect(() => {
    if(status === 'idle') {
        dispatch(fetchData());
    }
  },[status, dispatch])

  const Data = () => {
    switch (status) {
        case 'loading':
            return <div>Loading...</div>
        case 'error':
            return <div>Error: {error}</div>
        case 'succeeded':
            return (
                <div>
                    {items.map((item) => (
                        <div key={item.id}>{item.title}</div>
                    ))}
                </div>
            );
        default:
            return null;
    }
  }

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h1>{todo.text}</h1>
          <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
          <button onClick={() => handleUpdate(todo)}>Edit</button>
        </div>
      ))}

      {modal && (
        <div>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setModal(false)}>Close</button>
        </div>
      )}

      <h1>Fetched Items</h1>

      {/* {status === 'loading' && <h1>Loading...</h1>}
      {status === 'error' && <h1>Error: {error}</h1>}
      {status === 'succeeded' && (<div>
        {items.map((item) => (
            <div key={item.id}>{item.title}</div>
        ))}
      </div>)} */}
      {Data()}
      
    </div>
  );
};

export default Todos;