import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import InputP from '../../components/Input/Input';
import Select from '../../components/select/Select';
import Button from '../../components/button/Button';

//model Usuaer
const modelUser = {
    id: 0,
    clienteNombre: '',
    productoNombre: '',
    preciounitario: '',
    cantidad: 1,
    clienteId: 0,
    productoId: 0,
    total: '',
    fechaVenta: ''
};
//los atributos estan viniendo desde user.js cuando se llama al componente
const VentaModal = ({ isOpen, toggle, guardarVenta, ventaSeleccionado, operation, productos, clientes }) => {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState(modelUser);
    //useEfect para renderizar el componente nuevamente en caso cambie el ventaSeleccionado y asignar a la variable los nuevos datos
    useEffect(() => {
        setFormData(ventaSeleccionado || modelUser)
    }, [ventaSeleccionado])
    //funcion para el control de los imputs y selects
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (name === "productoId") { 
            document.getElementById('cantidad').value = 1;
            document.getElementById('cantidad').removeAttribute("readonly");

            const selectedOption = e.target.options[e.target.selectedIndex];
            const precioUnitario = selectedOption.getAttribute("data-ref");
            const maxStock = selectedOption.getAttribute("data-max");

            document.getElementById('cantidad').max = maxStock;
            document.getElementById('cantidad').min = 1;
            
            document.getElementById('preciounitario').value = precioUnitario;

            setFormData((prevData) => ({
                ...prevData,
                cantidad:1,
                total: 0,
                preciounitario: precioUnitario,
            }));
            document.getElementById('total').value = 0;
        }

        if (name === "cantidad") {
            const cantidad = parseInt(e.target.value);
            const cantidadInput = document.getElementById('cantidad');
            const max = parseInt(cantidadInput.getAttribute("max"))
            console.log(cantidad)
            console.log(max)
            if (cantidad > max) {
                alert("¡La cantidad no puede ser mayor que " + max + "!");
                cantidadInput.value = max;
                setFormData((prevData) => ({
                    ...prevData,
                    cantidad: max,
                }));
            }
            if (cantidad < 0) {
                alert("¡La cantidad no puede ser menor que " + 1 + "!");
                cantidadInput.value = 1;
                setFormData((prevData) => ({
                    ...prevData,
                    cantidad: 1,
                }));
            }
            let total = document.getElementById('preciounitario').value * cantidadInput.value;

            setFormData((prevData) => ({
                ...prevData,
                total: total,
            }));
            document.getElementById('total').value = total.toFixed(2);
            console.log(formData)
        }
    };
    //funcion para cuando se hace submit en el formulario aqui llama a la funcion guardar venta que le pasamos desde User.js
    const handleSubmit = (e) => {
        guardarVenta(formData);
    };
    //si la operacion es Visualizar se mostrara el modal con solo la tabla de todos los datos
    if (operation === "Visualizar") {
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{operation} Venta</ModalHeader>
                {/* Formulario para agregar */}
                <Form>
                    <ModalBody>
                        <div className="row">
                            <div className="col-sm-12">
                                <table className="table">
                                    <tr>
                                        <td>Cliente:</td>
                                        <td>{ventaSeleccionado.clienteNombre}</td>
                                    </tr>
                                    <tr>
                                        <td>Total:</td>
                                        <td>S/. {ventaSeleccionado.total}</td>
                                    </tr>
                                    <tr>
                                        <td>Fecha Venta:</td>
                                        <td>{ventaSeleccionado.fechaVenta}</td>
                                    </tr>
                                    <tr>
                                        <td>Producto(s):</td>
                                        <td>
                                            <table className="table table-bordered" style={{ fontSize: "11px", marginTop:"10px" }}>
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>P. U.</th>
                                                        <th>Cantidad</th>
                                                        <th>Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{ventaSeleccionado.productoNombre}</td>
                                                        <td>{ventaSeleccionado.preciounitario}</td>
                                                        <td>{ventaSeleccionado.cantidad}</td>
                                                        <td>{ventaSeleccionado.subtotal}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
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
                <ModalHeader toggle={toggle}>{operation} Venta</ModalHeader>
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
                            <Select text="Cliente" id="clienteId" name="clienteId" error="Ingrese el Cliente" options={clientes}
                                onChange={handleChange} selected={ventaSeleccionado.clienteId}></Select>
                        </FormGroup>
                        <FormGroup>
                            <Select text="Producto" id="productoId" name="productoId" error="Ingrese el Producto"
                                options={productos}
                                onChange={handleChange} selected={ventaSeleccionado.productoId}></Select>
                        </FormGroup>

                        <FormGroup>
                            <InputP
                                type="number"
                                text="Precio Unitario"
                                id="preciounitario"
                                name="preciounitario"
                                errror=""
                                value={formData.preciounitario}
                                onChange={handleChange}
                                readonly
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            <InputP
                                type="number"
                                text="Cantidad"
                                id="cantidad"
                                name="cantidad"
                                errror="Ingrese la cantidad"
                                value={formData.cantidad}
                                onChange={handleChange}
                                readonly
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            <InputP
                                type="number"
                                text="Total"
                                id="total"
                                name="total"
                                errror=""
                                value={formData.total}
                                onChange={handleChange}
                                readonly
                            ></InputP>
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

export default VentaModal;
