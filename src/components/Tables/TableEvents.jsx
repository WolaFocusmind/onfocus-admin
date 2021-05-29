import React from "react";
import RowEvents from "./Data/RowEvents";
import Table from "react-bootstrap/Table";

const TableEvents = ({data}) => {

  return (
    <div className="col-md-12">
      <div className="row insideTableSection">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>País</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(data).map((index) => {
              return (
                <tr key={index}>
                  <RowEvents
                    id={data[index].event_id}
                    name={data[index].name}
                    country={data[index].country}
                    email={data[index].email}
                  />
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableEvents;
