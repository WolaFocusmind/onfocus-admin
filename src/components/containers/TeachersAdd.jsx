import React from "react";

import Sidebar from "../Template/Sidebar";
import AddTeacherForm from "../Forms/addTeacherForm";
import Navbar from "../Template/Navbar";

const TeachersAdd = (props) => {
  return (
    <div className="wrapper">
      <Sidebar />

      <div id="content">
        <Navbar display={false} />

        <div className="row d-flex section_title align-items-center mt-2">
          <div className="col-md-3">
            <h1>Profesores</h1>
          </div>
        </div>

        <AddTeacherForm />
      </div>
    </div>
  );
};

export default TeachersAdd;
