import React, { useState } from "react";
import Cm_header from "./Cm_header";
import search_icon from "../../Assets/Images/search_icon.png";
import expert from "../../Assets/Images/expert.png";
import filter_img from "../../Assets/Images/filter.png";
import manager from "../../Assets/Images/manager.png";
import Table from "react-bootstrap/Table";
import user_img from "../../Assets/Images/user_img.png";
import table_menu from "../../Assets/Images/table_menu.png";
import delete_icon from "../../Assets/Images/delete_icon.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../Store/Reducers/User/getAllUsersList";
import { deleteUser } from "../../Store/Reducers/User/deleteUserById";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import AlertDialogSlide from "../../Components/Layout/Confirmdialogue";
import Modal from "react-bootstrap/Modal";
import { fetchStandards } from "../../Store/Reducers/User/getStdList";
import { fetchFilterStudents } from "../../Store/Reducers/User/getAllFilterStudents";

const Student = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [pageCount, setCountPage] = useState(1);
  const [show, setShow] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter_std_ids, setFilter_std_ids] = useState([]);
  const standard = useSelector((state) => state.standard);

  const [selectedStd, setSelectedStd] = useState([]);
  const [classList, setClassList] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
  ]);
  const [filter, setFilter] = useState({
    standardFilter: [],
    classFilter: [],
    areaFilter: "",
    cityFilter: "",
    stateFilter: "",
    countryFilter: "",
    districtFilter: "",
    zipCodeFilter: "",
  });

  const filterShow = () => setIsFilterOpen(true);
  const filterHide = () => setIsFilterOpen(false);

  const handleFilterChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    if (value == "") {
      return;
    }
    if (name == "standardFilter") {
      setFilter((old) => {
        return {
          ...old,
          standardFilter: !old[name].includes(value)
            ? [...old[name], value]
            : old[name],
        };
      });
      return;
    }
    if (name == "classFilter") {
      setFilter((old) => {
        return {
          ...old,
          classFilter: !old[name].includes(value)
            ? [...old[name], value]
            : old[name],
        };
      });
      return;
    }

    setFilter((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  const clearFilter = () => {
    setFilter({
      standardFilter: [],
      classFilter: [],
      areaFilter: "",
      cityFilter: "",
      stateFilter: "",
      countryFilter: "",
      districtFilter: "",
      zipCodeFilter: "",
    });
  };

  const selectedRenderFun = (list, fieldName) => {
    let arr = [];
    for (let i of list) {
      arr.push(
        <span className="listed_items">
          {i}{" "}
          <svg
            onClick={() => removeItem(i, fieldName)}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </span>,
      );
    }
    return arr;
  };

  const removeItem = (value, field) => {
    let temp = filter[field]?.filter((data) => data != value);

    setFilter((old) => {
      return {
        ...old,
        [field]: temp,
      };
    });
  };

  const handleApplyFilter = () => {
    let newFilter = filter;
    newFilter.page = page;
    newFilter.limit = limit;
    newFilter.userTypeFilter = "user";
    dispatch(fetchFilterStudents(newFilter)).then((data) => {
      console.log("@@@!!!", data);
      if (data?.error) {
        toast.error(data?.error?.message);
      } else {
        filterHide();
      }
    });
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(deletedId)).then((response) => {
      if (response?.payload?.status == 200) {
        toast.success("User Deleted Successfully");
        dispatch(fetchUsers({ page, limit, search }));
      } else {
        toast.error(response.error);
      }
    });
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setPage(users?.data?.state?.page);
    setCountPage(users?.data?.state?.page_limit);
    setLimit(users?.data?.state?.limit);
  }, [users]);

  useEffect(() => {
    dispatch(
      fetchUsers({ page, limit, search, userTypeFilter: "user", ...filter }),
    );
  }, [limit, page]);

  useEffect(() => {
    dispatch(
      fetchUsers({ page, limit, search, userTypeFilter: "user", ...filter }),
    );
  }, [search]);

  useEffect(() => {
    dispatch(fetchStandards());
  }, []);

  console.log(users);

  return (
    <>
      <div className="main_content">
        <Cm_header />
        <div className="student_wrapper">
          <div className="student_wrap">
            <div className="student_block">
              <div className="student_sec">
                <div className="student_search">
                  <label>
                    <img src={search_icon} alt="search" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="student_filters">
                <ul>
                  <li onClick={filterShow}>
                    <a style={{ color: "white" }}>
                      <img src={filter_img} />
                      Filters
                    </a>
                  </li>
                  <li>
                    <NavLink to="/student/student_add">
                      <img src={manager} />
                      Add Student
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="student_table_block">
              <div className="student_table">
                <Table responsive="xl">
                  <thead>
                    <tr>
                      <th>Name</th>
                      {/* <th>User Name</th> */}
                      <th>Student Id</th>
                      <th>Grade</th>
                      <th>Section</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.data?.user_data?.map((user) => (
                      <>
                        <div className="commn_spach"></div>

                        <tr key={user._id}>
                          <td>
                            <img
                              className="user_img"
                              src={user.profilePhoto || user_img}
                              alt="user"
                            />
                            {user?.firstName} {user?.lastName}{" "}
                            {user?.middleName}
                          </td>
                          {/* <td>{user.firstName}</td> */}
                          <td>{user.rollNo}</td>
                          <td>{user.standard.name}</td>
                          <td>{user.class}</td>
                          <td>
                            <span
                              className="delete_icon"
                              onClick={() => {
                                setShow(true);
                                setDeletedId(user?._id);
                              }}
                            >
                              <img src={delete_icon} alt="icon" />
                            </span>
                            <NavLink to={`/student/student_edit/${user._id}`}>
                              <img src={table_menu} alt="icon" />
                            </NavLink>
                          </td>
                        </tr>
                      </>
                    ))}
                    <div className="commn_spach"></div>
                  </tbody>
                </Table>
                <div className="student_pagination">
                  <div className="pagination_block">
                    <Stack sx={{ mt: "2rem", ml: "27rem" }} spacing={2}>
                      <div class="d-flex justify-content-between pt-10 align-items-center">
                        <div className="my-2">
                          <Pagination
                            color="standard"
                            count={pageCount}
                            page={page}
                            onChange={handlePageChange}
                          />
                        </div>
                        <div class="my-2 my-md-0">
                          <div class="d-flex align-items-center pagination-drpdown">
                            <select
                              class="form-control pagination-drpdown1 dropdownPage"
                              id="kt_datatable_search_status"
                              onChange={(e) => {
                                setLimit(parseInt(e.target.value));
                                console.log(e.target.value);
                              }}
                              value={limit}
                            >
                              <option value={10}>10</option>
                              <option value={20}>20</option>
                              <option value={30}>30</option>
                              <option value={50}>50</option>
                            </select>
                          </div>
                        </div>
                      </div>{" "}
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertDialogSlide
        show={show}
        title={"Are You Sure ,You Want To Delete This Student"}
        alertMessage={"This Will Delete Student Details From Database"}
        onAgree={() => handleDeleteUser()}
        close={() => setShow(false)}
      />
      <Modal
        show={isFilterOpen}
        className="sibling_popup"
        onHide={filterHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add_sibling_wrap">
            <div className="add_sibling_block">
              <div className="Canteen_popup_block">
                <div className="add_sibling_search filter_Std_main">
                  <label>
                    <select
                      name="standardFilter"
                      className="filter_std"
                      onChange={handleFilterChange}
                    >
                      <option value="">Select Grade</option>
                      {standard?.list?.map((std) => (
                        <option value={std?.name}>{std?.name}</option>
                      ))}
                    </select>
                    {filter?.standardFilter?.length != 0 && (
                      <div className="selected_Std">
                        {selectedRenderFun(
                          filter?.standardFilter,
                          "standardFilter",
                        )}
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="Canteen_popup_block">
                <div className="add_sibling_search filter_Std_main">
                  <label>
                    <select
                      name="classFilter"
                      className="filter_std"
                      onChange={handleFilterChange}
                    >
                      <option value="">Select Section</option>
                      {classList?.map((data) => (
                        <option value={data}>{data}</option>
                      ))}
                    </select>
                    {filter?.classFilter?.length != 0 && (
                      <div className="selected_Std">
                        {selectedRenderFun(filter?.classFilter, "classFilter")}
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="btn_align">
                <button
                  className="apply_filter_btn"
                  onClick={handleApplyFilter}
                >
                  Apply
                </button>
                <button className="apply_filter_btn" onClick={clearFilter}>
                  Clear
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Student;
