import React, { useEffect, useState } from "react";

import Cm_header from "./Cm_header";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [data, setData] = useState({});

  const getDashboardData = () => {
    ApiPost("/get/dashboard")
      .then((response) => {
        setData(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="main_content">
      <Cm_header />
      <div className="student_wrapper">
        <div className="standard_wrap">
          <div className="student_wrap">
            <div className="dashboard_wrap">
              <div className="dashboard_block">
                <h3>Fees</h3>
                <div className="dashboard_sec">
                  <ul className="dashboard_item">
                    <li>
                      <div className="dashboard_conte">
                        <p>Pending fees</p>
                        <div className="dashboard_inner_conte">
                          <h3>{data?.sec1?.feesData?.totalPendingFees}</h3>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="dashboard_conte">
                        <p>Paid fees</p>
                        <div className="dashboard_inner_conte">
                          <h3>{data?.sec1?.paidFees}</h3>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="dashboard_conte">
                        <p>Total Fees</p>
                        <div className="dashboard_inner_conte">
                          <h3>{data?.sec1?.feesData?.totalFees}</h3>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="dashboard_block dashboard_enquiry">
                <h3>Student</h3>
                <div className="dashboard_sec">
                  <ul className="dashboard_item">
                    <li>
                      <div className="dashboard_conte">
                        <p>Total Student</p>
                        <div className="dashboard_inner_conte">
                          <h3>{data?.sec2?.totalStudent}</h3>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="dashboard_block dashboard_enquiry">
                <h3>Faculty</h3>
                <div className="dashboard_sec">
                  <ul className="dashboard_item">
                    <li>
                      <div className="dashboard_conte">
                        <p>Total faculty</p>
                        <div className="dashboard_inner_conte">
                          <h3>{data?.sec1?.totalFaculty}</h3>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="dashboard_conte">
                        <p>Total salary</p>
                        <div className="dashboard_inner_conte">
                          <h3>{data?.sec1?.feesData?.totalSalary}</h3>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
