import React, { Component } from "react";
import api from "../../../services/routes";

class RestoreTrash extends Component {
  deleteUser = (event) => {
    event.preventDefault();

    if (window.confirm(`¿Desea restaurar este item?`)) {
      const payload = this.props.id;
      api
      .restoreTrashById(payload)
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
      <div onClick={this.deleteUser} className="restoreTrash">
        Restaurar
      </div>
    );
  }
}

export default RestoreTrash;
