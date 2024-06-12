import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";

import './style.css'


const paginationComponentOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

export default function Table({columns,data,icon,title,campoSearch, onClickAgregar}) {

  const [filterText, setFilterText] = useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = data.filter(
    (item) => JSON.stringify(item[campoSearch]).toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponent = useMemo(() => {
      const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
          }
      };

    return (
        <> 
            <div className="btn-add">
                <button className="btn btn-success" onClick={onClickAgregar}>Agregar</button>
            </div>  
            <FilterComponent
                campo={campoSearch}
                filterText={filterText}
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
            />
        </>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div>
        <div className="table-title">
            <i className={icon}></i>
            <span>{title}</span>
        </div>
        <div className="table-content">
            <DataTable
                className="table-c"
                columns={columns}
                data={filteredItems}
                defaultSortField="title"
                striped
                // selectableRows
                // expandableRows
                pagination
                paginationComponentOptions={paginationComponentOptions}
                subHeader
                subHeaderComponent={subHeaderComponent}
            />
        </div>
    </div>
  );
}
