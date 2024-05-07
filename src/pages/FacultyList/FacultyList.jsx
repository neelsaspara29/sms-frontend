import React from "react";

import Cm_header from "./Cm_header";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Table from "react-bootstrap/Table";

import table_menu from "../../Assets/Images/table_menu.png";

import right_arrow from "../../Assets/Images/right_arrow.png";
import search_icon from "../../Assets/Images/search_icon.png";

import filters from "../../Assets/Images/filter.png";
import expert from "../../Assets/Images/expert.png";
import manager from "../../Assets/Images/manager.png";

import user_img from "../../Assets/Images/user_img.png";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getAllFacultyUsers } from "../../Store/Reducers/Faculty/facultyList";
import { useState } from "react";

const FacultyList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const facultyList = useSelector((state) => state.facultyList);

  useEffect(() => {
    dispatch(
      getAllFacultyUsers({
        page: page,
        limit: limit,
        userTypeFilter: "faculty",
      }),
    );
  }, []);
  console.log(facultyList, "fs");

  return (
    <>
      <div className="main_content">
        <Cm_header />
        <div className="student_wrapper">
          <div className="student_wrap">
            <div className="student_tab_block">
              <Tabs defaultActiveKey="faculty" id="uncontrolled-tab-example">
                <Tab eventKey="faculty" title="faculty">
                  <div className="standard_wrap">
                    <div className="student_wrap">
                      <div className="student_block">
                        <div className="student_sec">
                          <div className="student_search">
                            <label>
                              <img src={search_icon} alt="search" />
                              <input type="text" placeholder="Search..." />
                            </label>
                          </div>
                        </div>
                        <div className="student_filters">
                          <ul>
                            <li>
                              <a href="#0">
                                <img src={expert} />
                                Export
                              </a>
                            </li>
                            <li>
                              <a href="#0">
                                <img src={filters} />
                                Filters
                              </a>
                            </li>
                            <li>
                              <a href="#0">
                                <img src={manager} />
                                Add Faculty
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
                                <th>Previous School</th>
                                <th>Experience</th>
                                <th>Salary</th>
                                <th>Increment</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <div className="commn_spach"></div>
                              <tr>
                                <td>
                                  <img
                                    className="user_img"
                                    src={user_img}
                                    alt="user"
                                  />
                                  Patel Raj Manshukhbhai
                                </td>
                                <td>ABC School</td>
                                <td>1</td>
                                <td>20,000</td>
                                <td>
                                  <div className="faculty_label">
                                    <input
                                      type="text"
                                      placeholder="Enter percentage..."
                                    />
                                    <a href="#0">Confirm</a>
                                  </div>
                                </td>
                                <td>
                                  {" "}
                                  <NavLink to="/FacultyFormpage">
                                    <img src={table_menu} alt="icon" />
                                  </NavLink>{" "}
                                </td>
                              </tr>
                              <div className="commn_spach"></div>
                              <tr>
                                <td>
                                  <img
                                    className="user_img"
                                    src={user_img}
                                    alt="user"
                                  />
                                  Patel Raj Manshukhbhai
                                </td>
                                <td>ABC School</td>
                                <td>2</td>
                                <td>18,000</td>
                                <td>
                                  <div className="faculty_label">
                                    <input
                                      type="text"
                                      placeholder="Enter percentage..."
                                    />
                                    <a href="#0">Confirm</a>
                                  </div>
                                </td>
                                <td>
                                  {" "}
                                  <NavLink to="/FacultyFormpage">
                                    <img src={table_menu} alt="icon" />
                                  </NavLink>{" "}
                                </td>
                              </tr>
                              <div className="commn_spach"></div>
                              <tr>
                                <td>
                                  <img
                                    className="user_img"
                                    src={user_img}
                                    alt="user"
                                  />
                                  Patel Raj Manshukhbhai
                                </td>
                                <td>ABC School</td>
                                <td>1</td>
                                <td>22,000</td>
                                <td>
                                  <div className="faculty_label">
                                    <input
                                      type="text"
                                      placeholder="Enter percentage..."
                                    />
                                    <a href="#0">Confirm</a>
                                  </div>
                                </td>
                                <td>
                                  {" "}
                                  <NavLink to="/FacultyFormpage">
                                    <img src={table_menu} alt="icon" />
                                  </NavLink>{" "}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <div className="student_pagination">
                            <div className="pagination_block">
                              <p>Showing 1 to 10 of 100 (10 Pages)</p>
                              <ul>
                                <li>
                                  <a href="#0">1</a>
                                </li>
                                <li>
                                  <a href="#0">2</a>
                                </li>
                                <li>
                                  <a href="#0">3</a>
                                </li>
                                <li>
                                  <a href="#0">
                                    <img src={right_arrow} alt="right icon" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Attendance" title="Attendance">
                  <div className="f_attendance_block">
                    <div className="student_wrap">
                      <div className="student_table_block">
                        <div className="student_table">
                          <div className="f_attendance_select">
                            <div className="timeteble_select">
                              <div className="profile_form profile_form2">
                                <ul>
                                  <li>
                                    <label>Select Standard</label>
                                    <select name="selectedFruit">
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                    </select>
                                  </li>
                                </ul>
                              </div>
                              <div className="profile_form profile_form2">
                                <ul>
                                  <li>
                                    <label>Select lecture</label>
                                    <select name="selectedFruit">
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                    </select>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <Table responsive="xl">
                            <thead>
                              <tr>
                                <th>Roll no</th>
                                <th>Name</th>
                                <th>Attendance</th>
                              </tr>
                            </thead>
                            <tbody>
                              <div className="commn_spach"></div>
                              <tr>
                                <td>1</td>
                                <td>Patel Raj Manshukhbhai</td>
                                <td>
                                  <div className="f_attendance_radio">
                                    <div className="enquiry_block">
                                      <p>
                                        <input
                                          type="radio"
                                          id="test1"
                                          name="radiogroup"
                                          checked
                                        />
                                        <label for="test1">Present</label>
                                      </p>
                                      <p>
                                        <input
                                          type="radio"
                                          id="test2"
                                          name="radiogroup"
                                        />
                                        <label for="test2">Absent</label>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <div className="commn_spach"></div>
                              <tr>
                                <td>2</td>
                                <td>Patel Raj Manshukhbhai</td>
                                <td>
                                  <div className="f_attendance_radio">
                                    <div className="enquiry_block">
                                      <p>
                                        <input
                                          type="radio"
                                          id="test21"
                                          name="radiogroup2"
                                          checked
                                        />
                                        <label for="test21">Present</label>
                                      </p>
                                      <p>
                                        <input
                                          type="radio"
                                          id="test22"
                                          name="radiogroup2"
                                        />
                                        <label for="test22">Absent</label>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <div className="commn_spach"></div>
                              <tr>
                                <td>3</td>
                                <td>Patel Raj Manshukhbhai</td>
                                <td>
                                  <div className="f_attendance_radio">
                                    <div className="enquiry_block">
                                      <p>
                                        <input
                                          type="radio"
                                          id="test31"
                                          name="radiogroup3"
                                        />
                                        <label for="test31">Present</label>
                                      </p>
                                      <p>
                                        <input
                                          type="radio"
                                          id="test32"
                                          name="radiogroup3"
                                          checked
                                        />
                                        <label for="test32">Absent</label>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <div className="commn_spach"></div>
                              <tr>
                                <td>4</td>
                                <td>Patel Raj Manshukhbhai</td>
                                <td>
                                  <div className="f_attendance_radio">
                                    <div className="enquiry_block">
                                      <p>
                                        <input
                                          type="radio"
                                          id="test41"
                                          name="radiogroup4"
                                        />
                                        <label for="test41">Present</label>
                                      </p>
                                      <p>
                                        <input
                                          type="radio"
                                          id="test42"
                                          name="radiogroup4"
                                          checked
                                        />
                                        <label for="test42">Absent</label>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <div className="commn_spach"></div>
                              <tr>
                                <td>5</td>
                                <td>Patel Raj Manshukhbhai</td>
                                <td>
                                  <div className="f_attendance_radio">
                                    <div className="enquiry_block">
                                      <p>
                                        <input
                                          type="radio"
                                          id="test51"
                                          name="radiogroup5"
                                          checked
                                        />
                                        <label for="test51">Present</label>
                                      </p>
                                      <p>
                                        <input
                                          type="radio"
                                          id="test52"
                                          name="radiogroup5"
                                        />
                                        <label for="test52">Absent</label>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <div className="commn_spach"></div>
                              <tr>
                                <td>6</td>
                                <td>Patel Raj Manshukhbhai</td>
                                <td>
                                  <div className="f_attendance_radio">
                                    <div className="enquiry_block">
                                      <p>
                                        <input
                                          type="radio"
                                          id="test61"
                                          name="radiogroup6"
                                          checked
                                        />
                                        <label for="test61">Present</label>
                                      </p>
                                      <p>
                                        <input
                                          type="radio"
                                          id="test62"
                                          name="radiogroup6"
                                        />
                                        <label for="test62">Absent</label>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <div className="commn_spach"></div>
                              <tr>
                                <td>7</td>
                                <td>Patel Raj Manshukhbhai</td>
                                <td>
                                  <div className="f_attendance_radio">
                                    <div className="enquiry_block">
                                      <p>
                                        <input
                                          type="radio"
                                          id="test71"
                                          name="radiogroup7"
                                        />
                                        <label for="test71">Present</label>
                                      </p>
                                      <p>
                                        <input
                                          type="radio"
                                          id="test72"
                                          name="radiogroup7"
                                          checked
                                        />
                                        <label for="test72">Absent</label>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <div className="commn_spach"></div>
                              <tr>
                                <td>8</td>
                                <td>Patel Raj Manshukhbhai</td>
                                <td>
                                  <div className="f_attendance_radio">
                                    <div className="enquiry_block">
                                      <p>
                                        <input
                                          type="radio"
                                          id="test81"
                                          name="radiogroup8"
                                        />
                                        <label for="test81">Present</label>
                                      </p>
                                      <p>
                                        <input
                                          type="radio"
                                          id="test82"
                                          name="radiogroup8"
                                          checked
                                        />
                                        <label for="test82">Absent</label>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>

                          <div className="profile_btn">
                            <div className="profile_btn_cancel">
                              <a href="#0">Cancel</a>
                            </div>
                            <div className="profile_btn_save">
                              <a href="#0">Save</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Exam" title="Exam"></Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyList;
