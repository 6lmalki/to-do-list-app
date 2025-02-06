import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/ToDo.css";

type ToDoProps = {
  id: number;
  task: string;
  completed: boolean;
  handleCompleteClick: (id: number) => void;
  handleEditClick: (id: number, task: string) => void;
  handleDeleteClick: (id: number) => void;
};

export function ToDo({
  id,
  task,
  completed,
  handleCompleteClick,
  handleEditClick,
  handleDeleteClick,
}: ToDoProps) {
  return (
    <div className="to-do mb-3 p-3 rounded d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <div className="to-do-number me-2 rounded-circle d-flex justify-content-center align-items-center">
          {id}
        </div>
        <p className={`to-do-task m-auto ${completed ? "completed" : ""}`}>
          {task}
        </p>
      </div>
      <div className="to-do-actions fs-5 d-flex justify-content-end gap-3">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="action"
          onClick={() => handleCompleteClick(id)}
        />
        {!completed && (
          <FontAwesomeIcon
            icon={faPen}
            className="action"
            onClick={() => handleEditClick(id, task)}
          />
        )}
        <FontAwesomeIcon
          icon={faTrashCan}
          className="action"
          onClick={() => handleDeleteClick(id)}
        />
      </div>
    </div>
  );
}
