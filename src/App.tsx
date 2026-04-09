import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import { Button, Flex } from "antd";
import { Toaster } from "react-hot-toast";
import TodoEdit from "./components/TodoEdit";

function App() {
  return (
    <>
      <h1>Todo App</h1>
      <Flex className="btn">
        <Link to={"/list"}>
          <Button type="primary">Danh sách công việc</Button>
        </Link>
        <Link to={"/add"}>
          <Button type="primary">Thêm mới công việc</Button>
        </Link>
      </Flex>
      <Routes>
        <Route path="/list" element={<TodoList />} />
        <Route path="/add" element={<TodoAdd />} />
        <Route path="/edit/:id" element={<TodoEdit />} />
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
