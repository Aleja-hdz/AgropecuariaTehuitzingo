import './formContactUs.css';

export default function FormContactUs() {
    return(
        <div className="container-form">
            <form>
                <div className="first-questions">
                    <div className="questions">
                        <p>Nombre</p>
                        <input type="text" name="name" required />
                    </div>
                    <div className="questions">
                        <p>Apellidos</p>
                        <input type="text" name="lastnames" required />
                    </div>
                </div>
                <p>Email</p>
                <input type="email" name="email" required />
                <p>Teléfono</p>
                <input type="tel" className="input-phone" name="phone" required />
                <p>Asunto</p>
                <input type="text" name="message" required />
            </form>
            <button className="btn" type="submit">Enviar</button>
        </div>
    );
}