import Admin from "../../pages/Admin/Admin";
import Facultypage from "../../pages/Faculty/Facultypage";
import FacultyFormpage from "../../pages/FacultyForm/FacultyFormpage";
import FacultyListpage from "../../pages/FacultyList/FacultyListpage";
import Feespendingpage from "../../pages/Feespending/Feespendingpage";
import SingleStudentpage from "../../pages/SingleStudentDetail/SingleStudentpage";
import StandardListpage from "../../pages/StandardList/StandardListpage";
import StudentAddpage from "../../pages/StudentAdd/StudentAddpage";
import StudentListpage from "../../pages/StudentList/StudentListpage";
import Dashboardpage from "../../pages/Dashboard/Dashboardpage";
import Feespending from "../../pages/Feespending/Feespending";
import AdminListPage from "../../pages/AdminList/AdminListPage";
import Faculty_Edit from "../../pages/Faculty/Faculty_Edit";

export const data = [
  {
    routeName: "dashboard",
    component: <Dashboardpage />,
  },
  {
    routeName: "dashboard",
    component: <Dashboardpage />,
  },
  {
    routeName: "student",
    component: <StudentListpage />,
  },
  {
    routeName: "student/student_edit/:id",
    component: <SingleStudentpage />,
  },
  {
    routeName: "student/student_add",
    component: <StudentAddpage />,
  },
  {
    routeName: "student/student_single",
    component: <SingleStudentpage />,
  },
  {
    routeName: "standard",
    component: <StandardListpage />,
  },
  {
    routeName: "faculty",
    component: <Facultypage />,
  },
  {
    routeName: "faculty_list",
    component: <FacultyListpage />,
  },
  {
    routeName: "/faculty/faculty_add",
    component: <FacultyFormpage />,
  },
  {
    routeName: "/faculty/faculty_edit/:id",
    component: <Faculty_Edit />,
  },
  {
    routeName: "fees_pending",
    component: <Feespending />,
  },
  {
    routeName: "admin",
    component: <AdminListPage />,
  },
];
export const authData = [
  {
    routeName: "login",
    component: <Admin />,
  },
];
