import React from 'react';

const RowEvents = ({id, name, country, email}) => {
  return(
        <>  
            <td>{name}</td>
            <td>{email}</td>
            <td>{country}</td>
        </>
  );
}

export default RowEvents;