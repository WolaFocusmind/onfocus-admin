import React, { useState } from "react";
import ArrowDown from "../../../assets/img/svg/arrow-down.svg";
import ArrowUp from "../../../assets/img/svg/arrow-up-black.svg";

import Collapse from "react-bootstrap/Collapse";

const RowStudents = ({
  id,
  name,
  country,
  email,
  signup_date,
  payment_method,
  purchased_courses,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr key={id}>
        <td>{name}</td>
        <td>{country}</td>
        <td>{email}</td>
        <td>{signup_date}</td>
        <td>
          <img src={open? ArrowUp : ArrowDown} alt="Ver más" onClick={() => setOpen(!open)} />
        </td>
      </tr>
      <Collapse in={open}>
        <tr>
          <td colSpan="3">
            Curso 1 2 clases finalizadas, <br/> 20% completado el curso.
          </td>
          <td colSpan="2">Vencimiento del curso <br/> 03/04/21</td>
          <td colSpan="2">Última clase tomada <br/> 21/04/20</td>
        </tr>
      </Collapse>
    </>
  );
};

export default RowStudents;
