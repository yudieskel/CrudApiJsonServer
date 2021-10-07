import React from "react";

//Pasar como parámetro el .map del archivo CrudTable, que a su vez lo trajo en data del archivo CrudApp y también 2 métodos 
const CrudTableRowApi = ({e, setDataToEdit, deleteData}) => {
    //vamos a dessestructurar e para facilitar la escritura
    let { name, constellation, id } = e; 
    return(
        <>
        <tr>
            <td>{name}</td>
            <td>{constellation}</td>
            <td>
                <button onClick= {() => setDataToEdit(e)}>Editar</button>
                <button onClick= {() => deleteData(id)}>Eliminar</button>
            </td>
        </tr>
        </>
    )
};

export default CrudTableRowApi