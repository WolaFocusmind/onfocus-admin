import React from "react";
import RowTeachers from "./Data/RowTeachers";
import Table from "react-bootstrap/Table";

const TableTeachers = ({data}) => {

  return ( 
    <div className="col-md-12">
      <div className="row insideTableSection">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Curso dictados</th>
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
              return (
                <tr key={index}>
                  <RowTeachers
                    id_hash={data[index].id_hash}
                    id={data[index].id}
                    full_name={data[index].full_name}
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

export default TableTeachers;
