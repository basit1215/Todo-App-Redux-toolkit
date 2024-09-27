import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, editTodo } from './config/redux/reducers/todoSlice'

const App = () => {

    const ref = useRef()
    const dispatch = useDispatch()
    const selector = useSelector(state => state.todos.todos)
    console.log(selector)

    const addTask = (event) => {
        event.preventDefault()
        console.log(ref.current.value)
        dispatch(addTodo({
            title: ref.current.value
        }))
    }

    const editedTodo = (index) => {
        const newTodo = prompt("Enter new edited Todo:")
        dispatch(editTodo({
            title: newTodo,
            index
        }))
    }

    const delTodo = (index) => {
        dispatch(removeTodo({
            index
        }))
    }

    return (
        <div>
            <h1>Todo App</h1>
            <form onSubmit={addTask}>
                <input type='text' placeholder='Enter Todo...' ref={ref} />
                <button>Add Todo</button>
            </form>

            {/* <ol>
                {selector.map((item, index) =>
                    <li key={item.id}>{item.title}
                        <button onClick={() => deleteTodo(index)}>delete</button>
                        <button onClick={() => updateTodo(index)}>edit Todo</button>
                    </li>
                )}
            </ol> */}

            <ul>
                {selector ? 
                    selector.map((item, index) => (
                        <li key={item.id}>
                            {item.title}
                            <button onClick={() => editedTodo(index)}>Edit</button>
                            <button onClick={() => delTodo(index)}>Delete</button>

                        </li>
                    )) : <h1>No todo found</h1>

                }
            </ul>


        </div>
    )
}

export default App