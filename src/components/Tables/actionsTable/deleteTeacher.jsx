import React, { Component } from "react";
import api from "../../../services/routes";
import Icon from "../../../assets/img/svg/icon-trash.svg";

class DeleteTeacher extends Component {
  deleteUser = (event) => {
    event.preventDefault();
    
    if (this.props.courses.length === 0) {
      if (window.confirm(`¿Desea enviar este profesor a la papelera?`)) {
        const payload = { id: this.props.id, type: 1 };

        api
          .sendToTrash(payload)
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => {
            alert(err);
          });
      }
    } else {
      alert("Este profesor tiene cursos asociados. Eliminalos antes.");
    }
  };

  render() {
    return (
      <div onClick={this.deleteUser}>
        <img src={Icon} alt="Enviar a la papelera" className="sendToTrash" />
      </div>
    );
  }
}

export default DeleteTeacher;
