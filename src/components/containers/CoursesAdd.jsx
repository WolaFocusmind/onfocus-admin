import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Template/Sidebar";
import AddCourseForm from "../Forms/addCourseForm";
import Navbar from "../Template/Navbar";

const CoursesAdd = (props) => {
    const { mode } = useParams();
    
  return (
    <div className="wrapper">
      <Sidebar />

      <div id="content">
        <Navbar display={false}/>

        <div className="row d-flex section_title align-items-center mt-5 mb-4">
          <div className="col-md-8">
            <h1>{mode === "edit" ? "Editar curso" : "Agregar nuevo curso" }</h1>
          </div>
        </div>

        <AddCourseForm/>
      </div>
    </div>
  );
};

export default CoursesAdd;
