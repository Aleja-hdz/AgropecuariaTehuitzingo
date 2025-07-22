import './buttonSmall.css';

export default function ButtonSmall({text, onClick}){
    return (
            <button type='button' onClick={onClick} className="btn-small">{text}</button>
    );
}