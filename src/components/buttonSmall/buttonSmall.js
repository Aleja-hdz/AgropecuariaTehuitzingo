import './buttonSmall.css';

export default function ButtonSmall({text, onClick, type}){
    return (
            <button type={type} onClick={onClick} className="btn-small animate-button-small" >{text}</button>
    );
}