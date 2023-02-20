// import { getCardActionAreaUtilityClass } from "@mui/material";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const tableHead = [
//   {
//     id: "id",
//     disablePadding: false,
//     label: "Id",
//   },
//   {
//     id: "name",
//     disablePadding: false,
//     label: "Name",
//   },
//   {
//     id: "phonenumber",
//     disablePadding: false,
//     label: "Phone Number",
//   },
//   {
//     id: "address",
//     disablePadding: false,
//     label: "Address",
//   },
//   {
//     id: "opentime",
//     disablePadding: false,
//     label: "Opentime",
//   },
//   {
//     id: "closetime",
//     disablePadding: false,
//     label: "Closetime",
//   },
//   {
//     id: "flag",
//     disablePadding: false,
//     label: "Status",
//   },
// ];
// const RestoList = () => {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");
//   const keyOrder = [
//     "id",
//     "name",
//     "phonenumber",
//     "address",
//     "opentime",
//     "closetime",
//     "flag",
//   ];

//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [order, setOrder] = useState("desc");
//   const [orderBy, setOrderBy] = useState("");
//   const [records, setRecords] = useState([]);
//   const [totalRecords, setTotalRecord] = useState(0);
//   const [selected, setSelected] = useState([]);

//   return (
//     <>
//       <div className="page-wrapper">
//         <section>
//           <div className="container">
//             <div className="">
//               <div className="">
//                 <h2>Restaurants</h2>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default RestoList;

// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
// import {  Button } from "@mui/material";
// import "./UserList.css";
// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "name", headerName: "First name", width: 130 },
//   { field: "username", headerName: "Last name", width: 130 },
//   { field: "email", headerName: "Email", width: 130 },
//   { field: "address", headerName: "Address", width: 130 },
//   { field: "website", headerName: "Website", width: 130 },
//   {
//     field: "actions",
//     flex: 0.3,
//     headerName: "Actions",
//     minWidth: 150,
//     type: "number",
//     sortable: false,
//     renderCell: (params) => {
//       return (
//         <React.Fragment>
//           {/* <Link to={`/admin/menu/${params.getValue(params.id, "id")}`}> */}
//           <EditRoundedIcon />
//           {/* </Link> */}

//           <Button
//             onClick={
//               () => console.log("button clicked")
//               // deleteProductHandler(params.getValue(params.id, "id"))
//             }
//           >
//             <DeleteRoundedIcon />
//           </Button>
//         </React.Fragment>
//       );
//     },
//   },
// ];

// export default function DataTable() {
//   const rows = [];
//   const [restoData, setRestoData] = React.useState([]);

//   React.useEffect(() => {
//     const fetchtasks = async () => {
//       const res = await fetch("http://localhost:3000/restoData");
//       const data = await res.json();
//       console.log(res, "data");
//       setRestoData(data);
//     };
//     console.log(fetchtasks());
//   }, []);
//   console.log(restoData);

//   restoData &&
//     restoData.forEach((item) => {
//       rows.push({
//         id: item.id,
//         name: item.name,
//         username: item.username,
//         email: item.email,
//         address: item.address.city,
//         website: item.website,
//       });
//     });
//   return (
//   <div width="100%" style={{margin:"5% 15%"}}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//         className="User_Data_Table"
//         autoHeight
//       />
//     </div>
//   );
// }

import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Delete, Edit } from "@mui/icons-material";
// import "./UserList.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import {
  Alert,
  Button,
  // Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
  ToggleButton,
} from "@mui/material";
import Dialogbox from "../../Pages/DialogBox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import restoService from "../../services/resto.service";

