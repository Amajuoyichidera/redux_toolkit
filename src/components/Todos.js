import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo } from '../features/todo/todoSlice';

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div>
      {todos.map((todo) => (
        <div>
            <h1>{todo.text}</h1>
            <button onClick={() => dispatch(removeTodo(todo.id))}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default Todos
