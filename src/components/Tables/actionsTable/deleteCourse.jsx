import React, { Component } from "react";
import api from "../../../services/routes";
import Icon from "../../../assets/img/svg/icon-trash.svg";

class DeleteCourse extends Component {
  deleteUser = (event) => {
    event.preventDefault(); 
    if (this.props.teacher === "Sin Profesor" && this.props.category === "Sin Categoría" ) {    
    
    if (window.confirm(`¿Deseas enviar este curso a la papelera?`)) {
      const payload = { id: this.props.id, type: 0 };

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
    alert("Este curso tiene profesores o categorias asociados. Debes desasociarlas antes de eliminar el curso.");
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

export default DeleteCourse;
