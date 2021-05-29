import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import api from "../../services/routes";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Loader from "react-loader-spinner";
import DropdownButton from "react-bootstrap/DropdownButton";
import Sidebar from "../Template/Sidebar";
import Button from "../Utils/Button";
import Navbar from "../Template/Navbar";
import TableTeachers from "../Tables/TableTeachers";

const Teachers = (props) => {
    const [params, SetParams] = useState({
        page: 1,
        limit: 10,
        field: "createdAt",
        order: 1,
    });

    const [data, SetData] = useState([]);
    const [paginationData, SetPaginationData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const [search, setSearch] = useState();
    const [searchResults, setSearchResults] = useState([]);

    const handleAll = () => {
        SetParams({ ...params, field: "createdAt", order: 1 });
    };

    const handleOrder1 = () => {
        SetParams({ ...params, field: "full_name", order: 1 });
    };

    const handleOrder2 = () => {
        SetParams({ ...params, field: "full_name", order: -1 });
    };

    useEffect(() => {
        api.getAllTeachers(params)
            .then((res) => {
                SetData(res.data.data);
                SetPaginationData(res.data.pagination);
                setIsLoaded(false);
            })
            .catch((err) => {
                setIsLoaded(false);
            });
    }, [params]);

    const firstPage = () => {
        SetParams({ ...params, page: 1 });
    };

    const nextPage = () => {
        SetParams({ ...params, page: paginationData.nextPage });
    };

    const previousPage = () => {
        SetParams({ ...params, page: paginationData.prevPage });
    };

    const lastPage = () => {
        SetParams({ ...params, page: paginationData.totalPages });
    };

    let disabledPrev = paginationData.hasPrevPage ? false : true;
    let disabledNext = paginationData.hasNextPage ? false : true;

    const handleInputSearch = (input) => {
        setSearch(input);
    };

    useEffect(() => {
        const results = data.filter((term) =>
            term.full_name.toLowerCase().includes(search)
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
                <Navbar search={handleInputSearch} type="profesores" display={true} />

                <div className="row d-flex section_title align-items-center mt-2">
                    <div className="col-md-3">
                        <h1>Profesores</h1>
                    </div>
                    <div className="col-md-3">
                        <Link to="/teachers/add">
                            <Button
                                text={"Añadir nuevo"}
                                position={"btn__primary--course__admin"}
                            />
                        </Link>
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
                        <p>No hay ningún profesor aún. Intenta añadir uno.</p>
                    </div>
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
                        <TableTeachers data={searchResults} />
                    </>
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
                ) : (
                    <>
                        <div className="col-md-12 d-flex mt-3 mb-3">
                            <div className="row filters">
                                <button
                                    className="allButton"
                                    onClick={handleAll}
                                >
                                    Todos
                                </button>
                                <DropdownButton
                                    className="filterButton"
                                    title="Orden Alfabetico"
                                    key="right"
                                    drop="down"
                                    size="sm"
                                >
                                    <Dropdown.Item
                                        eventKey="1"
                                        value="1"
                                        onSelect={handleOrder1}
                                    >
                                        A-Z
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="2"
                                        value="2"
                                        onSelect={handleOrder2}
                                    >
                                        Z-A
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>
                        <TableTeachers data={data} />

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

export default Teachers;
