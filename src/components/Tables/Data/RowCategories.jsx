import React, { useState, useEffect } from "react";
import DeleteCategory from "../actionsTable/deleteCategory";
import { formatArrayToString, trimBigText } from "../../../helpers/tools"
import ChangeStatus from "../actionsTable/changeStatus";
import DeleteCourseCategory from "../actionsTable/deleteCourseInCategory";
import api from "../../../services/routes";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Select from "react-select";

const RowCourses = ({
  id_hash,
  id,
  name,
  creation_date,
  status,
  coursesAssigned,
  coursesArray,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [data, SetData] = useState([]);

  useEffect(() => {
    api
      .getAll(0)
      .then((res) => {
        SetData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const testOptions = [];

  if (
    Array.isArray(data) &&
    data.length
  ) {
  Object.keys(data).map((index) => {
    let obPush = { value: data[index]._id, label: data[index].name };
    return testOptions.push(obPush);
  });
}

  const [courses, setCourses] = useState([]);

  const handleInputChange = (newValue) => {
    const inputValue = newValue;

    let values = [];
    Object.keys(inputValue).map((index) => {
      let obPush = inputValue[index].value;
      return values.push(obPush);
    });

    setCourses(values);
  };

  const handleSave = (idSave) => {
    const payload = { id: idSave, courses };

    api
      .addCoursesToCategory(payload)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <td>{trimBigText(name)}</td>
      <td>{creation_date}</td>
      <td><ChangeStatus id={id} entity="2" status={status}/></td>
      <td>{formatArrayToString(coursesAssigned)}</td>
      <td>
        <button className="addRemoveButton" onClick={handleShow}>
          Añadir/quitar cursos
        </button>
      </td>
      <td>
        <span>
          <DeleteCategory id={id} courses={coursesAssigned}/>
        </span>
      </td>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Añadir o quitar cursos en {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            isMulti
            name="courses"
            placeholder="Escriba el nombre del curso"
            options={testOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleInputChange}
          />
          {Object.keys(coursesArray).map((index) => {
            return (
              <div
                className="row d-flex justify-content-between rowCategory"
                key={coursesArray[index]._id}
              >
                <div className="col-md-6">{coursesArray[index].name}</div>
                <DeleteCourseCategory
                  course={coursesArray[index]._id}
                  category={id_hash}
                />
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => handleSave(id_hash)}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RowCourses;
