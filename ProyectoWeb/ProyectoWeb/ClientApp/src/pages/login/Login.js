import { useState } from 'react';
import './style.css'
const Login = () => {
    const [errorMessage, setErrorMessage] = useState(false)
    const [error,setError] = useState('')
    const buscarUsuario = async (username, password) => {
        if (!username || !password) {
            return false;
        }
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ username: username, password:password})
        })
        console.log(response);
        if (response.ok) {
            if (response.status !== 200) {
                return { s: false ,e:"Credenciales incorrectas"};    
            } else {
                const d = await response.json();
                return {s:true,data:d}
            }
        } else {
            return { s: false,e:"Error al hacer la solicitud, intenten en un momento"};
        }

    }
    const handleSubmit =async (event) => {
        event.preventDefault();
        const { username, password } = document.forms[0];
        const isLogged = await buscarUsuario(username.value, password.value)
        if (isLogged.s) {
            const session = { isAuthenticated: true };
            const user = { user: isLogged.data.nombre + ' ' + isLogged.data.apellido }
            // Guarda en localStorage
            localStorage.setItem('session', JSON.stringify(session));
            localStorage.setItem('usuario', JSON.stringify(user));
            setErrorMessage(false)
            window.location.href = "/dashboard";
        } else {
            setError(isLogged.e)
            setErrorMessage(true)
        }
    }
    return (
        <div className="content-login">
            <div className="content-l">
                <div className="form-login">
                    <span className="title">Log in</span>
                    <span className="detail">Ingrese sus datos de inicio de sesion </span>
                    {errorMessage ? <div className="alert alert-danger" style={{ padding: '5px', marginBottom: '10px', fontSize: '0.65rem' }}>
                        <strong>{ error}</strong></div> : ''}
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label>Username </label>
                            <input type="text" name="username" required />
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            <input type="password" name="password" required />
                        </div>
                        <div className="button-container">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    <span className="forget">Forget password?</span>
                    <hr></hr>
                    <div className="other">
                        <i className='bx bxl-google-plus-circle'></i>
                        <i className='bx bxl-github'></i>
                        <i className='bx bxl-linkedin-square' ></i>
                    </div>
                </div>
                <div className="c-ri">
                    <img src="https://img.freepik.com/vector-gratis/programa-recompensas-estrategia-mercadeo-promocion-minorista_335657-3094.jpg?w=740&t=st=1702247920~exp=1702248520~hmac=e808a3461fdd369a3e9d293c19d586686dbbae2b87bb7ffd8f4c404f1c111ee7" alt="Img user" />
                </div>
            </div>
        </div>
    )
}
export default Login;