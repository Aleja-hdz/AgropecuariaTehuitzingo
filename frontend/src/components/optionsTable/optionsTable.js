import './optionTable.css';
import { SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';

export default function OptionsTable() {
    return (
        <div className="options-table">
            <button><SquarePen /></button>
            <button><Trash2 /></button>
        </div>
    );
}