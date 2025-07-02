import './buttonLong.css';

export default function ButtonLong({text, onClick}) {
    return (
        <button className="btn-long" onClick={onClick}>{text}</button>
    );
}  