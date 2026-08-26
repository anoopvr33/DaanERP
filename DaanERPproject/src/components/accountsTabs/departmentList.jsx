import React, { useState } from "react";
import "./style.css";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "demo HouseKeeping" },
    { id: 2, name: "demo Staff" },
    { id: 3, name: "demo Manager" },
    { id: 4, name: "demo TeleCalling" },
    { id: 5, name: "demo HouseKeep" },
    { id: 5, name: "demo HouseKeep" },
    { id: 6, name: "demo Manager" },
    { id: 7, name: "demo Staff" },
    // { id: 8, name: "" },
  ]);

  // const [editingId, setEditingId] = useState(null);
  // const [editValue, setEditValue] = useState("");

  // Open edit
  // const handleEdit = (department) => {
  //   setEditingId(department.id);
  //   setEditValue(department.name);
  // };

  // Cancel edit
  // const handleCancel = () => {
  //   setEditingId(null);
  //   setEditValue("");
  // };

  // Update department
  // const handleUpdate = (id) => {
  //   if (!editValue.trim()) return;

  //   setDepartments((prev) =>
  //     prev.map((department) =>
  //       department.id === id
  //         ? {
  //             ...department,
  //             name: editValue.trim(),
  //           }
  //         : department,
  //     ),
  //   );

  //   setEditingId(null);
  //   setEditValue("");
  // };

  // Delete department
  const handleDelete = (id) => {
    setDepartments((prev) => prev.filter((department) => department.id !== id));
  };

  return (
    <div className="department-container">
      <div className="department-title">
        <div>
          <h3>Departments</h3>
          <p>Manage departments</p>
        </div>

        <span className="department-count">{departments.length}</span>
      </div>

      <div className="department-list">
        {departments.map((department) => (
          <div className="department-wrapper" key={department.id}>
            {/* Department Row */}
            <div className="department-item">
              <div className="department-info">
                <div className="department-icon">
                  {department.name.charAt(0).toUpperCase()}
                </div>

                <span>{department.name}</span>
              </div>

              <div className="department-actions">
                {/* Edit */}
                {/* <i
                  className="fa fa-edit edit-icon"
                  onClick={() => handleEdit(department)}
                  title="Edit"
                /> */}

                {/* Delete */}
                <i
                  className="fa fa-trash delete-icon"
                  onClick={() => handleDelete(department.id)}
                  title="Delete"
                />
              </div>
            </div>

            {/* Edit Panel */}
            {/* {editingId === department.id && (
              <div className="department-edit-panel">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                  placeholder="Department name"
                />

                <div className="department-edit-buttons">
                  <button
                    className="department-update-btn"
                    onClick={() => handleUpdate(department.id)}
                  >
                    Update
                  </button>

                  <button
                    className="department-cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;
