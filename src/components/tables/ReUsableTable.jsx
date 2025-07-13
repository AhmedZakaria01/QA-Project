import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
} from "react-table";
import "../tables/Table.css";

const DefaultColumnFilter = ({ column: { filterValue, setFilter, id } }) => (
  <input
    value={filterValue || ""}
    onChange={(e) => setFilter(e.target.value || undefined)}
    placeholder={`Search ${id.toLowerCase()}...`}
    className="filter-input"
  />
);

DefaultColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.any,
    setFilter: PropTypes.func,
    id: PropTypes.string,
  }),
};

const GlobalFilter = ({ value, onChange }) => (
  <div className="global-filter-container">
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search all columns..."
      className="global-filter-input"
    />
  </div>
);

GlobalFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    if (resolvedRef.current) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [resolvedRef, indeterminate]);

  return <input type="checkbox" ref={resolvedRef} {...rest} />;
});
Checkbox.displayName = "Checkbox";

Checkbox.propTypes = {
  indeterminate: PropTypes.bool,
};

const HeaderCheckbox = ({ getToggleAllRowsSelectedProps }) => (
  <div>
    <Checkbox {...getToggleAllRowsSelectedProps()} />
  </div>
);

HeaderCheckbox.propTypes = {
  getToggleAllRowsSelectedProps: PropTypes.func,
};

const RowCheckbox = ({ row }) => (
  <div>
    <Checkbox {...row.getToggleRowSelectedProps()} />
  </div>
);

RowCheckbox.propTypes = {
  row: PropTypes.shape({
    getToggleRowSelectedProps: PropTypes.func,
  }),
};

