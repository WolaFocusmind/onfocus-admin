import React from "react";
import DeleteTrash from "../actionsTable/deleteTrash";
import RestoreTrash from "../actionsTable/restoreTrash";

const RowTrash = ({ id, name, type, creation_date }) => {
  let readable_type;

  switch (type) {
    case 1:
      readable_type = "Profesor";
      break;

    case 2:
      readable_type = "Categoría";
      break;

    case 0:
      readable_type = "Curso";
      break;

    default:
      break;
  }

  return (
    <>
      <td>{name}</td>
      <td>{readable_type}</td>
      <td>{creation_date}</td>
      <td>
        <RestoreTrash id={id} />
      </td>
      <td>
        <DeleteTrash id={id} />
      </td>
    </>
  );
};

export default RowTrash;
