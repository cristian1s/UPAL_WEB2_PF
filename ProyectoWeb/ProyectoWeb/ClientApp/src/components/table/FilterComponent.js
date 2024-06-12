import React from "react";
import InputP from '../Input/Input'
const FilterComponent = ({ campo,filterText, onFilter, onClear }) => (
    <div className="content-filter">
        <InputP
        id="search"
        type="text"
        text={`Buscar por ${campo}`}
        value={filterText}
        onChange={onFilter}
        />
        <button className="btn btn-search btn-secondary" onClick={onClear}><i className='bx bxs-eraser' ></i></button>
    </div>
);

export default FilterComponent;
