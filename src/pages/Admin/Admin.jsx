import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import admin_ic1 from "../../Assets/Images/admin_ic1.png";
import admin_ic2 from "../../Assets/Images/admin_ic2.png";
import admin_ic4 from "../../Assets/Images/admin_ic4.png";
import admin_ic5 from "../../Assets/Images/admin_ic5.png";
import OTPInput, { ResendOTP } from "otp-input-react";
import { NavLink, useNavigate } from "react-router-dom";
import { ApiPostNoAuth } from "../../Helpers/Api/ApiData";
import { setLogin } from "../../Store/Reducers/Authreducer/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  forgetPassword,
  forgetPasswordRequest,
  forgetPasswordSuccess,
} from "../../Store/Reducers/Authreducer/forgetPassword";
import { resetPassword } from "../../Store/Reducers/Authreducer/resetPassword";
import { verifyOtpThunk } from "../../Store/Reducers/Authreducer/verifyOtp";
import { toast } from "react-toastify";

const Admin = () => {
  const { loading, error, otpSent } = useSelector(
    (state) => state.forgetPassword,
  );
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error1, setError1] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [OTP, setOTP] = useState("");
  const [OTPValue, setOTPValue] = useState("");

  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    let emailvalue = email.current.value;
    let passwordvalue = password.current.value;

    if (emailvalue && passwordvalue) {
      ApiPostNoAuth("/admin/login", {
        email: emailvalue,
        password: passwordvalue,
      })
        .then((response) => {
          toast.success("Logiin SuccessFull");
          dispatch(
            setLogin({
              token: response?.data?.data?.token,
              profile: response?.data?.data,
              access: response?.data?.data?.managerAccess,
            }),
          );
          navigate("/StudentListpage");
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error);
        });
    }
  };

  const handleOtp = (event) => {
    event.preventDefault();
    dispatch(forgetPasswordRequest());
    dispatch(forgetPassword({ email: email1 }))
      .then((result) => {
        console.log(result, "result---");
        if (result.payload.status == 400) {
          toast.error("User doesn't exist!");
        } else {
          dispatch(forgetPasswordSuccess());
          // setOTP(result.payload.data.message);
          toast.success("Otp sent.");
          setShow(true);
          handleClose1();
        }
      })
      .catch((error) => {
        toast.error(error);
        console.log(error.message);
      });
  };

  const handleResetPassword = (email) => {
    // reset password logic using email
    handleShow2(); // call handleShow2 to show the Modal
  };

  const handleVerifyOtp = ({ email, otp }) => {
    dispatch(verifyOtpThunk({ email, otp }));
    handleResetPassword(email); // call handleResetPassword with the email argument
  };

  const handleOTPChange = (OTP) => {
    setOTP(OTP);
  };

  const resetPassword1 = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError1("Passwords do not match");
      return;
    }
    dispatch(
      resetPassword({
        email: email1,
        password: password2,
      }),
    )
      .then((result) => {
        setPassword1("");
        setPassword2("");
        handleClose2();
        handleClose();
      })
      .catch((error) => {
        console.log(error.message);
        setError1(error.message);
      });
  };
  return (
    <div className="admin_wrapper">
      <div className="admin_wrap">
        <div className="admin_ic2">
          <img src={admin_ic2} alt="admin_ic2" />
        </div>
        <div className="admin_ic1">
          <img src={admin_ic1} alt="admin_ic2" />
        </div>
        <div className="admin_block">
          <div className="admin_form">
            <div className="admin_ic3">
              {/* <img src={admin_ic3} alt="admin_ic3" /> */}
            </div>
            <div className="admin_form_block">
              <div className="admin_left">
                <div className="admin_img">
                  {/* <img src={admin_img} /> */}
                  <div className="p-4 left_name">School Management System</div>
                </div>
              </div>
              <div className="admin_right">
                <div className="admin_sec">
                  <div className="admin_logo">
                    <NavLink to="/StudentListpage">
                      <img />
                    </NavLink>
                  </div>
                  <div className="admin_form_sec">
                    <form action="">
                      <div className="admin_form_label">
                        <label for="useremail">
                          <img src={admin_ic4} />
                          <input
                            type="email"
                            ref={email}
                            placeholder="Your Email...."
                          />
                        </label>
                      </div>
                      <div className="admin_form_label">
                        <label for="password">
                          <img src={admin_ic5} />
                          <input
                            type="password"
                            ref={password}
                            placeholder="Password"
                          />
                        </label>
                      </div>
                      <div className="admin_f_pw">
                        <a href="#0" onClick={handleShow1}>
                          Forgot Password?
                        </a>
                      </div>
                      <div className="admin_btn">
                        <button type="button" onClick={handleLogin}>
                          Log In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={show1}
        onHide={handleClose1}
        className="admin_popup admin_popup_pw"
        centered
      >
        <Modal.Body>
          <div className="admin_popup_block">
            <div className="admin_popup_title">
              <h2>Forgot Password</h2>
              <p>Let’s build something great</p>
            </div>
            <div className="admin_popup_pw_block">
              <h2>Enter your password</h2>
              <label>
                <input
                  type="email"
                  placeholder="Enter your Email "
                  value={email1}
                  onChange={(event) => setEmail1(event.target.value)}
                />
              </label>
            </div>
            <duv className="admin_popup_pw_btn">
              <button type="button" onClick={handleOtp}>
                Submit
              </button>
            </duv>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={show} onHide={handleClose} className="admin_popup" centered>
        <Modal.Body>
          <div className="admin_popup_block">
            <div className="admin_popup_title">
              <h2>Otp Verification</h2>
            </div>
            <div className="admin_popup_email">
              <p>
                {" "}
                we will send you a one time password on this{" "}
                <span>Email {email1}</span>
              </p>
            </div>
            <div className="admin_popup_otp">
              <OTPInput
                value={OTP}
                onChange={handleOTPChange}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={false}
                secure
              />
            </div>
            <div className="admin_popup_recevice">
              {/* <a href="#0">Don’t Recevice Otp?</a> */}
            </div>
            <div className="admin_popup_resend">
              <a href="#0" onClick={handleOtp}>
                Resend Otp
              </a>
            </div>
            <duv className="admin_popup_pw_btn">
              <button type="button" onClick={handleVerifyOtp}>
                Verify
              </button>
            </duv>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={show2}
        onHide={handleClose2}
        className="admin_popup admin_popup_pw"
        centered
      >
        <Modal.Body>
          <div className="admin_popup_block">
            <div className="admin_popup_title">
              <h2>Reset Password</h2>
            </div>
            <div className="admin_popup_pw_block">
              <h2>Enter your password</h2>
              <label>
                <input
                  placeholder="New Password"
                  type="password"
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </label>
              <label>
                <input
                  placeholder="Confirm New Password"
                  type="password"
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </label>
              {error1 && <p>{error1}</p>}
            </div>
            <div className="admin_popup_pw_btn">
              <button type="button" onClick={resetPassword1}>
                Submit
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Admin;
