import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoSlice';

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [modal, setModal] = useState('');

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
            <h1>{todo.text}</h1>
            <button onClick={() => dispatch(removeTodo(todo.id))}>delete</button>
        </div>
      ))}

      {modal ? <div></div> : <></>}
    </div>
  )
}

export default Todos
