
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

  const [selectedItems, setSelectedItems] = useState({});


  const addTodo = () => {
    if (newtodo.trim() === '') return;

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
    setSelectedItems({});
  }
  const handelDragStart = (item, column) => {

    const isManyselected = !!selectedItems[item.id];


    setDraggedItem({ ...item, column, isMultiSelected: isManyselected });
  }


  const handelDragOver = (e) => {
    e.preventDefault();
  }
  const handlekeydown = (e) => {
    if (e.target.value === "") return;

    if (e.key === "Enter") {

      addTodo();
    }
  }
  const handlemultiChange = (item, column) => {
    setSelectedItems((prev) => {

      const newSelected = { ...prev };
      if (newSelected[item.id]) {

        delete newSelected[item.id]
      }
      else {
        newSelected[item.id] = { ...item, column };
      } return newSelected;

    })
  }
  const handleDrop = (e, column) => {
    e.preventDefault();
    if (!draggedItem) return;
    if (draggedItem.column === column) return;

    if (draggedItem) {


      setState(prevState => {
        const newState = { ...prevState };
        if (draggedItem.isMultiSelected) {
          const itemToMove = Object.values(selectedItems);


          itemToMove.forEach((item) => {
            newState[item.column] = newState[item.column].filter((i) => i.id !== item.id);

          })
          const formateItems = itemToMove.map(({ id, title }) => ({ id, title }));

          newState[column] = [...newState[column], ...formateItems];


        }



        else {
          newState[draggedItem.column] = newState[draggedItem.column].filter(item => item.id !== draggedItem.id);
          newState[column] = [...newState[column], { id: draggedItem.id, title: draggedItem.title }];



        }
        return newState;
      });
      setDraggedItem(null);
      setSelectedItems({})
    }
  }

  console.log("state", handleDrop);
  return (
    <>
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

                  <input
                    className="checkbox"
                    type="checkbox"
                    onChange={() => {
                      handlemultiChange(item, column);
                    }}
                    checked={!!selectedItems[item.id]}
                  />




                  <span className='items'>
                    {item.title}
                  </span>


                  <button onClick={() => removetodo(item.id, column)} style={{ borderRadius: "20px", backgroundColor: "#ccbebe", color: "black", cursor: "pointer" }}>X</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div >


    </>
  )
}

export default App
