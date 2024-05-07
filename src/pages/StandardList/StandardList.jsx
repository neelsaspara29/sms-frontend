//Assets are imported hear
import close_ic from "../../Assets/Images/close_ic.png";
import delete_icon from "../../Assets/Images/delete_icon.png";
import table_menu from "../../Assets/Images/table_menu.png";
import right_arrow from "../../Assets/Images/right_arrow.png";
import filter from "../../Assets/Images/filter.png";
import search_icon from "../../Assets/Images/search_icon.png";
import standard_ic from "../../Assets/Images/standard_ic.png";
import React, { useState, useEffect } from "react";

//Third Party requests Are Hear
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";

import Cm_header from "./Cm_header";
import {
  addStandard,
  editStandard,
} from "../../Store/Reducers/Standard/addStandard";
import { standardList } from "../../Store/Reducers/Standard/standardList";
import { deleteStandard } from "../../Store/Reducers/Standard/deleteStandardById";
import { editStandardFailure } from "../../Store/Reducers/Standard/editStandardTimetable";
import AlertDialogSlide from "../../Components/Layout/Confirmdialogue";
import { ApiPost } from "../../Helpers/Api/ApiData";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { getAllFacultyUsers } from "../../Store/Reducers/Faculty/facultyList";

const StandardList = () => {
  const dispatch = useDispatch();

  const [key, setKey] = useState("Standard");
  const [search, setSearch] = useState("");
  const [deletedId, setDeletedId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [page_count, setPageCount] = useState(1);
  const [show, setShow] = useState(false);
  const [stdTimetable, setStdTimetable] = useState({});
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTimeTable, setSelectedTimetable] = useState({});
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [standardOption, setStandardOption] = useState([
    { label: "Select Standard", value: "" },
  ]);

  const { standards, loading, error } = useSelector(
    (state) => state.standardList,
  );

  const facultyList = useSelector((state) => state.facultyList);
  console.log("standards", standards);
  const [active, setActive] = useState();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    fees: "",
    city: "",
    subjects: [],
    features: [],
  });
  const [stdData, setStdData] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  });
  const [selectedDay, setSelectedDay] = useState("");
  const [formFields, setFormFields] = useState([{ subject: "" }]);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newTodo1, setNewTodo1] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [subjectArray, setSubjectArray] = useState([]);
  const [facultyArray, setFacultyArray] = useState([]);
  const [stdMap, setStdmap] = useState({});
  const [isStdEdit, setIsStdEdit] = useState(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const createOption = (data) => ({
    label: data?.name,
    value: data?._id,
  });

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, newTodo.trim()],
      });
      setNewTodo("");
    }
  };

  const handleAddTodo1 = () => {
    if (newTodo1.text !== "") {
      setTodos([...todos, newTodo1]);
      setNewTodo1({
        type: "",
        amount: "",
        text: "",
      });
    }
  };

  const handleInputChange1 = (index, event) => {
    const values = [...formFields];
    values[index][event.target.name] = event.target.value;
    setFormFields(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubjectChange = (index, e) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const newSubjects = [...prevFormData.subjects];
      newSubjects[index] = value;
      return { ...prevFormData, subjects: newSubjects };
    });
  };

  // dispatch addStandard action with formData
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.number = formData.name;
    dispatch(addStandard(formData)).then((response) => {
      console.log(response, "Std add");
      if (response?.payload?.status == 200) {
        toast.success("Standard Added Successfully");
        setFormData({
          name: "",
          number: "",
          fees: "",
          city: "",
          subjects: [],
          features: [],
        });
        toggleClass();
      } else {
        toast.error("Standard Number Or Name Already Exist");
      }
    });
    setFormData({
      name: "",
      number: "",
      fees: "",
      city: "",
      subjects: [],
      features: [],
    });
  };
  const handleEditStd = (e) => {
    formData.number = formData.name;
    dispatch(editStandard(formData)).then((response) => {
      if (response.payload.status == 200) {
        toast.success("Standard Updated Successfully");
        setFormData({
          name: "",
          number: "",
          fees: "",
          city: "",
          subjects: [],
          features: [],
        });
        toggleClass();
        dispatch(standardList({ page, limit, search }));
      } else {
        toast.error(response.error);
      }
    });
  };

  const stdHandleSubmit = async (event) => {
    event.preventDefault();

    const timetableByDay = [
      { subject: subjectArray[0], faculty: facultyArray[0] },
      { subject: subjectArray[1], faculty: facultyArray[1] },
      { subject: subjectArray[2], faculty: facultyArray[2] },
    ];

    const timetable = { timetableByDay };

    let body = {
      standardId: selectedStandard,
      class: selectedClass,
      timetable: selectedTimeTable,
    };
    body.timetable[selectedDay] = timetableByDay;

    console.log(body);
    let isSubmit = true;
    for (let i = 0; i < timetableByDay.length; i++) {
      if (!timetableByDay[i].subject || !timetableByDay[i].faculty)
        isSubmit = false;
    }

    if (isSubmit) {
      try {
        ApiPost(`/timetable/add`, body)
          .then((res) => {
            setSubjectArray([]);
            setFacultyArray([]);
            console.log("object");
            setStdData({
              monday: [],
              tuesday: [],
              wednesday: [],
              thursday: [],
              friday: [],
              saturday: [],
            });
            toast.success("Timetable Updated Successfully");
            dispatch(standardList({ page, limit, search }));
            setSelectedStandard("");
            setSelectedClass("");
            setSelectedDay("");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } catch (error) {
        console.log(error);
        dispatch(editStandardFailure());
      }
    } else {
      toast.error("All Fields Are Require To Fill");
    }
  };

  const toggleClass = () => {
    setActive(!active);
  };

  useEffect(() => {
    dispatch(standardList({ page, limit, search }));
  }, [search, limit, page]);

  const addFeature = () => {
    const newFeature = {
      type: type,
      amount: amount,
    };
    setFormData({
      ...formData,
      features: [...formData.features, newFeature],
    });
    setType("");
    setAmount("");
  };

  const handleDeleteStandard = () => {
    dispatch(deleteStandard(deletedId)).then((response) => {
      if (response?.payload?.status == 200) {
        toast.success("Standard Deleted Successfully");
        dispatch(standardList({ page, limit, search }));
      } else {
        toast.error(response.error);
      }
    });
  };

  const handleDayChange = (e) => {
    let val = e.target.value;
    // let objVal = stdMap[selectedStandard];
    // console.log("timetable Data", objVal)
    // setStdTimetable(objVal)
    let mapArr = selectedTimeTable && selectedTimeTable[val];
    console.log(mapArr, "mp");
    setSelectedDay(val);
    if (mapArr) {
      setSubjectArray(() => mapArr?.map((data) => data.subject));
      setFacultyArray(() => mapArr?.map((data) => data.faculty));
    } else {
      setSubjectArray([""]);
      setFacultyArray([""]);
    }
  };

  const handleDeleteSubject = (index) => {
    const newSubjects = [...formData.subjects];
    newSubjects.splice(index, 1);
    setFormData({
      ...formData,
      subjects: newSubjects,
    });
  };

  const handleDeleteFeatures = (index) => {
    const features = [...formData.features];
    features.splice(index, 1);
    setFormData({
      ...formData,
      features: features,
    });
  };
  const createStandardOption = (subject) => {
    const newOption = createOption(subject);
    setStandardOption((prev) => [...prev, newOption]);
  };

  const stdHandleChange = (event) => {
    setSelectedStandard(event.target.value);
    setSelectedClass("");
    setSelectedDay("");
    setSubjectArray([""]);
    setFacultyArray([""]);
  };
  const classHandleChange = (event) => {
    setSelectedClass(event.target.value);
    setSelectedDay("");
    setSubjectArray([""]);
    setFacultyArray([""]);
  };

  useEffect(() => {
    const selectedStandardObject = standards?.data?.standard_data.find(
      (standard) => standard._id == selectedStandard,
    );
    setAvailableSubjects(selectedStandardObject?.subjects || []);
  }, [selectedStandard, standards]);

  useEffect(() => {
    console.log("standard_list", standards?.data?.standard_data);
    setStandardOption([]);
    for (let i = 0; i < standards?.data?.standard_data.length; i++) {
      createStandardOption(standards?.data?.standard_data[i]);
    }
  }, [standards]);

  useEffect(() => {
    dispatch(standardList({ page: page, limit: limit, search: search }));
  }, [page, limit, search, active]);

  useEffect(() => {
    let obj = {};
    let stds = standards?.data?.standard_data;

    for (let i = 0; i < (stds?.length || 0); i++) {
      obj[stds[i]._id] = stds[i].timetable;
    }
    setStdmap();
    setPage(standards?.data?.state?.page);
    setLimit(standards?.data?.state?.limit);
    setPageCount(standards?.data?.state?.page_limit);
  }, [standards]);

  useEffect(() => {
    if (selectedClass && selectedClass) {
      ApiPost("/timetable/get", {
        standardId: selectedStandard,
        class: selectedClass,
      }).then((response) => {
        console.log("....", response?.data?.data);
        setSelectedTimetable(response?.data?.data?.timetable);
      });
    }
  }, [selectedClass, selectedStandard]);

  useEffect(() => {
    dispatch(getAllFacultyUsers({ page: page, limit: limit, search: search }));
    console.log(window.location);
    var url = new URL(window.location.href);
    var c = url.searchParams.get("key");

    if (c) {
      console.log("hello", c);
      setKey(c);
    }

    return () => {
      setSelectedTimetable([]);
    };
  }, []);

  return (
    <>
      <div className="main_content">
        <Cm_header />
        <div className="student_wrapper">
          <div className={`student_wrap ${active ? "addstandard" : ""}`}>
            <div className="student_tab_block">
              <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="Standard" title="Grade">
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
                                value={search}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="student_filters">
                          <ul>
                            {/* <li>
                              <a href="#0">
                                <img src={filter} />
                                Filters
                              </a>
                            </li> */}
                            <li>
                              <a href="#0" onClick={toggleClass}>
                                <img src={standard_ic} />
                                Add Grade
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
                                <th>Grade</th>
                                <th>Fees</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <div className="commn_spach"></div>
                              {standards?.data?.standard_data.map(
                                (standard) => (
                                  <>
                                    <tr>
                                      <td>{standard.name} </td>
                                      <td>{standard.fees}</td>
                                      <td>
                                        <span className="delete_icon">
                                          <img
                                            src={delete_icon}
                                            alt="icon"
                                            onClick={() => {
                                              setShow(true);
                                              setDeletedId(standard?._id);
                                            }}
                                          />
                                        </span>
                                        <span>
                                          <img
                                            onClick={() => {
                                              toggleClass();
                                              setIsStdEdit(true);
                                              setFormData({
                                                name: standard.name,
                                                number: standard.number,
                                                fees: standard.fees,
                                                subjects: standard.subjects,
                                                features: standard.features,
                                                _id: standard._id,
                                                userType: "user",
                                              });
                                            }}
                                            src={table_menu}
                                            alt="icon"
                                          />
                                        </span>
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
                  <Formik
                    initialValues={formData}
                    enableReinitialize
                    onSubmit={(values, { resetForm }) =>
                      handleSubmit(values, resetForm)
                    }
                  >
                    {({ values, setFieldValue }) => (
                      <Form>
                        {/* <form onSubmit={handleSubmit}> */}
                        <div className="standard_block">
                          <div className="profile_block">
                            <div className="profile_form profile_form2">
                              <ul>
                                <li>
                                  <label>Grade Name</label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                  />
                                </li>
                                <li>
                                  <label>Fees</label>
                                  <input
                                    type="text"
                                    name="fees"
                                    value={formData.fees}
                                    onChange={handleInputChange}
                                  />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form profile_form1"></div>
                            <div className="profile_form profile_form1">
                              <ul>
                                <li>
                                  <label>Course</label>
                                  <div style={{ display: "flex", gap: "12px" }}>
                                    <input
                                      type="text"
                                      value={newTodo}
                                      onChange={handleNewTodoChange}
                                      placeholder="Course"
                                      onKeyDown={(key) => {
                                        console.log(key);
                                        key.key == "Enter" && handleAddTodo();
                                      }}
                                    />
                                    <Button
                                      sx={{
                                        paddingTop: "0.9rem",
                                        paddingBottom: "0.9rem",
                                      }}
                                      variant="contained"
                                      onClick={handleAddTodo}
                                      style={{ verticalAlign: "middle" }}
                                    >
                                      +
                                    </Button>
                                  </div>
                                  {formData.subjects.map((subject, index) => (
                                    <div
                                      className="profile_form profile_form1 standard_form standard_form_sub_list"
                                      key={index}
                                    >
                                      <ul>
                                        <li>
                                          <label>
                                            <img
                                              src={close_ic}
                                              alt="close_ic"
                                              onClick={() =>
                                                handleDeleteSubject(index)
                                              }
                                            />
                                            <input
                                              type="text"
                                              value={subject}
                                              onChange={(e) =>
                                                handleSubjectChange(index, e)
                                              }
                                            />
                                          </label>
                                        </li>
                                      </ul>
                                    </div>
                                  ))}
                                </li>
                              </ul>
                            </div>
                            <div className="profile_btn">
                              <div className="profile_btn_cancel">
                                <a
                                  href="#0"
                                  onClick={() => {
                                    toggleClass();
                                    setFormData({
                                      name: "",
                                      number: "",
                                      fees: "",
                                      subjects: [],
                                      features: [],
                                    });
                                    setKey("Standard");
                                  }}
                                >
                                  Cancel
                                </a>
                              </div>

                              {!formData?._id ? (
                                <div className="profile_btn_save">
                                  <a
                                    href="#0"
                                    className="save_btn"
                                    onClick={handleSubmit}
                                  >
                                    Add
                                  </a>
                                </div>
                              ) : (
                                <div className="profile_btn_save">
                                  <a
                                    href="#0"
                                    className="save_btn"
                                    onClick={handleEditStd}
                                  >
                                    Update
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Tab>
                <Tab eventKey="TimeTable" title="Schedule">
                  <Formik
                    initialValues={stdData}
                    enableReinitialize
                    onSubmit={(values, { resetForm }) =>
                      handleSubmit(values, resetForm)
                    }
                  >
                    {({ values, setFieldValue }) => (
                      <Form>
                        {/* <form onSubmit={handleSubmit}> */}
                        <div className="profile_wrap">
                          <div className="profile_block">
                            <div className="timeteble_block">
                              <div className="timeteble_select">
                                <div className="profile_form ">
                                  <ul>
                                    <li>
                                      <label>Grade</label>
                                      <select
                                        name="selectedStandard"
                                        value={selectedStandard}
                                        onChange={stdHandleChange}
                                      >
                                        <option>Select Grade</option>
                                        {standardOption.map((item) => {
                                          return (
                                            <option value={item?.value}>
                                              {item?.label}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </li>
                                    <li>
                                      <label>Section</label>
                                      <select
                                        name="selectedStandard"
                                        value={selectedClass}
                                        onChange={classHandleChange}
                                      >
                                        <option>Select Section</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                        <option value="F">F</option>
                                        <option value="G">G</option>
                                        <option value="H">H</option>
                                      </select>
                                    </li>

                                    <li>
                                      <label>Day</label>
                                      <select
                                        name="selectedDay"
                                        value={selectedDay}
                                        onChange={handleDayChange}
                                      >
                                        <option>Select Day</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">
                                          Wednesday
                                        </option>
                                        <option value="thursday">
                                          Thursday
                                        </option>
                                        <option value="friday">Friday</option>
                                        <option value="saturday">
                                          Saturday
                                        </option>
                                        {/* <option value="7">7</option> */}
                                      </select>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="timeteble_wrap">
                                <div className="timeteble_sec">
                                  <ul className="timeteble_top_item">
                                    <li>
                                      <p>Time</p>
                                    </li>
                                    <li>
                                      <p>Course</p>
                                    </li>
                                    <li>
                                      <p>Faculty</p>
                                    </li>
                                  </ul>
                                  <div className="timeteble_item_block">
                                    <ul className="timeteble_item">
                                      <li>
                                        <div className="timeteble_time">
                                          <p>08:00 AM to 10:00 AM</p>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="timeteble_time">
                                          <select
                                            name="selectedFruit"
                                            onChange={(e) => {
                                              console.log(
                                                e.target.value,
                                                "sub",
                                              );

                                              const newArray = [
                                                ...subjectArray,
                                              ];
                                              newArray[0] = e.target.value;
                                              setSubjectArray(newArray);
                                            }}
                                            value={
                                              subjectArray[0]
                                                ? subjectArray[0]
                                                : ""
                                            }
                                          >
                                            <option>Select Course</option>
                                            {availableSubjects.map(
                                              (subject) => (
                                                <option
                                                  key={subject}
                                                  value={subject}
                                                >
                                                  {subject}
                                                </option>
                                              ),
                                            )}
                                          </select>
                                        </div>
                                        {isFormSubmitted &&
                                          !subjectArray[0] && (
                                            <p style={{ color: "red" }}>
                                              Please select a Course
                                            </p>
                                          )}
                                      </li>
                                      <li>
                                        <div className="timeteble_time">
                                          <label>
                                            <input
                                              type="text"
                                              placeholder="Enter Faculty Name"
                                              onChange={(e) => {
                                                const newFacultyArray = [
                                                  ...facultyArray,
                                                ];
                                                newFacultyArray[0] =
                                                  e.target.value;
                                                setFacultyArray(
                                                  newFacultyArray,
                                                );
                                              }}
                                              value={
                                                facultyArray[0]
                                                  ? facultyArray[0]
                                                  : ""
                                              }
                                            />
                                          </label>
                                        </div>
                                        {isFormSubmitted &&
                                          !facultyArray[0] && (
                                            <p style={{ color: "red" }}>
                                              Please enter a faculty name
                                            </p>
                                          )}
                                      </li>
                                    </ul>
                                    <ul className="timeteble_item">
                                      <li>
                                        <div className="timeteble_time">
                                          <p>12:00 PM to 02:00 PM</p>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="timeteble_time">
                                          <select
                                            name="selectedFruit"
                                            onChange={(e) => {
                                              const newArray = [
                                                ...subjectArray,
                                              ];
                                              newArray[1] = e.target.value;
                                              setSubjectArray(newArray);
                                            }}
                                            value={
                                              subjectArray[1]
                                                ? subjectArray[1]
                                                : ""
                                            }
                                          >
                                            <option>Select Course</option>
                                            {availableSubjects.map(
                                              (subject) => (
                                                <option
                                                  key={subject}
                                                  value={subject}
                                                >
                                                  {subject}
                                                </option>
                                              ),
                                            )}
                                          </select>
                                        </div>
                                        {isFormSubmitted &&
                                          !subjectArray[1] && (
                                            <p style={{ color: "red" }}>
                                              Please select a course
                                            </p>
                                          )}
                                      </li>
                                      <li>
                                        <div className="timeteble_time">
                                          <label>
                                            <input
                                              type="text"
                                              placeholder="Enter Faculty Name"
                                              onChange={(e) => {
                                                const newFacultyArray = [
                                                  ...facultyArray,
                                                ];
                                                newFacultyArray[1] =
                                                  e.target.value;
                                                setFacultyArray(
                                                  newFacultyArray,
                                                );
                                              }}
                                              value={
                                                facultyArray[1]
                                                  ? facultyArray[1]
                                                  : ""
                                              }
                                            />
                                          </label>
                                        </div>
                                        {isFormSubmitted &&
                                          !facultyArray[1] && (
                                            <p style={{ color: "red" }}>
                                              Please enter a faculty name
                                            </p>
                                          )}
                                      </li>
                                    </ul>
                                    <ul className="timeteble_item">
                                      <li>
                                        <div className="timeteble_time">
                                          <p>04:00 PM to 06:00 PM</p>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="timeteble_time">
                                          <select
                                            name="selectedFruit"
                                            onChange={(e) => {
                                              const newArray = [
                                                ...subjectArray,
                                              ];
                                              newArray[2] = e.target.value;
                                              setSubjectArray(newArray);
                                            }}
                                            value={
                                              subjectArray[2]
                                                ? subjectArray[2]
                                                : ""
                                            }
                                          >
                                            <option>Select Course</option>
                                            {availableSubjects.map(
                                              (subject) => (
                                                <option
                                                  key={subject}
                                                  value={subject}
                                                >
                                                  {subject}
                                                </option>
                                              ),
                                            )}
                                          </select>
                                        </div>
                                        {isFormSubmitted &&
                                          !subjectArray[2] && (
                                            <p style={{ color: "red" }}>
                                              Please select a course
                                            </p>
                                          )}
                                      </li>
                                      <li>
                                        <div className="timeteble_time">
                                          <label>
                                            <input
                                              type="text"
                                              placeholder="Enter Faculty Name"
                                              onChange={(e) => {
                                                const newFacultyArray = [
                                                  ...facultyArray,
                                                ];
                                                newFacultyArray[2] =
                                                  e.target.value;
                                                setFacultyArray(
                                                  newFacultyArray,
                                                );
                                              }}
                                              value={
                                                facultyArray[2]
                                                  ? facultyArray[2]
                                                  : ""
                                              }
                                            />
                                          </label>
                                        </div>
                                        {isFormSubmitted &&
                                          !facultyArray[2] && (
                                            <p style={{ color: "red" }}>
                                              Please enter a faculty name
                                            </p>
                                          )}
                                      </li>
                                    </ul>

                                    <>
                                      <div className="profile_btn">
                                        <div className="profile_btn_cancel">
                                          <a
                                            href="#0"
                                            onClick={() => setKey("Standard")}
                                          >
                                            Cancel
                                          </a>
                                        </div>
                                        <div className="profile_btn_save">
                                          <a
                                            href="#0"
                                            className="save_btn"
                                            onClick={stdHandleSubmit}
                                          >
                                            Save
                                          </a>
                                        </div>
                                      </div>
                                    </>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <AlertDialogSlide
        show={show}
        title={"Are You Sure ,You Want To Delete  Standard"}
        alertMessage={"This Will Delete All Standard Details From Database"}
        onAgree={() => handleDeleteStandard()}
        close={() => setShow(false)}
      />
    </>
  );
};

export default StandardList;
