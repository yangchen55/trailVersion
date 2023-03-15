

import AddNewCatForm from "../../components/category-forms/AddNewCatForm";
import { CategoryTable } from "../../components/category-forms/CategoryTable";
import { AdminLayout } from "../layout/AdminLayout";

const Category = () => {
  return (
    <AdminLayout>
      <div className="mt-3">
        <h3>Category Management</h3>
        <hr />
      </div>
      {/* form */}
      <AddNewCatForm />

      {/* table */}
      <CategoryTable />
    </AdminLayout>
  );
};
export default Category;
