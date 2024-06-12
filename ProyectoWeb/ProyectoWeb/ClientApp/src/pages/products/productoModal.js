import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import InputP from '../../components/Input/Input';
import Select from '../../components/select/Select';
import Button from '../../components/button/Button';

//model Usuaer
const modelUser = {
    id: 0,
    nombre: '',
    caracteristicas: '',
    precio: '',
    stock:'',
    nombreSubcategoria: '',
    subcategoriaId: '',
    marcaId: '',
    nombreMarca: '',
    estado: ''
};
//los atributos estan viniendo desde user.js cuando se llama al componente
const ProductoModal = ({ isOpen, toggle, guardarProducto, ProductoSeleccionado, operation, subcategorias,marcas }) => {

 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState(modelUser);
    //useEfect para renderizar el componente nuevamente en caso cambie el ProductoSeleccionado y asignar a la variable los nuevos datos
    useEffect(() => {
        setFormData(ProductoSeleccionado || modelUser)
    }, [ProductoSeleccionado])
    //funcion para el control de los imputs y selects
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    //funcion para cuando se hace submit en el formulario aqui llama a la funcion guardar Producto que le pasamos desde User.js
    const handleSubmit = (e) => {
        guardarProducto(formData);
    };
    //si la operacion es Visualizar se mostrara el modal con solo la tabla de todos los datos
    if (operation === "Visualizar") {
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{operation} Producto</ModalHeader>
                {/* Formulario para agregar */}
                <Form>
                    <ModalBody>
                        <div className="row">
                            <div className="col-sm-12">
                                <table className="table">
                                    <tr>
                                        <td>Nombre:</td>
                                        <td>{ProductoSeleccionado.nombre}</td>
                                    </tr>
                                    <tr>
                                        <td>Caracteristicas:</td>
                                        <td>{ProductoSeleccionado.caracteristicas}</td>
                                    </tr>
                                    <tr>
                                        <td>Precio:</td>
                                        <td>{ProductoSeleccionado.precio}</td>
                                    </tr>
                                    <tr>
                                        <td>Stock:</td>
                                        <td>{ProductoSeleccionado.stock}</td>
                                    </tr>
                                    <tr>
                                        <td>Subcategoria:</td>
                                        <td>{ProductoSeleccionado.nombreSubcategoria}</td>
                                    </tr>
                                    <tr>
                                        <td>Marca:</td>
                                        <td>{ProductoSeleccionado.nombreMarca}</td>
                                    </tr>
                                    <tr>
                                        <td>Estado:</td>
                                        <td>{ProductoSeleccionado.estado}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" text="Cancelar" stylebtn="second" onClick={toggle}></Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    } else {
        //caso contrario se renderizaran los controles del formulario
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{operation} Producto</ModalHeader>
                {/* Formulario para agregar */}
                <Form onSubmit={handleSubmit}>
                    <ModalBody>
                        {/* Input de bootstap tipo hidden para controlar el id que se parasa al controlador*/}
                        <Input
                            type="hidden"
                            name="id"
                            value={formData.id}
                        ></Input>
                        <FormGroup>
                            { /* Input de nuestros componentes los parametros son 
                                type= tipo de input (date, number,text,email,password,etc)
                                text: texto que sera el label y parte del placeholder
                                id: id del input dentro de la pagina
                                name: campo muy imporate y que tiene que ser igual al atributo de nuestro modelo para que lo reconozca
                                error: en caso de que se maneje errores es el mensaje que aparecera como error
                                value: el contenido del input en caso de que sea agregar todo se mostrara vacio pero si vienen datos se mostraran aqui
                                onChange: nuestra funcion de control para  los imputs y selects
                             */}
                            <InputP
                                type="text"
                                text="Nombre"
                                id="nombre"
                                name="nombre"
                                errror="Ingrese el Nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            <InputP
                                type="text"
                                text="Caracteristicas"
                                id="caracteristicas"
                                name="caracteristicas"
                                errror="Ingrese las Caracteristicas"
                                value={formData.caracteristicas}
                                onChange={handleChange}
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            <InputP
                                type="number"
                                text="Stock"
                                id="stock"
                                name="stock"
                                errror="Ingrese el Stock"
                                value={formData.stock}
                                onChange={handleChange}
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            <InputP
                                type="number"
                                text="Precio"
                                id="precio"
                                name="precio"
                                errror="Ingrese la precio"
                                value={formData.precio}
                                onChange={handleChange}
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            <Select text="SubCategoria" id="subcategoriaId" name="subcategoriaId" error="Ingrese la SubCategoria" options={subcategorias}
                                onChange={handleChange} selected={ProductoSeleccionado.subcategoriaId}></Select>
                        </FormGroup>
                        <FormGroup>
                            <Select text="Marca" id="marcaId" name="marcaId" error="Ingrese la Marca" options={marcas}
                                onChange={handleChange} selected={ProductoSeleccionado.marcaId}></Select>
                        </FormGroup>
                        <FormGroup>
                            <Select text="Estado" id="estado" name="estado" error="Ingrese el estado" options={[
                                {
                                    value: "INACTIVO",
                                    text: "INACTIVO"
                                },
                                {
                                    value: "ACTIVO",
                                    text: "ACTIVO"
                                }
                            ]} onChange={handleChange} selected={ProductoSeleccionado.estado}></Select>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" text="Cancelar" stylebtn="second" onClick={toggle}></Button>
                        <Button type="submit" text="Enviar" stylebtn="fill"></Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }

};

export default ProductoModal;
