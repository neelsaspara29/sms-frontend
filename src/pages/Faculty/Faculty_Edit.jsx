import React, { useState } from "react";

import Cm_header from "./Cm_header";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import profile from "../../Assets/Images/profile.png";
import edit_icon from "../../Assets/Images/edit_icon.png";
import { Field, Formik, Form } from "formik";
import { faculty_initial_val } from "../../Forms/Initialvalues/faculty";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStandards } from "../../Store/Reducers/User/getStdList";
import { addUserFaculty } from "../../Store/Reducers/Faculty/addFaculty";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../Store/Reducers/User/getUserById";
import moment from "moment";
import { updateUser } from "../../Store/Reducers/User/editUser";

const Faculty_Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const standard = useSelector((state) => state.standard);
  const { user } = useSelector((state) => state.getUser);
  console.log("faculty dara", user);
  const [facultyData, setFacultyData] = useState({});
  console.log(standard);

  const { id } = useParams();

  const handleSubmit = (value, resetForm) => {
    console.log(value);
    let body = value;
    body._id = id;
    body.userType = "faculty";
    dispatch(updateUser(body)).then((response) => {
      if (response.payload.status == 200) {
        resetForm({
          values: {
            ...faculty_initial_val,
          },
        });
        navigate(-1);
        console.log(response?.payload?.message);
        toast.success(response?.payload?.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  useEffect(() => {
    setFacultyData({
      userType: "faculty",
      firstName: user?.data?.data?.firstName,
      lastName: user?.data?.data?.lastName,
      middleName: user?.data?.data?.middleName,
      preSchool: user?.data?.data?.preSchool,
      address: user?.data?.data?.address,
      area: user?.data?.data?.area,
      city: user?.data?.data?.city,
      district: user?.data?.data?.district,
      country: user?.data?.data?.country,
      state: user?.data?.data?.state,
      zipCode: user?.data?.data?.zipCode,
      experience: user?.data?.data?.experience,
      salary: user?.data?.data?.salary,
      subject: user?.data?.data?.subject,
      dob: moment(user?.data?.data?.dob).format("YYYY-MM-DD"),
      bloodGroup: user?.data?.data?.bloodGroup,
      phoneNumber: user?.data?.data?.phoneNumber,
      reference: user?.data?.data?.reference,
      joiningDate: moment(user?.data?.data?.joiningDate).format("YYYY-MM-DD"),
      leavingDate: moment(user?.data?.data?.leavingDate).format("YYYY-MM-DD"),
      email: user?.data?.data?.email,
      profilePhoto: user?.data?.data?.profilePhoto,
      standard: user?.data?.data?.standard,
    });
  }, [user]);

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(fetchStandards());
  }, []);

  return (
    <div className="main_content">
      <Cm_header />

      <Formik
        initialValues={facultyData}
        enableReinitialize
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              {console.log(values)}
              <div className="student_wrapper">
                <div className="student_wrap">
                  <div className="student_tab_block">
                    <Tabs
                      defaultActiveKey="Profile"
                      id="uncontrolled-tab-example"
                    >
                      <Tab eventKey="Profile" title="Profile">
                        <div className="profile_wrap">
                          <div className="profile_block">
                            <div className="profile_form">
                              <ul>
                                <li>
                                  <label>first name</label>
                                  <Field type="text" name="firstName" />
                                </li>
                                <li>
                                  <label>Middle name</label>
                                  <Field type="text" name="middleName" />
                                </li>
                                <li>
                                  <label>last name</label>
                                  <Field type="text" name="lastName" />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form profile_form1">
                              <ul>
                                <li>
                                  <label>Previous School</label>
                                  <Field type="text" name="preSchool" />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form profile_form1">
                              <ul>
                                <li>
                                  <label>Address</label>
                                  <Field type="text" name="address" />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form profile_form2">
                              <ul>
                                {/* <li>
                                  <label>District</label>
                                  <Field type="text" name='district' />
                                </li> */}
                              </ul>
                            </div>
                            <div className="profile_form profile_form2">
                              <ul>
                                <li>
                                  <label>City</label>
                                  <Field type="text" name="city" />
                                </li>
                                <li>
                                  <label>State</label>
                                  <Field type="text" name="state" />
                                </li>
                                <li>
                                  <label>Country</label>
                                  <Field type="text" name="country" />
                                </li>
                                <li>
                                  <label>Zip code</label>
                                  <Field type="number" name="zipCode" />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form">
                              <ul>
                                <li>
                                  <label>Experience</label>
                                  <Field type="number" name="experience" />
                                </li>
                                <li>
                                  <label>Salary</label>
                                  <Field type="number" name="salary" />
                                </li>
                                <li>
                                  <label>Subject</label>
                                  <Field type="taxt" name="subject" />
                                </li>
                                <li>
                                  <label>Standard</label>
                                  <Field as="select" name="standard">
                                    <option value="">Select Standard</option>
                                    {standard?.list?.map((data) => (
                                      <option value={data._id}>
                                        {data.name}
                                      </option>
                                    ))}
                                  </Field>
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form profile_form2">
                              <ul>
                                <li>
                                  <label>date of birth</label>
                                  <Field type="date" name="dob" />
                                </li>
                                <li>
                                  <label>Blood Group</label>
                                  <Field type="taxt" name="bloodGroup" />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form profile_form2">
                              <ul>
                                <li>
                                  <label>phone number</label>
                                  <Field type="number" name="phoneNumber" />
                                </li>
                                <li>
                                  <label>Joining Date</label>
                                  <Field type="date" name="joiningDate" />
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
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Faculty_Edit;
