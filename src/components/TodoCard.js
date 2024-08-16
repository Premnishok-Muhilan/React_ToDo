import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";

//HTTP UPDATE AND HTTP DELETE
export default function TodoCard({ data, onDelete, onUpdate }) {
  //State to hold todo name
  const [todoName, setTodoName] = useState(data.todoName);
  //State to hold todo description
  const [todoDescription, setTodoDescription] = useState(data.todoDescription);
  //State to hold todo status
  const [todoStatus, setTodoStatus] = useState(data.todoStatus);

  /*
  The isEditable state determines whether the input fields and 
  dropdown menu are editable or not. This state is initially set
  to false, meaning that the fields are not editable when the
  component is first rendered.
   */
  const [isEditable, setIsEditable] = useState(false);
  console.log(isEditable);

  /*
  Function to make the input fields
  as editable when the edit button is clicked!
  The toggleEdit function is responsible for
   switching between editable and non-editable modes:
  */
  const toggleEdit = async () => {
    /*
    Check if in Editable Mode: If isEditable is true,
    it means the fields are currently in editable mode.
    The function creates an updatedTodo object containing
    the current values of the todo's name, description,
    and status.
    */
    if (isEditable) {
      const updatedTodo = { todoName, todoDescription, todoStatus };
      //Calls the onUpdate function from TodoContext
      //HTTP PUT/PATCH
      await onUpdate(data.id, updatedTodo);
    }
    /*
    Toggle Edit State: After updating, or if it was already not
    in editable mode, the function toggles the isEditable state
    using setIsEditable(!isEditable).
    This effectively switches between editable (true)
    and non-editable (false) modes.
    */
    setIsEditable(!isEditable);
  };

  //Delete button's onClick handler
  const handleDelete = async () => {
    await onDelete(data.id);
  };

  //Handles the status change for todo item
  const handleTodoStatusChange = (event) => {
    setTodoStatus(event.target.value);
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        height: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#18ac8c",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <div>
          {/*The disabled attribute is used to
           control whether the input fields and
           dropdown menu are editable:
           The disabled attribute is set based on the isEditable state:
            1.When isEditable is true, disabled is set to false, meaning the input
             fields are enabled and can be edited.
            2.When isEditable is false, disabled is set to true, meaning the input
             fields are disabled and cannot be edited. */}
          <div>
            <label style={{fontSize:"25px"}}>Name:</label>
            <input
              value={todoName}
              disabled={!isEditable}
              onChange={(event) => setTodoName(event.target.value)}
              style={{fontSize:"15px"}}
            />
          </div>
          <div>
          <label style={{fontSize:"25px"}}>Description:</label>
            <input
              value={todoDescription}
              disabled={!isEditable}
              onChange={(event) => setTodoDescription(event.target.value)}
              style={{fontSize:"15px"}}
            />
          </div>
          <div>
          <label style={{fontSize:"20px"}}>Status:</label>
            {/*
              Dropdown menu to choose the status
              of the todo
             */}
            <select
              value={todoStatus}
              onChange={handleTodoStatusChange}
              disabled={!isEditable}
              style={{fontSize:"15px"}}
            >
              <option value="Not Completed">Not Completed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "center", padding: 2 }}
      >
        {/*HTTP PUT/PATCH
        Initially the isEditable state is set to false.
        Due to this reason, the button will show Edit.
        On clicking Edit, the isEditable state is set to true.
        If isEditable is set to true, the button will show Save

        1.If editable, the button will show Save
        2.If non-editable, the button will show Edit
        */}
        <Button onClick={toggleEdit} variant="contained" color="success">
          {isEditable ? "Save" : "Edit"} 
        </Button>
        {/*HTTP DELETE */}
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
