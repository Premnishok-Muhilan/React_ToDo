import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import TodoCard from "./TodoCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TodoContext from "../context/TodoContext";

//HTTP GET
export default function AllTodo() {
  //State to hold the status filter
  const [statusFilter, setStatusFilter] = useState("All");
  //Functions from the TodoContext
  const { todos, deleteTodo, updateTodo } = useContext(TodoContext);

  const handleChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (statusFilter === "All") return true;
    return todo.todoStatus === statusFilter;
  });

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Grid container spacing={3}>
        <Container
          maxWidth="lg"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Box sx={{ p: 1 }}>
            <h3>My todos</h3>
          </Box>
          <Box sx={{ p: 1, display: "flex", alignItems: "baseline" }}>
            <b>Status Filter:</b>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="status-filter-label">Status Filter</InputLabel>
              <Select
                value={statusFilter}
                label="Status Filter"
                onChange={handleChange}
              >
                <MenuItem value={"Completed"}>Completed</MenuItem>
                <MenuItem value={"Not Completed"}>Not Completed</MenuItem>
                <MenuItem value={"All"}>All</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Container>
        {filteredTodos.map((todo) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={todo.id}>
            <TodoCard data={todo} onDelete={deleteTodo} onUpdate={updateTodo} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
