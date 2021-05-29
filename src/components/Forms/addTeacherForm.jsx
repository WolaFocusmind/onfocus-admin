import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Select from "react-select";
import api from "../../services/routes";
import Modal from "../Utils/Modal";
import Button from "../Utils/Button";

import Photo from "../../assets/img/photo-placeholder.png";
import Instagram from "../../assets/img/svg/instagram-black.svg";
import Twitter from "../../assets/img/svg/twitter-black.svg";
import Facebook from "../../assets/img/svg/facebook-black.svg";
import LinkedIn from "../../assets/img/svg/linkedin-black.svg";
import Youtube from "../../assets/img/svg/youtube-black.svg";

const AddTeacherForm = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [data, SetData] = useState([]);
  const [teacher, SetTeacher] = useState([]);

  const { id, mode } = useParams();
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

  useEffect(() => {
      if(mode === "edit") {
    api
      .getTeacherById(id)
      .then((res) => {
        SetTeacher(res.data.data);
        setSocials(res.data.data.socials)
      })
      .catch((err) => {
        console.log(err);
      });
    }}, [id, mode]);

  const coursesOptions = [];

  const coursesOptionsDefault = [{
      value: "test",
      label: "test"
  }];

  Object.keys(data).map((index) => {
    return coursesOptions.push({ value: data[index]._id, label: data[index].name });
  });

  const [profile_photo, setProfilePhoto] = useState();
  const [full_name, setFullName] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [courses, setCourses] = useState([]);
  const [socials, setSocials] = useState({
    instagram: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  });

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
        setProfilePhoto(current.src);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeName = (e) => {
    setFullName(e.target.value);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleInputChange = (value) => {
    const inputValue = value;
    if(inputValue === null) {
        setCourses([]);
    } else {
    let values = [];
    Object.keys(inputValue).map((index) => {
      return values.push(inputValue[index].value);
    });

    setCourses(values);
    }
  };
  
  const handleChangeSocials = (e) => {
    const value = e.target.value;
    setSocials({
      ...socials,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = { profile_photo, full_name, title, description, courses, socials };
    if(mode === "edit") {
   
        api
        .updateTeacherById(id, payload)
        .then((res) => {
          setModalShow(true);
          history.push("/teachers");
        })
        .catch((err) => {
          console.log(err);
        });
     } else {
    api
      .createTeacher(payload)
      .then((res) => {
        setModalShow(true);
        history.push("/teachers");
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
console.log(teacher)
  return (
    <div className="col-md-12 mt-5">
      <form id="createTeacher" onSubmit={handleSubmit} className="addForms">
        <div className="row insideTableSection p-5">
          <div className="col-md-6">
            <div className="row mb-3">
              <h3 className="formTitle">Datos Personales</h3>
            </div>
            <div className="row rowSeparator">
              <div className="col-md-4">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={imageUploader}
                    style={{
                      display: "none",
                    }}
                  />
                  <div
                    style={{
                      height: "100px",
                      width: "100px",
                      border: "1px dashed black",
                    }}
                    onClick={() => imageUploader.current.click()}
                  >
                    <img
                      ref={uploadedImage}
                      alt="Foto de Perfil"
                      src={teacher.profile_photo || Photo}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <p className="photoTitle">Foto de perfil</p>
                <p className="recomendedText">
                  Tamaño recomendado <br />
                  300x300 px
                </p>
              </div>
            </div>
            <div className="row rowSeparator">
              <label htmlFor="name">Nombre Completo</label>
              <input
                type="text"
                name="fullName"
                value={full_name || teacher.full_name}
                onChange={handleChangeName}
              />
            </div>
            <div className="row rowSeparator">
              <label htmlFor="title">Titulos / Estudios</label>
              <input
                type="text"
                name="title"
                value={title || teacher.title}
                onChange={handleChangeTitle}
              />
            </div>
            <div className="row">
              <label htmlFor="description">Descripción</label>
            </div>
            <div className="row">
              <textarea
                name="description"
                value={description || teacher.description}
                onChange={handleChangeDescription}
              ></textarea>
            </div>
            <div className="row mt-4">
              <h3 className="formTitle">Seleccionar cursos</h3>
            </div>

            <Select
              isMulti
              name="courses"
              defaultValue={coursesOptionsDefault}
              placeholder="Agregue cursos"
              options={coursesOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6">
            <div className="row mb-3">
              <h3 className="formTitle">Redes sociales</h3>
            </div>
            <div className="row">
              <label htmlFor="instagram">
                <img src={Instagram} alt="Instagram" className="socialLogo" />
                Instagram
              </label>
              <input
                type="text"
                name="instagram"
                value={socials.instagram}
                onChange={handleChangeSocials}
              />
            </div>
            <div className="row rowSeparator">
              <label htmlFor="twitter">
                <img src={Twitter} alt="Twitter" className="socialLogo" />
                Twitter
              </label>
              <input
                type="text"
                name="twitter"
                value={socials.twitter}
                onChange={handleChangeSocials}
              />
            </div>
            <div className="row rowSeparator">
              <label htmlFor="facebook">
                <img src={Facebook} alt="Facebook" className="socialLogo" />
                Facebook
              </label>
              <input
                type="text"
                name="facebook"
                value={socials.facebook}
                onChange={handleChangeSocials}
              />
            </div>
            <div className="row rowSeparator">
              <label htmlFor="linkedin">
                <img src={LinkedIn} alt="LinkedIn" className="socialLogo" />
                LinkedIn
              </label>
              <input
                type="text"
                name="linkedin"
                value={socials.linkedin}
                onChange={handleChangeSocials}
              />
            </div>
            <div className="row rowSeparator">
              <label htmlFor="youtube">
                <img src={Youtube} alt="YouTube" className="socialLogo" />
                YouTube
              </label>
              <input
                type="text"
                name="youtube"
                value={socials.youtube}
                onChange={handleChangeSocials}
              />
            </div>
            <div className="row rowSeparator">
              <Button
                text={"Guardar perfil"}
                position={"btn__primary--teacher"}
                type="submit"
              />
            </div>
          </div>
        </div>
      </form>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered={true}
        title="Profesor Creado"
        message="Ha sido creado un profesor exitosamente"
      />
    </div>
  );
};
export default AddTeacherForm;
