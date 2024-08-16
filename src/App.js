import "./App.css";
import Header from "./components/Header";
import AllTodo from "./components/AllToDo";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <Header />
        <AllTodo />
      </div>
    </TodoProvider>
  );
}

export default App;
