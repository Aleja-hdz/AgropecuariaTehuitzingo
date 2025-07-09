import ButtonLong from '../../components/buttonLong/buttonLong';
import './changeTypeUser.css';

export default function ChangeTypeUser() {
    return (
        <div className='changeTU-body'>
            <div className='changeTU-container'>
                <h1>Cambio de tipo de usuario</h1>
                <p>Da clic en el botón para enviar la soliciud de cambio.</p>
                <ButtonLong text='Cambiar tipo de usuario' />
                <p>NOTA: Actualmente tu usuario esta relacionado a una cuenta de tipo usuario común. Para poder cambiar esto es necesario que la solicitud sea revisada por el adminsitrador de la página. Una vez revisado tu perfil, los cambios se reflejarán de manera automática.</p>
            </div>
        </div>
    );
}