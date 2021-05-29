import React, { useState, useEffect } from "react";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Link, useParams, useHistory } from "react-router-dom";
import Select from "react-select";
import api from "../../services/routes";
import { percentage } from "../../helpers/tools";
import Modal from "../Utils/Modal";
import Photo from "../../assets/img/photo-placeholder.png";
import Photo280x from "../../assets/img/280x.png";
import mex from "../../assets/img/countries/mx.png";
import usa from "../../assets/img/countries/us.png";
import arg from "../../assets/img/countries/ar.png";
import col from "../../assets/img/countries/co.png";
import spa from "../../assets/img/countries/es.png";
import trash from "../../assets/img/svg/icon-trash.svg";

const AddCourseForm = (props) => {
const [modalPublishShow, setModalPublishShow] = useState(false);
const [modalSaveShow, setModalSaveShow] = useState(false);
const [modalSaving, setSaving] = useState(false);
const [modalPriceAlert, setModalPriceAlert] = useState(false);
const [modalDiscountAlert, setModalDiscountAlert] = useState(false);
const [modalValidatePublish, setModalValidatePublish] = useState(false);
const [modalWaiting, setModalWaiting] = useState(false);

const [categories, setCategories] = useState([]);
const [teachers, setTeachers] = useState([]);

const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [video_intro, setVideoIntro] = useState("");

const [editorState, SetEditorState] = useState(EditorState.createEmpty());
const [about_this_course, setAboutThisCourse] = useState();
const [course_details_items, setCourseDetailsItems] = useState([""]);
const [course_target_items, setCourseTargetItems] = useState([""]);

const [total_duration, setTotalDuration] = useState(0);
const [featured_image, setFeaturedImage] = useState();
const [teacher, setTeacher] = useState();
const [teacherLabel, setTeacherLabel] = useState();
const [category, setCategory] = useState();
const [categoryLabel, setCategoryLabel] = useState();

const [modules, setModules] = useState([{ lessons: [{}] }]);
const [total_modules, setTotalModules] = useState(modules.length);
const [testimonials, setTestimonials] = useState([{}]);

const [price, setPrice] = useState([]);
const [discount, setDiscount] = useState([]);
const [discountCountries, setDiscountCountries] = useState([]);

const [update, setUpdate] = useState(false);

const [validate, setValidate] = useState({
    validations: {
        required: {
            name: true,
            description: true,
            video_intro: true,
            aboutThisCourse: true,
            courseDetailsItems: true,
            courseTargetItems: true,
            modulesItems: true,
            testimonialItems: true,
            priceItems: true,
            teacher: true,
            category: true,
            featured_image: true,
        },
        validated: {
            name: false,
            description: false,
            video_intro: false,
            aboutThisCourse: false,
            courseDetailsItems: false,
            courseTargetItems: false,
            modulesItems: false,
            testimonialItems: false,
            priceItems: false,
            teacher: false,
            category: false,
            featured_image: false,
        },
        displayError: {
            name: false,
            description: false,
            video_intro: false,
            aboutThisCourse: false,
            courseDetailsItems: false,
            courseTargetItems: false,
            modulesItems: false,
            testimonialItems: false,
            priceItems: false,
            teacher: false,
            category: false,
            featured_image: false,
        },
    },
});

const { id, mode } = useParams();
let history = useHistory();

const editorEdit = (about_this_course) => {
    const blocksFromHtml = htmlToDraft(about_this_course);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
    );
    const editor_State = EditorState.createWithContent(contentState);

    return editor_State;
}

useEffect(() => {
    if (mode === "edit") {
        setModalWaiting(true);
        api.getCourseById(id)
            .then((res) => {
                setModalWaiting(false);
                setName(res.data.data.title);
                setDescription(res.data.data.description);
                setVideoIntro(res.data.data.video_intro);
                setTeacher(res.data.data.teacher._id);
                setTeacherLabel(res.data.data.teacher.full_name);
                setCategory(res.data.data.category._id);
                setCategoryLabel(res.data.data.category.name);
                setAboutThisCourse(res.data.data.about_this_course);
                setCourseDetailsItems(res.data.data.course_details_items);
                setCourseTargetItems(res.data.data.course_target_items);
                setTotalModules(res.data.data.total_modules);
                setTotalDuration(res.data.data.total_duration);
                setFeaturedImage(res.data.data.featured_image);
                setModules(res.data.data.modules);
                setTestimonials(res.data.data.testimonials);
                setPrice(res.data.data.price);
                
                const editor = editorEdit(res.data.data.about_this_course);
                SetEditorState(editor)
            })
            .catch((err) => {
                console.log(err);
            });
    }
}, [id, mode]);

