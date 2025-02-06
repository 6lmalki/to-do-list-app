import { Button, Container, Form } from "react-bootstrap";
import { SyntheticEvent, useEffect, useState } from "react";
import { ToDo } from "./ToDo";
import "../styles/ToDoList.css";

type ToDo = {
  id: number;
  task: string;
  completed: boolean;
};

export function ToDoList() {
  const [toDoList, setToDoList] = useState<ToDo[]>([]);
  const [task, setTask] = useState<string>("");
  const [taskId, setTaskId] = useState<number>(0);
  const [isEditClicked, setIsEditClicked] = useState(false);

  useEffect(() => {
    const storedToDoList = localStorage.getItem("to-do-list");
    if (storedToDoList) {
      setToDoList(JSON.parse(storedToDoList));
    }
  }, []);

  const handleAddTask = (e: SyntheticEvent, task: string) => {
    e.preventDefault();

    if (task.trim()) {
      const updatedToDoList = [
        ...toDoList,
        {
          id: toDoList.length + 1,
          task,
          completed: false,
        },
      ];

      setToDoList(updatedToDoList);

      localStorage.setItem("to-do-list", JSON.stringify(updatedToDoList));
    }

    setTask("");
  };

  const handleCompleteClick = (id: number) => {
    const updatedToDoList = toDoList.map((toDo) => {
      if (toDo.id === id) {
        return { ...toDo, completed: !toDo.completed };
      }

      return toDo;
    });

    setToDoList(updatedToDoList);

    localStorage.setItem("to-do-list", JSON.stringify(updatedToDoList));
  };

  const handleEditClick = (id: number, task: string) => {
    setIsEditClicked(true);
    setTask(task);
    setTaskId(id);
  };

  const handleUpdate = (e: SyntheticEvent, task: string) => {
    e.preventDefault();

    if (task.trim()) {
      const updatedToDoList = toDoList.map((toDo) => {
        if (toDo.id === taskId) {
          return { ...toDo, task };
        }

        return toDo;
      });

      setToDoList(updatedToDoList);

      localStorage.setItem("to-do-list", JSON.stringify(updatedToDoList));
    }

    setIsEditClicked(false);

    setTask("");
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    setIsEditClicked(false);
    setTask("");
  };

  const handleDeleteClick = (id: number) => {
    const updatedToDoList = toDoList.filter((toDo) => {
      return toDo.id !== id;
    });

    setToDoList(updatedToDoList);

    localStorage.setItem("to-do-list", JSON.stringify(updatedToDoList));
  };

  return (
    <Container className="to-do-list">
      <h1 className="mt-5 text-white text-center">To-Do List App</h1>
      <Form className="mt-5 mb-3 d-flex">
        <Form.Control
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {!isEditClicked ? (
          <Button
            variant="success"
            className="ms-3"
            onClick={(e) => handleAddTask(e, task)}
          >
            Add Task
          </Button>
        ) : (
          <>
            <Button
              variant="success"
              className="ms-3"
              onClick={(e) => handleUpdate(e, task)}
            >
              Update
            </Button>
            <Button
              variant="warning"
              className="ms-3"
              onClick={(e) => handleCancel(e)}
            >
              Cancel
            </Button>
          </>
        )}
      </Form>
      {toDoList.length > 0 ? (
        toDoList.map((toDo) => (
          <ToDo
            key={toDo.id}
            id={toDo.id}
            task={toDo.task}
            completed={toDo.completed}
            handleCompleteClick={() => handleCompleteClick(toDo.id)}
            handleEditClick={() => handleEditClick(toDo.id, toDo.task)}
            handleDeleteClick={() => handleDeleteClick(toDo.id)}
          />
        ))
      ) : (
        <p className="mt-4 text-white text-center">No tasks...</p>
      )}
    </Container>
  );
}
