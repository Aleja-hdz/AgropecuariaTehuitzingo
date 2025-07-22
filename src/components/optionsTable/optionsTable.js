import './optionTable.css';
import { SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';

export default function OptionsTable({ onDelete, offerId, onEdit }) {
    return (
        <div className="options-table">
            <button name='edit' onClick={onEdit}><SquarePen size={21}/></button>
            <button name='delete' onClick={() => onDelete(offerId)}><Trash2 size={21}/></button>
        </div>
    );
}