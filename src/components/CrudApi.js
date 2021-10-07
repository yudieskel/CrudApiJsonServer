import React, { useState, useEffect } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import CrudFormApi from './CrudFormApi';
import CrudTableApi from './CrudTableApi';
import Loader from './Loader';
import Message from './Messaage';

//Creamos nuestro componente
const CrudApi = () => {

    const [ db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url = "http://localhost:5000/santos";

    useEffect( () => {
      setLoading(true);
        
        api
            .get(url)
            .then( res => {
                if(!res.err) {
                    setDb(res);
                    setError(null)
                } else {
                    setDb(null);
                    setError(res)
                };
        
      setLoading(false);
        } );
    }, [] );

    const createData = (data) => {
        //Crear un id para que no quede null
        data.id = Date.now();
    
        let options = { body: data, 
            headers: { "content-type": "application/json" }
        };
        api
            .post( url, options)
            .then(res => {
                if(!res.err) {
                    setDb([...db, res])
                } else {
                    setError(res)
                }
            });
    };

    const updateData = (data) => {
        //Crear una variable con la url + id para poder actualizar
        let endpoint = `${url}/${data.id}`;

        let options = { body: data, 
            headers: { "content-type": "application/json" }
        };
        api
            .put( endpoint, options)
            .then(res => {
                if(!res.err) {
                    let newData = db.map(e => e.id === data.id ? data : e);
                    setDb(newData)
                } else {
                    setError(res)
                }
            });
    };  

    const deleteData = (id) => {
        let isDelete = window.confirm(`Estás seguro de querer borrar el registro ${id}?`);

        if(isDelete) { 
            //Crear una variable con la url + id para poder eliminar
            let endpoint = `${url}/${id}`;
            
            let options = { headers: { "content-type": "application/json" } };

            api
                .del(endpoint, options)
                    .then((res) => {
                        if(!res.err) {
                        let newData = db.filter(e => e.id !== id);
                        setDb(newData)
                        } else {
                        setError(res)
                        }
                });
            
         } else {
             return
         }
    };

    return(
    <>
    <div>
        <h2>CRUD API</h2>
          <article className= "grid-1-2">
            <CrudFormApi createData={createData} updateData={updateData } dataToEdit={dataToEdit} setDataToEdit={setDataToEdit}/>
            {loading && <Loader/>}
            {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>}
            {db && <CrudTableApi data={db} setDataToEdit={setDataToEdit} deleteData={deleteData}/>}
          </article>
    </div>
    </>
    )
};

export default CrudApi