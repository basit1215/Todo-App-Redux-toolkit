import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, editTodo } from './config/redux/reducers/todoSlice'

const App = () => {

    const ref = useRef()
    const dispatch = useDispatch()
    const selector = useSelector(state => state.todos.todos)

    const addTask = (event) => {
        event.preventDefault()
        if (!ref.current.value) {
            alert("Please enter Todo");
            return
        }
        dispatch(addTodo({
            title: ref.current.value
        }))
        ref.current.value = ""
    }

    const editedTodo = (index) => {
        const newTodo = prompt("Enter new edited Todo:")
        if (newTodo) {
            dispatch(editTodo({
                title: newTodo,
                index
            }))
        }
    }

    const delTodo = (index) => {
        dispatch(removeTodo({
            index
        }))
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-700 via-pink-500 to-red-500 p-6">
            <h1 className="text-5xl font-extrabold mb-8 text-white drop-shadow-2xl text-center">Todo App</h1>

            <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mb-10">
                <input 
                    type='text' 
                    placeholder='Enter Todo...' 
                    ref={ref} 
                    className="flex-1 p-4 border-2 border-transparent rounded-lg focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-300 transition-all duration-300 ease-in-out shadow-xl bg-white placeholder-gray-400"
                />
                <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 px-8 rounded-lg hover:bg-gradient-to-l hover:from-red-500 hover:to-pink-500 focus:ring-4 focus:ring-pink-300 transition-all duration-300 ease-in-out shadow-xl">
                    Add Todo
                </button>
            </form>

            <ul className="w-full max-w-xl space-y-6">
                {selector.length > 0 ?
                    selector.map((item, index) => (
                        <li 
                            key={item.id} 
                            className="flex justify-between items-center p-5 bg-white shadow-2xl rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out"
                        >
                            <span className="text-lg font-semibold text-gray-800">{item.title}</span>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => editedTodo(index)} 
                                    className="bg-yellow-400 text-white py-2 px-5 rounded-lg hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 transition-all duration-300 ease-in-out shadow-lg"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => delTodo(index)} 
                                    className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300 transition-all duration-300 ease-in-out shadow-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    )) : <h1 className="text-center text-3xl text-white font-semibold">No Todos Found!</h1>
                }
            </ul>
        </div>
    )
}

export default App