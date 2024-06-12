import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import ClienteModal from "./clienteModal";

const Clients = () => {
    //useState para el control del modal
    const [modalOpen, setModalOpen] = useState(false);
    //useState para el control del tipo de operacion que se hara en el modal (Agregar,Modificar,Visualizar)
    const [operation, setOperation] = useState('Agregar');
    //useState para los datos que vienen de la BD
    const [data, setData] = useState([])
    //useState para el moelo de Cliente que se pasara al modal , este se cambiara de acuerdo si escoje modificar 
    const [modelUser, setModelUser] = useState({
        id: 0,
        nombre: '',
        apellido: '',
        correo: '',
        direccion: '',
        estado: ''
    })

    //useEffect para cargar los Clientes en data
    useEffect(() => {
        getAllClients();
    }, []);

    //funcion que nos permite rotar entre mostrar el modal y no
    const toggleModal = () => {
        setModelUser({
            id: 0,
            nombre: '',
            apellido: '',
            correo: '',
            direccion: '',
            estado: ''
        })
        setModalOpen(!modalOpen);
        setOperation("Agregar")
    };

    //funcion que nos permite listar todos los Clientes
    const getAllClients = async () => {
        const response = await fetch("api/cliente/listar");
        if (response.ok) {
            const data_r = await response.json();
            setData(data_r);
        } else {
            console.log("status code : " + response.status);
        }
    }
    //funcion que nos permite buscar el Cliente por Id
    const getById = async (id) => {
        const response = await fetch("api/cliente/Buscar/" + id);
        if (response.ok) {
            const data_s = await response.json();
            setModelUser(data_s);
        } else {
            console.log("status code : " + response.status);
        }
    }
    //funcion que nos permite borrar el Cliente
    const deleteCliente = async (id) => {
        if (window.confirm("Estas seguro que deseas eliminar el Cliente?")) {
            const response = await fetch("api/cliente/Delete/" + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                alert("Cliente eliminado correctamente!")
                getAllClients();
            } else {
                console.log("status code : " + response.status);
            }
        }
    }
    //funcion que nos sirve tanto para guardar como una nueva inserccion y modificacion
    const guardarCliente = async (Cliente) => {
        const response = await fetch("/api/cliente/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(Cliente)
        })

        if (response.ok) {
            setModalOpen(!modalOpen);
            window.location.href = "/clientes";
            getAllClients();
        }

    }
    //funcion de control para cambiar la operacion a visualizar , obtener los datos y mostrar el modal
    //esta funcion es para visualizar datos de un Cliente de acuerdo al ID
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
    //funcion de control eliminar el Cliente de acuerdo al ID
    const onClickDelete = (id) => {
        deleteCliente(id);
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
                            <div className="alert alert-success" style={{ padding: '5px', marginBottom: '0px', fontSize: '0.65rem' }}> <strong>ACTIVO</strong></div>
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
                    <button type="button" onClick={() => onClickEye(row.id)} className="btn btn-action btn-default" style={{ marginRight: "5px" }}><i className='bx bx-low-vision' ></i></button>
                    <button type="button" onClick={() => onClickModify(row.id)} className="btn btn-action btn-primary" style={{ marginRight: "5px" }}><i className='bx bxs-edit-alt'></i></button>
                    <button type="button" onClick={() => onClickDelete(row.id)} className="btn btn-action btn-danger"><i className='bx bxs-trash-alt' ></i></button>
                </>
            ),
        },
    ];
    return (
        <>
            <ClienteModal isOpen={modalOpen} toggle={toggleModal} guardarCliente={guardarCliente} ClienteSeleccionado={modelUser}
                operation={operation} ></ClienteModal>
            <Table
                data={data}
                columns={columns}
                title="Clientes"
                icon='bx bxs-user-detail'
                campoSearch={"nombre"}
                onClickAgregar={toggleModal}
            ></Table>
        </>
    );
};
export default Clients;
