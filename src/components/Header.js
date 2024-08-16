import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import TodoContext from "../context/TodoContext";

/*
React component to perform 
CREATE operation using HTTP POST method!

The addTodo function from the TodoContext.js
is called to perform the CREATE operation 
*/
export default function Header() {
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  //Function from the TodoContext.js
  const { addTodo } = useContext(TodoContext);

  //Add todo button's onClick handler
  const postData = async (e) => {
    e.preventDefault();
    await addTodo({
      todoName,
      todoDescription,
      todoStatus: "Not Completed",
    });
    setTodoName("");
    setTodoDescription("");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="lg"
        style={{
          backgroundColor: "lightblue",
          borderRadius: "35px",
          marginTop: "20px",
        }}
      >
        <Box sx={{ p: 1, color: "#18ac8c", textAlign: "center" }}>
          <h1>My todo</h1>
        </Box>
        <Box
          component="form"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: "10px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="Todo_Name"
            label="Todo Name"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <TextField
            id="Todo_Description"
            label="Todo Description"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
          />
          {/*Button which performs HTTP POST */}
          <Button
            variant="contained"
            style={{ backgroundColor: "#18ac8c", margin: "25px" }}
            onClick={postData}
          >
            Add Todo
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
