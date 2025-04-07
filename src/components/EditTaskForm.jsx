import React from "react";

function EditTaskForm({
  editText,
  setEditText,
  editCategory,
  setEditCategory,
  editPriority,
  setEditPriority,
  editDueDate,
  setEditDueDate,
  editReminder,
  setEditReminder,
  handleSaveEdit,
  onCancel,
}) {
  return (
    <div>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className="border p-2 w-full rounded mb-2"
      />
      <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="School">School</option>
        <option value="Shopping">Shopping</option>
        <option value="Health">Health</option>
      </select>
      <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
        <option value="1">Low</option>
        <option value="2">Medium</option>
        <option value="3">High</option>
      </select>
      <input
        type="date"
        value={editDueDate}
        onChange={(e) => setEditDueDate(e.target.value)}
        className="border p-2 w-full rounded mb-2"
      />
      <input
        type="text"
        placeholder="Reminder"
        value={editReminder}
        onChange={(e) => setEditReminder(e.target.value)}
        className="border p-2 w-full rounded mb-2"
      />
      <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-3 py-1 rounded">
        Save
      </button>
      <button onClick={onCancel} className="bg-gray-500 text-white px-3 py-1 rounded ml-2">
        Cancel
      </button>
    </div>
  );
}

export default EditTaskForm;