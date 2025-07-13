import { useMemo } from "react";
// import PropTypes from "prop-types";
import DATA from '../../../../Data.json';
import ReUsableTable from "../../../components/tables/ReUsableTable";

// ✅ Extracted Cell component to fix ESLint warning
// const StatusCell = ({ value }) => (
//   <span className={`status ${value.toLowerCase()}`}>
//     {value}
//   </span>
// );

// StatusCell.propTypes = {
//   value: PropTypes.string.isRequired,
// };

function Dashboard() {
  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Role',
      accessor: 'role',
    },
    {
      Header: 'Status',
      accessor: 'status',
      // Cell: StatusCell, // 👈 use the extracted component
    },
  ], []);

  const handleRowClick = (row) => {
    console.log('Row clicked:', row.original);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <ReUsableTable
        columns={columns}
        data={DATA}
        title="User Management"
        onRowClick={handleRowClick}
        initialState={{
          hiddenColumns: ['id'],
          sortBy: [{ id: 'name', desc: false }],
        }}
        pageSizeOptions={[5, 10, 25]}
        defaultPageSize={10}
      />
        </>

  );
}

export default Dashboard;