const ColumnControls = ({ allColumns, hiddenColumns, setHiddenColumns }) => {
  const nonSelectionColumns = allColumns.filter(col => col.id !== "selection");
  const nonSelectionIds = nonSelectionColumns.map(col => col.id);

  const allHidden = nonSelectionIds.length > 0 &&
    nonSelectionIds.every(id => hiddenColumns.includes(id));

  const someHidden = !allHidden &&
    nonSelectionIds.some(id => hiddenColumns.includes(id));

  const toggleAllColumns = () => {
    if (allHidden) {
      setHiddenColumns([]);
    } else {
      setHiddenColumns(nonSelectionIds);
    }
  };

  const toggleColumn = (columnId) => {
    setHiddenColumns(prev =>
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  return (
    <div className="column-controls-dropdown">
      <div className="column-controls-header">
        <h4>Column Visibility</h4>
        <label className="select-all-toggle">
          <input
            type="checkbox"
            ref={input => {
              if (input) input.indeterminate = someHidden;
            }}
            checked={!allHidden}
            onChange={toggleAllColumns}
          />
          Select All
        </label>
      </div>
      <div className="column-list">
        {nonSelectionColumns.map(column => (
          <div key={column.id} className="column-item">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={!hiddenColumns.includes(column.id)}
                onChange={() => toggleColumn(column.id)}
              />
              <span className="checkmark"></span>
              {column.render("Header")}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

ColumnControls.propTypes = {
  allColumns: PropTypes.array,
  hiddenColumns: PropTypes.array,
  setHiddenColumns: PropTypes.func,
};

const PaginationControls = ({
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  setPageSize,
  pageSize,
  pageSizeOptions,
}) => (
  <div className="pagination-container">
    <div className="pagination-buttons">
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>{"<"}</button>
      <button onClick={() => nextPage()} disabled={!canNextPage}>{">"}</button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>
    </div>
    <span className="page-indicator">
      Page <strong>{pageIndex + 1}</strong> of <strong>{pageOptions.length}</strong>
    </span>
    <span>Go to page:</span>
    <input
      type="number"
      defaultValue={pageIndex + 1}
      onChange={(e) => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0;
        gotoPage(page);
      }}
      min={1}
      max={pageOptions.length}
    />
    <select
      className="page-size-select"
      value={pageSize}
      onChange={(e) => setPageSize(Number(e.target.value))}
    >
      {pageSizeOptions.map((size) => (
        <option key={size} value={size}>Show {size}</option>
      ))}
    </select>
  </div>
);

PaginationControls.propTypes = {
  gotoPage: PropTypes.func,
  canPreviousPage: PropTypes.bool,
  previousPage: PropTypes.func,
  nextPage: PropTypes.func,
  canNextPage: PropTypes.bool,
  pageCount: PropTypes.number,
  pageIndex: PropTypes.number,
  pageOptions: PropTypes.array,
  setPageSize: PropTypes.func,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.array,
};

const ReUsableTable = ({
  columns: userColumns,
  data,
  title = "Data Table",
  initialState = {},
  onRowClick,
  showGlobalFilter = true,
  showColumnControls = true,
  showSelectedPreview = false,
  pageSizeOptions = [5, 10, 20, 30, 50],
  defaultPageSize = 10,
  className = "",
  isLoading = false,
}) => {
  const columns = useMemo(() => [
    {
      id: "selection",
      Header: HeaderCheckbox,
      Cell: RowCheckbox,
      disableSortBy: true,
      width: 50,
    },
    ...userColumns,
  ], [userColumns]);

  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [showColumnVisibility, setShowColumnVisibility] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    allColumns,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        ...initialState,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const selectedRows = useMemo(() => selectedFlatRows.map((row) => row.original), [selectedFlatRows]);

  useEffect(() => {
    if (initialState.hiddenColumns) {
      setHiddenColumns(initialState.hiddenColumns);
    }
  }, [initialState.hiddenColumns]);

  useEffect(() => {
    allColumns.forEach((column) => {
      if (column.id !== "selection") {
        const shouldBeHidden = hiddenColumns.includes(column.id);
        if (column.isVisible === shouldBeHidden) {
          column.toggleHidden(shouldBeHidden);
        }
      }
    });
  }, [hiddenColumns, allColumns]);

  return (
    <div className={`user-management-table ${className}`}>
      <div className="table-header">
        <h2 className="table-title">{title}</h2>
      </div>

      {/* Table Controls */}
      <div className="table-controls">
        {showGlobalFilter && <GlobalFilter value={globalFilter} onChange={setGlobalFilter} />}
        
        {showColumnControls && (
          <div className="column-controls-container">
            <button 
              className="column-toggle-button"
              onClick={() => setShowColumnVisibility(!showColumnVisibility)}
            >
              {showColumnVisibility ? "Hide Columns" : "Show Columns"}
            </button>
            {showColumnVisibility && (
              <ColumnControls
                allColumns={allColumns}
                hiddenColumns={hiddenColumns}
                setHiddenColumns={setHiddenColumns}
              />
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <React.Fragment key={headerGroup.id}>
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => {
                    const props = column.getHeaderProps(column.getSortByToggleProps());
                    return (
                      <th key={column.id} {...props}>
                        <div className="header-content">
                          {column.render("Header")}
                        </div>
                      </th>
                    );
                  })}
                </tr>
                <tr className="filter-row">
                  {headerGroup.headers.map(column => (
                    <th key={`${column.id}-filter`}>
                      {column.canFilter && column.render("Filter")}
                    </th>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {isLoading ? (
              <tr><td colSpan={columns.length} className="loading-state">Loading...</td></tr>
            ) : page.length === 0 ? (
              <tr><td colSpan={columns.length} className="empty-state">No data available</td></tr>
            ) : (
              page.map(row => {
                prepareRow(row);
                return (
                  <tr
                    key={row.id || row.index}
                    {...row.getRowProps()}
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {row.cells.map(cell => (
                      <td key={cell.column.id} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <PaginationControls
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        setPageSize={setPageSize}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
};

ReUsableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  initialState: PropTypes.object,
  onRowClick: PropTypes.func,
  showGlobalFilter: PropTypes.bool,
  showColumnControls: PropTypes.bool,
  showSelectedPreview: PropTypes.bool,
  pageSizeOptions: PropTypes.array,
  defaultPageSize: PropTypes.number,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default ReUsableTable;