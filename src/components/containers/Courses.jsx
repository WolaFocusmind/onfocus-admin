import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Loader from "react-loader-spinner";
import DropdownButton from "react-bootstrap/DropdownButton";
import Pagination from "react-bootstrap/Pagination";
import api from "../../services/routes";
import Sidebar from "../Template/Sidebar";
import Button from "../Utils/Button";
import Navbar from "../Template/Navbar";
import TableCourses from "../Tables/TableCourses";

const Course = (props) => {
    const [params, SetParams] = useState({
        page: 1,
        limit: 10,
        field: "createdAt",
        order: 1,
    });

    const [data, SetData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [paginationData, SetPaginationData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const [search, setSearch] = useState();
    const [searchResults, setSearchResults] = useState([]);

    const handleAll = () => {
        SetParams({
            ...params,
            field: "createdAt",
            order: 1,
            queryField: undefined,
            queryValue: undefined,
        });
    };

    useEffect(() => {
        api.getAllCourses(params)
            .then((res) => {
                SetData(res.data.data);
                SetPaginationData(res.data.paginate);
                setIsLoaded(false);
            })
            .catch((err) => {
                setIsLoaded(false);
            });
    }, [params]);

    useEffect(() => {
        api.getAll(2)
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [params]);

    const firstPage = () => {
        SetParams({ page: 1, limit: 10 });
    };

    const nextPage = () => {
        SetParams({ page: paginationData.nextPage, limit: 10 });
    };

    const previousPage = () => {
        SetParams({ page: paginationData.prevPage, limit: 10 });
    };

    const lastPage = () => {
        SetParams({ page: paginationData.totalPages, limit: 10 });
    };

    let disabledPrev = paginationData.hasPrevPage ? false : true;
    let disabledNext = paginationData.hasNextPage ? false : true;

    const handleCategory = (eventKey) => {
        SetParams({
            ...params,
            page: 1,
            limit: 10,
            queryField: "category",
            queryValue: eventKey,
        });
    };

    const handleInputSearch = (input) => {
        setSearch(input);
    };

    useEffect(() => {
        const results = data.filter((term) =>
            term.name.toLowerCase().includes(search)
        );
        setSearchResults(results);
    }, [search, data]);

    const handleResetSearch = () => {
        setSearch();
        setSearchResults([]);
    };

    return (
        <div className="wrapper">
            <Sidebar />

            <div id="content">
                <Navbar search={handleInputSearch} type="cursos" display={true} />

                <div className="row d-flex section_title align-items-center mt-2">
                    <div className="col-md-3">
                        <h1>Listado de Cursos</h1>
                    </div>
                    <div className="col-md-3">
                        <Link to="/courses/add">
                            <Button
                                text={"Añadir nuevo"}
                                position={"btn__primary--course__admin"}
                            />
                        </Link>
                    </div>
                </div>
                <div className="col-md-12 d-flex mt-3 mb-3">
                    <div className="row filters">
                        <button className="allButton" onClick={handleAll}>
                            Todos
                        </button>
                        <DropdownButton
                            className="filterButton"
                            title="Categorías"
                            key="right"
                            drop="down"
                            size="sm"
                        >
                            <Dropdown.Item key="00" onSelect={handleAll}>
                                Todos
                            </Dropdown.Item>
                            {Object.keys(categories).map((index) => {
                                return (
                                    <Dropdown.Item
                                        eventKey={categories[index]._id}
                                        key={index}
                                        onSelect={handleCategory}
                                    >
                                        {categories[index].name}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                    </div>
                </div>
                {isLoaded ? (
                    <div>
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={80}
                            width={80}
                        />
                    </div>
                ) : data.length === 0 ? (
                    <div>
                        <p>No hay ningún curso aún. Intenta añadir uno.</p>
                    </div>                
                ) : searchResults !== undefined && search !== undefined && searchResults.length === 0 && search.length > 3 ? (
                    <>
                    <div className="col-md-12 d-flex mt-3 mb-3">
                        <div className="row filters">
                            <p>No se han encontrado resultados</p>
                        </div>
                    </div>
                        <div className="col-md-12 d-flex mt-3 mb-3">
                            <div className="row filters">
                                <button
                                    className="allButton"
                                    onClick={handleResetSearch}
                                >
                                    Reiniciar búsqueda
                                </button>
                            </div>
                        </div>
                    </>
                ) : searchResults.length >= 1 ? (
                    <>
                        <div className="col-md-12 d-flex mt-3 mb-3">
                            <div className="row filters">
                                <button
                                    className="allButton"
                                    onClick={handleResetSearch}
                                >
                                    Reiniciar búsqueda
                                </button>
                            </div>
                        </div>
                        <TableCourses data={searchResults} />
                    </>
                ) : (
                    <>
                        <TableCourses data={data} />

                        <div className="col-md-12">
                            <div className="row d-flex justify-content-center">
                                <Pagination>
                                    <Pagination.First
                                        disabled={disabledPrev}
                                        onClick={firstPage}
                                    />
                                    <Pagination.Prev
                                        disabled={disabledPrev}
                                        onClick={previousPage}
                                    />
                                    <Pagination.Item active>
                                        {paginationData.page}
                                    </Pagination.Item>
                                    <Pagination.Next
                                        disabled={disabledNext}
                                        onClick={nextPage}
                                    />
                                    <Pagination.Last
                                        disabled={disabledNext}
                                        onClick={lastPage}
                                    />
                                </Pagination>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Course;
