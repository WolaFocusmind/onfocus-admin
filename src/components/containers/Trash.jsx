import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import api from "../../services/routes";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Loader from "react-loader-spinner";
import Sidebar from "../Template/Sidebar";
import Navbar from "../Template/Navbar";
import TableTrash from "../Tables/TableTrash";

const Trash = (props) => {
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
        SetParams({ ...params, field: "createdAt", order: 1, queryField: undefined, queryValue: undefined, });
    };

    const handleFilter = (eventKey) => {
        SetParams({
            ...params,
            page: 1,
            limit: 10,
            queryField: "type",
            queryValue: eventKey,
        });
    };

    useEffect(() => {
        api.getTrash(params)
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
                <Navbar search={handleInputSearch} type="en papelera" display={true} />

                <div className="row d-flex section_title align-items-center mt-2">
                    <div className="col-md-3">
                        <h1>Papelera</h1>
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
                        <p>Papelera vacía.</p>
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
                        <TableTrash data={searchResults} />
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
                                    title="Tipo"
                                    key="1"
                                    drop="right"
                                    size="sm"
                                >
                                    <Dropdown.Item
                                        eventKey="0"
                                        value="0"
                                        onSelect={handleFilter}
                                    >
                                        Cursos
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="2"
                                        value="2"
                                        onSelect={handleFilter}
                                    >
                                        Categorías
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="1"
                                        value="1"
                                        onSelect={handleFilter}
                                    >
                                        Profesores
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>

                        <TableTrash data={data} />
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

export default Trash;