useEffect(() => {
    api.getAll(2)
        .then((res) => {
            setCategories(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
}, []);

useEffect(() => {
    api.getAll(1)
        .then((res) => {
            setTeachers(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
}, []);

const handleChangeName = (e) => {
    setName(e.target.value);
};

const handleChangeDescription = (e) => {
    setDescription(e.target.value);
};

const handleInputAboutThisCourse = async (editorState) => {
    SetEditorState(editorState);
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setAboutThisCourse(html);
};

const handleChangeVideoIntro = (e) => {
    setVideoIntro(e.target.value);
};

const handleInputChangeListDetailsItem = (e, index) => {
    const { value } = e.target;
    const list = [...course_details_items];
    list[index] = value;
    setCourseDetailsItems(list);
};

const handleRemoveClickDetailsItem = (e, index) => {
    e.preventDefault();
    const list = [...course_details_items];
    list.splice(index, 1);
    setCourseDetailsItems(list);
};

const handleAddClickDetailsItem = (e) => {
    e.preventDefault();
    setCourseDetailsItems([...course_details_items, ""]);
};

const handleInputChangeListTargetsItem = (e, index) => {
    const { value } = e.target;
    const list = [...course_target_items];
    list[index] = value;
    setCourseTargetItems(list);
};

const handleRemoveClickTargetsItem = (index) => {
    const list = [...course_target_items];
    list.splice(index, 1);
    setCourseTargetItems(list);
};

const handleAddClickTargetsItem = () => {
    setCourseTargetItems([...course_target_items, ""]);
};

const handleInputChangeListModules = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const list = [...modules];
    list[index][name] = value;
    setModules(list);
};

const handleRemoveClickModules = (e, index) => {
    e.preventDefault();
    const list = [...modules];
    list.splice(index, 1);
    setModules(list);
    setTotalModules(modules.length - 1);
};

const handleAddClickModules = (e) => {
    e.preventDefault();
    setModules([...modules, { lessons: [{ lesson_name: "" }] }]);
    setTotalModules(modules.length + 1);
};

const handleInputChangeListLessons = (e, mod, index) => {
    const { name, value } = e.target;
    const moduleCopy = modules;
    moduleCopy[mod]["lessons"][index][name] = value;
    setModules(moduleCopy);
    setUpdate(!update);
};

const handleRemoveClickLessons = (e, i, lesson) => {
    e.preventDefault();
    const moduleCopy = modules;
    moduleCopy[i]["lessons"].splice(lesson, 1);
    setModules(moduleCopy);
    setUpdate(!update);
};

const handleAddClickLessons = (e, i) => {
    e.preventDefault();
    const modulesCopy = modules;
    modulesCopy[i]["lessons"].push({});
    setModules(modulesCopy);
    setUpdate(!update);
};

const handleSaveModule = (e, i) => {
    e.preventDefault();
    alert("Modulo Guardado");
};

const handleInputChangeListTestimonials = (e, index) => {
    const { value, name } = e.target;
    const list = [...testimonials];
    list[index][name] = value;
    setTestimonials(list);
};

const handleRemoveClickTestimonials = (e, index) => {
    e.preventDefault();
    const list = [...testimonials];
    list.splice(index, 1);
    setTestimonials(list);
};

const handleAddClickTestimonialsItem = (e) => {
    e.preventDefault();
    setTestimonials([...testimonials, {}]);
};

const handleInputTotalModules = (e) => {
    setTotalModules(e.target.value);
};

const handleInputTotalDuration = (e) => {
    setTotalDuration(e.target.value);
};

const handleInputChangeCategory = (value) => {
    setCategory(value.value);
};

const handleInputChangeTeacher = (value) => {
    setTeacher(value.value);
};

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
            setFeaturedImage(current.src);
        };
        reader.readAsDataURL(file);
    }
};

const uploadedImageStudent = React.useRef(null);
const imageUploaderStudent = React.useRef(null);

const handleImageUploadStudent = (e, index) => {
    const [file] = e.target.files;
    const { name } = e.target;
    if (file) {
        const reader = new FileReader();
        const { current } = uploadedImageStudent;
        current.file = file;
        reader.onload = (e) => {
            current.src = e.target.result;
            const list = [...testimonials];
            list[index][name] = current.src;
            setTestimonials(list);
        };
        reader.readAsDataURL(file);
    }
};

const selectCountry = React.useRef(null);
const currency = React.useRef(null);
const priceCountry = React.useRef(null);

let countryPrice = {};

const handleSelectPrice = (e) => {
    const { value, name } = e.target;
    countryPrice[name] = value;
    let currencyValue;
    if (value === "AR") {
        currencyValue = "ARS";
    } else if (value === "MX") {
        currencyValue = "MXN";
    } else if (value === "CO") {
        currencyValue = "COP";
    } else if (value === "ES") {
        currencyValue = "EUR";
    } else {
        currencyValue = "US";
    }

    countryPrice["currency"] = currencyValue;
    currency["current"].value = currencyValue;

    return countryPrice;
};

const handlePrice = (e) => {
    const { value, name } = e.target;
    countryPrice[name] = value;
    return countryPrice;
};

const handleSavePrice = (e) => {
    e.preventDefault();
    const size = Object.keys(countryPrice).length;
    if (size === 3) {
        const priceCopy = price;
        priceCopy.push(countryPrice);
        setPrice(priceCopy);

        let labelCountryDiscount;
        selectCountry["current"].value === "AR" ? labelCountryDiscount="Argentina" :
        selectCountry["current"].value === "MX" ? labelCountryDiscount="México" :
        selectCountry["current"].value === "CO" ? labelCountryDiscount="Colombia" :
        selectCountry["current"].value === "ES" ? labelCountryDiscount="España" :
        labelCountryDiscount="Global / USA";

        setDiscountCountries([
            ...discountCountries,
            { value: selectCountry["current"].value, label: labelCountryDiscount },
        ]);
        countryPrice = {};
        currency["current"].value = "";
        priceCountry["current"].value = "";
        selectCountry["current"].value = 0;
        setUpdate(!update);
    } else {
        setModalPriceAlert(true);
    }
};

const handleRemoveClickPrice = (e, index) => {
    e.preventDefault();
    const list = [...price];
    list.splice(index, 1);
    setPrice(list);
};

const selectCountryDiscount = React.useRef(null);
const percent = React.useRef(null);
const priceDiscount = React.useRef(null);
const discountStart = React.useRef(null);
const discountEnds = React.useRef(null);

let discountPrice = {};
const handleSelectDiscountPrice = (e) => {
    const { value, name } = e.target;
    discountPrice[name] = value;
    let discountValue;
    if (value === "AR") {
        const findPrice = price.filter(prices => prices.country === 'AR');
        const findRealPrice = findPrice[0].real_price;
        discountValue = findRealPrice;
    } else if (value === "MX") {
        const findPrice = price.filter(prices => prices.country === 'MX');
        const findRealPrice = findPrice[0].real_price;
        discountValue = findRealPrice;
    } else if (value === "CO") {
        const findPrice = price.filter(prices => prices.country === 'CO');
        const findRealPrice = findPrice[0].real_price;
        discountValue = findRealPrice;
    } else if (value === "ES") {
        const findPrice = price.filter(prices => prices.country === 'ES');
        const findRealPrice = findPrice[0].real_price;
        discountValue = findRealPrice;
    } else {
        const findPrice = price.filter(prices => prices.country === 'US');
        const findRealPrice = findPrice[0].real_price;
        discountValue = findRealPrice;
    }
    discountPrice["discount"] = discountValue;
    priceDiscount["current"].value = discountValue;
    return discountPrice;
};

const handleDiscountPrice = (e) => {
    e.preventDefault();
    const country = selectCountryDiscount["current"].value;
    let discountValue;
    if (country === "AR") {
        const findPrice = price.filter(prices => prices.country === 'AR');
        const findRealPrice = findPrice[0].real_price;
        discountValue = findRealPrice;
    } else if (country === "MX") {
        const findPrice = price.filter(prices => prices.country === 'MX');
        const findRealPrice = findPrice[0].real_price;
        discountValue = findRealPrice;
    } else if (country === "CO") {
        const findPrice = price.filter(prices => prices.country === 'CO');
        const findRealPrice = findPrice[0].real_price;
        discountValue = findRealPrice;
    } else if (country === "ES") {
        const findPrice = price.filter(prices => prices.country === 'ES');
        const findRealPrice = findPrice[0].real_price;
        discountValue = findRealPrice;
    } else {
        const findPrice = price.filter(prices => prices.country === 'US');
        const findRealPrice = findPrice[0].real_price;
        discountValue = findRealPrice;
    }

    const { value } = e.target;
    discountPrice["final_price"] = value;
    discountPrice["real_price"] = discountValue;
    const resultPercent = percentage(discountValue, value)
    priceDiscount["current"].value = resultPercent;
    return discountPrice;
};

const handleDiscountDatesPrice = (e) => {
    const { value, name } = e.target;
    discountPrice[name] = value;
    return discountPrice;
}

const handleSaveDiscountPrice = (e) => {
    e.preventDefault();
   
    if (Object.keys(discountPrice).length === 4) {
        const discountCopy = discount;
        discountCopy.push(discountPrice);
        setDiscount(discountCopy);
        discountPrice = {};
        percent["current"].value = "";
        priceDiscount["current"].value = "";
        discountStart["current"].value = "";
        discountEnds["current"].value = "";
        selectCountryDiscount["current"].value = 0;
        setUpdate(!update);
    } else {
        setModalDiscountAlert(true);
    }
};

const validatePublish = (payload) => {
    const keys = Object.keys(payload);
    const validateCopy = validate;
    keys.map((i) => {
        if (payload[i] === undefined || payload[i].length <= 0) {
            if (validateCopy.validations.required[i]) {
                validateCopy.validations.validated[i] = false;
                validateCopy.validations.displayError[i] = true;
                setValidate(validateCopy);
                setUpdate(!update);
                return false;
            } else {
                validateCopy.validations.validated[i] = true;
                validateCopy.validations.displayError[i] = false;
                setValidate(validateCopy);
                setUpdate(!update);
                return true;
            }
        } else {
            validateCopy.validations.validated[i] = true;
            validateCopy.validations.displayError[i] = false;
            setValidate(validateCopy);
            setUpdate(!update);
            return true;
        }
    });
};

const validateSave = (payload) => {
    const validateSave = {
        validations: {
                required: {
                    name: true,
                    description: true,
                    video_intro: false,
                    about_this_course: false,
                    courseDetailsItems: false,
                    courseTargetItems: false,
                    modulesItems: false,
                    testimonialItems: false,
                    priceItems: false,
                    teacher: false,
                    category: true,
                    featured_image: false,
                },
                validated: {
                    name: false,
                    description: false,
                    video_intro: false,
                    about_this_course: false,
                    courseDetailsItems: false,
                    courseTargetItems: false,
                    modulesItems: false,
                    testimonialItems: false,
                    priceItems: false,
                    teacher: false,
                    category: false,
                    featured_image: false,
                },
                displayError: {
                    name: false,
                    description: false,
                    video_intro: false,
                    about_this_course: false,
                    courseDetailsItems: false,
                    courseTargetItems: false,
                    modulesItems: false,
                    testimonialItems: false,
                    priceItems: false,
                    teacher: false,
                    category: false,
                    featured_image: false,
                },
        },
    };

    const keys = Object.keys(payload);
    const validateCopy = validate;
    keys.map((i) => {
        if (payload[i] === undefined || payload[i].length <= 0) {
            if (validateSave.validations.required[i]) {
                validateCopy.validations.validated[i] = false;
                validateCopy.validations.displayError[i] = true;
                setValidate(validateCopy);
                setUpdate(!update);
                return false;
            } else {
                validateCopy.validations.validated[i] = true;
                validateCopy.validations.displayError[i] = false;
                setValidate(validateCopy);
                setUpdate(!update);
                return true;
            }
        } else {
            validateCopy.validations.validated[i] = true;
            validateCopy.validations.displayError[i] = false;
            setValidate(validateCopy);
            setUpdate(!update);
            return true;
        }
    });
};

const isFormInvalid = () => {
    const { validated } = validate.validations;
    const isSomeFieldInvalid = Object.keys(validated).some(
        (error) => !validated[error]
    );

    return isSomeFieldInvalid;
};

const hasError = (field) => {
    return validate.validations.displayError[field];
};

const displayError = (field) => {
    const errorMessage = `Debes completar este campo`;

    if (validate.validations.displayError[field]) {
        return `${errorMessage}`;
    }
};

const teachersOptions = [];

Object.keys(teachers).map((index) => {
    let push = {
        value: teachers[index]._id,
        label: teachers[index].full_name,
    };
    return teachersOptions.push(push);
});

const categoriesOptions = [];

Object.keys(categories).map((i) => {
    let push = { value: categories[i]._id, label: categories[i].name };
    return categoriesOptions.push(push);
});

const handleSubmit = async (event) => {

    event.preventDefault();

    const action = event.target.value;

    let status;
    let courseDetailsItems;
    let courseTargetItems;
    let aboutThisCourse;
    let modulesItems;
    let testimonialItems;
    let priceItems;

    course_details_items.length > 0 ? courseDetailsItems = course_details_items : 
    courseDetailsItems = [];

    course_target_items.length > 0 ? courseTargetItems = course_target_items : 
    courseTargetItems = [];

    modules.length === 0 ? modulesItems = [] : modulesItems = modules;

    testimonials.length === 0  ? testimonialItems = [] : 
    testimonialItems = testimonials;

    price.length === 0 ? priceItems = [] : priceItems = price;

    about_this_course.length === 0 ? aboutThisCourse = "" : aboutThisCourse = about_this_course;

    const payload = {
        name,
        description,
        video_intro,
        aboutThisCourse,
        courseDetailsItems,
        courseTargetItems,
        modulesItems,
        testimonialItems,
        priceItems,
        teacher,
        category,
        featured_image,
    };

    if (action === "true") {
        setSaving(true);
        await validatePublish(payload);
        status = true;
    } else {
        setSaving(true);
        await validateSave(payload);
        status = false;
    }

    const payloadVerified = {
        name,
        description,
        video_intro,
        about_this_course: aboutThisCourse,
        course_details_items: courseDetailsItems,
        course_target_items: courseTargetItems,
        modules: modulesItems,
        featured_image,
        testimonials: testimonialItems,
        price: priceItems,
        teacher,
        category,
        total_duration,
        total_modules,
        status,
    };

    let FormInvalid;
    if(action === "false") {
        FormInvalid = false;
    } else {
        FormInvalid = isFormInvalid();
    }

    if (!FormInvalid) {
        
    if (mode === "edit") {
        api.updateCourseById(id, payloadVerified)
            .then((res) => {
                setSaving(false);
                if (status) {
                    setSaving(false);
                    setModalPublishShow(true);
                    history.push("/courses");
                } else {
                    setModalSaveShow(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        api.createCourse(payloadVerified)
            .then((res) => {
                setSaving(false);
                if (status) {
                    setSaving(false);
                    setModalPublishShow(true);
                    history.push("/courses");
                } else {
                    setModalSaveShow(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
} else {
    setSaving(false);
    setModalValidatePublish(true);
}
};

return (

<form id="createCourse" className="addForms">
    <div className="row">
        <div className="col-md-8">
            <div className="insideTableSection p-5">
                <fieldset>
                    <div className="mb-4">
                        <label htmlFor="name">Nombre</label>
                            <p className={hasError("name")? "error-message__visible": "error-message"}>
                                {displayError("name")}
                            </p>
                            <input
                                type="text"
                                className={hasError("name") ? "red" : ""}
                                name="name"
                                value={name}
                                onChange={(e) => handleChangeName(e)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description">Descripción</label>
                            <p className={hasError("description") ? "error-message__visible"
                                        : "error-message"
                                }
                            >
                                {displayError("description")}
                            </p>
                            <textarea
                                className={
                                    hasError("description") ? "red" : ""
                                }
                                name="description"
                                value={description}
                                onChange={handleChangeDescription}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="video_intro">
                                Video Introductorio
                            </label>
                            <p
                                className={
                                    hasError("video_intro")
                                        ? "error-message__visible"
                                        : "error-message"
                                }
                            >
                                {displayError("video_intro")}
                            </p>
                            <input
                                className={
                                    hasError("video_intro") ? "red" : ""
                                }
                                type="text"
                                name="video_intro"
                                value={video_intro}
                                onChange={handleChangeVideoIntro}
                            />
                        </div>
                    </fieldset>
                </div>

                <div className="insideTableSection p-5 mt-3">
                    <fieldset>
                        <div className="mb-2">
                            <h4 className="gold-H4">Sobre este curso</h4>
                            <label htmlFor="about_this_course">
                                Descripción
                            </label>
                            <p
                                className={
                                    hasError("about_this_course")
                                        ? "error-message__visible"
                                        : "error-message"
                                }
                            >
                                {displayError("about_this_course")}
                            </p>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName={
                                    hasError("about_this_course")
                                        ? "editor-red"
                                        : "editor"
                                }
                                onEditorStateChange={
                                    handleInputAboutThisCourse
                                }
                            />
                        </div>
                    </fieldset>
                </div>

                <div className="insideTableSection p-5 mt-3">
                    <fieldset>
                        <div className="mb-2">
                            <h4 className="gold-H4">
                                Que incluye este curso
                            </h4>
                            <p
                                className={
                                    hasError("courseDetailsItems")
                                        ? "error-message__visible"
                                        : "error-message"
                                }
                            >
                                {displayError("courseDetailsItems")}
                            </p>
                            {course_details_items.map((x, i) => {
                                return (
                                    <div
                                        className="box"
                                        key={`includes${i}`}
                                    >
                                        <label htmlFor="courses_includes">
                                            Item {i + 1}
                                        </label>
                                        <input
                                            type="text"
                                            name="item"
                                            value={x.length ? x : ""}
                                            onChange={(e) =>
                                                handleInputChangeListDetailsItem(
                                                    e,
                                                    i
                                                )
                                            }
                                        />
                                        <div className="btn-box mt-2">
                                            {course_details_items.length !==
                                                1 && (
                                                <button
                                                    className="mr10"
                                                    onClick={(e) =>
                                                        handleRemoveClickDetailsItem(
                                                            e,
                                                            i
                                                        )
                                                    }
                                                >
                                                    - Eliminar
                                                </button>
                                            )}

                                        </div>
                                    </div>
                                );
                            })}

                                                <button
                                                    className="text-button"
                                                    onClick={(e) =>
                                                        handleAddClickDetailsItem(
                                                            e
                                                        )
                                                    }
                                                >
                                                    + Agregar item
                                                </button>
                                  
                        </div>
                    </fieldset>
                </div>

                <div className="insideTableSection p-5 mt-3">
                    <fieldset>
                        <div className="mb-2">
                            <h4 className="gold-H4">
                                ¿Este curso es para mí?
                            </h4>
                            <p
                                className={
                                    hasError("courseTargetItems")
                                        ? "error-message__visible"
                                        : "error-message"
                                }
                            >
                                {displayError("courseTargetItems")}
                            </p>
                            {course_target_items.map((x, i) => {
                                return (
                                    <div className="box" key={`items${i}`}>
                                        <label htmlFor="target_items">
                                            Item {i + 1}
                                        </label>
                                        <input
                                            type="text"
                                            name="item"
                                            value={x.length ? x : ""}
                                            onChange={(e) =>
                                                handleInputChangeListTargetsItem(
                                                    e,
                                                    i
                                                )
                                            }
                                        />
                                        <div className="btn-box mt-2">
                                            {course_target_items.length !==
                                                1 && (
                                                <button
                                                    className="mr10"
                                                    onClick={() =>
                                                        handleRemoveClickTargetsItem(
                                                            i
                                                        )
                                                    }
                                                >
                                                    - Eliminar
                                                </button>
                                            )}
                                            {course_target_items.length -
                                                1 ===
                                                i && (
                                                <button
                                                    className="text-button"
                                                    onClick={
                                                        handleAddClickTargetsItem
                                                    }
                                                >
                                                    + Agregar item
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </fieldset>
                </div>
                <div className="insideTableSection pl-5 pt-4 pb-4 mt-3">
                    <div className="row">
                        <div className="col-md-8">
                            <h2 className="gold-H2">Crear modulos</h2>
                            <p
                                className={
                                    hasError("modulesItems")
                                        ? "error-message__visible"
                                        : "error-message"
                                }
                            >
                                Debes tener al menos un modulo y una clase
                                completa.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <button
                                className="createButton"
                                onClick={handleAddClickModules}
                            >
                                + CREAR
                            </button>
                        </div>
                    </div>
                </div>
                {Object.keys(modules).map(function (x, i) {
                    return (
                        <div
                            className="insideTableSection p-5 mt-3"
                            key={`modules${i}`}
                        >
                            <fieldset>
                                <div className="mb-2">
                                    <div className="box">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h4 className="gold-H4">
                                                    Modulo{" "}
                                                    {parseInt(i, 10) + 1}
                                                </h4>
                                            </div>
                                            <div className="col-md-4 text-right">
                                                <span>
                                                    {modules.length !==
                                                        1 && (
                                                        <div
                                                            onClick={(e) =>
                                                                handleRemoveClickModules(
                                                                    e,
                                                                    i
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={trash}
                                                                alt="Eliminar"
                                                                className="sendToTrash"
                                                            />
                                                        </div>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <label htmlFor="module_name">
                                            Nombre del modulo
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={(e) =>
                                                handleInputChangeListModules(
                                                    e,
                                                    i
                                                )
                                            }
                                            value={modules[i].name}
                                        />

                                        <label htmlFor="module_descripton">
                                            Descripción
                                        </label>
                                        <textarea
                                            name="description"
                                            onChange={(e) =>
                                                handleInputChangeListModules(
                                                    e,
                                                    i
                                                )
                                            }
                                            value={modules[i].description}
                                        />
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <h5 className="mt-4 mb-2">
                                    Agregar clases
                                </h5>
                                {Object.keys(modules[i].lessons).map(
                                    (value, index) => {
                                        return (
                                            <div
                                                className="mb-2 mt-2"
                                                key={`lessons${index}`}
                                            >
                                                <div className="box">
                                                    <label htmlFor="lesson">
                                                        Clase {index + 1}
                                                    </label>
                                                    <label htmlFor="lesson_name">
                                                        Nombre
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={
                                                            modules[i]
                                                                .lessons[
                                                                index
                                                            ].name
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChangeListLessons(
                                                                e,
                                                                i,
                                                                index
                                                            )
                                                        }
                                                    />

                                                    <label htmlFor="lesson_video">
                                                        URL Video
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="video"
                                                        value={
                                                            modules[i]
                                                                .lessons[
                                                                index
                                                            ].video
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChangeListLessons(
                                                                e,
                                                                i,
                                                                index
                                                            )
                                                        }
                                                    />
                                                    <label htmlFor="lesson_duration">
                                                        Duración del video
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="duration"
                                                        value={
                                                            modules[i]
                                                                .lessons[
                                                                index
                                                            ].duration
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChangeListLessons(
                                                                e,
                                                                i,
                                                                index
                                                            )
                                                        }
                                                    />
                                                    <div className="btn-box mt-2">
                                                        {modules[i].lessons
                                                            .length !==
                                                            1 && (
                                                            <button
                                                                className="mr10"
                                                                onClick={(
                                                                    e
                                                                ) =>
                                                                    handleRemoveClickLessons(
                                                                        e,
                                                                        i,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                - Eliminar
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                                <div>
                                    <button
                                        className="text-button"
                                        onClick={(e) =>
                                            handleAddClickLessons(e, i)
                                        }
                                    >
                                        + Agregar clases
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="saveModule"
                                        onClick={(e) =>
                                            handleSaveModule(e, i)
                                        }
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    );
                })}

                <div className="insideTableSection p-5 mt-3">
                    <fieldset>
                        <div className="mb-2">
                            <h4 className="gold-H4">Recomendaciones</h4>
                            <p
                                className={
                                    hasError("testimonialItems")
                                        ? "error-message__visible"
                                        : "error-message"
                                }
                            >
                                Debes tener al menos una recomendación.
                            </p>
                            {testimonials.map((x, i) => {
                                return (
                                    <div
                                        className="box"
                                        key={`testimonials${i}`}
                                    >
                                        <label htmlFor="courses_includes">
                                            Nombre del alumno
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={x.name}
                                            onChange={(e) =>
                                                handleInputChangeListTestimonials(
                                                    e,
                                                    i
                                                )
                                            }
                                        />
                                        <label htmlFor="courses_includes">
                                            Cargar imágen del alumno
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name="studentImage"
                                            onChange={(e) =>
                                                handleImageUploadStudent(
                                                    e,
                                                    i
                                                )
                                            }
                                            ref={imageUploaderStudent}
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
                                            onClick={() =>
                                                imageUploaderStudent.current.click()
                                            }
                                        >
                                            <img
                                                ref={uploadedImageStudent}
                                                alt="Foto del Curso"
                                                src={
                                                    x.profile_picture ||
                                                    Photo
                                                }
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            />
                                        </div>
                                        <label htmlFor="courses_includes">
                                            Recomendación
                                        </label>
                                        <textarea
                                            name="testimonial"
                                            value={x.testimonial}
                                            onChange={(e) =>
                                                handleInputChangeListTestimonials(
                                                    e,
                                                    i
                                                )
                                            }
                                        />
                                        <div className="btn-box mt-2">
                                            {testimonials.length !== 1 && (
                                                <button
                                                    className="mr10"
                                                    onClick={(e) =>
                                                        handleRemoveClickTestimonials(
                                                            e,
                                                            i
                                                        )
                                                    }
                                                >
                                                    - Eliminar
                                                </button>
                                            )}

                                        </div>
                                    </div>
                                );
                            })}
                            <button
                            className="text-button"
                            onClick={(e) =>handleAddClickTestimonialsItem(e)}>
                            + Agregar recomendación
                        </button>
                        </div>
                    </fieldset>
                </div>

                <div className="insideTableSection p-5 mt-3">
                    <div className="borderDivision">
                        <h2 className="gold-H2">Precio</h2>
                        <p
                            className={
                                hasError("priceItems")
                                    ? "error-message__visible"
                                    : "error-message"
                            }
                        >
                            Debes tener al menos un precio Global.
                        </p>
                        <div className="row borderDivision">
                            <div className="col-md-3">
                                <select
                                    name="country"
                                    onChange={(e) => handleSelectPrice(e)}
                                    ref={selectCountry}
                                >
                                    <option value="0">Pais</option>
                                    <option value="US">Global</option>
                                    <option value="AR">Argentina</option>
                                    <option value="CO">Colombia</option>
                                    <option value="MX">México</option>
                                    <option value="ES">España</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <input
                                    disabled
                                    name="currency"
                                    ref={currency}
                                    placeholder="Moneda"
                                    type="text"
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    name="real_price"
                                    ref={priceCountry}
                                    placeholder="Valor del Curso"
                                    type="number"
                                    min="0"
                                    onChange={(e) => handlePrice(e)}
                                />
                            </div>
                            <div className="col-md-3">
                                <button
                                    type="button"
                                    className="text-button"
                                    onClick={(e) => handleSavePrice(e)}
                                >
                                    Guardar precio
                                </button>
                            </div>
                        </div>

                        {price.length === 0 ? (
                            <p className="mt-3">Seleccione un país</p>
                        ) : (
                            Object.keys(price).map((i) => {
                                return (
                                    <div className="row mt-3 mb-3" key={i}>
                                        <div className="col-md-3">
                                            {price[i].country === "US" && (
                                                <>
                                                    {" "}
                                                    <img
                                                        src={usa}
                                                        alt="USA"
                                                        width="20"
                                                    />{" "}
                                                    Global / USA
                                                </>
                                            )}
                                            {price[i].country === "AR" && (
                                                <>
                                                    {" "}
                                                    <img
                                                        src={arg}
                                                        alt="AR"
                                                        width="20"
                                                    />{" "}
                                                    Argentina
                                                </>
                                            )}
                                            {price[i].country === "ES" && (
                                                <>
                                                    {" "}
                                                    <img
                                                        src={spa}
                                                        alt="ES"
                                                        width="20"
                                                    />{" "}
                                                    España
                                                </>
                                            )}
                                            {price[i].country === "CO" && (
                                                <>
                                                    {" "}
                                                    <img
                                                        src={col}
                                                        alt="CO"
                                                        width="20"
                                                    />{" "}
                                                    Colombia
                                                </>
                                            )}
                                            {price[i].country === "MX" && (
                                                <>
                                                    {" "}
                                                    <img
                                                        src={mex}
                                                        alt="MX"
                                                        width="20"
                                                    />{" "}
                                                    Mexico
                                                </>
                                            )}
                                        </div>
                                        <div className="col-md-3 text-center">
                                            {price[i].currency}
                                        </div>
                                        <div className="col-md-3 text-center">
                                            {price[i].real_price}
                                        </div>
                                        <div className="col-md-3 text-center">
                                            <span>
                                                {price.length !== 0 && (
                                                    <div
                                                        onClick={(e) =>
                                                            handleRemoveClickPrice(
                                                                e,
                                                                i
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={trash}
                                                            alt="Eliminar"
                                                            className="sendToTrash"
                                                        />
                                                    </div>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div className="borderDivision">
                        <h5 className="mt-4 mb-2">Aplicar descuentos</h5>
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <select
                                    name="country"
                                    onChange={(e) => handleSelectDiscountPrice(e)}
                                    ref={selectCountryDiscount}
                                >
                                    <option value="0">Pais</option>
                                    {Object.keys(discountCountries).map(
                                        (i) => (
                                            <option
                                                value={
                                                    discountCountries[i]
                                                        .value
                                                }
                                                key={1 + i}
                                            >
                                                {discountCountries[i].label}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <input
                                    name="percent"
                                    placeholder="Porcentaje"
                                    type="number"
                                    min="0"
                                    maxLength="3"
                                    max="100"
                                    onChange={(e) => handleDiscountPrice(e)}
                                    ref={percent}
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    disabled
                                    name="price"
                                    placeholder="Monto"
                                    type="number"
                                    min="0"
                                    onChange={(e) => handleDiscountPrice(e)}
                                    ref={priceDiscount}
                                />
                            </div>
                        </div>
                        <div className="row mt-3 mb-3">
                            <div className="col-md-4">
                                <label>Inicio descuento</label>
                                <br />
                                <input
                                    name="discount_starts"
                                    ref={discountStart}
                                    placeholder="Inicio descuento"
                                    type="date"
                                    onChange={(e) => handleDiscountDatesPrice(e)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label>Fin descuento (opcional)</label>
                                <br />
                                <input
                                    name="discount_ends"
                                    ref={discountEnds}
                                    placeholder="Fin descuento"
                                    type="date"
                                    onChange={(e) => handleDiscountDatesPrice(e)}
                                />
                            </div>
                            <div className="col-md-4">
                                <button
                                    type="button"
                                    className="text-button"
                                    onClick={(e) =>
                                        handleSaveDiscountPrice(e)
                                    }
                                >
                                    Guardar descuento
                                </button>
                            </div>
                        </div>

                        {discount.length === 0 ? (
                            <p>Seleccione un país</p>
                        ) : (
                            Object.keys(discount).map((i) => {
                                return (
                                    <div className="row" key={i}>
                                        <div className="col-md-10 discount-row">
                                            <p>
                                                {discount[i].country === "AR" && (
                                                    <>
                                                        {" "}
                                                        <img
                                                            src={arg}
                                                            alt="AR"
                                                            width="20"
                                                        />{" "}
                                                        ARS - Descuento{" "}
                                                        {discount[i].percent +
                                                            "%"}{" "}
                                                        - ARS{" "}
                                                        {discount[i].price}{" "}
                                                        - Inicio{" "}
                                                        {
                                                            discount[i].discount_starts
                                                        }{" "}
                                                        - Fin{" "}
                                                        {
                                                            discount[i].discount_ends
                                                        }
                                                    </>
                                                )}
                                                {discount[i].country === "ES" && (
                                                    <>
                                                        {" "}
                                                        <img
                                                            src={spa}
                                                            alt="ES"
                                                            width="20"
                                                        />{" "}
                                                        EUR - Descuento{" "}
                                                        {discount[i]
                                                            .percent +
                                                            "%"}{" "}
                                                        - EUR{" "}
                                                        {discount[i].price}{" "}
                                                        - Inicio{" "}
                                                        {
                                                            discount[i]
                                                                .discount_starts
                                                        }{" "}
                                                        - Fin{" "}
                                                        {
                                                            discount[i]
                                                                .discount_ends
                                                        }
                                                    </>
                                                )}
                                                {discount[i].country === "CO" && (
                                                    <>
                                                        {" "}
                                                        <img
                                                            src={col}
                                                            alt="CO"
                                                            width="20"
                                                        />{" "}
                                                        COL - Descuento{" "}
                                                        {discount[i]
                                                            .percent +
                                                            "%"}{" "}
                                                        - COL{" "}
                                                        {discount[i].price}{" "}
                                                        - Inicio{" "}
                                                        {
                                                            discount[i]
                                                                .discount_starts
                                                        }{" "}
                                                        - Fin{" "}
                                                        {
                                                            discount[i]
                                                                .discount_ends
                                                        }
                                                    </>
                                                )}
                                                {discount[i].country === "MX" && (
                                                    <>
                                                        {" "}
                                                        <img
                                                            src={mex}
                                                            alt="MX"
                                                            width="20"
                                                        />{" "}
                                                        MXN - Descuento{" "}
                                                        {discount[i]
                                                            .percent +
                                                            "%"}{" "}
                                                        - MXN{" "}
                                                        {discount[i].price}{" "}
                                                        - Inicio{" "}
                                                        {
                                                            discount[i]
                                                                .discount_starts
                                                        }{" "}
                                                        - Fin{" "}
                                                        {
                                                            discount[i].discount_ends === undefined ? "Sin definir" : discount[i].discount_ends
                                                        }
                                                    </>
                                                )}
                                                {discount[i].country === "US" && (
                                                    <>
                                                        {" "}
                                                        <img
                                                            src={usa}
                                                            alt="US"
                                                            width="20"
                                                        />{" "}
                                                        USD - Descuento{" "}
                                                        {discount[i]
                                                            .percent +
                                                            "%"}{" "}
                                                        - USD{" "}
                                                        {discount[i].price}{" "}
                                                        - Inicio{" "}
                                                        {
                                                            discount[i]
                                                                .discount_starts
                                                        }{" "}
                                                        - Fin{" "}
                                                        {
                                                            discount[i].discount_ends === undefined ? "Sin definir" : discount[i].discount_ends
                                                        }
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        <div className="col-md-3"></div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="pl-5 pt-4">
                        <button
                            type="button"
                            className="submitCourseButton"
                            value="true"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Publicar curso
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="row align-items-center fix-buttons-add-save">
                    <div className="col-md-6">
                        <Link to="/courses">
                            <button className="text-button">
                                Salir y cancelar
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <button
                            className="saveCourseButton"
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                            value="false"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </div>

                <div className="insideTableSection p-3">
                    {mode === "edit" && (
                        <label htmlFor="categoryCurrent">
                            Actual: {categoryLabel}
                        </label>
                    )}
                    <label htmlFor="category">
                        Selecciona una categoría
                    </label>
                    <p
                        className={
                            hasError("category")
                                ? "error-message__visible"
                                : "error-message"
                        }
                    >
                        Debes seleccionar una categoría.
                    </p>
                    <Select
                        placeholder="Seleccione una categoría"
                        name="category"
                        options={categoriesOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleInputChangeCategory}
                    />
                </div>

                <div className="insideTableSection p-3 mt-3">
                    <h4 className="gold-H4">Imágen destacada</h4>
                    <p
                        className={
                            hasError("featured_image")
                                ? "error-message__visible"
                                : "error-message"
                        }
                    >
                        Debes seleccionar una imágen.
                    </p>
                    <label htmlFor="load_featured_image">
                        +Cargar Imágen / Cambiar imágen
                    </label>
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
                                width: "280px",
                                border: "1px dashed black",
                            }}
                            onClick={() => imageUploader.current.click()}
                        >
                            <img
                                ref={uploadedImage}
                                alt="Foto del Curso"
                                src={
                                    featured_image ||
                                    Photo280x
                                }
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="insideTableSection p-3 mt-3">
                    <label htmlFor="modules">Cantidad de modulos</label>
                    <input
                        disabled
                        type="text"
                        name="modules"
                        value={total_modules}
                        onChange={handleInputTotalModules}
                    />
                </div>

                <div className="insideTableSection p-3 mt-3">
                    <label htmlFor="total_duration">
                        Duración del curso
                    </label>
                    <input
                        placeholder="Días/Hs"
                        type="text"
                        name="total_duration"
                        value={total_duration}
                        onChange={handleInputTotalDuration}
                    />
                </div>

                <div className="insideTableSection p-3 mt-3">
                    {mode === "edit" && (
                        <label htmlFor="teacherCurrent">
                            Actual: {teacherLabel}
                        </label>
                    )}
                    <label htmlFor="category">Seleccionar profesor</label>
                    <p
                        className={
                            hasError("teacher")
                                ? "error-message__visible"
                                : "error-message"
                        }
                    >
                        Debes seleccionar un profesor.
                    </p>
                    <Select
                        name="courses"
                        placeholder="Escribe un nombre"
                        options={teachersOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleInputChangeTeacher}
                    />
                </div>
            </div>
        </div>
        <Modal
            show={modalPriceAlert}
            onHide={() => setModalPriceAlert(false)}
            centered={true}
            title="Alerta"
            message="Debes completar todos los campos para agregar un precio"
        />
        <Modal
            show={modalDiscountAlert}
            onHide={() => setModalDiscountAlert(false)}
            centered={true}
            title="Alerta"
            message="Debes completar todos los campos para agregar un descuento"
        />
        <Modal
            show={modalPublishShow}
            onHide={() => setModalPublishShow(false)}
            centered={true}
            title="Curso Publicado"
            message="Ha sido publicado un curso exitosamente"
        />
        <Modal
            show={modalSaveShow}
            onHide={() => setModalSaveShow(false)}
            centered={true}
            title="Curso Guardado"
            message="Se ha guardado el curso como borrador"
        />
        <Modal
            show={modalSaving}
            onHide={() => setSaving(false)}
            centered={true}
            title="Espere..."
            message="Se está guardando el curso"
        />
        <Modal
            show={modalValidatePublish}
            onHide={() => setModalValidatePublish(false)}
            centered={true}
            title="Alerta"
            message="Para poder publicar debes completar todos los campos obligatoriamente"
        />
        <Modal
            show={modalWaiting}
            onHide={() => setModalWaiting(false)}
            centered={true}
            title="Espere..."
            message="Espere mientras se carga el formulario..."
        />
    </form>
);
};
export default AddCourseForm;
