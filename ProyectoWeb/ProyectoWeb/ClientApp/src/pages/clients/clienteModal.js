import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import InputP from '../../components/Input/Input';
import Select from '../../components/select/Select';
import Button from '../../components/button/Button';

const modelUser = {
    id: 0,
    nombre: '',
    apellido: '',
    direccion: '',
    password: '',
    estado: ''
};
const ClienteModal = ({ isOpen, toggle, guardarCliente, ClienteSeleccionado, operation }) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState(modelUser);
    useEffect(() => {
        setFormData(ClienteSeleccionado || modelUser)
    }, [ClienteSeleccionado])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        guardarCliente(formData);
    };
    
    if (operation === "Visualizar") {
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{operation} Cliente</ModalHeader>
                {/* Formulario para agregar */}
                <Form>
                    <ModalBody>
                        <div className="row">
                            <div className="col-sm-12">
                                <table className="table">
                                    <tr>
                                        <td>Nombre:</td>
                                        <td>{ClienteSeleccionado.nombre}</td>
                                    </tr>
                                    <tr>
                                        <td>Apellidos:</td>
                                        <td>{ClienteSeleccionado.apellido}</td>
                                    </tr>
                                    <tr>
                                        <td>Correo:</td>
                                        <td>{ClienteSeleccionado.correo}</td>
                                    </tr>
                                    <tr>
                                        <td>Username:</td>
                                        <td>{ClienteSeleccionado.direccion}</td>
                                    </tr>
                                    <tr>
                                        <td>Estado:</td>
                                        <td>{ClienteSeleccionado.estado}</td>
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
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{operation} Cliente</ModalHeader>
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
                                text="Apellido"
                                id="apellido"
                                name="apellido"
                                errror="Ingrese el Apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            <InputP
                                type="email"
                                text="Correo"
                                id="correo"
                                name="correo"
                                errror="Ingrese el Correo"
                                value={formData.correo}
                                onChange={handleChange}
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            <InputP
                                type="text"
                                text="Direccion"
                                id="direccion"
                                name="direccion"
                                errror="Ingrese la Direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                            ></InputP>
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
                            ]} onChange={handleChange} selected={ClienteSeleccionado.estado}></Select>
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

export default ClienteModal;
