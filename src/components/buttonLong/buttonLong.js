import './buttonLong.css';

export default function ButtonLong({text, onClick}) {
    return (
        <button className="btn-long animate-button-long" onClick={onClick}>{text}</button>
    );
}  