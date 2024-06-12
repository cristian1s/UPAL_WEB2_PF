import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import ProductoModal from "./productoModal";

const Producto = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const [operation, setOperation] = useState('Agregar');
    const [data, setData] = useState([])
    
    const [modelProduct, setModelProduct] = useState({
        id: 0,
        nombre: '',
        caracteristicas: '',
        precio: '',
        stock: '',
        nombreSubcategoria: '',
        subcategoriaId: '',
        marcaId: '',
        nombreMarca: '',
        estado: ''
    })
    
    useEffect(() => {
        getAllProducts();
    }, []);
    
    const toggleModal = () => {
        setModelProduct({
            id: 0,
            nombre: '',
            caracteristicas: '',
            precio: '',
            stock: '',
            nombreSubcategoria: '',
            subcategoriaId: '',
            marcaId: '',
            nombreMarca: '',
            estado: ''
        })
        setModalOpen(!modalOpen);
        setOperation("Agregar")
        getAllMarcas()
        getAllSubCategories();
    };
    
    const getAllProducts = async () => {
        const response = await fetch("api/producto/listar");
        if (response.ok) {
            const data_r = await response.json();
            setData(data_r);
        } else {
            console.log("status code : " + response.status);
        }
    }

    const getById = async (id) => {
        const response = await fetch("api/producto/Buscar/" + id);
        if (response.ok) {
            const data_s = await response.json();
            setModelProduct(data_s);
        } else {
            console.log("status code : " + response.status);
        }
    }

    const deleteProducto = async (id) => {
        if (window.confirm("Estas seguro que deseas eliminar el Producto?")) {
            const response = await fetch("api/producto/Delete/" + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                alert("Producto eliminado correctamente!")
                getAllProducts();
            } else {
                console.log("status code : " + response.status);
            }
        }
    }

    const guardarProducto = async (Producto) => {
        const response = await fetch("/api/producto/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(Producto)
        })

        if (response.ok) {
            setModalOpen(!modalOpen);
            window.location.href = "/productos";
            getAllProducts();
        }

    }
    //funcion de control para cambiar la operacion a visualizar , obtener los datos y mostrar el modal
    //esta funcion es para visualizar datos de un Producto de acuerdo al ID
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
        getAllMarcas()
        getAllSubCategories();
    }
    //funcion de control eliminar el Producto de acuerdo al ID
    const onClickDelete = (id) => {
        deleteProducto(id);
    }

    //variable para las columna de la tabla , name=encabezado, selector = campo que ira en esa fila , sortable = si se podra ordenar o no
    const columns = [
        {
            name: "Nombre",
            selector: (row) => row.nombre,
            sortable: true,
        },
        {
            name: "Stock",
            selector: (row) => row.stock,
            sortable: true,
        }, 
        {
            name: "Precio",
            selector: (row) => row.precio,
            sortable: true,
        },
        {
            name: "SubCategoria",
            selector: (row) => row.nombreSubcategoria,
            sortable: true,
        },
        {
            name: "Marca",
            selector: (row) => row.nombreMarca,
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
                    <button onClick={() => onClickEye(row.id)} className="btn btn-action btn-default" style={{ marginRight: "5px" }}><i className='bx bx-low-vision' ></i></button>
                    <button onClick={() => onClickModify(row.id)} className="btn btn-action btn-primary" style={{ marginRight: "5px" }}><i className='bx bxs-edit-alt'></i></button>
                    <button onClick={() => onClickDelete(row.id)} className="btn btn-action btn-danger"><i className='bx bxs-trash-alt' ></i></button>
                </>
            ),
        },
    ];
    const [subcategorias, setSubCategorias] = useState([])
    const [marcas, setMarcas] = useState([])

    //subcategoria select
    const getAllSubCategories = async () => {
        const response = await fetch("api/producto/subcategorias");
        if (response.ok) {
            const data_r = await response.json();
            setSubCategorias(data_r);
        } else {
            console.log("status code : " + response.status);
        }
    }
    //marca select
    const getAllMarcas = async () => {
        const response = await fetch("api/producto/marcas");
        if (response.ok) {
            const data_r = await response.json();
            setMarcas(data_r);
        } else {
            console.log("status code : " + response.status);
        }
    }

    return (
        <>
            <ProductoModal isOpen={modalOpen} toggle={toggleModal} guardarProducto={guardarProducto} ProductoSeleccionado={modelProduct}
                operation={operation} subcategorias={subcategorias} marcas={marcas}></ProductoModal>
            <Table
                data={data}
                columns={columns}
                title="Productos"
                icon='bx bx-laptop'
                campoSearch={"nombre"}
                onClickAgregar={toggleModal}
            ></Table>
        </>
    );
};
export default Producto;
