import React, { Component } from "react";
import api from "../../../services/routes";

class DeleteTrash extends Component {
  deleteUser = (event) => {
    event.preventDefault();

    if (window.confirm(`¿Desea eliminar este item permanentemente?`)) {
      const payload = this.props.id;

      api
        .deleteTrashById(payload)
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
      <div onClick={this.deleteUser} className="deletePermanently">
        Eliminar definitivamente
      </div>
    );
  }
}

export default DeleteTrash;
