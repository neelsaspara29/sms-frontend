import React, { memo } from "react";

import user_img from "../../Assets/Images/user_img.png";
import right_arrow from "../../Assets/Images/right_arrow.png";

import filter_img from "../../Assets/Images/filter.png";
import search_icon from "../../Assets/Images/search_icon.png";
import expert from "../../Assets/Images/expert.png";
import Modal from "react-bootstrap/Modal";

import Table from "react-bootstrap/Table";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { forwardRef } from "react";
import { useState } from "react";
import { ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import { Pagination, Stack } from "@mui/material";
import { useEffect } from "react";
import moment from "moment/moment";

var a = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen ",
];
var b = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function inWords(num) {
  if ((num = num.toString()).length > 9) return "overflow";
  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "only "
      : "";
  return str;
}

let timeOut;
const PaidFee = ({ update, standard, selectedRenderFun, classList }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [pageCount, setCountPage] = useState(1);
  const [paidFeesData, setPaidFeesData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState({
    standardFilter: [],
    classFilter: [],
  });

  const filterShow = () => setIsFilterOpen(true);
  const filterHide = () => setIsFilterOpen(false);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (value == "") {
      return;
    }
    if (name == "standardFilter") {
      setFilter((old) => {
        return {
          ...old,
          standardFilter: !old[name].includes(value)
            ? [...old[name], value]
            : old[name],
        };
      });
      return;
    }
    if (name == "classFilter") {
      setFilter((old) => {
        return {
          ...old,
          classFilter: !old[name].includes(value)
            ? [...old[name], value]
            : old[name],
        };
      });
      return;
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const componentChargeRef = useRef();
  const handleChargePrint = useReactToPrint({
    content: () => componentChargeRef.current,
  });

  const PrintChargeticket = forwardRef((props, ref) => {
    return (
      <div class="main_wrapper" ref={componentChargeRef}>
        <div class="main_wrap">
          <div class="top_header_wrap">
            <div class="top_header_block">
              <p>Pan: AAHTS7121F</p>
              <p>Managed by swaminarayan asharam trust</p>
              <p>Trust Reg No. E 5421 Surat</p>
            </div>
            <div class="midil_header_block">
              <img src="https://satdham.s3.ap-south-1.amazonaws.com/6401e9e35abd7460e5634ef6/profile/1682304295386/logo.png" />
              <h1>Satdham Chhatralay</h1>
              <img
                src="https://satdham.s3.ap-south-1.amazonaws.com/6401e9e35abd7460e5634ef6/profile/1682304295386/logo.png
              "
              />
            </div>
            <div class="last_header_block">
              <p>
                Kamrej- bardoli road Khanpur, Ta : Kamrej, Di: Surat, Pin -
                394320
              </p>
              <p>Gmail : satdhamsurat01@gmail.com, Mo : +91 99252 33335</p>
            </div>
          </div>

          <div class="receipt_wrap">
            <h5>Receipt</h5>
            <div class="receipt_block">
              <ul>
                <li>
                  <h2>No. :</h2>
                  <p>{selectedData?.user?.rollNo}</p>
                </li>
                <li>
                  <h2>Name :</h2>
                  <p>
                    {selectedData?.user?.firstName}{" "}
                    {selectedData?.user?.middleName}{" "}
                    {selectedData?.user?.lastName}
                  </p>
                </li>
                <li>
                  <h2>Class :</h2>
                  <p>
                    {selectedData?.user?.standard?.number} -{" "}
                    {selectedData?.user?.class}
                  </p>
                </li>
                <li>
                  <h2>Id No. :</h2>
                  <p>243</p>
                </li>
                <li>
                  <h2>Address :</h2>
                  <p>{selectedData?.user?.address || "No Address"}</p>
                </li>
              </ul>
              <ul>
                <li>
                  <h2>Date :</h2>
                  <p>{moment(selectedData?.createdAt).format("DD/MM/YYYY")}</p>
                </li>
                <li>
                  <h2>Year :</h2>
                  <p>2023-24</p>
                </li>
                <li>
                  <h2>Roll No. :</h2>
                  <p>{selectedData?.user?.rollNo}</p>
                </li>
                <li></li>
                <li>
                  <h2>Contact No :</h2>
                  <p>{selectedData?.user?.phoneNumber || "----- -----"}</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="free_table">
            <table>
              <thead>
                <tr>
                  <th>Fee Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedData?.feesDetails &&
                  selectedData?.feesDetails.map((item) => {
                    return (
                      <tr>
                        <td>{item?.feeName}</td>
                        <td>{item?.amount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div class="rupees_block">
            <div>
              <p>{inWords(parseInt(selectedData?.totalAmount))}</p>
              <div>
                <span>Rs</span> <span>{selectedData?.totalAmount}</span>
              </div>
            </div>
            <div class="receipt_block">
              <ul>
                <li>
                  <h2>Pay Type :</h2>
                  <p>By Bank</p>
                </li>
                <li>
                  <h2>Ref. No. :</h2>
                  <p>306412483580</p>
                </li>
                <li>
                  <h2>Dt :</h2>
                  <p>{moment(selectedData?.createdAt).format("DD/MM/YYYY")}</p>
                </li>
                <li>
                  <h2>Bank :</h2>
                  <p>ICICI</p>
                </li>
                <li>
                  <h2>Remark :</h2>
                  <p>IMPS-Ghanshaym Devrajbhai Pan :- AUBPP7592B</p>
                </li>
              </ul>
              <ul>
                <li>
                  <span class="admin_span">Admin</span>
                </li>
                <li>
                  <h2>Receiver Sign.</h2>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const getAllPaidFees = () => {
    let body = {
      page: page,
      limit: limit,
      search: search,
      ...filter,
    };
    ApiPost("/transaction/get/all", body)
      .then((response) => {
        console.log("response", response?.data?.data);
        setPage(response?.data?.data?.state?.page);
        setLimit(response?.data?.data?.state?.limit);
        setCountPage(response?.data?.data?.state?.page_limit);
        // setPendingData(response?.data?.data?.user_data)
        setPaidFeesData(response?.data?.data?.paid_fees);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.data.message);
      });
  };

  const handleApplyFilter = () => {
    getAllPaidFees();
    filterHide();
  };

  const clearFilter = () => {
    setFilter({
      userTypeFilter: "user",
      standardFilter: [],
      classFilter: [],
    });
  };

  useEffect(() => {
    getAllPaidFees();
  }, [limit, page, update]);

  useEffect(() => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      getAllPaidFees();
    }, 600);
  }, [search]);

  useEffect(() => {
    if (selectedData?.user) {
      handleChargePrint();
    }
  }, [selectedData]);

  return (
    <>
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
            {/* <div className="student_filters">
              <ul>
                <li>
                  <a href="#0">
                    <img src={expert} />
                    Export
                  </a>
                </li>
                <li onClick={filterShow}>
                  <a href="#0">
                    <img src={filter_img} />
                    Filters
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="student_table_block">
            <div className="student_table">
              <Table responsive="xl">
                <thead>
                  <tr>
                    <th>Name</th>
                    {/* <th>User Name</th> */}
                    <th>Student Id</th>
                    <th>Grade</th>
                    <th>Section</th>
                    <th>Paid Fees</th>
                    {/* <th></th> */}
                  </tr>
                </thead>
                <tbody>
                  {paidFeesData.map((item) => {
                    return (
                      <>
                        <div className="commn_spach"></div>
                        <tr>
                          <td>
                            <img
                              className="user_img"
                              src={item?.user?.profilePhoto || user_img}
                              alt="user"
                            />
                            {item?.user?.firstName} {item?.user?.middleName}{" "}
                            {item?.user?.lastName}
                          </td>

                          <td>{item?.user?.rollNo}</td>
                          <td>{item?.user?.standard?.number}</td>
                          <td>{item?.user?.class}</td>
                          <td onClick={handleChargePrint}>
                            {item?.totalAmount}
                          </td>
                          {/* <td>
                            <div className="faculty_label">
                              <button
                                onClick={() => {
                                  setSelectedData(item);
                                }}
                              >
                                Print
                              </button>
                            </div>
                          </td> */}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>

              <div className="student_pagination">
                <div className="pagination_block">
                  <Stack sx={{ mt: "2rem", ml: "27rem" }} spacing={2}>
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
                <div className="add_sibling_search filter_Std_main">
                  <label>
                    <select
                      name="standardFilter"
                      className="filter_std"
                      onChange={handleFilterChange}
                    >
                      <option value="">Select STD</option>
                      {standard?.map((std) => (
                        <option value={std?.name}>{std?.name}</option>
                      ))}
                    </select>
                    {filter?.standardFilter?.length != 0 && (
                      <div className="selected_Std">
                        {selectedRenderFun(
                          filter?.standardFilter,
                          "standardFilter",
                        )}
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="Canteen_popup_block">
                <div className="add_sibling_search filter_Std_main">
                  <label>
                    <select
                      name="classFilter"
                      className="filter_std"
                      onChange={handleFilterChange}
                    >
                      <option value="">Select Class</option>
                      {classList?.map((data) => (
                        <option value={data}>{data}</option>
                      ))}
                    </select>
                    {filter?.classFilter?.length != 0 && (
                      <div className="selected_Std">
                        {selectedRenderFun(filter?.classFilter, "classFilter")}
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="btn_align">
                <button
                  className="apply_filter_btn"
                  onClick={handleApplyFilter}
                >
                  Apply
                </button>
                <button className="apply_filter_btn" onClick={clearFilter}>
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

export default memo(PaidFee);
