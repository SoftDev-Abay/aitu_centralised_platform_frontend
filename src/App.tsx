import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/sign-in/page";
import SignUpPage from "./pages/auth/sign-up/page";
import RequireAuth from "./features/auth/RequireAuth";
import TablesPage from "./pages/dashboard/tables/page";
import ObjectsPage from "./pages/dashboard/objects/page";
import PermissionsPage from "./pages/dashboard/permissions/page";
import TableDetailsPage from "./pages/dashboard/tables/details/page";
import DashboardLayout from "./components/layout/dashboard/layout";
import ObjectCreatePage from "./pages/dashboard/objects/new/page";
import ObjectDetailsPage from "./pages/dashboard/objects/details/page";
import ObjectEditPage from "./pages/dashboard/objects/edit/page";
import PermissionCreatePage from "./pages/dashboard/permissions/new/page";
import PermissionEditPage from "./pages/dashboard/permissions/edit/page";
import PermissionDetailsPage from "./pages/dashboard/permissions/details/page";
import RolesPage from "./pages/dashboard/roles/page";
import RoleCreatePage from "./pages/dashboard/roles/new/page";
import RoleDetailsPage from "./pages/dashboard/roles/details/page";
import RoleEditPage from "./pages/dashboard/roles/edit/page";
import UsersPage from "./pages/dashboard/users/page";
import UserDetailsPage from "./pages/dashboard/users/details/page";
import UserEditPage from "./pages/dashboard/users/edit/page";
import UserCreatePage from "./pages/dashboard/users/new/page";
import DepartmentsPage from "./pages/dashboard/deparments/page";
import DepartmentDetailsPage from "./pages/dashboard/deparments/details/page";
import DepartmentCreatePage from "./pages/dashboard/deparments/new/page";

function App() {
  return (
    <Routes>
      <Route path="auth">
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
      {/* <Route element={<RequireAuth />}> */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<TablesPage />} />
        <Route path="tables">
          <Route index element={<TablesPage />} />
          <Route path=":tableId" element={<TableDetailsPage />} />
        </Route>
        <Route path="objects">
          <Route index element={<ObjectsPage />} />
          <Route path="new" element={<ObjectCreatePage />} />
          <Route path=":id" element={<ObjectDetailsPage />} />
          <Route path=":id/edit" element={<ObjectEditPage />} />
        </Route>
        <Route path="permissions">
          <Route index element={<PermissionsPage />} />
          <Route path="new" element={<PermissionCreatePage />} />
          <Route path=":id" element={<PermissionDetailsPage />} />
          <Route path=":id/edit" element={<PermissionEditPage />} />
        </Route>
        <Route path="roles">
          <Route index element={<RolesPage />} />
          <Route path="new" element={<RoleCreatePage />} />
          <Route path=":id" element={<RoleDetailsPage />} />
          <Route path=":id/edit" element={<RoleEditPage />} />
        </Route>
        <Route path="users">
          <Route index element={<UsersPage />} />
          <Route path=":id" element={<UserDetailsPage />} />
          <Route path="new" element={<UserCreatePage />} />
          <Route path=":id/edit" element={<UserEditPage />} />
        </Route>
        <Route path="departments">
          <Route index element={<DepartmentsPage />} />
          <Route path=":id" element={<DepartmentDetailsPage />} />
          <Route path="new" element={<DepartmentCreatePage />} />
        </Route>
        <Route path="*" element={<div className="bg-brand-primary" />} />
        {/* </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
