import './optionTable.css';
import { SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';

export default function OptionsTable({ onDelete, onEdit }) {
    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onEdit) onEdit();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDelete) onDelete();
    };

    return (
        <div className="options-table">
            <button name='edit' onClick={handleEdit}><SquarePen size={21}/></button>
            <button name='delete' onClick={handleDelete}><Trash2 size={21}/></button>
        </div>
    );
}