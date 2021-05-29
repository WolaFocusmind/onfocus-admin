import React, { Component } from "react";
import api from "../../../services/routes";
import Icon from "../../../assets/img/svg/icon-trash.svg";

class DeleteCourseTeacher extends Component {
  deleteUser = (event) => {
    event.preventDefault();
   
    if (window.confirm(`¿Desea eliminar este curso de esta profesor?`)) {
      const payload = this.props;
      api
        .deleteCourseFromTeacher(payload)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  render() {
    return (
      <div className="col-md-6 text-right" onClick={this.deleteUser}>
        <img
          src={Icon}
          alt="Eliminar curso de profesor"
          className="sendToTrash"
        />
      </div>
    );
  }
}

export default DeleteCourseTeacher;
