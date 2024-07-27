import React, {useState} from 'react'
import { addTodo } from '../features/todo/todoSlice'
import { useDispatch } from 'react-redux';

const AddTodo = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if(input !== '') {
    dispatch(addTodo(input));
    setInput('')
    }
  }

  return (
    <form onSubmit={handleAddTodo}>
        <input type='text' placeholder='Enter todo' value={input} onChange={(e) => setInput(e.target.value)} />
        <button type='submit'>Add</button>
    </form>
  )
}

export default AddTodo
