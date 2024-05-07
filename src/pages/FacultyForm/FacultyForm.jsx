import React from "react";

import Cm_header from "./Cm_header";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { faculty_initial_val } from "../../Forms/Initialvalues/faculty";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStandards } from "../../Store/Reducers/User/getStdList";
import { addUserFaculty } from "../../Store/Reducers/Faculty/addFaculty";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom/dist";
import * as yup from "yup";

const schema = yup.object().shape({
  standard: yup.string().required(),
  firstName: yup.string().required(),
  subject: yup.string().required(),
});

const FacultyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const standard = useSelector((state) => state.standard);
  console.log(standard);

  const handleSubmit = (value, resetForm) => {
    console.log(value);
    let body = value;
    body.userType = "faculty";
    dispatch(addUserFaculty(body)).then((response) => {
      if (response.payload.status == 200) {
        resetForm({
          values: {
            ...faculty_initial_val,
          },
        });
        toast.success("Faculty Added Successfully");
      } else {
        toast.error(response.message);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchStandards());
  }, [dispatch]);

  return (
    <div className="main_content">
      <Cm_header />

      <Formik
        validationSchema={schema}
        initialValues={faculty_initial_val}
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
                                  <ErrorMessage name="firstName" />
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
                            <div className="profile_form">
                              <ul></ul>
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
                                  <label>Course</label>
                                  <Field type="taxt" name="subject" />
                                  <ErrorMessage name="subject" />
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
                                  <ErrorMessage name="standard" />
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
                                {/* <li>
                                  <label>reference</label>
                                  <Field type="taxt" name='reference' />
                                </li> */}
                                <li>
                                  <label>Joining Date</label>
                                  <Field type="date" name="joiningDate" />
                                </li>
                              </ul>
                            </div>
                            <div className="profile_form profile_form2">
                              <ul>
                                {/* <li>
                                  <label>Leaving Date</label>
                                  <Field type="date" name='leavingDate' />
                                </li> */}
                              </ul>
                            </div>
                            <div className="profile_btn">
                              <div className="profile_btn_cancel">
                                <a href="#0" onClick={() => navigate(-1)}>
                                  Cancel
                                </a>
                              </div>
                              <div className="profile_btn_save">
                                <button type="submit">Save</button>
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

export default FacultyForm;
