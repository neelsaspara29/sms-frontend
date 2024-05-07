import React, { useEffect, useState } from "react";
import Cm_header from "./Cm_header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import table_menu from "../../Assets/Images/table_menu.png";
import right_arrow from "../../Assets/Images/right_arrow.png";
import search_icon from "../../Assets/Images/search_icon.png";
import filters from "../../Assets/Images/filter.png";
import expert from "../../Assets/Images/expert.png";
import delete_icon from "../../Assets/Images/delete_icon.png";
import manager from "../../Assets/Images/manager.png";
import user_img from "../../Assets/Images/user_img.png";
import { Link, NavLink } from "react-router-dom";
import { getAllFacultyUsers } from "../../Store/Reducers/Faculty/facultyList";
import { getFacultyById } from "../../Store/Reducers/Faculty/getFacultyById";
import { deleteFaculty } from "../../Store/Reducers/Faculty/deleteFaculty";
import { useDispatch, useSelector } from "react-redux";
import { standardList } from "../../Store/Reducers/Standard/standardList";
import { getAttendenceFaculty } from "../../Store/Reducers/Faculty/getAttendanceFaculty";
import { ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { updateUser } from "../../Store/Reducers/User/editUser";
import { fetchFilterFaculty } from "../../Store/Reducers/Faculty/getAllFilterFaculty";

const createOption = (data) => ({
  label: data?.name,
  value: data?._id,
});

const createOptinForSubject = (data) => ({
  label: data?.subject,
  value: data?.subject,
});

const dayName = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

let timeOut;

const FacultyList = () => {
  //for redux
  const dispatch = useDispatch();
  const facultyList = useSelector((state) => state.facultyList.faculty);
  console.log("faculty", facultyList);
  const { attendenceFaculty } = useSelector((state) => state.attendanceFaculty);
  const { standards, loading, error } = useSelector(
    (state) => state.standardList,
  );

  //state define

  const [standardOption, setStandardOption] = useState([
    { label: "Select Standard", value: "" },
  ]);
  const [key, setKey] = useState("faculty");
  const [standard, setStandard] = useState("");
  const [standardObject, setStandardObject] = useState({});
  const [date, setDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [day, setDay] = useState();
  const [subjectOption, setSubjectOptin] = useState([
    { label: "Select Subject", value: "" },
  ]);
  const [subject, setSubject] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [pageCount, setCountPage] = useState(1);
  const [salary, setSalary] = useState();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState({
    subjectFilter: "",
  });
  const filterShow = () => setIsFilterOpen(true);
  const filterHide = () => setIsFilterOpen(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  const handleApplyFilter = () => {
    let newFilter = filter;
    newFilter.page = page;
    newFilter.limit = limit;

    dispatch(fetchFilterFaculty(newFilter)).then((data) => {
      console.log("@@@!!!", data?.meta?.arg);
      if (data?.meta?.arg?.error) {
        toast.error(data?.meta?.arg?.error?.message);
      } else {
        filterHide();
      }
    });
  };

  //for create option for standard and subject
  const createStandardOption = (subject) => {
    const newOption = createOption(subject);
    setStandardOption((prev) => [...prev, newOption]);
  };
  const createSubjectOption = (subject) => {
    const newOption = createOptinForSubject(subject);
    setSubjectOptin((prev) => [...prev, newOption]);
  };

  //functin  for perform various action

  const handleAddAttendance = () => {
    let newAttendance = { ...attendenceFaculty.attendance };
    newAttendance[subject] = attendanceData;
    ApiPost("/attendance/add", {
      _id: attendenceFaculty?._id,
      attendance: newAttendance,
    })
      .then((res) => {
        console.log("add_attendance", res);
        toast.success(res?.data?.message);
        dispatch(
          getAttendenceFaculty({
            subject: subject,
            date: date,
            standard: standard,
            classId: selectedClass,
          }),
        );
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSalaryIncrement = (idx, prevSalary, increment) => {
    let newSalary = prevSalary * (1 + increment / 100);

    let body = {
      _id: idx,
      userType: "faculty",
      salary: parseInt(newSalary),
    };

    dispatch(updateUser(body)).then((response) => {
      console.log(response);
      if (response.payload.status == 200) {
        dispatch(
          getAllFacultyUsers({ page: page, limit: limit, search: search }),
        );
        toast.success("Salary Incremented");
      } else {
        toast.error(response.message);
      }
    });
  };

  //useEffect section

  useEffect(() => {
    dispatch(
      getAllFacultyUsers({
        page: page,
        limit: limit,
        search: search,
        ...filter,
      }),
    );
  }, [page, limit]);

  useEffect(() => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      dispatch(
        getAllFacultyUsers({
          page: page,
          limit: limit,
          search: search,
          ...filter,
        }),
      );
    }, 600);
  }, [search]);

  useEffect(() => {
    setStandardOption([{ label: "Select Standard", value: "" }]);
    for (let i = 0; i < standards?.data?.standard_data.length; i++) {
      createStandardOption(standards?.data?.standard_data[i]);
    }
  }, [standards]);

  useEffect(() => {
    if (standard && selectedClass) {
      ApiPost("/timetable/get", {
        standardId: standard,
        class: selectedClass,
      })
        .then((response) => {
          setStandardObject(response?.data?.data);
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    }
  }, [standard, selectedClass]);

  useEffect(() => {
    if (subject && date && standard && selectedClass) {
      console.log("ok");
      dispatch(
        getAttendenceFaculty({
          subject: subject,
          date: date,
          standard: standard,
          classId: selectedClass,
        }),
      );
    } else {
      setAttendanceData([]);
    }
  }, [subject, standard, date, selectedClass]);

  //   for dynamic get id
  //   useEffect(() => {
  //     dispatch(getFacultyById(userId));
  //   }, [dispatch, userId]);
  useEffect(() => {
    console.log(attendenceFaculty, "-----------------data right");
    if (!!subject && !!attendenceFaculty?.attendance[subject]) {
      setAttendanceData(attendenceFaculty?.attendance[subject]);
    }
  }, [attendenceFaculty]);

  useEffect(() => {
    dispatch(getFacultyById());
    dispatch(standardList({ page: 1, limit: 100, search: "" }));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(deleteFaculty());
  // }, [dispatch]);
  const handleDeleteFaculty = (_id) => {
    dispatch(deleteFaculty(_id));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [active, setActive] = useState(true);
  const ExamForm2_fun = () => {
    setExamForm2(true);
    setExamForm1(false);
    setActive(false);
    // alert()
  };
  const ExamForm1 = () => {
    setExamForm2(false);
    setExamForm1(true);
    setActive(false);
    // alert()
  };

  const [examForm1, setExamForm1] = useState(false);
  const [examForm2, setExamForm2] = useState(false);

  useEffect(() => {
    setPage(facultyList?.data?.state?.page);
    setLimit(facultyList?.data?.state?.limit);
    setCountPage(facultyList?.data?.state?.page_limit);
  }, [facultyList]);

  useEffect(() => {
    var url = new URL(window.location.href);
    var c = url.searchParams.get("key");
    if (c) {
      setKey(c);
    }
  }, []);

  console.log(facultyList, "std");
  return (
    <>
      <div className="main_content">
        <Cm_header />
        <div className="student_wrapper">
          <div className="student_wrap">
            <div className="student_tab_block">
              <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="faculty" title="faculty">
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
                                value={search}
                                onChange={(e) => {
                                  setSearch(e.target.value);
                                }}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="student_filters">
                          <ul>
                            <li onClick={filterShow}>
                              <a href="#0">
                                <img src={filters} />
                                Filters
                              </a>
                            </li>
                            <li>
                              <Link to="/faculty/faculty_add">
                                <img src={manager} />
                                Add Faculty
                              </Link>
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
                              {facultyList?.data?.faculty_data?.map(
                                (faculty) => (
                                  <>
                                    <tr>
                                      <td>
                                        <img
                                          className="user_img"
                                          src={
                                            faculty?.profilePhoto || user_img
                                          }
                                          alt="user"
                                        />
                                        {faculty?.firstName} {faculty?.lastName}
                                      </td>
                                      <td>{faculty?.preSchool}</td>
                                      <td>{faculty?.experience}</td>
                                      <td>{faculty?.salary}</td>
                                      <td>
                                        <div className="faculty_label">
                                          <form
                                            onSubmit={(e) => {
                                              e.preventDefault();
                                              handleSalaryIncrement(
                                                faculty?._id,
                                                faculty?.salary,
                                                e.target[0].value,
                                              );
                                              e.target[0].value = "";
                                            }}
                                          >
                                            <input
                                              type="number"
                                              placeholder="Enter percentage..."
                                            />
                                            <button type="submit">
                                              Confirm
                                            </button>
                                          </form>
                                        </div>
                                      </td>
                                      <td>
                                        <span className="delete_icon">
                                          <img
                                            src={delete_icon}
                                            alt="icon"
                                            onClick={() => {
                                              handleDeleteFaculty(faculty?._id);
                                            }}
                                          />
                                        </span>
                                        <NavLink
                                          to={`/faculty/faculty_edit/${faculty?._id}`}
                                        >
                                          <img src={table_menu} alt="icon" />
                                        </NavLink>{" "}
                                      </td>
                                    </tr>
                                    <div className="commn_spach"></div>
                                  </>
                                ),
                              )}
                            </tbody>
                          </Table>
                          <div className="student_pagination">
                            <div className="pagination_block">
                              <Stack
                                sx={{ mt: "2rem", ml: "27rem" }}
                                spacing={2}
                              >
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
                </Tab>
                <Tab eventKey="Attendance" title="Attendance">
                  <div className="f_attendance_block">
                    <div className="student_wrap">
                      <div className="student_table_block">
                        <div className="student_table">
                          <div className="f_attendance_select">
                            <div className="timeteble_select timeteble_select2">
                              <div className="profile_form profile_form2">
                                <ul>
                                  <li>
                                    <label>Select Grade</label>
                                    <select
                                      name="selectedFruit"
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setStandard(e.target.value);
                                        setDate("");
                                        setSubject("");
                                        setSubjectOptin([
                                          {
                                            label: "Select Grade",
                                            value: "",
                                          },
                                        ]);
                                      }}
                                      value={standard}
                                    >
                                      {standardOption?.map((item) => {
                                        return (
                                          <option value={item?.value}>
                                            {item?.label}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </li>
                                  <li>
                                    <label>Select Section</label>
                                    <select
                                      name="selectedFruit"
                                      onChange={(e) => {
                                        setSelectedClass(e.target.value);
                                      }}
                                      value={selectedClass}
                                    >
                                      <option value="">Select Section</option>
                                      <option value="A">A</option>
                                      <option value="B">B</option>
                                      <option value="C">C</option>
                                      <option value="D">D</option>
                                      <option value="E">E</option>
                                      <option value="F">F</option>
                                      <option value="G">G</option>
                                      <option value="H">H</option>
                                      <option value="I">I</option>
                                    </select>
                                  </li>

                                  <li>
                                    <label>Select Date</label>
                                    <input
                                      onChange={(e) => {
                                        const d = new Date(e.target.value);
                                        let day2 = d.getDay();
                                        setDate(e.target.value);
                                        setSubject("");
                                        setSubjectOptin([]);
                                        console.log(dayName[day2], "day----");
                                        if (
                                          !!standardObject?.timetable[
                                            dayName[day2]
                                          ]
                                        ) {
                                          console.log("hello");
                                          createSubjectOption({
                                            subject: "Select Subject",
                                          });
                                          for (
                                            let i = 0;
                                            i <
                                            standardObject.timetable[
                                              dayName[day2]
                                            ].length;
                                            i++
                                          ) {
                                            createSubjectOption(
                                              standardObject.timetable[
                                                dayName[day2]
                                              ][i],
                                            );
                                          }
                                        } else {
                                          setSubjectOptin([
                                            {
                                              label:
                                                "no subject for selected date and standard",
                                              value: "",
                                            },
                                          ]);
                                        }
                                      }}
                                      type="date"
                                      value={date}
                                    />
                                  </li>

                                  <li>
                                    <label>Select Subject</label>
                                    <select
                                      name="selectedFruit"
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setSubject(e.target.value);
                                      }}
                                      value={subject}
                                    >
                                      {subjectOption?.map((item) => {
                                        return (
                                          <option value={item?.value}>
                                            {item?.label}
                                          </option>
                                        );
                                      })}
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
                              {attendanceData.map((item, index) => {
                                return (
                                  <>
                                    <div className="commn_spach"></div>
                                    <tr>
                                      <td>{item?.rollNo}</td>
                                      <td>{item?.name}</td>
                                      <td>
                                        <div className="f_attendance_radio">
                                          <div className="enquiry_block">
                                            <p>
                                              <input
                                                type="radio"
                                                id={`test-${index}-1`}
                                                name={`redio-${index}`}
                                                checked={
                                                  item?.attendance == true
                                                }
                                                onChange={(e) => {
                                                  console.log(attendanceData);
                                                  console.log(index);
                                                  if (e.target.checked) {
                                                    let newAttendance = [
                                                      ...attendanceData,
                                                    ];
                                                    newAttendance[index] = {
                                                      ...attendanceData[index],
                                                      attendance: true,
                                                    };
                                                    setAttendanceData(
                                                      newAttendance,
                                                    );
                                                  }
                                                }}
                                              />
                                              <label for={`test-${index}-1`}>
                                                Present
                                              </label>
                                            </p>
                                            <p>
                                              <input
                                                type="radio"
                                                id={`test-${index}-2`}
                                                name={`redio-${index}`}
                                                checked={
                                                  item?.attendance == false
                                                }
                                                onChange={(e) => {
                                                  console.log(attendanceData);
                                                  console.log(index);
                                                  if (e.target.checked) {
                                                    let newAttendance = [
                                                      ...attendanceData,
                                                    ];
                                                    newAttendance[index] = {
                                                      ...attendanceData[index],
                                                      attendance: false,
                                                    };
                                                    setAttendanceData(
                                                      newAttendance,
                                                    );
                                                  }
                                                }}
                                              />
                                              <label for={`test-${index}-2`}>
                                                Absent
                                              </label>
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                            </tbody>
                          </Table>

                          <div className="profile_btn">
                            <div className="profile_btn_cancel">
                              <a href="#0">Cancel</a>
                            </div>
                            <div className="profile_btn_save">
                              <a onClick={handleAddAttendance}>Save</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>

        <Modal
          show={show}
          className="sibling_popup sf_exam_list_popup"
          onHide={handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Subject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="add_sibling_wrap">
              <div className="add_sibling_block">
                <div className="Canteen_popup_block">
                  <p>Add Subject</p>
                  <div className="add_sibling_search">
                    <div className="profile_form profile_form1">
                      <ul>
                        <li>
                          <select name="Subject">
                            <option value="1">Subject</option>
                            <option value="2">Maths</option>
                            <option value="3">English</option>
                            <option value="4">Gujarati</option>
                            <option value="5">SS</option>
                          </select>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="Canteen_popup_block">
                  <p>Date</p>
                  <div className="add_sibling_search">
                    <label>
                      <input type="date" placeholder="Search..." />
                    </label>
                  </div>
                </div>
                <div className="add_sibling_btn">
                  <a href="#0">Add</a>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <Modal
        show={isFilterOpen}
        className="sibling_popup"
        onHide={filterHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add_sibling_wrap">
            <div className="add_sibling_block">
              <div className="Canteen_popup_block">
                <div className=" filter_Std_main">
                  <label style={{ padding: "6px" }}>Subject</label>
                  <input
                    type="text"
                    name="subjectFilter"
                    className="filter_std"
                    value={filter.subjectFilter}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <div className="btn_align">
                <button
                  className="apply_filter_btn"
                  onClick={handleApplyFilter}
                >
                  Apply
                </button>
                <button
                  className="apply_filter_btn"
                  onClick={() =>
                    setFilter({
                      subjectFilter: "",
                    })
                  }
                >
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

export default FacultyList;
