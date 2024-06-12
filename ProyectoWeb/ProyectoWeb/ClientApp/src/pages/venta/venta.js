import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import VentaModal from "./ventaModal";

const Ventas = () => {
    //useState para el control del modal
    const [modalOpen, setModalOpen] = useState(false);
    //useState para el control del tipo de operacion que se hara en el modal (Agregar,Modificar,Visualizar)
    const [operation, setOperation] = useState('Agregar');
    //useState para los datos que vienen de la BD
    const [data, setData] = useState([])

    //useState para el moelo de venta que se pasara al modal , este se cambiara de acuerdo si escoje modificar 
    const [modelVenta, setModelVenta] = useState({
        id: 0,
        clienteNombre: '',
        productoNombre: '',
        preciounitario: '',
        cantidad: '',
        clienteId: 0,
        productoId: 0,
        total: '',
        fechaVenta: ''
    })

    //useEffect para cargar los ventas en data
    useEffect(() => {
        getAllVentas();
    }, []);

    //funcion que nos permite rotar entre mostrar el modal y no
    const toggleModal = () => {
        setModelVenta({
            id: 0,
            clienteNombre: '',
            productoNombre: '',
            preciounitario: '',
            cantidad: '',
            clienteId: 0,
            productoId: 0,
            total: '',
            fechaVenta: ''
        })
        setModalOpen(!modalOpen);
        setOperation("Agregar")
        getAllClientes()
        getAllProductos();
    };

    //funcion que nos permite listar todos los ventas
    const getAllVentas = async () => {
        const response = await fetch("api/ventas/listar");
        if (response.ok) {
            const data_r = await response.json();
            setData(data_r);
        } else {
            console.log("status code : " + response.status);
        }
    }
    //funcion que nos permite buscar el venta por Id
    const getById = async (id) => {
        const response = await fetch("api/ventas/Buscar/" + id);
        if (response.ok) {
            const data_s = await response.json();
            setModelVenta(data_s);
        } else {
            console.log("status code : " + response.status);
        }
    }
    //funcion que nos sirve tanto para guardar como una nueva inserccion y modificacion
    const guardarVenta = async (venta) => {
        const response = await fetch("/api/ventas/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(venta)
        })
        console.log(response);
        if (response.ok) {
            setModalOpen(!modalOpen);
            window.location.href = "/ventas";
            getAllVentas();
        }

    }
    //funcion de control para cambiar la operacion a visualizar , obtener los datos y mostrar el modal
    //esta funcion es para visualizar datos de un venta de acuerdo al ID
    const onClickEye = (id) => {
        setOperation("Visualizar")
        getById(id);
        setModalOpen(true);
    }

    //variable para las columna de la tabla , name=encabezado, selector = campo que ira en esa fila , sortable = si se podra ordenar o no
    const columns = [
        {
            name: "Cliente",
            selector: (row) => row.cliente,
            sortable: true,
        },
        {
            name: "Producto",
            selector: (row) => row.producto,
            sortable: true,
        },
        {
            name: "Precio U.",
            selector: (row) => row.precioUnitario,
            sortable: true,
        },
        {
            name: "Cantidad",
            selector: (row) => row.cantidad,
            sortable: true,
        },
        {
            name: "Total",
            selector: (row) => row.subtotal,
            sortable: true,
        },
        {
            name: "Fecha",
            selector: (row) => row.fecha,
            sortable: true,
        },
        {
            name: "Acciones",
            //llamando a las funciones de control con cada id 
            cell: (row) => (
                <>
                    <button onClick={() => onClickEye(row.id)} className="btn btn-action btn-default" style={{ marginRight: "5px" }}><i className='bx bx-low-vision' ></i></button>
                </>
            ),
        },
    ];
    const [clientes, setClientes] = useState([])
    const [productos, setProductos] = useState([])

    //subcategoria select
    const getAllClientes = async () => {
        const response = await fetch("api/ventas/clientes");
        if (response.ok) {
            const data_r = await response.json();
            setClientes(data_r);
        } else {
            console.log("status code : " + response.status);
        }
    }
    //marca select
    const getAllProductos = async () => {
        const response = await fetch("api/ventas/productos");
        if (response.ok) {
            const data_r = await response.json();
            setProductos(data_r);
        } else {
            console.log("status code : " + response.status);
        }
    }
    return (
        <>
            <VentaModal isOpen={modalOpen} toggle={toggleModal} guardarVenta={guardarVenta} ventaSeleccionado={modelVenta}
                operation={operation} clientes={clientes} productos={productos}></VentaModal>
            <Table
                data={data}
                columns={columns}
                title="Ventas"
                icon='bx bx-cart-add'
                campoSearch={"cliente"}
                onClickAgregar={toggleModal}
            ></Table>
        </>
    );
};
export default Ventas;
