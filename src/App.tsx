import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
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
import AdminPanelLayout from "./components/layout/admin-panel/layout";
import CreatePost from "./pages/admin-panel/posts/create/page";
import CreateEventPage from "./pages/admin-panel/events/create/page";
import CreateClubPage from "./pages/admin-panel/clubs/create/page";
import SurveyCreatePage from "./pages/admin-panel/survey/create/page";
import ClubAdminDashboardPage from "./pages/admin-panel/clubs/view/page";
import AdminClubListPage from "./pages/admin-panel/clubs/page";
import PreviewSurveyPage from "./pages/admin-panel/survey/preview/page";
import ViewSurveyResponcePage from "./pages/admin-panel/survey/responce/page";
import MyClubsListPage from "./pages/dashboard/clubs/my/page";
import AdminEventsListPage from "./pages/admin-panel/events/page";
import AdminPostsListPage from "./pages/admin-panel/posts/page";
import MyApplicationsListPage from "./pages/dashboard/applications/page";
import SubmitSurveyPage from "./pages/dashboard/applications/submit/page";
import ClubEventsListPage from "./pages/admin-panel/clubs/view/events/page";
import ClubMembersListPage from "./pages/admin-panel/clubs/view/members/page";
import ClubApplicationsListPage from "./pages/admin-panel/clubs/view/applications/page";
import AdminDashboardPage from "./pages/admin-panel/page";
import ProfilePage from "./pages/dashboard/profile/page";
function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      <Route element={<DashboardLayout />}>
        <Route path="my" element={<MyClubsListPage />} />
      </Route>
      <Route path="auth">
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
      {/* <Route element={<RequireAuth />}> */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />

        <Route path="clubs">
          <Route index element={<ClubsListPage />} />
          <Route path="my" element={<MyClubsListPage />} />
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
        <Route path="applications">
          <Route index element={<MyApplicationsListPage />} />
          <Route path="submit/:id" element={<SubmitSurveyPage />} />
        </Route>
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="admin-panel" element={<AdminPanelLayout />}>
        <Route index element={<AdminDashboardPage />} />

        <Route path="survey">
          <Route path="create" element={<SurveyCreatePage />} />
          <Route path="responce/:id" element={<ViewSurveyResponcePage />} />
          <Route path="preview/:id" element={<PreviewSurveyPage />} />
        </Route>
        <Route path="posts">
          <Route path="create" element={<CreatePost />} />
          <Route index element={<AdminPostsListPage />} />
        </Route>
        <Route path="profile" element={<ProfilePage />} />
        {/* <Route path="profile/:id" element /> */}
        <Route path="events">
          <Route index element={<AdminEventsListPage />} />
          <Route path="create" element={<CreateEventPage />} />
        </Route>
        <Route path="clubs">
          <Route path="create" element={<CreateClubPage />} />
          <Route path="view/:id">
            <Route index element={<ClubAdminDashboardPage />} />
            <Route path="events" element={<ClubEventsListPage />} />
            <Route path="members" element={<ClubMembersListPage />} />
            <Route path="applications" element={<ClubApplicationsListPage />} />
          </Route>
          <Route index element={<AdminClubListPage />} />
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
