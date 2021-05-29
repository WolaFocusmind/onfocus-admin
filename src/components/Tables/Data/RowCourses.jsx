import React from 'react';
import { Link } from "react-router-dom";
import { trimBigText } from "../../../helpers/tools"
import DeleteCourse from '../actionsTable/deleteCourse'
import ChangeStatus from "../actionsTable/changeStatus";

const RowCourses = ({id, name, teacher, category, creation_date, status }) => {
  return(
        <>  
            <td>{trimBigText(name)}</td>
            <td>{teacher}</td>
            <td>{trimBigText(category)}</td>
            <td>{creation_date}</td>
            <td><ChangeStatus id={id} entity="0" status={status}/></td>
            <td>
                <Link to={`/courses/edit/${id}`}>
                    <button className="editProfile">
                        Editar curso
                    </button>
                </Link>
            </td>
            <td><span><DeleteCourse id={id} teacher={teacher} category={category}/></span></td>
        </>
  );
}

export default RowCourses;