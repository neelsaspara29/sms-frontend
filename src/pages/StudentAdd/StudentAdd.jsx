import React, { useState } from "react";

import Cm_header from "./Cm_header";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import profile from "../../Assets/Images/profile.png";
import popup_search from "../../Assets/Images/popup_search.png";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../../Store/Reducers/User/addUser";
import { toast } from "react-toastify";
import { fetchStandards } from "../../Store/Reducers/User/getStdList";
import { fetchUsers } from "../../Store/Reducers/User/getAllUsersList";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Modal, Table } from "react-bootstrap";
import BasicTable from "../../Components/Layout/Table";
import getAge from "../../Helpers/Functions/Date/getAge";
// import { ErrorMessage } from "formik/dist";

const schema = yup.object().shape({
  standard: yup.string().required(),
});

let timeOut;

const StudentAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [key, setKey] = useState("Profile");
  const [siblings, setSiblings] = useState([]);
  const standard = useSelector((state) => state.standard);
  const [addUsers, setAddUsers] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    aadharCard: "",
    address: "",
    area: "",
    city: "",
    district: "",
    state: "",
    country: "",
    zipCode: "",
    rollNo: "",
    standard: "",
    class: "",
    dob: "2000-01-01",
    bloodGroup: "",
    phoneNumber: "",
    email: "",
    preSchool: "",
    profilePhoto: "",
    fatherImage: "",
    motherImage: "",
    fatherName: "",
    motherName: "",
    accHolderName: "",
    accNumber: "",
    ifscCode: "",
    bankName: "",
    swiftCode: "",
    age: "",
    dobVillage: "",
    dobTaluka: "",
    dobDist: "",
    dobState: "",
    gender: "",
    nationality: "",
    cast: "",
    category: "",
    motherTougue: "",
    isSingleChild: "",
    isInEws: "",
    fatherDob: "2000-01-01",
    fatherQualification: "",
    fatherOccupation: "",
    fatherOfficeAddress: "",
    fatherIncome: "",
    fatherAadharCard: "",
    fatherEmail: "",
    fatherPhone: "",
    motherDob: "2000-01-01",
    motherQualification: "",
    motherOccupation: "",
    motherOfficeAddress: "",
    motherIncome: "",
    motherAadharCard: "",
    motherEmail: "",
    motherPhone: "",
    regOfMedicalOfficer: "",
    sealOfMedicalInstitution: "",
    preSchool: "",
    preClassStudyIn: "",
    preSchoolAffliationNumber: "",
    preSchoolCode: "",
    preDiseCode: "",
    preMedium: "",
    prelcNumber: "",
    preBoard: "",
  });

  // all state of sibling and functions for that
  const [relation, setRelation] = useState("");
  const [isEditSibling, setIsEditSibling] = useState(false);
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSiblings, setSelectedSiblings] = useState({});
  const [colums, setColums] = useState(["name", "roll no."]);
  const [rows, setRows] = useState([]);
  const [tableShow, setTableShow] = useState(false);
  const [fulldata, setFulldata] = useState([]);
  const [siblingArray, setSiblingArray] = useState([]);
  const handleClose = () => {
    setShow(false);
    setSearchValue("");
    setSelectedSiblings({});
    setIsEditSibling(false);
    setRelation("");
  };

  let stdObj = {};
  for (let i = 0; i < standard?.list?.length; i++) {
    stdObj[standard?.list[i]._id] = standard?.list[i]?.number;
  }
  const handleShow = () => setShow(true);

  const handleSiblingAdd = () => {
    siblingArray.push({ ...selectedSiblings, relation: relation });
    handleClose();
  };
  const handleSiblingUpdate = () => {
    let index = siblingArray.indexOf(selectedSiblings);
    let newArray = [...siblingArray];
    newArray[index] = { ...selectedSiblings, relation: relation };
    setSiblingArray(newArray);
    handleClose();
  };
  const handleSiblingDelete = (idx) => {
    let newArray = siblingArray.filter((item) => item._id != idx);
    setSiblingArray(newArray);
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

  //end of sibling section

  const handleSubmit = (value, resetForm) => {
    let tempObject = { ...value };
    for (var propName in tempObject) {
      if (
        tempObject[propName] === null ||
        tempObject[propName] === undefined ||
        tempObject[propName] == ""
      ) {
        delete tempObject[propName];
      }
    }
    let body = {
      ...tempObject,
      siblings: siblingArray,
    };
    dispatch(addUser(body)).then((response) => {
      console.log(response);
      if (response.payload.status == 200) {
        resetForm({
          values: {
            ...addUsers,
            class: value.class,
            rollNo: value.rollNo + 1,
            standard: value.standard,
          },
        });
        setKey("Profile");
        toast.success("Student Added Successfully");
      } else {
        toast.error(response.message);
      }
    });
  };

  // console.log(state)

  useEffect(() => {
    dispatch(fetchStandards());
  }, []);

  return (
    <div className="main_content">
      <Cm_header />

      <div className="student_wrapper">
        <div className="student_wrap">
          <div className="student_tab_block">
            <Formik
              initialValues={addUsers}
              validationSchema={schema}
              enableReinitialize
              onSubmit={(values, { resetForm }) =>
                handleSubmit(values, resetForm)
              }
            >
              {({ values, setFieldValue, errors }) => (
                <Form>
                  <Tabs
                    activeKey={key}
                    onSelect={(key) => setKey(key)}
                    defaultActiveKey="Profile"
                    id="uncontrolled-tab-example"
                  >
                    <Tab eventKey="Profile" title="Profile">
                      <div className="profile_wrap">
                        <div className="profile_block">
                          {/* <div className="profile_img_block">
                            {!values?.profilePhoto ? (
                              <img
                                className="profile_img"
                                src={profile}
                                alt="profile"
                              />
                            ) : (
                              <img
                                className="profile_img"
                                src={values?.profilePhoto}
                                alt="profile"
                              />
                            )}
                            <label
                              htmlFor="upload"
                              style={{ cursor: "pointer" }}
                            >
                              <span>
                                <img src={edit_icon} alt="icon" />
                              </span>
                            </label>
                            <input
                              type={"file"}
                              id="upload"
                              onChange={(event) =>
                                handleUploadImage(
                                  event,
                                  setFieldValue,
                                  "profilePhoto"
                                )
                              }
                              hidden
                            ></input>
                          </div> */}

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
                                <Field
                                  type="date"
                                  name="dob"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "age",
                                      getAge(new Date(event.target.value)),
                                    );
                                    setFieldValue("dob", event.target.value);
                                  }}
                                />
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
                                  <option value={""}>Select Grade</option>
                                  {standard?.list?.map((data) => (
                                    <option value={data._id}>
                                      {data.name}
                                    </option>
                                  ))}
                                </Field>

                                <ErrorMessage name="standard" />
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

                              {/* <li>
                                <label>Cast </label>
                                <Field type="text" name="cast" />
                                <ErrorMessage name="cast" />
                              </li> */}
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
                                <label>Pincode</label>
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
                              <button
                                type="button"
                                onClick={() => {
                                  if (!values?.standard) {
                                    return toast.error("Standard is required");
                                  }
                                  setKey("Parents");
                                  console.log(errors);
                                }}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="Parents" title="Parents">
                      <div className="profile_wrap">
                        <div className="profile_block">
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
                                <Field type="text" name="fatherQualification" />
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
                                <Field type="text" name="motherQualification" />
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
                              <a href="#0" onClick={() => setKey("Profile")}>
                                Back
                              </a>
                            </div>
                            <div className="profile_btn_save">
                              <button type="submit">Next</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    {/* <Tab eventKey="Sibling" title="Sibling" >
                      <div className="sibling_list_section">
                        <div className="student_wrap">
                          <div className="student_block">
                            <div className="student_sec">
                            
                            </div>
                            <div className="student_filters">
                              <ul>
                                <li><a href="#0" onClick={handleShow}><img src={filter} />Filters</a></li>
                                <li onClick={handleShow}><a href="#0"><img src={manager} />Add Student</a></li>
                              </ul>
                            </div>
                          </div>
                          <div className="student_table_block">
                            <div className="student_table">
                              <Table responsive="xl">
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Std</th>
                                    <th>Relation</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    siblingArray?.map((sibling) => {
                                      return <>
                                        <div className="commn_spach"></div>
                                        <tr>
                                          <td><img className="user_img" src={user_img} alt="user" /> {sibling?.firstName} {sibling?.lastName}</td>
                                          <td>{stdObj[sibling?.standard?._id] || stdObj[sibling?.standard]}</td>
                                          <td>{sibling?.relation}</td>
                                          <td><span className="delete_icon" onClick={() => handleSiblingDelete(sibling._id)}><img src={delete_icon} alt="icon" /></span> <span onClick={() => {
                                            console.log(sibling, 'sibling')
                                            handleShow()
                                            setIsEditSibling(true)
                                            setSelectedSiblings(sibling)
                                            setRelation(sibling?.relation)

                                          }}> <img src={table_menu} alt="icon" /></span></td>
                                        </tr>
                                      </>
                                    })
                                  }

                                </tbody>
                              </Table>

                            </div>
                          </div>
                          <div className="profile_btn">
                            <div className="profile_btn_cancel">
                              <a href="#0" onClick={() => setKey("Parents")}>Back</a>
                            </div>
                            <div className="profile_btn_save">
                              <button
                                type="submit"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab> */}
                  </Tabs>
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
              {!isEditSibling && (
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
              )}
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
    </div>
  );
};

export default StudentAdd;
