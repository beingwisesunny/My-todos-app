import { useRef, useState } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // Input ka reference
  const inputRef = useRef(null);

  // Add Todo / Update Todo
  const handleAdd = () => {
    // Empty input check
    if (task.trim() === "") {
      alert("Please enter a todo");
      return;
    }

    // Agar edit mode me hain
    if (editId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId
            ? {
                ...todo,
                text: task,
                completed: false,
              }
            : todo
        )
      );

      // Edit mode hatao
      setEditId(null);

      // Input empty karo
      setTask("");

      // Input se focus hatao
      inputRef.current?.blur();
    } else {
      // New Todo
      const newTodo = {
        id: Date.now(),
        text: task,
        completed: false,

        // Current Date & Time
        date: new Date().toLocaleString(),
      };

      setTodos([...todos, newTodo]);

      // Input empty karo
      setTask("");

      // Input se focus hatao
      inputRef.current?.blur();
    }
  };

  // Complete / Uncomplete Todo
  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  // Delete Todo
  const handleDelete = (id) => {
    setTodos(
      todos.filter((todo) => todo.id !== id)
    );
  };

  // Edit Todo
  const handleEdit = (todo) => {
    // Todo ka text input me lao
    setTask(todo.text);

    // Kis todo ko edit kar rahe hain uski id save karo
    setEditId(todo.id);

    // Input par focus
    inputRef.current?.focus();
  };

  // Clear All
  const clearAll = () => {
    setTodos([]);
  };

  // Search + Filter
  const filteredTodos = todos.filter((todo) => {
    const filterMatch =
      filter === "all"
        ? true
        : filter === "active"
        ? !todo.completed
        : todo.completed;

    const searchMatch = todo.text
      .toLowerCase()
      .includes(search.toLowerCase());

    return filterMatch && searchMatch;
  });

  // Stats
  const total = todos.length;

  const completed = todos.filter(
    (todo) => todo.completed
  ).length;

  const pending = total - completed;

  return (
    <div className="min-h-screen bg-slate-300 px-4 py-10">

      {/* Header */}
      <div>

        <div className="mx-auto max-w-5xl text-center">

          <div className="mb-3 flex items-center justify-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-white">
              <Check size={32} />
            </div>

            <h1 className="text-4xl font-bold text-slate-900">
              Todo{" "}
              <span className="text-indigo-500">
                App
              </span>
            </h1>

          </div>

          <p className="text-slate-500">
            Plan your day, get things done!
          </p>

        </div>

        {/* Main Card */}
        <div className="mx-auto mt-10 max-w-5xl rounded-xl bg-white p-6 shadow-lg">

          {/* Add / Edit Todo */}
          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              ref={inputRef}
              type="text"
              value={task}
              onChange={(e) =>
                setTask(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdd();
                }
              }}
              placeholder="Add a new todo..."
              className="flex-1 rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-indigo-500"
            />

            <button
              onClick={handleAdd}
              className="rounded-lg bg-indigo-500 px-8 py-4 font-semibold text-white transition hover:bg-indigo-600"
            >
              {editId !== null ? "Update" : "Add"}
            </button>

          </div>

          {/* Filter + Search */}
          <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row">

            {/* Filter Buttons */}
            <div className="flex gap-2">

              {["all", "active", "completed"].map(
                (item) => (

                  <button
                    key={item}
                    onClick={() =>
                      setFilter(item)
                    }
                    className={`rounded-full px-5 py-3 font-semibold capitalize transition ${
                      filter === item
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {item}
                  </button>

                )
              )}

            </div>

            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search todo..."
              className="rounded-lg border border-slate-300 px-5 py-3 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Todo List */}
          <div className="mt-8">

            {filteredTodos.length === 0 ? (

              <div className="py-10 text-center text-slate-400">
                No todos found
              </div>

            ) : (

              filteredTodos.map((todo) => (

                <div
                  key={todo.id}
                  className="flex items-center gap-4 border-b border-slate-200 py-5"
                >

                  {/* Checkbox */}
                  <button
                    onClick={() =>
                      handleComplete(todo.id)
                    }
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 transition ${
                      todo.completed
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-slate-300 hover:border-indigo-500"
                    }`}
                  >

                    {todo.completed && (
                      <Check size={18} />
                    )}

                  </button>

                  {/* Todo Text + Date */}
                  <div className="flex-1">

                    <p
                      className={`text-lg ${
                        todo.completed
                          ? "text-slate-400 line-through"
                          : "text-slate-800"
                      }`}
                    >
                      {todo.text}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Added: {todo.date}
                    </p>

                  </div>

                  {/* Edit */}
                  <button
                    onClick={() =>
                      handleEdit(todo)
                    }
                    className="text-indigo-500 transition hover:text-indigo-700"
                  >
                    <Pencil size={21} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      handleDelete(todo.id)
                    }
                    className="text-red-500 transition hover:text-red-700"
                  >
                    <Trash2 size={21} />
                  </button>

                </div>

              ))

            )}

          </div>

          {/* Stats */}
          <div className="mt-5 flex flex-col justify-between gap-4 bg-slate-50 p-5 sm:flex-row sm:items-center">

            <div className="flex flex-wrap gap-5 text-slate-600">

              <span>
                Total: <b>{total}</b>
              </span>

              <span>
                Completed: <b>{completed}</b>
              </span>

              <span>
                Pending: <b>{pending}</b>
              </span>

            </div>

            {/* Clear All */}
            <button
              onClick={clearAll}
              className="font-semibold text-red-500 transition hover:text-red-700"
            >
              <Trash2
                size={18}
                className="mr-1 inline"
              />

              Clear All
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;