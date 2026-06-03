
import { useState } from 'react'
const App = () => {
  const [state, setState] = useState({
    todos: [

    ],
    inprogress: [

    ],
    done: [

    ],

  })
  const colorlist = {
    todos: "#38bdff",
    inprogress: "#ffcc40",
    done: "#5ff707"

  }
  const [newtodo, setNewtodo] = useState('');

  const [draggedItem, setDraggedItem] = useState(null);




  const addTodo = () => {
    if (newtodo.trim() === '') return;
    console.log("this is not");
    const newTodoItem = {
      id: Date.now(),
      title: newtodo,

    }
    setState(prevState => ({
      ...prevState,
      todos: [...prevState.todos, newTodoItem]
    }));
    setNewtodo('');

  }

  const removetodo = (id, column) => {
    setState(prevState => ({
      ...prevState,
      [column]: prevState[column].filter(item => item.id !== id)
    }))

  }
  const handelDragStart = (item, column) => {
    setDraggedItem({ ...item, column });
  }
  const handelDragOver = (e) => {
    e.preventDefault();
  }
  const handlekeydown = (e) => {
    if (e.target.value === "") return;

    if (e.key === "Enter") {
      console.log("this is enter");
      addTodo();
    }
  }

  const handleDrop = (e, column) => {
    e.preventDefault();
    if (!draggedItem) return;
    if (draggedItem.column === column) return;

    if (draggedItem) {
      setState(prevState => {
        const newState = { ...prevState };

        newState[draggedItem.column] = newState[draggedItem.column].filter(item => item.id !== draggedItem.id);


        newState[column] = [...newState[column], { id: draggedItem.id, title: draggedItem.title, completed: draggedItem.completed }];


        return newState;
      })
      setDraggedItem(null);
    }
  }

  return (
    <div>
      <h1>BaseCamp </h1>
      <input
        type="text"
        value={newtodo}
        onKeyDown={handlekeydown}
        onChange={(e) => setNewtodo(e.target.value)}
        placeholder="Add a new todo"


      />
      <button onClick={addTodo} className="Add-btn" >Add</button>

      <div className='box-section'  >
        {Object.keys(state).map(column => (
          <div
            className='box-list-bg'
            key={column}
            onDragOver={handelDragOver}
            onDrop={(e) => handleDrop(e, column)}

          >
            <h2>{column.toUpperCase()}</h2>
            {state[column].map(item => (
              <div

                className="box-list-items"
                key={item.id}
                draggable

                onDragStart={() => handelDragStart(item, column)}
                style={{ backgroundColor: [colorlist[column] || "null"], color: "black", fontWeight: "bold", cursor: "grab" }}
              >
                {item.title}


                <button onClick={() => removetodo(item.id, column)} style={{ float: 'right', borderRadius: "20px", backgroundColor: "#ccbebe", color: "black", cursor: "pointer" }}>X</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div >
  )
}

export default App
