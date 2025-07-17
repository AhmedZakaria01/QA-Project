import { useEffect, useMemo, useState } from "react";
// import PropTypes from "prop-types";
import DATA from "../../../../Data.json";
import ReUsableTable from "../../../components/tables/ReUsableTable";
import axios from "axios";

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
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        const transformed = response.data.users.map((user) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role || "user", // fallback if role is missing
          status: user.id % 2 === 0 ? "Active" : "Inactive", // just a fake status for demo
          age: user.age,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          phone: user.phone,
          birthDate: user.birthDate,
          eyeColor: user.eyeColor,
        }));
        setUsers(transformed);
        console.log(transformed);
      } catch (err) {
        console.log("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);

  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "ID",
  //       accessor: "id",
  //     },
  //     {
  //       Header: "Name",
  //       accessor: "name",
  //     },
  //     {
  //       Header: "Email",
  //       accessor: "email",
  //     },
  //     {
  //       Header: "Role",
  //       accessor: "role",
  //     },
  //     {
  //       Header: "Status",
  //       accessor: "status",
  //       // Cell: StatusCell, // 👈 use the extracted component
  //     },
  //   ],
  //   []
  // );

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Birth Date",
        accessor: "birthDate",
      },
      {
        Header: "Eye Color",
        accessor: "eyeColor",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Status",
        accessor: "status",
        // Cell: StatusCell, // 👈 use the extracted component
      },
    ],
    []
  );
  const handleRowClick = (row) => {
    console.log("Row clicked:", row.original);
  };

  return (
    <>
      <h1 className="text-2xl text-center my-5 font-bold">Dashboard</h1>

      <ReUsableTable
        columns={columns}
        data={users}
        title="User Management"
        onRowClick={handleRowClick}
        initialState={{
          hiddenColumns: ["id"],
          sortBy: [{ id: "name", desc: false }],
        }}
        pageSizeOptions={[5, 10, 25]}
        defaultPageSize={10}
      />
    </>
  );
}

export default Dashboard;
