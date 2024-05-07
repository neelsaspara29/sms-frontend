import React from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import EditStudentAdd from "./StudentEdit";

const StudentEditPage = () => {
  return (
    <div className="student_add_page">
      <Header />
      <Sidebar />
      <EditStudentAdd />
    </div>
  );
};

export default StudentEditPage;
