import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import api from "../../services/routes";
import TableEvents from "../Tables/TableEvents";

const Event = (props) => {
    const [data, SetData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        api.getEvents()
            .then((res) => {
                SetData(res.data.data);
                setIsLoaded(false);
            })
            .catch((err) => {
                setIsLoaded(false);
            });
    }, []);

    return (
        <div className="col-md-12">

                <div className="row d-flex section_title align-items-center mt-2">
                    <div className="col-md-12">
                        <h1>Digital Mind Live! | FreePass</h1>
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
                        <p>No hay ningún registrado aún.</p>
                    </div>                
                ) : (
                    <>
                        <TableEvents data={data} />

                    </>
                )}
        </div>
    );
};

export default Event;