const rows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const udata = JSON.parse(localStorage.getItem("user"));
console.log("udata", udata);
const headCells = [
  {
    id: "id",
    disablePadding: false,
    label: "Id",
  },
  {
    id: "name",
    disablePadding: false,
    label: "Name",
  },
  {
    id: "phonenumber",
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "address",
    disablePadding: false,
    label: "Address",
  },
  {
    id: "opentime",
    disablePadding: false,
    label: "Opentime",
  },
  {
    id: "closetime",
    disablePadding: false,
    label: "Closetime",
  },
  // udata?.roles.includes("ROLE_ADMIN")
  //   ? {
  //       id: "flag",
  //       disablePadding: false,
  //       label: "Status",
  //     }
  //   : null,
  // {},
  udata?.roles.includes("ROLE_ADMIN") && {
    id: "flag",
    disablePadding: false,
    label: "Status",
  },

  {
    id: "Action",
    disablePadding: true,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    // onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="table-cell">
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell?.numeric ? "right" : "left"}
            padding={headCell?.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell?.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell?.id}
              direction={orderBy === headCell?.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell?.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  //   numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //   onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const rows = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [restoData, setRestoData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();
  const [snackbarFlag, setSnackbarFlag] = React.useState(false);
  const [snackbarErrorFlag, setSnackbarErrorFlag] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const authUser = useSelector((state) => state.user.userObj);
  const [checked, setChecked] = React.useState(false);

  const udata = JSON.parse(localStorage.getItem("data"));

  console.log("Local", udata.roles.includes("ROLE_ADMIN"));
  const fetchtasks = async () => {
    // const res = await axios.get("http://localhost:8080/data/show");
    restoService.getAllRestoData().then((response) => {
      console.log("get resto", response);
      const data = response.data;

      console.log("data", response.data);
      setRestoData(data);
    });
  };
  restoData &&
    restoData.forEach((item) => {
      rows.push({
        id: item.id,
        name: item.name,
        phonenumber: item.phonenumber,
        address: item.address,
        opentime: item.opentime,
        closetime: item.closetime,
        flag: item.flag,
        filename: item.filename,
      });
    });

  const changeStatus = (id) => {
    restoService
      .changeRestoStatus(id)
      .then((response) => console.log("status change", response))
      .catch((error) => console.log("error in status change"));
  };
  React.useEffect(() => {
    fetchtasks();
  }, [checked]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  //   const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const deleteResto = (row) => {
    // console.log("delete data", row);
    setOpen(true);
    setDeleteId(row.id);
  };

  const editResto = (row) => {
    // console.log("edit data", row.id);
    navigate("/viewResto", { state: row });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // axios
    //   .delete(`http://localhost:8080/data/delete/${deleteId}`)
    restoService
      .deleteUserData(deleteId)
      .then((response) => {
        console.log("Data deleted successfully");
        fetchtasks();
        setOpen(false);
        // setSnackbarFlag(true);
        Swal.fire("Data deleted successfully!", "", "success");
      })
      .catch((error) => {
        console.log(error);
        // setSnackbarErrorFlag(true);
        Swal.fire("Something went wrong!!", "", "error");
      });
  };

  const handleCancle = () => {
    setOpen(false);
  };

  const onCloseSnackbar = () => {
    setSnackbarFlag(false);
    setSnackbarErrorFlag(false);
  };

  React.useEffect(() => {
    // axios
    //   .get(`http://localhost:8080/data/search?resto=${searchText}`)
    restoService
      .search(searchText)
      .then((response) => {
        console.log("Response in search ", response.data);
        setRestoData([...response.data]);
      })
      .catch((error) => console.log("Error", error));
  }, [searchText]);
  // console.log("restodata", restoData);
  // restoData.map((item) => console.log("flag value", item.flag));

  return (
    <>
      <Dialogbox
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        handleCancle={handleCancle}
      />
      <Snackbar
        open={snackbarFlag}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        style={{ width: "30%" }}
        onClose={onCloseSnackbar}
      >
        <Alert
          onClose={onCloseSnackbar}
          variant="success"
          sx={{ width: "100%" }}
        >
          Record deleted successfully!!
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackbarErrorFlag}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        style={{ width: "30%", backgroundColor: "red", fontWeight: 200 }}
        onClose={onCloseSnackbar}
      >
        <Alert onClose={onCloseSnackbar} variant="Error" sx={{ width: "100%" }}>
          Something went wrong!!
        </Alert>
      </Snackbar>

      <div className="table-wrapper main-card">
        <div className="container">
          <div className="heading-line">
            <label
              className="label-heading"
              onClick={(e) => navigate("/restoList")}
            >
              Restaurant
            </label>
            <div className="search-add-div">
              <div className="search-bar">
                <TextField
                  fullWidth
                  placeholder="Search on name, address, phone number"
                  onChange={(event) => {
                    setSearchText(event.target.value);
                  }}
                  className="search-text"
                />
              </div>
              {/* {udata.roles.includes("ROLE_ADMIN") ? ( */}
              <div className="btn-grp ">
                {/* <button className="dold-btn">Download</button> */}
                <button
                  className="add-btn"
                  onClick={(event) => navigate("/addResto")}
                >
                  Add Restaurant
                </button>
              </div>
              {/* // ) : null} */}
            </div>
          </div>
          {/* <div className="search-bar">
            <TextField
              fullWidth
              placeholder="Search on name, address, phone number"
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
              className="search-text"
            />
          </div> */}

          {/* <Box sx={{ width: "100%" }} className="main-table"> */}
          <Paper sx={{ width: "100%", mb: 2 }}>
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      // const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => {
                            handleClick(event, row.name);
                          }}
                          role="checkbox"
                          // aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          // selected={isItemSelected}
                        >
                          {/* <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                // checked={isItemSelected}
                                inputProps={{
                                "aria-labelledby": labelId,
                                }}
                            />
                            </TableCell> */}
                          <TableCell align="left">{row.id}</TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.phonenumber}</TableCell>
                          <TableCell align="left">{row.address}</TableCell>
                          <TableCell align="left">{row.opentime}</TableCell>
                          <TableCell align="left">{row.closetime}</TableCell>
                          {udata.roles.includes("ROLE_ADMIN") ? (
                            <TableCell align="left">
                              <ToggleButton
                                className={
                                  row.flag
                                    ? "toggle_status_btn_true"
                                    : "toggle_status_btn_false"
                                }
                                onClick={() => {
                                  changeStatus(row.id);
                                  setChecked(true);
                                }}
                              >
                                {row.flag ? "Active" : "Deactive"}
                              </ToggleButton>
                            </TableCell>
                          ) : null}
                          <TableCell align="left">
                            <Tooltip
                              title={
                                <Typography fontFamily={20} n>
                                  <span>View</span>
                                </Typography>
                              }
                            >
                              <VisibilityIcon
                                onClick={(event) => {
                                  editResto(row);
                                  console.log("row data", row);
                                }}
                                style={{ cursor: "pointer", color: "blue" }}
                              />
                            </Tooltip>
                          </TableCell>
                          {udata?.roles.includes("ROLE_ADMIN") ? (
                            <TableCell align="right">
                              <Tooltip
                                title={
                                  <Typography fontFamily={20} n>
                                    <span>Delete</span>
                                  </Typography>
                                }
                              >
                                <Delete
                                  onClick={(event) => deleteResto(row)}
                                  style={{ cursor: "pointer", color: "red" }}
                                />
                              </Tooltip>
                            </TableCell>
                          ) : null}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
      {/* </Box> */}
    </>
  );
}
