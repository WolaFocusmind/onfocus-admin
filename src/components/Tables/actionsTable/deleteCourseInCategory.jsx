import React from "react";
import api from "../../../services/routes";
import Icon from "../../../assets/img/svg/icon-trash.svg";

const DeleteCourseCategory = (props) => {

    const deleteUser = (event) => {
        event.preventDefault();
       
        if (window.confirm(`¿Desea eliminar este curso de esta categoría?`)) {
          const payload = props;
          api
            .deleteCourseFromCategory(payload)
            .then((res) => {
              window.location.reload();
            })
            .catch((err) => {
              alert(err);
            });
        }
      };

    return (
    <div className="col-md-6 text-right" onClick={(e) => deleteUser(e)}>
        <img
          src={Icon}
          alt="Eliminar curso de categoría"
          className="sendToTrash"
        />
      </div>
    );
}

export default DeleteCourseCategory;
