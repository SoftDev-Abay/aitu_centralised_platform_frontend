import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/sign-in/page";
import SignUpPage from "./pages/auth/sign-up/page";
import DashboardLayout from "./components/layout/dashboard/layout";
import ClubsListPage from "./pages/dashboard/clubs/page";
import ClubDetailsPage from "./pages/dashboard/clubs/details/page";
import PostsListPage from "./pages/dashboard/posts/page";
import PostDetailsPage from "./pages/dashboard/posts/details/page";
import EventsDetailsPage from "./pages/dashboard/events/details/page";
import EvensListPage from "./pages/dashboard/events/page";
import DashboardPage from "./pages/dashboard/page";
import CalendarPage from "./pages/dashboard/calendar/page";
function App() {
  return (
    <Routes>
      <Route path="auth">
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
      {/* <Route element={<RequireAuth />}> */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />

        <Route path="clubs">
          <Route index element={<ClubsListPage />} />
          <Route path=":id" element={<ClubDetailsPage />} />
        </Route>
        <Route path="posts">
          <Route index element={<PostsListPage />} />
          <Route path=":id" element={<PostDetailsPage />} />
        </Route>
        <Route path="events">
          <Route index element={<EvensListPage />} />
          <Route path=":id" element={<EventsDetailsPage />} />
        </Route>
        <Route path="calendar">
          <Route index element={<CalendarPage />} />
        </Route>
      </Route>

      {/* <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<TablesPage />} />
        <Route path="objects">
          <Route index element={<ObjectsPage />} />
          <Route path="new" element={<ObjectCreatePage />} />
          <Route path=":id" element={<ObjectDetailsPage />} />
          <Route path=":id/edit" element={<ObjectEditPage />} />
        </Route>
      </Route> */}
    </Routes>
  );
}

export default App;
