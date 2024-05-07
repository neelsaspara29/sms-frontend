import React, { useState } from "react";
import Cm_header from "./Cm_header";
import search_icon from "../../Assets/Images/search_icon.png";

import manager from "../../Assets/Images/manager.png";
import Table from "react-bootstrap/Table";
import user_img from "../../Assets/Images/user_img.png";
import table_menu from "../../Assets/Images/table_menu.png";
import delete_icon from "../../Assets/Images/delete_icon.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../Store/Reducers/User/getAllUsersList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ApiDelete, ApiPost } from "../../Helpers/Api/ApiData";
import { Button, Modal } from "react-bootstrap";
import { Troubleshoot } from "@mui/icons-material";
import { toast } from "react-toastify";

const initialState = { firstName: "", email: "", password: "" };

const AdminList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [pageCount, setCountPage] = useState(1);
  const [inputData, setInputData] = useState(initialState);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleInput = (e) => {
    const tempInput = { ...inputData };
    tempInput[e.target.name] = e.target.value;
    setInputData(tempInput);
  };

  const get_all_admin = () => {
    const body = {
      page: page,
      limit: limit,
      search: search,
    };
    ApiPost("/admin/get/all", body).then((response) => {
      console.log(response?.data, "---> admin data");
      setData(response?.data?.data?.admin_data);
      setPage(response?.data?.data?.state?.page);
      setCountPage(response?.data?.data?.state?.page_limit);
      setLimit(response?.data?.data?.state?.limit);
    });
  };

  const handleAdminCreate = (e) => {
    e.preventDefault();
    ApiPost("/signup", { ...inputData })
      .then((response) => {
        console.log(response, "---> neel response");
        get_all_admin();
        setInputData(initialState);
        setShow(false);
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const handleDeleteAdmin = (id) => {
    ApiDelete(`/user/delete/${id}`)
      .then((response) => {
        get_all_admin();
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    get_all_admin();
  }, [limit, page]);

  useEffect(() => {
    get_all_admin();
  }, [search]);

  useEffect(() => {
    get_all_admin();
  }, []);

  // console.log(users);

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
                  <li>
                    <NavLink onClick={() => setShow(true)}>
                      <img src={manager} />
                      Add Admin
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
                      <th>Email</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((admin) => (
                      <>
                        <div className="commn_spach"></div>

                        <tr key={admin._id}>
                          <td>{admin?.firstName}</td>
                          {/* <td>{user.firstName}</td> */}
                          <td>{admin?.email}</td>
                          <td>
                            <span
                              className="delete_icon"
                              onClick={() => {
                                handleDeleteAdmin(admin?._id);
                              }}
                            >
                              <img src={delete_icon} alt="icon" />
                            </span>
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

      <Modal
        show={show}
        className="sibling_popup sf_exam_list_popup pay_popup"
        onHide={() => setShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add_sibling_wrap">
            <div className="add_sibling_block">
              <div className="Canteen_popup_block pay_popup_block">
                <p>Name</p>
                <div className="add_sibling_search">
                  <label>
                    <input
                      type="text"
                      placeholder="Name"
                      name="firstName"
                      onChange={handleInput}
                      value={inputData.firstName}
                    />
                  </label>
                </div>
                <p className="mt-2">Email</p>
                <div className="add_sibling_search">
                  <label>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={handleInput}
                      value={inputData.email}
                    />
                  </label>
                </div>
                <p className="mt-2">Password</p>
                <div className="add_sibling_search">
                  <label>
                    <input
                      type="text"
                      placeholder="Password"
                      name="password"
                      value={inputData.password}
                      onChange={handleInput}
                    />
                  </label>
                </div>
              </div>

              <div
                className="add_sibling_btn text-white"
                onClick={handleAdminCreate}
              >
                <a>Submit</a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AdminList;
