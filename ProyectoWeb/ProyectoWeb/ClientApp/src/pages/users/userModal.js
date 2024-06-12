import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup,Input } from 'reactstrap';
import InputP from '../../components/Input/Input';
import Select from '../../components/select/Select';
import Button from '../../components/button/Button';

//model Usuaer
const modelUser = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    username: '',
    password: '',
    estado:''
};
//los atributos estan viniendo desde user.js cuando se llama al componente
const UserModal = ({ isOpen, toggle, guardarUsuario, usuarioSeleccionado,operation }) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState(modelUser);
    //useEfect para renderizar el componente nuevamente en caso cambie el usuarioSeleccionado y asignar a la variable los nuevos datos
    useEffect(() => {
        setFormData(usuarioSeleccionado || modelUser)
    }, [usuarioSeleccionado])
    //funcion para el control de los imputs y selects
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    //funcion para cuando se hace submit en el formulario aqui llama a la funcion guardar usuario que le pasamos desde User.js
    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = 0;
        const validators = [
            {
                field: 'username',
                conditions: [{
                    name: 'match',
                    regex: /^[a-z0-9]{3,16}$/
                }]
            }
        ]

        validators.forEach(validator => {
            const valueForm = formData[validator.field];

            validator.conditions.forEach(condition => {
                if (condition.name === 'match' && valueForm.match(condition.regex) === null) {
                    console.log("no cumple")
                    errors = errors + 1;
                    setError(validator.field)
                }
            });
        })

        console.log(errors)
        if (errors === 0) {
            guardarUsuario(formData);
        }
    };
    const setError = (elemet) => {
        document.getElementById('lbl_' + elemet).classList.add("danger")
        document.getElementById(elemet).classList.add("danger")
        document.getElementById('spn_' + elemet).classList.add("active")
    }
    //si la operacion es Visualizar se mostrara el modal con solo la tabla de todos los datos
    if (operation === "Visualizar") {
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{operation} Usuario</ModalHeader>
                {/* Formulario para agregar */}
                <Form>
                    <ModalBody>
                        <div className="row">
                            <div className="col-sm-12">
                                <table className="table">
                                    <tr>
                                        <td>Nombre:</td>
                                        <td>{usuarioSeleccionado.nombre}</td>
                                    </tr>
                                    <tr>
                                        <td>Apellidos:</td>
                                        <td>{usuarioSeleccionado.apellido}</td>
                                    </tr>
                                    <tr>
                                        <td>Correo:</td>
                                        <td>{usuarioSeleccionado.correo}</td>
                                    </tr>
                                    <tr>
                                        <td>Username:</td>
                                        <td>{usuarioSeleccionado.username}</td>
                                    </tr>
                                    <tr>
                                        <td>password:</td>
                                        <td>{usuarioSeleccionado.password}</td>
                                    </tr>
                                    <tr>
                                        <td>Estado:</td>
                                        <td>{usuarioSeleccionado.estado}</td>
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
                <ModalHeader toggle={toggle}>{operation} Usuario</ModalHeader>
                {/* Formulario para agregar */}
                <Form onSubmit={handleSubmit}>
                    <ModalBody>
                        {/* Input de bootstap tipo hidden para controlar el id que se parasa al controlador*/ }
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
                                error="Ingrese el Nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            <InputP
                                type="text"
                                text="Apellido"
                                id="apellido"
                                name="apellido"
                                error="Ingrese el Apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            <InputP
                                type="email"
                                text="Correo"
                                id="correo"
                                name="correo"
                                error="Ingrese el Correo"
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            <InputP
                                type="text"
                                text="Username"
                                id="username"
                                name="username"
                                error="El username puede tener minusculas, numeros y 3 a 16 caracteres"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            <InputP
                                type="password"
                                text="Password"
                                id="password"
                                name="password"
                                error="Ingrese el Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            ></InputP>
                        </FormGroup>
                        <FormGroup>
                            { /* Select de nuestros componentes los parametros son 
                                text: texto que sera el label y parte del placeholder
                                id: id del input dentro de la pagina
                                name: campo muy imporate y que tiene que ser igual al atributo de nuestro modelo para que lo reconozca
                                error: en caso de que se maneje errores es el mensaje que aparecera como error
                                option: array de valores para que se muestren en el select como options
                                onChange: nuestra funcion de control para  los imputs y selects
                                selected: en caso venga ya algo seleccionado este parametro nos servira para mostarlo como seleccionado
                             */}
                            <Select text="Estado" id="estado" name="estado" error="Ingrese el estado" options={[
                                {
                                    value: "INACTIVO",
                                    text: "INACTIVO"
                                },
                                {
                                    value: "ACTIVO",
                                    text: "ACTIVO"
                                }
                            ]} onChange={handleChange} selected={usuarioSeleccionado.estado}></Select>
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

export default UserModal;
