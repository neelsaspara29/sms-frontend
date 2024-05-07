import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Cm_header from "./Cm_header";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import profile from "../../Assets/Images/profile.png";
import popup_search from "../../Assets/Images/popup_search.png";
import bottom_arrow from "../../Assets/Images/bottom_arrow.png";

import { updateUser } from "../../Store/Reducers/User/editUser";
import { fetchStandards } from "../../Store/Reducers/User/getStdList";
import { getUser } from "../../Store/Reducers/User/getUserById";
import moment from "moment/moment";
import { get_all_dates } from "../../Helpers/Functions/Date/dateHelper";
import BasicTable from "../../Components/Layout/Table";
import { fetchUsers } from "../../Store/Reducers/User/getAllUsersList";
import AlertDialogSlide from "../../Components/Layout/Confirmdialogue";
import { toast } from "react-toastify";
import moementTz from "moment-timezone";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ApiPost } from "../../Helpers/Api/ApiData";

let timeOut;
const SingleStudent = () => {
  const [colums, setColums] = useState(["name", "roll no."]);
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSiblings, setSelectedSiblings] = useState({});
  const [fulldata, setFulldata] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [tableShow, setTableShow] = useState(false);
  const [relation, setRelation] = useState("");
  const [isEditSibling, setIsEditSibling] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSearchValue("");
    setSelectedSiblings({});
    setIsEditSibling(false);
  };
  const handleShow = () => setShow(true);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  let monthDate = get_all_dates(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.getUser);
  console.log("@@@@@@@!!!!!$$$$$", user);
  const standard = useSelector((state) => state.standard);
  const [attendance, setAttendance] = useState([]);
  const [key, setKey] = useState("Profile");
  let stdObj = {};
  for (let i = 0; i < standard?.list?.length; i++) {
    stdObj[standard?.list[i]._id] = standard?.list[i]?.number;
  }
  const { data } = user;
  const { id } = useParams();
  const [addUsers, setAddUsers] = useState({});
  const handleSubmit = (values) => {
    let body = values;
    delete body["rollNo"];
    body._id = id;
    console.log(body, body);
    dispatch(updateUser(body)).then((response) => {
      console.log(response);
      if (response.payload.status == 200) {
        toast.success("Student Updatred Successfully");
      } else {
        toast.error(response.error);
      }
    });
  };

  const handleSiblingAdd = () => {
    dispatch(
      updateUser({
        siblings: [
          ...user?.data?.data?.siblings,
          {
            _id: selectedSiblings._id,
            relation: relation,
          },
        ],
        _id: id,
      }),
    ).then((response) => {
      console.log(response);
      setRelation("");
      dispatch(getUser(id));
      handleClose();
    });
  };
  const handleSiblingUpdate = () => {
    dispatch(
      updateUser({
        siblings: [...user?.data?.data?.siblings].map((sibling) => {
          if (sibling?._id == selectedSiblings?._id) {
            return {
              _id: selectedSiblings._id,
              relation: relation,
            };
          } else {
            return sibling;
          }
        }),
        _id: id,
      }),
    ).then((response) => {
      console.log(response);
      setRelation("");
      dispatch(getUser(id));
      handleClose();
    });
  };
  const handleSiblingDelete = (idx) => {
    dispatch(
      updateUser({
        siblings: user?.data?.data?.siblings
          .filter((data) => data._id != idx)
          .map((data) => {
            return {
              relation: data.relation,
              _id: data._id,
            };
          }),
        _id: id,
      }),
    ).then((response) => {
      console.log(response);
      dispatch(getUser(id)).thrn((response) => {
        if (response.payload.status == 200)
          toast.success("Sibling Deleted Successfully");
        else {
          toast.error(response.error);
        }
      });
    });
  };
  useEffect(() => {
    console.log(searchValue);
    if (searchValue) {
      timeOut = setTimeout(() => {
        dispatch(
          fetchUsers({
            search: searchValue,
            userTypeFilter: "user",
            page: 1,
            limit: 10,
          }),
        ).then((response) => {
          const res = response.payload.data.user_data;
          let arr = [];
          for (let i = 0; i < res.length; i++) {
            arr.push([
              res[i].firstName +
                " " +
                res[i].lastName +
                " " +
                res[i].middleName,
              res[i].rollNo,
            ]);
          }
          setFulldata(res);
          setRows(() => [...arr]);
          setTableShow(true);
        });
      }, 1000);

      return () => {
        clearTimeout(timeOut);
      };
    } else {
      setTableShow(false);
    }
  }, [searchValue]);

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(fetchStandards());
  }, []);
  useEffect(() => {
    setAddUsers({
      firstName: data?.data?.firstName,
      middleName: data?.data?.middleName,
      lastName: data?.data?.lastName,
      aadharCard: data?.data?.aadharCard,
      address: data?.data?.address,
      area: data?.data?.area,
      city: data?.data?.city,
      district: data?.data?.district,
      state: data?.data?.state,
      country: data?.data?.country,
      zipCode: data?.data?.zipCode,
      standard: data?.data?.standard,
      class: data?.data?.class,
      dob: moment(data?.data?.dob).format("YYYY-MM-DD"),
      bloodGroup: data?.data?.bloodGroup,
      phoneNumber: data?.data?.phoneNumber,
      email: data?.data?.email,
      preSchool: data?.data?.preSchool,
      profilePhoto: data?.data?.profilePhoto,
      fatherImage: data?.data?.fatherImage,
      motherImage: data?.data?.motherImage,
      fatherName: data?.data?.fatherName,
      motherName: data?.data?.motherName,
      accHolderName: data?.data?.accHolderName,
      accNumber: data?.data?.accNumber,
      ifscCode: data?.data?.ifscCode,
      bankName: data?.data?.bankName,
      swiftCode: data?.data?.swiftCode,
      password: data?.data?.password,
      age: data?.data?.age,
      dobVillage: data?.data?.dobVillage,
      dobTaluka: data?.data?.dobTaluka,
      dobDist: data?.data?.dobDist,
      dobState: data?.data?.dobState,
      gender: data?.data?.gender,
      nationality: data?.data?.nationality,
      cast: data?.data?.cast,
      category: data?.data?.category,
      motherTougue: data?.data?.motherTougue,
      country: data?.data?.country,
      rollNo: data?.data?.rollNo,

      isSingleChild: data?.data?.isSingleChild,
      isInEws: data?.data?.isInEws,
      fatherDob: moment(data?.data?.fatherDob).format("YYYY-MM-DD"),
      fatherQualification: data?.data?.fatherQualification,
      fatherOccupation: data?.data?.fatherOccupation,
      fatherOfficeAddress: data?.data?.fatherOfficeAddress,
      fatherIncome: data?.data?.fatherIncome,
      fatherAadharCard: data?.data?.fatherAadharCard,
      fatherEmail: data?.data?.fatherEmail,
      fatherPhone: data?.data?.fatherPhone,
      motherDob: moment(data?.data?.motherDob).format("YYYY-MM-DD"),
      motherQualification: data?.data?.motherQualification,
      motherOccupation: data?.data?.motherOccupation,
      motherOfficeAddress: data?.data?.motherOfficeAddress,
      motherIncome: data?.data?.motherIncome,
      motherAadharCard: data?.data?.motherAadharCard,
      motherEmail: data?.data?.motherEmail,
      motherPhone: data?.data?.motherPhone,
      regOfMedicalOfficer: data?.data?.regOfMedicalOfficer,
      sealOfMedicalInstitution: data?.data?.sealOfMedicalInstitution,
      preSchool: data?.data?.preSchool,
      preClassStudyIn: data?.data?.preClassStudyIn,
      preSchoolAffliationNumber: data?.data?.preSchoolAffliationNumber,
      preSchoolCode: data?.data?.preSchoolCode,
      preDiseCode: data?.data?.preDiseCode,
      preMedium: data?.data?.preMedium,
      prelcNumber: data?.data?.prelcNumber,
      preBoard: data?.data?.preBoard,
    });
  }, [user]);

  useEffect(() => {
    let body = {
      id: id,
      monthStartDate: moment(
        new Date(currentDate?.getFullYear(), currentDate?.getMonth(), 1),
      ).format("YYYY-MM-DD"),
    };

    ApiPost(`/user/attendance`, body).then((response) => {
      console.log(response?.data?.data, "attendance");
      setAttendance(response?.data?.data);
    });
  }, [currentDate, id]);

  console.log(standard);

  return (
    <div className="main_content">
      <Cm_header />
      <div className="student_wrapper">
        <div className="student_wrap">
          <div className="student_tab_block">
            <Formik
              initialValues={addUsers}
              enableReinitialize
              onSubmit={(values, { resetForm }) =>
                handleSubmit(values, resetForm)
              }
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="">
                    <Tabs>
                      <div className="ovrflow_tabs_block">
                        <div className="ovrflow_tabs">
                          <TabList>
                            <Tab>Profile</Tab>
                            <Tab>Parents</Tab>
                            {/* <Tab>Sibling</Tab> */}
                            {/* <Tab>Result</Tab> */}
                            {/* <Tab>Achievements</Tab> */}
                            <Tab>Attendance</Tab>
                          </TabList>
                        </div>
                      </div>
                      <TabPanel>
                        <div className="profile_wrap">
                          <div className="profile_block">
                            <div className="profile_form">
                              <ul>
                                <li>
                                  <label>first name</label>
                                  <Field type="text" name="firstName" />
                                  <ErrorMessage name="firstName" />
                                </li>
                                <li>
                                  <label>Middle name</label>
                                  <Field type="text" name="middleName" />
                                  <ErrorMessage name="middleName" />
                                </li>
                                <li>
                                  <label>last name</label>
                                  <Field type="text" name="lastName" />
                                  <ErrorMessage name="lastName" />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form">
                              <ul>
                                <li>
                                  <label>date of birth</label>
                                  <Field type="date" name="dob" />
                                  <ErrorMessage name="dob" />
                                </li>
                                <li>
                                  <label>Blood Group</label>
                                  <Field type="taxt" name="bloodGroup" />
                                  <ErrorMessage name="bloodGroup" />
                                </li>
                                <li>
                                  <label>Age</label>
                                  <Field type="text" name="age" />
                                  <ErrorMessage name="age" />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form">
                              <ul>
                                <li>
                                  <label>Student Id</label>
                                  <Field type="number" name="rollNo" />
                                </li>
                                <li>
                                  <label>Grade</label>
                                  <Field as="select" name="standard">
                                    <option value="">Select Grade</option>
                                    {standard?.list?.map((data) => (
                                      <option value={data._id}>
                                        {data.name}
                                      </option>
                                    ))}
                                  </Field>
                                </li>
                                <li>
                                  <label>Section</label>
                                  <Field as="select" name="class">
                                    <option value="">Select Section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                    <option value="G">G</option>
                                    <option value="H">H</option>
                                  </Field>
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form">
                              <ul>
                                <li>
                                  <label>Gender</label>
                                  <Field as="select" name="gender">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                  </Field>
                                  <ErrorMessage name="gender" />
                                </li>
                                <li>
                                  <label>Nationality</label>
                                  <Field type="text" name="nationality" />
                                  <ErrorMessage name="nationality" />
                                </li>
                              </ul>
                            </div>

                            <div className="parents_title">
                              <h3>Residential Address</h3>
                            </div>

                            <div className="profile_form profile_form1">
                              <ul>
                                <li>
                                  <label>Address</label>
                                  <Field type="text" name="address" />
                                  <ErrorMessage name="address" />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form">
                              <ul>
                                <li>
                                  <label>City</label>
                                  <Field type="text" name="city" />
                                  <ErrorMessage name="city" />
                                </li>
                                <li>
                                  <label>State</label>
                                  <Field type="text" name="state" />
                                  <ErrorMessage name="state" />
                                </li>
                                <li>
                                  <label>Country</label>
                                  <Field type="text" name="country" />
                                  <ErrorMessage name="country" />
                                </li>
                                <li>
                                  <label>Zipcode</label>
                                  <Field type="text" name="zipCode" />
                                  <ErrorMessage name="zipCode" />
                                </li>
                              </ul>
                            </div>

                            <div className="parents_title">
                              <h3>Previous School</h3>
                            </div>
                            <div className="profile_form profile_form2">
                              <ul>
                                <li>
                                  <label>School Name</label>
                                  <Field type="text" name="preSchool" />
                                  <ErrorMessage name="preSchool" />
                                </li>
                                <li>
                                  <label>Last Class Study in</label>
                                  <Field type="text" name="preClassStudyIn" />
                                  <ErrorMessage name="preClassStudyIn" />
                                </li>
                              </ul>
                            </div>

                            <div className="profile_btn">
                              <div className="profile_btn_cancel">
                                <a href="#0" onClick={() => navigate(-1)}>
                                  Cancel
                                </a>
                              </div>
                              <div className="profile_btn_save">
                                <button type="submit">Update</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="profile_wrap">
                          <div className="profile_block">
                            <div className="parents_block">
                              {/* <div className="profile_form profile_form2">
                                                            <ul>
                                                                <li>
                                                                    <label>father name</label>
                                                                    <Field type="text" name='fatherName' />
                                                                </li>
                                                                <li>
                                                                    <label>Mother name</label>
                                                                    <Field type="text" name='motherName' />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="parents_title">
                                                            <h3>Bank Detail</h3>
                                                        </div>
                                                        <div className="profile_form profile_form1">
                                                            <ul>
                                                                <li>
                                                                    <label>Bank Name</label>
                                                                    <Field type="text" name='bankName' />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="profile_form profile_form1">
                                                            <ul>
                                                                <li>
                                                                    <label>Account Holder name</label>
                                                                    <Field type="text" name='accHolderName' />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="profile_form profile_form2">
                                                            <ul>
                                                                <li>
                                                                    <label>account number</label>
                                                                    <Field type="number" name='accNumber' />
                                                                </li>
                                                                <li>
                                                                    <label>ifsc code</label>
                                                                    <Field type="number" name='ifscCode' />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="profile_btn">
                                                            <div className="profile_btn_cancel">
                                                            <a href="#0" onClick={() => navigate(-1)}>Cancel</a>
                                                            </div>
                                                            <div className="profile_btn_save">
                                                                <button type="submit" >Edit</button>
                                                            </div>
                                                                </div>*/}
                            </div>
                            <div className="parents_title">
                              <h3>Father Detail</h3>
                            </div>

                            <div className="profile_form profile_form2">
                              <ul>
                                <li>
                                  <label>Father Name</label>
                                  <Field type="text" name="fatherName" />
                                  <ErrorMessage name="fatherName" />
                                </li>
                                <li>
                                  <label>Date of Birth</label>
                                  <Field type="date" name="fatherDob" />
                                  <ErrorMessage name="fatherDob" />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form">
                              <ul>
                                <li>
                                  <label>Qualification</label>
                                  <Field
                                    type="text"
                                    name="fatherQualification"
                                  />
                                  <ErrorMessage name="fatherQualification" />
                                </li>
                                <li>
                                  <label>Occupation</label>
                                  <Field type="text" name="fatherOccupation" />
                                  <ErrorMessage name="fatherOccupation" />
                                </li>
                                <li>
                                  <label>Income</label>
                                  <Field type="text" name="fatherIncome" />
                                  <ErrorMessage name="fatherIncome" />
                                </li>
                              </ul>
                            </div>

                            <div className="profile_form profile_form2">
                              <ul>
                                <li>
                                  <label>Email</label>
                                  <Field type="text" name="fatherEmail" />
                                  <ErrorMessage name="fatherEmail" />
                                </li>
                                <li>
                                  <label>Father Phone Number</label>
                                  <Field type="text" name="fatherPhone" />
                                  <ErrorMessage name="fatherPhone" />
                                </li>
                              </ul>
                            </div>
                            <div className="parents_title">
                              <h3>Mother Detail</h3>
                            </div>

                            <div className="profile_form profile_form2">
                              <ul>
                                <li>
                                  <label>Mother Name</label>
                                  <Field type="text" name="motherName" />
                                  <ErrorMessage name="motherName" />
                                </li>
                                <li>
                                  <label>Date of Birth</label>
                                  <Field type="date" name="motherDob" />
                                  <ErrorMessage name="motherDob" />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form">
                              <ul>
                                <li>
                                  <label>Qualification</label>
                                  <Field
                                    type="text"
                                    name="motherQualification"
                                  />
                                  <ErrorMessage name="motherQualification" />
                                </li>
                                <li>
                                  <label>Occupation</label>
                                  <Field type="text" name="motherOccupation" />
                                  <ErrorMessage name="motherOccupation" />
                                </li>
                                <li>
                                  <label>Income</label>
                                  <Field type="text" name="motherIncome" />
                                  <ErrorMessage name="motherIncome" />
                                </li>
                              </ul>
                            </div>

                            <div className="profile_form profile_form2">
                              <ul>
                                <li>
                                  <label>Email</label>
                                  <Field type="text" name="motherEmail" />
                                  <ErrorMessage name="motherEmail" />
                                </li>
                                <li>
                                  <label>Mother Phone Number</label>
                                  <Field type="text" name="motherPhone" />
                                  <ErrorMessage name="motherPhone" />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_btn">
                              <div className="profile_btn_cancel">
                                <a href="#0" onClick={() => navigate(-1)}>
                                  Cancel
                                </a>
                              </div>
                              <div className="profile_btn_save">
                                <button type="submit">Update</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>

                      {/* <TabPanel> <Achievement user={user} /></TabPanel> */}
                      <TabPanel>
                        <div className="attendance_wrap">
                          <div className="profile_wrap">
                            <div className="profile_block">
                              <div className="attendance_note">
                                <p>
                                  Note :{" "}
                                  <span className="attendance_green"></span> :
                                  Present,{" "}
                                  <span className="attendance_red"></span> :
                                  Absent.{" "}
                                </p>
                                <div className="attendance_date">
                                  <p>
                                    {moment(currentDate).format("MMM")}{" "}
                                    {moment(currentDate).format("YYYY")}
                                  </p>
                                  <div
                                    className="attendance_next"
                                    onClick={() =>
                                      setCurrentDate(
                                        new Date(
                                          new Date(
                                            currentDate.getTime(),
                                          ).setDate(0),
                                        ),
                                      )
                                    }
                                  >
                                    <a href="#0">
                                      <img src={bottom_arrow} />
                                    </a>
                                  </div>
                                  <div
                                    className="attendance_prev"
                                    onClick={() =>
                                      setCurrentDate(
                                        new Date(
                                          new Date(
                                            currentDate.getTime(),
                                          ).setDate(32),
                                        ),
                                      )
                                    }
                                  >
                                    <a href="#0">
                                      <img src={bottom_arrow} />
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="attendance_block">
                                <div className="attendance_scroll">
                                  <div className="attendance_sec">
                                    <ul>
                                      <li>
                                        <p>Monday</p>
                                      </li>
                                      <li>
                                        <p>Tuesday</p>
                                      </li>
                                      <li>
                                        <p>Wednesday</p>
                                      </li>
                                      <li>
                                        <p>Thursday</p>
                                      </li>
                                      <li>
                                        <p>Friday</p>
                                      </li>
                                      <li>
                                        <p>Saturday</p>
                                      </li>
                                      <li>
                                        <p>Sunday</p>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="attendance_list">
                                    <div className="attendance_item">
                                      {monthDate?.map((dates, index) => (
                                        <ul>
                                          {dates?.map((day) => {
                                            if (day == 0) {
                                              return (
                                                <li>
                                                  <div className="attendance_sub_extra"></div>
                                                </li>
                                              );
                                            } else {
                                              return (
                                                <li>
                                                  <div className="attendance_sub">
                                                    <h3>
                                                      {new Date(day).getDate()}
                                                    </h3>
                                                    {attendance?.map(
                                                      (singleAttendance) => {
                                                        console.log(
                                                          moementTz(day)
                                                            .tz("UTC")
                                                            .format(
                                                              "DD-MM-YYYY",
                                                            ),
                                                          singleAttendance.date,
                                                          "date",
                                                        );

                                                        if (
                                                          moementTz(day)
                                                            .tz("UTC")
                                                            .format(
                                                              "DD-MM-YYYY",
                                                            ) ==
                                                          moementTz(
                                                            singleAttendance.date,
                                                          )
                                                            .tz("UTC")
                                                            .format(
                                                              "DD-MM-YYYY",
                                                            )
                                                        ) {
                                                          return Object.keys(
                                                            singleAttendance?.attendance,
                                                          )
                                                            .map((key) => [
                                                              key,
                                                              singleAttendance
                                                                ?.attendance[
                                                                key
                                                              ],
                                                            ])
                                                            ?.map((data) => (
                                                              <p
                                                                className={
                                                                  !data[1]
                                                                    ? "color_red text-center"
                                                                    : "text-center"
                                                                }
                                                              >
                                                                {data[0]}{" "}
                                                              </p>
                                                            ));
                                                        }
                                                      },
                                                    )}
                                                  </div>
                                                </li>
                                              );
                                            }
                                          })}
                                        </ul>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        className="sibling_popup"
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Sibling</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add_sibling_wrap">
            <div className="add_sibling_block">
              <div className="add_sibling_search">
                <label>
                  <img src={popup_search} alt="popup_search" />
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={(event) => setSearchValue(event.target.value)}
                  />
                </label>
              </div>
              <BasicTable
                colums={colums}
                rows={rows}
                fullDate={fulldata}
                show={tableShow}
                setShow={setTableShow}
                setterFun={setSelectedSiblings}
                setRelation={setRelation}
              />
              <div className="add_sibling_img">
                {!selectedSiblings?.profilePhoto ? (
                  <img src={profile} />
                ) : (
                  <img
                    className="rouded_profile"
                    src={selectedSiblings?.profilePhoto}
                  />
                )}
              </div>
              <div className="add_sibling_content">
                <div className="add_sibling_name">
                  <h3>Name : </h3>
                  <p>
                    {(selectedSiblings?.firstName || "Jay") +
                      " " +
                      (selectedSiblings?.lastName || "Swaminarayan")}
                  </p>
                </div>
                <div className="add_sibling_name">
                  <h3>Standard : </h3>
                  <p>
                    {stdObj[selectedSiblings?.standard?._id] ||
                      stdObj[selectedSiblings?.standard]}{" "}
                  </p>
                </div>
                <div className="add_sibling_name">
                  <h3>Mobile No :</h3>
                  <p>+91 {selectedSiblings?.phoneNumber}</p>
                </div>
                <div className="add_sibling_name">
                  <h3>Relation :</h3>
                  <input
                    type="text"
                    placeholder="Enter Relation..."
                    value={relation}
                    onChange={(event) => setRelation(event.target.value)}
                  />
                </div>
              </div>
              {!isEditSibling ? (
                <div className="add_sibling_btn">
                  <a href="#0" onClick={() => handleSiblingAdd()}>
                    Add
                  </a>
                </div>
              ) : (
                <div className="add_sibling_btn">
                  <a href="#0" onClick={() => handleSiblingUpdate()}>
                    Update
                  </a>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <AlertDialogSlide />
    </div>
  );
};

export default SingleStudent;
