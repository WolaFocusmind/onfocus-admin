import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Modal from "../../Utils/Modal";
import ButtonOriginal from "../../Utils/ButtonOriginal";
import Collapse from "react-bootstrap/Collapse";
import api from "../../../services/routes";

const CollapseAddCategory = ({open}) => {
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
  const [data, SetData] = useState([]);
  
  let history = useHistory();

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
  });}
  const [courses, setCourses] = useState([]);

  const handleChangeCoursesInput = (newValue) => {
    const inputValue = newValue;

    let values = [];
    Object.keys(inputValue).map((index) => {
      let obPush = inputValue[index].value;
      return values.push(obPush);
    });

    setCourses(values);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = { name, courses };

    api
      .createCategory(payload)
      .then((res) => {
        setModalShow(true);
        history.go(0)
        setTimeout(() => {
            setModalShow(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="category_collapse d-flex">
      <Collapse in={open}>
        <div id="collapse-text" className="category_collapse_area col-md-8">
          <form id="createCategory" className="m-4" onSubmit={handleSubmit}>
            <div className="row">
              <h5>Nueva categoría</h5>
            </div>

            <div className="row">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChangeName}
                required="true"
              />

              <ButtonOriginal
                text={"Agregar categoria"}
                position={"btn__primary--course__admin"}
                onClick={handleSubmit}
              />
            </div>

            <div className="row">
              <h5>Seleccionar cursos</h5>
            </div>

          <div className="margin-fix-15">
            <Select
              isMulti
              name="courses"
              placeholder="Agregue cursos"
              options={testOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChangeCoursesInput}
            />
            </div>
          </form>
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            centered={true}
            title="Categoría Creada"
            message="Ha sido creado una nueva categoría"
          />
        </div>
      </Collapse>
    </div>
  );
};

export default CollapseAddCategory;
