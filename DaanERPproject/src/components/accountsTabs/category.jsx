import {
  Delete_Daily_Category,
  Delete_Daily_SubCategory,
  // Edit_Daily_Category,
  // Edit_Daily_SubCategory,
} from "../../api/accountsServices";
import { IsStaff, IsSuper } from "../../utils";

const CategoryList = ({ catsub }) => {
  console.log("dailylog category", catsub);

  // const [editingCategory, setEditingCategory] = useState(null);
  // const [editingSubcategory, setEditingSubcategory] = useState(null);

  // const [categoryValue, setCategoryValue] = useState("");
  // const [subcategoryValue, setSubcategoryValue] = useState("");

  // -----------------------------
  // CATEGORY EDIT
  // -----------------------------
  // const handleCategoryEdit = (category) => {
  //   setEditingSubcategory(null);

  //   setEditingCategory(category);
  //   setCategoryValue(category);
  // };

  // const handleCategoryCancel = () => {
  //   setEditingCategory(null);
  //   setCategoryValue("");
  // };

  // const handleCategoryUpdate = async (oldCategory, demo) => {
  //   if (!demo) {
  //     return alert("currently unavailable");
  //   }

  //   if (!categoryValue.trim()) {
  //     return;
  //   }

  //   try {
  //     // Call your API here
  //     await Edit_Daily_Category({
  //       oldCategory,
  //       category: categoryValue.trim(),
  //     });

  //     setEditingCategory(null);
  //     setCategoryValue("");

  //     // Refresh your categories here if required
  //   } catch (error) {
  //     console.error("Category update failed:", error);
  //   }
  // };

  // -----------------------------
  // SUBCATEGORY EDIT
  // -----------------------------
  // const handleSubcategoryEdit = (category, sub) => {
  //   setEditingCategory(null);

  //   setEditingSubcategory({
  //     category,
  //     id: sub.id,
  //   });

  //   setSubcategoryValue(sub.sub);
  // };

  // const handleSubcategoryCancel = () => {
  //   setEditingSubcategory(null);
  //   setSubcategoryValue("");
  // };

  // const handleSubcategoryUpdate = async (category, sub, demo) => {
  //   if (!demo) {
  //     return alert("currently unavailable");
  //   }

  //   if (!subcategoryValue.trim()) {
  //     return;
  //   }

  //   try {
  //     // Call your API here
  //     console.log("Update subcategory:", {
  //       category,
  //       id: sub.id,
  //       sub: subcategoryValue.trim(),
  //     });

  //     // Example:
  //     await Edit_Daily_SubCategory({
  //       category,
  //       id: sub.id,
  //       sub: subcategoryValue.trim(),
  //     });

  //     setEditingSubcategory(null);
  //     setSubcategoryValue("");

  //     // Refresh your categories here if required
  //   } catch (error) {
  //     console.error("Subcategory update failed:", error);
  //   }
  // };

  return (
    <div className="category-manager">
      <div className="category-manager-header">
        <div>
          <h3>Category & Subcategory</h3>
          <p>Manage your categories and subcategories</p>
        </div>
      </div>

      <div className="category-list">
        {Object.entries(catsub).length === 0 ? (
          <div className="empty-category">No categories available</div>
        ) : (
          Object.entries(catsub).map(([key, values]) => (
            <div className="category-card" key={key}>
              {/* CATEGORY HEADER */}
              <div className="category-header">
                <div className="category-info">
                  <div className="category-icon">
                    {key.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4>
                      {key}
                      {values._id}
                    </h4>
                    <span>
                      {values.length}{" "}
                      {values.length === 1 ? "subcategory" : "subcategories"}
                    </span>
                  </div>
                </div>

                <div className="category-actions"></div>
              </div>

              {/* CATEGORY EDIT AREA */}
              {/* {editingCategory === key && (
                <div className="category-edit-area">
                  <input
                    type="text"
                    value={categoryValue}
                    onChange={(e) => setCategoryValue(e.target.value)}
                    placeholder="Enter category name"
                    autoFocus
                  />

                  <div className="edit-buttons">
                    <button
                      className="update-btn"
                      onClick={() => handleCategoryUpdate(key)}
                    >
                      Update
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={handleCategoryCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )} */}

              {/* SUBCATEGORIES */}
              <div className="subcategory-container">
                {values.length === 0 ? (
                  <div className="no-subcategory">No subcategories</div>
                ) : (
                  values.map((sub) => (
                    <div key={sub.id}>
                      <div className="subcategory-item">
                        <div className="subcategory-name">
                          <span className="subcategory-dot"></span>

                          <span>{sub.sub}</span>
                        </div>

                        <div className="subcategory-actions">
                          <br />

                          <i
                            onClick={() =>
                              Delete_Daily_SubCategory({ id: sub.id })
                            }
                            style={{
                              display:
                                IsSuper() === false || IsStaff() === true
                                  ? "none"
                                  : "",
                              cursor: "pointer",
                            }}
                            className="fa fa-trash"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* SUBCATEGORY EDIT AREA */}
                      {/* {editingSubcategory?.category === key &&
                        editingSubcategory?.id === sub.id && (
                          <div className="subcategory-edit-area">
                            <input
                              type="text"
                              value={subcategoryValue}
                              onChange={(e) =>
                                setSubcategoryValue(e.target.value)
                              }
                              placeholder="Enter subcategory name"
                              autoFocus
                            />

                            <div className="edit-buttons">
                              <button
                                className="update-btn"
                                onClick={() =>
                                  handleSubcategoryUpdate(key, sub)
                                }
                              >
                                Update
                              </button>

                              <button
                                className="cancel-btn"
                                onClick={handleSubcategoryCancel}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )} */}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
