import { useState, FormEvent } from "react";
import axios from "axios";

interface AddTaskFormProps {
  projectId?: string;
  onTaskAdded: (task: any) => void;
}

function AddTaskForm({ projectId, onTaskAdded }: AddTaskFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newTask = {
        title,
        description,
        dueDate,
        projectId: projectId ?? "defaultProjectId",
        completed: false,
      };
      const response = await axios.post("http://localhost:3001/tasks", newTask);
      onTaskAdded(response.data);
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>
      <div>
        <label>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
