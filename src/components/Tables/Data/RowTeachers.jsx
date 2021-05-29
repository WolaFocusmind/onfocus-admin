import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteTeacher from "../actionsTable/deleteTeacher";
import ChangeStatus from "../actionsTable/changeStatus";
import DeleteCourseTeacher from "../actionsTable/deleteCourseInTeacher";
import api from "../../../services/routes";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Select from "react-select";

const RowTeachers = ({
    id_hash,
    id,
    full_name,
    status,
    coursesAssigned,
    coursesArray,
}) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const formatString = (raw) => {
        let stepOne = raw.join(", ");
        let stepTwo = raw ? stepOne.slice(0, 20) + "..." : null;

        return stepTwo;
    };

    const [data, SetData] = useState([]);

    useEffect(() => {
        api.getAll(0)
            .then((res) => {
                SetData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const testOptions = [];

    Object.keys(data).map((index) => {
        let obPush = { value: data[index]._id, label: data[index].name };
        return testOptions.push(obPush);
    });

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

        api.addCoursesToTeacher(payload)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <td>{full_name}</td>
            <td>
                <ChangeStatus id={id} entity="1" status={status} />
            </td>
            <td>{formatString(coursesAssigned)}</td>
            <td>
                <button className="addRemoveButton" onClick={handleShow}>
                    Añadir/quitar cursos
                </button>
            </td>
            <td>
                <Link to={`/teachers/edit/${id}`}>
                    <button className="editProfile">
                        Editar perfil
                    </button>
                </Link>
            </td>
            <td>
                <span>
                    <DeleteTeacher id={id} courses={coursesAssigned} />
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
                    <Modal.Title>
                        Añadir o quitar cursos a {full_name}
                    </Modal.Title>
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
                                <div className="col-md-6">
                                    {coursesArray[index].name}
                                </div>
                                <DeleteCourseTeacher
                                    course={coursesArray[index]._id}
                                    teacher={id_hash}
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

export default RowTeachers;
