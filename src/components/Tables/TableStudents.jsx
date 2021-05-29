import React from "react";
import Table from "react-bootstrap/Table";
import RowStudents from "./Data/RowStudents";
import Moment from "moment";

const TableStudents = ({data}) => {

  return (
    <div className="col-md-12">
      <div className="row insideTableSection">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>País</th>
              <th>E-mail</th>
              <th>Fecha de Registro</th>  
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((index) => {
              return (
                <RowStudents
                  key={index}
                  id={data[index]._id}
                  name={data[index].name}
                  country={data[index].country}
                  email={data[index].email}
                  signup_date={Moment(data[index].createdAt).format("DD/MM/YY")}
                />
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableStudents;
