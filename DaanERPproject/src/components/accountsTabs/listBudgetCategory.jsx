import "./style.css";
import { Delete_Budget_Category } from "../../api/accountsServices";

const ListBudgetCategory = ({ categories }) => {
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

  const Delete_Category = async (value) => {
    await Delete_Budget_Category({ id: value });
  };

  return (
    <div style={{ marginTop: "20px",width:"600px" }} className="department-container">
      <div className="department-title">
        <div>
          <h3>Categories</h3>
          <p>Manage categories</p>
        </div>

        <span className="department-count">{categories.length}</span>
      </div>

      <div className="department-list">
        {categories?.map((category) => (
          <div className="department-wrapper" key={category.value}>
            {/* Department Row */}
            <div className="department-item">
              <div className="department-info">
                <div className="department-icon">
                  {category.name.charAt(0).toUpperCase()}
                </div>

                <span>{category.name}</span>
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
                  onClick={() => Delete_Category(category.value)}
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

export default ListBudgetCategory;
