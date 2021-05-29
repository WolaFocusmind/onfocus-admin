import React from "react";
import Moment from "moment";
import RowCategories from "./Data/RowCategories";
import Table from "react-bootstrap/Table";

const TableCategories = ({data}) => {
  return (
    <div className="col-md-12">
      <div className="row insideTableSection">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de Creación</th>
              <th>Estado</th>
              <th>Cursos</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(data).map((index) => {
              let coursesArray = [];

              if (
                Array.isArray(data[index].courses) &&
                data[index].courses.length
              ) {
                Object.keys(data[index].courses).map((i) => {
                  return coursesArray.push(data[index].courses[i].name);
                });
              }
              Moment.locale("en");
              return (
                <tr key={index}>
                  <RowCategories
                    id_hash={data[index].id_hash}
                    id={data[index].id}
                    name={data[index].name}
                    creation_date={Moment(data[index].createdAt).format(
                      "DD/MM/YY"
                    )}
                    status={data[index].status}
                    coursesAssigned={coursesArray}
                    coursesArray={data[index].courses}
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

export default TableCategories;
