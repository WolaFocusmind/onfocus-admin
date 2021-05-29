import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Loader from "react-loader-spinner";

import api from "../../services/routes";
import Sidebar from "../Template/Sidebar";
import Navbar from "../Template/Navbar";
import TableStudents from "../Tables/TableStudents";

const Students = (props) => {
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
        SetParams({ ...params, field: "name", order: 1 });
    };

    const handleOrder2 = () => {
        SetParams({ ...params, field: "name", order: -1 });
    };

    const handleOrder3 = () => {
        SetParams({ ...params, field: "createdAt", order: -1 });
    };

    const handleOrder4 = () => {
        SetParams({ ...params, field: "createdAt", order: 1 });
    };

    useEffect(() => {
        api.getAllStudents(params)
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

    const handleInputSearch = (input) => {
        setSearch(input);
    };

    useEffect(() => {
        const results = data.filter((term) =>
            term.email.toLowerCase().includes(search)
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
                <Navbar search={handleInputSearch} type="alumnos" display={true} />

                <div className="row d-flex section_title align-items-center mt-2">
                    <div className="col-md-3">
                        <h1>Alumnos</h1>
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
                        <p>No hay ningún alumno aún. Intenta registrar uno.</p>
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
                        <TableStudents data={searchResults} />
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
                                    key="1"
                                    drop="right"
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
                                <DropdownButton
                                    className="filterButton"
                                    title="Fecha de Registro"
                                    key="2"
                                    drop="right"
                                    size="sm"
                                >
                                    <Dropdown.Item
                                        eventKey="1"
                                        value="1"
                                        onSelect={handleOrder3}
                                    >
                                        Más reciente
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="2"
                                        value="2"
                                        onSelect={handleOrder4}
                                    >
                                        Más antiguo
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>
                        <TableStudents data={data} />

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

export default Students;
