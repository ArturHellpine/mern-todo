import React, { useCallback, useContext, useEffect, useState } from 'react';
import './MainPage.scss'
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const MainPage = () => {
    const [text, setText] = useState('')
    const [todos, setTodos] = useState([])
    const { userId } = useContext(AuthContext)

    const getTodo = useCallback( async () => {
        try {
            await axios.get('/todo/get', {
                headers: {
                    "Content-Type": "application/json"
                },
                params: { userId }
            })
                .then((response) => setTodos(response.data))
        } catch (err) {
            console.log(err)
        }
    }, [userId])

    const createTodo = useCallback(async () => {
        if(!text) return null
        try {
            await axios.post('/todo/add', {text, userId}, {
                headers: {
                    "Content-Type": "application/json",
                    }
            })
                .then((response) => {
                    setTodos([...todos], response.data)
                    setText('')
                })
        } catch (err) {
            console.log(err)
        }
    }, [text, userId, todos])

    const removeTodo = useCallback(async (id) => {
        try {
            await axios.delete(`/todo/delete/${id}`, {id}, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(() => getTodo())
        } catch (err) {
            console.log(err)
        }
    }, [getTodo])

    const completedTodo = useCallback(async (id) => {
        try {
            await axios.put(`/todo/completed/${id}`, {id}, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((response) => {
                    setTodos([...todos], response.data)
                    getTodo()
                })
        } catch (err) {
            console.log(err)
        }
    }, [getTodo, todos])

    const importantTodo = useCallback(async (id) => {
        try {
            await axios.put(`/todo/important/${id}`, {id}, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((response) => {
                    setTodos([...todos], response.data)
                    getTodo()
                })
        } catch (err) {
            console.log(err)
        }
    }, [getTodo, todos])

    useEffect(() => {
        getTodo()
    }, [todos, getTodo])

    return (
        <div className='container'>
            <div className="main-page">
                <h5>Список завдань</h5>
                <form className='form form-login' onSubmit={event => event.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className='validate'
                                type="text"
                                name='input'
                                placeholder='Добавити задачу'
                            />
                        </div>
                    </div>
                    <div className="row">
                        <button onClick={createTodo} className='wawes-effect wawes-light btn blue'>Добавити</button>
                    </div>
                </form>
                { todos.length > 0 ? <h5>Активні завдання</h5> : <h5>Активних завдань немає</h5> }
                <div className="todos">
                    {todos.map((todo, index) => {
                        const rootClasses = ['row flex todos-item']
                        if(todo.completed) {
                            rootClasses.push('completed')
                        }
                        if(todo.important) {
                            rootClasses.push('important')
                        }
                            return (
                                <div className={rootClasses.join(' ')} key={index}>
                                    <div className="col todos-num">{index + 1})</div>
                                    <div className="col todos-text">{todo.text}</div>
                                    <div className="col todos-buttons">
                                        <i className="material-icons blue-text"
                                           onClick={() => completedTodo(todo._id)}>check</i>
                                        <i className="material-icons orange-text"
                                            onClick={() => importantTodo(todo._id)}>warning</i>
                                        <i className="material-icons red-text"
                                           onClick={() => removeTodo(todo._id)}>delete</i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default MainPage;