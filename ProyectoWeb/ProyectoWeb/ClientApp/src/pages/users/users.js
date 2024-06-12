import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import UserModal from "./userModal"

const Users = () => {
    //navigate para navegar en rutas
    //useState para el control del modal
    const [modalOpen, setModalOpen] = useState(false);
    //useState para el control del tipo de operacion que se hara en el modal (Agregar,Modificar,Visualizar)
    const [operation, setOperation] = useState('Agregar');
    //useState para los datos que vienen de la BD
    const [data, setData] = useState([])

    //useState para el moelo de Usuario que se pasara al modal , este se cambiara de acuerdo si escoje modificar 
    const [modelUser, setModelUser] = useState({
        id: 0,
        nombre: '',
        apellido: '',
        correo: '',
        username: '',
        password: '',
        estado: ''
    })

    //useEffect para cargar los Usuarios en data
    useEffect(() => {
        getAllUsers();
    }, []);

    //funcion que nos permite rotar entre mostrar el modal y no
    const toggleModal = () => {
        setModelUser({
                id: 0,
                nombre: '',
                apellido: '',
                correo: '',
                username: '',
                password: '',
                estado:''
        })
        setModalOpen(!modalOpen);
        setOperation("Agregar")
    };

    //funcion que nos permite listar todos los usuarios
    const getAllUsers = async () => {
        const response = await fetch("api/user/listar");
        if (response.ok) {
            const data_r = await response.json();
            setData(data_r);
        } else {
            console.log("status code : " + response.status);
        }
    }
    //funcion que nos permite buscar el usuario por Id
    const getById = async (id) => {
        const response = await fetch("api/user/Buscar/"+id);
        if (response.ok) {
            const data_s = await response.json();
            setModelUser(data_s);
        } else {
            console.log("status code : " + response.status);
        }
    }
    //funcion que nos permite borrar el usuario
    const deleteUsuario = async (id) => {
        if (window.confirm("Estas seguro que deseas eliminar el Usuario?")) {
            const response = await fetch("api/user/Delete/" + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                alert("Usuario eliminado correctamente!")
                getAllUsers();
            } else {
                console.log("status code : " + response.status);
            }
        }
    }
    //funcion que nos sirve tanto para guardar como una nueva inserccion y modificacion
    const guardarUsuario = async (usuario) => {
        const response = await fetch("/api/user/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(usuario)
        })

        if (response.ok) {
            setModalOpen(!modalOpen);
            window.location.href = "/users";
            getAllUsers();
        }

    } 
    //funcion de control para cambiar la operacion a visualizar , obtener los datos y mostrar el modal
    //esta funcion es para visualizar datos de un usuario de acuerdo al ID
    const onClickEye = (id) => {
        setOperation("Visualizar")
        getById(id);
        setModalOpen(true);
    }
    //funcion de control para cambiar la operacion a Modificar , obtener los datos y mostrar el modal
    //esta funcion es para modificar los datos , traendolos antes de acuerdo al ID
    const onClickModify = (id) => {
        setOperation("Modificar")
        getById(id);
        setModalOpen(true);
    }
    //funcion de control eliminar el usuario de acuerdo al ID
    const onClickDelete = (id) => {
        deleteUsuario(id);
    }

    //variable para las columna de la tabla , name=encabezado, selector = campo que ira en esa fila , sortable = si se podra ordenar o no
    const columns = [
        {
            name: "Nombre",
            selector: (row) => row.nombre,
            sortable: true,
        },
        {
            name: "Apellido",
            selector: (row) => row.apellido,
            sortable: true,
        },
        {
            name: "Correo",
            selector: (row) => row.correo,
            sortable: true,
        }, 
        {
            name: "Estado",
            //funcion cell para devolver componentes de acuerdo al valor o logica de una fila
            cell: (row) => (
                <>
                    {
                        (row.estado === "ACTIVO") ?
                            <div className="alert alert-success" style={{ padding: '5px', marginBottom: '0px', fontSize: '0.65rem'}}> <strong>ACTIVO</strong></div>
                            :
                            <div className="alert alert-warning" style={{ padding: '5px', marginBottom: '0px', fontSize: '0.65rem' }}> <strong>INACTIVO</strong></div>
                    }
                </>
            )
        },
        {
            name: "Acciones",
            //llamando a las funciones de control con cada id 
            cell: (row) => (
                <>
                    <button onClick={() => onClickEye(row.id)} className="btn btn-action btn-default" style={{ marginRight: "5px" }}><i className='bx bx-low-vision' ></i></button>
                    <button onClick={() => onClickModify(row.id)} className="btn btn-action btn-primary" style={{ marginRight: "5px" }}><i className='bx bxs-edit-alt'></i></button>
                    <button onClick={() => onClickDelete(row.id)} className="btn btn-action btn-danger"><i className='bx bxs-trash-alt' ></i></button>
                </>
            ),
        },
    ];
    //renderizamos el componenete User con el UserModal y la tabla
    /*parametros para User Modal
        isOpen=la variable de control que creamos al incio y que cambia segun las funciones
        toggle=funcion que cambia el estado del modal de abierto a cerrado y/o viceversa
        guardarUsuario=funcion de guardado para agregar y modificar
        usuarioSeleccionado= en caso de que sea agregar sera un usuario limpio , de ser modificar o visualizar nuestra variable tomara
                             los datos devueltos en las funciones de buscar por id
        operation= operacion que se hara el modal para el titulo y el tipo de renderizado que se hara
    */
   /*parametros para Table
       data= la data que se mostrara en todo el table
       columns: las columnas que se renderizaran , estas incluyen las celdas 
       title: el titulo de la tabla en general
       icon: el icono que se pintara al costado del titulo
       campoSearch: el campo por el que se podra hacer el filtro
       onClickAgregar: la funcion para el boton agregar, es la misma de mostrar modal y resetear el modelUsuario y operacion, de 
                        esta forma se manda todo limpio para una nueva inserccion
   */
    return (
        <>
            <UserModal isOpen={modalOpen} toggle={toggleModal} guardarUsuario={guardarUsuario} usuarioSeleccionado={modelUser}
                operation={operation} ></UserModal>     
            <Table
                data={data}
                columns={columns}
                title="Usuarios"
                icon='bx bx-user nav_icon'
                campoSearch={"nombre"}
                onClickAgregar={toggleModal}
            ></Table>
        </>
    );
};
export default Users;
