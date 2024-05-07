import React, { useState } from "react";

import Cm_header from "./Cm_header";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Table from "react-bootstrap/Table";

import table_menu from "../../Assets/Images/table_menu.png";

import right_arrow from "../../Assets/Images/right_arrow.png";
import search_icon from "../../Assets/Images/search_icon.png";

import filter from "../../Assets/Images/filter.png";
import expert from "../../Assets/Images/expert.png";
import manager from "../../Assets/Images/manager.png";

import user_img from "../../Assets/Images/user_img.png";

import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feesPendingUsers } from "../../Store/Reducers/Fees/pendingFeesUserList";
import FeesStructure from "./FeesStructure";
import PaidFees from "./PaidFees";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const Pending = () => {
  const dispatch = useDispatch();
  const pendingListData = useSelector(
    (state) => state.feesPending.pendingUsers,
  );
  console.log("pendingListData", pendingListData);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [page_count, setPageCount] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(
      feesPendingUsers({
        page: page,
        limit: limit,
        userTypeFilter: "user",
        search: search,
        pendingFeesFilter: true,
      }),
    );
  }, [search, page, limit]);

  useEffect(() => {
    setPage(pendingListData?.data?.state?.page);
    setLimit(pendingListData?.data?.state?.limit);
    setPageCount(pendingListData?.data?.state?.page_limit);
  }, [pendingListData]);

  return (
    <div className="main_content">
      <Cm_header />
      <div className="student_wrapper">
        <div className="student_wrap">
          <div className="student_tab_block">
            <Tabs defaultActiveKey="Pending" id="uncontrolled-tab-example">
              <Tab eventKey="Pending" title="Pending">
                <div className="standard_wrap">
                  <div className="student_wrap">
                    <div className="student_block">
                      <div className="student_sec">
                        <div className="student_search">
                          <label>
                            <img src={search_icon} alt="search" />
                            <input
                              type="text"
                              placeholder="Search..."
                              onChange={(e) => {
                                setSearch(e.target.value);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="student_filters">
                        <ul>
                          <li>
                            <a href="#0">Pending fees Notification</a>
                          </li>
                          <li>
                            <a href="#0">
                              <img src={filter} />
                              Filters
                            </a>
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
                              <th>User Name</th>
                              <th>Roll no</th>
                              <th>Std</th>
                              <th>Class</th>
                              <th>Pending Fees</th>
                              <th>Offline Fees</th>
                            </tr>
                          </thead>
                          {pendingListData?.data?.user_data.map((pending) => (
                            <tbody>
                              <div className="commn_spach"></div>
                              <tr>
                                <td>
                                  <img
                                    className="user_img"
                                    src={user_img}
                                    alt="user"
                                  />
                                  {pending.firstName} {pending.lastName}
                                </td>
                                <td>{pending.firstName}</td>
                                <td>{pending.rollNo}</td>
                                <td>{pending.standard.name}</td>
                                <td>{pending.class}</td>
                                <td>{pending.pendingFees}</td>
                                {/* <td>{pending.pendingFees}</td> */}
                                <td>
                                  <div className="faculty_label">
                                    <input
                                      type="text"
                                      placeholder="Enter percentage..."
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </Table>
                        {/* <div className="fees_select">
                          <select name="selectedFruit">
                            <option value="1">500$</option>
                            <option value="2">600$</option>
                            <option value="3">700$</option>
                            <option value="4">800$</option>
                            <option value="5">900$</option>
                          </select>
                        </div> */}
                        <div className="student_pagination">
                          <div className="pagination_block">
                            <Stack sx={{ mt: "2rem", ml: "27rem" }} spacing={2}>
                              <div class="d-flex justify-content-between pt-10 align-items-center">
                                <div className="my-2">
                                  <Pagination
                                    color="standard"
                                    count={page_count}
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
                              </div>
                            </Stack>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="Paid" title="Paid">
                <PaidFees />
              </Tab>
              <Tab eventKey="Fees Structure" title="Fees Structure">
                <FeesStructure />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pending;
