import React from "react";
import Moment from "moment";
import RowCourses from "./Data/RowCourses";
import Table from "react-bootstrap/Table";

const TableCourses = ({data}) => {

  return (
    <div className="col-md-12">
      <div className="row insideTableSection">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Profesor</th>
              <th>Categoria</th>
              <th>Fecha de Creacion</th>
              <th>Estado</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(data).map((index) => {

              Moment.locale("en");
              return (
                <tr key={index}>
                  <RowCourses
                    id={data[index].course_id}
                    name={data[index].name}
                    teacher={data[index].teacher ? data[index].teacher : "Sin Profesor"}
                    category={data[index].category ? data[index].category : "Sin Categoría"}
                    creation_date={Moment(data[index].createdAt).format(
                      "DD/MM/YY"
                    )}
                    status={data[index].status}
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

export default TableCourses;
