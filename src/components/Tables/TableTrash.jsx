import React from "react";
import RowTrash from "./Data/RowTrash";
import Moment from "moment";
import Table from "react-bootstrap/Table";

const TableTrash = ({data}) => {

  return (
    <div className="col-md-12">
      <div className="row insideTableSection">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Fecha de Creacion</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(data).map((index) => {
              return (
                <tr key={index}>
                  <RowTrash
                    id={data[index].entity_id}
                    name={data[index].name}
                    type={data[index].type}
                    creation_date={Moment(data[index].createdAt).format(
                      "DD/MM/YY"
                    )}
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

export default TableTrash;
