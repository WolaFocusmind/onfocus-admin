import React from "react";
import api from "../../../services/routes";
import Icon from "../../../assets/img/svg/icon-trash.svg";

const DeleteCategory = (props) => {
  const deleteUser = (event) => {
    event.preventDefault();
    if (props.courses.length === 0) {
    if (window.confirm(`¿Desea enviar esta categoría a la papelera?`)) {
      const payload = { id: props.id, type: 2 };
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
    alert("Esta categoria tiene cursos asociados. Eliminalos antes.");
  }
  };

    return (
      <div onClick={deleteUser}>
        <img src={Icon} alt="Enviar a la papelera" className="sendToTrash" />
      </div>
    );
}

export default DeleteCategory;
