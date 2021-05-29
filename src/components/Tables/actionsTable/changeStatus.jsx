import React, { useState } from "react";
import api from "../../../services/routes";

const ChangeStatus = ({id, entity, status }) => {
    const [update, setUpdate] = useState(status);

    const changeEntityStatus = (event) => {
        event.preventDefault();
          api
            .updateEntity(id, entity, { status: !update})
            .then((res) => {
                setUpdate(!update);
            })
            .catch((err) => {
              alert(err);
            });
      };

    return(
        <>
        <input
          type="checkbox"
          value={update}
          id={id}
          checked={update}
          onChange={changeEntityStatus}
        />{" "}
        {update ? "Activo" : "Inactivo"}
      </>
    );
}
export default ChangeStatus;