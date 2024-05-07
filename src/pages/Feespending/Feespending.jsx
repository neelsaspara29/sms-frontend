import React, { useEffect, useRef, useState } from "react";

import Cm_header from "./Cm_header";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Table from "react-bootstrap/Table";

import table_menu from "../../Assets/Images/table_menu.png";

import right_arrow from "../../Assets/Images/right_arrow.png";
import search_icon from "../../Assets/Images/search_icon.png";

import Filters from "../../Assets/Images/filter.png";
import expert from "../../Assets/Images/expert.png";
import manager from "../../Assets/Images/manager.png";

import user_img from "../../Assets/Images/user_img.png";

import { NavLink } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ApiGet, ApiPost } from "../../Helpers/Api/ApiData";
import { Pagination, Stack } from "@mui/material";
import { toast } from "react-toastify";
import PaidFee from "./PaidFee";
import Filter from "./Components/Filter";
import { useDispatch } from "react-redux";

let timeout;
const Feespending = () => {
  const [show, setShow] = useState(false);
  const [standard, setStandard] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [pageCount, setCountPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState({});
  const [amount, setAmount] = useState(0);
  const [update, setUpdate] = useState(false);

  const [featureName, setFeatureName] = useState("");
  const [featureAmount, setFeatureAmount] = useState(0);
  const [allFeature, setAllFeature] = useState([]);

  const [pendingData, setPendingData] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedStandard, setSelectedStandard] = useState("");
  const [structure, setStructure] = useState({});
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    userTypeFilter: "user",
    // pendingFeesFilter: {},
    // standardFilter: [],
    // classFilter: [],
    pendingFeesFilter: {
      min: 1,
      max: 10000000,
    },
    standardFilter: [],
    classFilter: [],
  });
  const handleClose = () => {
    setShow(false);
    setFeatureName("");
    setFeatureAmount(0);
    setAllFeature([]);
    setAmount(0);
  };
  const [classList, setClassList] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
  ]);
  const handleShow = () => setShow(true);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filterHide = () => setIsFilterOpen(false);
  const filterShow = () => setIsFilterOpen(true);
  const getAllPendingFees = () => {
    let body = {
      page: page,
      limit: limit,
      search: search,
      userTypeFilter: "user",
      ...filter,
    };
    ApiPost("/user/get/all", body)
      .then((response) => {
        console.log("response", response?.data?.data);
        setPage(response?.data?.data?.state?.page);
        setLimit(response?.data?.data?.state?.limit);
        setCountPage(response?.data?.data?.state?.page_limit);
        setPendingData(response?.data?.data?.user_data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.data.message);
      });
  };

  const handleClick = (user) => {
    setSelectedUser(user);
    handleShow();
  };

  const handleValueCheck = (e) => {
    if (e.target.value > selectedUser.pendingFees) {
      toast.error("Invalid Amount");
      setAmount(0);
    }
  };

  const handleFeatureAdd = () => {
    setAllFeature((prev) => [
      ...prev,
      { feeName: featureName, amount: parseInt(featureAmount) },
    ]);

    setFeatureAmount(0);
    setFeatureName("");
  };

  const handlePayFee = () => {
    let total = 0;
    allFeature.map((item) => (total += parseInt(item.amount)));

    let body = {
      userId: selectedUser?._id,
      feesDetails: allFeature,
      totalAmount: total,
    };
    ApiPost("/transaction/add", body)
      .then((response) => {
        toast.success(response?.data?.message);
        handleClose();
        getAllPendingFees();
        setUpdate(!update);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      });
  };

  const getStandard = () => {
    ApiGet("/standard/get/list").then((response) => {
      console.log("standard list", response?.data?.data);
      setStandard(response?.data?.data);
    });
  };

  //for paid fees print

  const getAllPaidFees = () => {
    let body = {
      page: page,
      limit: limit,
      search: search,
      userTypeFilter: "user",
      pendingFeesFilter: true,
    };
    ApiPost("/user/get/all", body)
      .then((response) => {
        console.log("response", response?.data?.data);
        setPage(response?.data?.data?.state?.page);
        setLimit(response?.data?.data?.state?.limit);
        setCountPage(response?.data?.data?.state?.page_limit);
        setPendingData(response?.data?.data?.user_data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.data.message);
      });
  };

  const handleFilterChange = (event) => {
    console.log(event);
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

    setFilter((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  const selectedRenderFun = (list, fieldName) => {
    let arr = [];
    for (let i of list) {
      arr.push(
        <span className="listed_items">
          {i}{" "}
          <svg
            onClick={() => removeItem(i, fieldName)}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </span>,
      );
    }
    return arr;
  };
  const removeItem = (value, field) => {
    let temp = filter[field]?.filter((data) => data != value);

    setFilter((old) => {
      return {
        ...old,
        [field]: temp,
      };
    });
  };

  let totalFees = 0;
  allFeature.map((item) => (totalFees += parseInt(item.amount)));

  const handleApplyFilter = () => {
    getAllPendingFees();
    filterHide();
  };

  const clearFilter = () => {
    setFilter({
      userTypeFilter: "user",
      // pendingFeesFilter: {},
      // standardFilter: [],
      // classFilter: [],
      pendingFeesFilter: {
        min: 1,
        max: 10000000,
      },
      standardFilter: [],
      classFilter: [],
    });
  };

  useEffect(() => {
    getAllPendingFees();
  }, [page, limit]);

  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      getAllPendingFees();
    }, 600);
  }, [search]);

  useEffect(() => {
    getStandard();
  }, []);

  useEffect(() => {
    if (!!selectedStandard) {
      ApiGet(`/standard/${selectedStandard}`).then((response) => {
        console.log(response?.data?.data);
        setStructure(response?.data?.data);
      });
    }
  }, [selectedStandard]);

  return (
    <div className="fees_page">
      <div className="main_content">
        <Cm_header />
        <div className="student_wrapper">
          <div className="student_wrap student_spach">
            <div className="student_tab_block">
              <Tabs defaultActiveKey="Pending" id="uncontrolled-tab-example">
                <Tab eventKey="Pending" title="Pending">
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
                              <a href="#0">Pending fees Notification</a>
                            </li>
                            <li>
                              <a href="#0" onClick={filterShow}>
                                <img src={Filters} />
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
                                <th>Pending Fees</th>
                                <th>Offline Fees</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pendingData?.map((item) => {
                                return (
                                  <>
                                    <div className="commn_spach"></div>
                                    <tr>
                                      <td>
                                        <img
                                          className="user_img"
                                          src={item?.profilePhoto || user_img}
                                          alt="user"
                                        />
                                        {item?.firstName} {item?.middleName}{" "}
                                        {item?.lastName}
                                      </td>
                                      {/* <td>Raj</td> */}
                                      <td>{item?.rollNo}</td>
                                      <td>{item?.standard?.name}</td>
                                      <td>{item?.class}</td>
                                      <td>{item?.pendingFees}</td>
                                      <td>
                                        <div className="faculty_label">
                                          <button
                                            onClick={() => {
                                              handleClick(item);
                                            }}
                                          >
                                            Pay
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                              <div className="commn_spach"></div>
                            </tbody>
                          </Table>
                          {/* <div className="fees_select">
                                                        <select name="selectedFruit">
                                                            <option value="1">500$</option>
                                                            <option value="2">600$</option>
                                                            <option value="3">700$</option>
                                                            <option value="4">800$</option>
                                                            <option value="5">900$</option>
                                                        </select>
                                                    </div> */}
                          <div className="student_pagination">
                            <div className="pagination_block">
                              {/* <p>Showing 1 to 10 of 100 (10 Pages)</p> */}
                              <Stack
                                sx={{ mt: "2rem", ml: "27rem" }}
                                spacing={2}
                              >
                                <div class="d-flex justify-content-between pt-10 align-items-center">
                                  <div className="my-2">
                                    {/* <Pagination
                            count={totalpage}
                            page={currentpage}
                            onChange={handleChange}
                            variant="outlined"
                            shape="rounded"
                            className="pagination_"
                            /> */}
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
                                </div>
                              </Stack>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Paid" title="Paid">
                  <PaidFee
                    update={update}
                    standard={standard}
                    selectedRenderFun={selectedRenderFun}
                    classList={classList}
                  />
                </Tab>
                <Tab eventKey="Fees Structure" title="Fees Structure">
                  <div className="standard_wrap structure_wrapper">
                    <div className="student_wrap">
                      <div className="student_table_block">
                        <div className="student_table">
                          <div className="fees_structure_block">
                            <div className="fees_structure_select">
                              <div className="profile_form">
                                <ul>
                                  <li>
                                    <label>Grade</label>
                                    <select
                                      name="selectedFruit"
                                      value={selectedStandard}
                                      onChange={(e) => {
                                        setSelectedStandard(e.target.value);
                                        console.log("first");
                                      }}
                                    >
                                      <option>Select Grade</option>
                                      {standard?.map((data) => (
                                        <option value={data._id}>
                                          {data.name}
                                        </option>
                                      ))}
                                    </select>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="fees_structure_sec">
                              <p>Total Fees</p>
                              <h3>{structure?.fees || "Select Grade"}</h3>
                            </div>
                          </div>

                          {/* <div className="student_pagination">
                                                        <div className="pagination_block">
                                                            <p>Showing 1 to 10 of 100 (10 Pages)</p>
                                                            <ul>
                                                                <li><a href="#0">1</a></li>
                                                                <li><a href="#0">2</a></li>
                                                                <li><a href="#0">3</a></li>
                                                                <li><a href="#0"><img src={right_arrow} alt="right icon" /></a></li>
                                                            </ul>
                                                        </div>
                                                    </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        {/* 
        <Modal
          show={isFilterOpen}
          className="sibling_popup sf_exam_list_popup pay_popup"
          onHide={filterHide}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Pay</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="add_sibling_wrap">
              <div className="add_sibling_block">
                <div className="Canteen_popup_block pay_popup_block">
                  <p>Add Recipt Details</p>
                  <div className="add_sibling_search">
                    <label>
                      <input
                        type="text"
                        placeholder="Description"
                        value={featureName}
                        onChange={(e) => setFeatureName(e.target.value)}
                      />
                    </label>
                    <label>
                      <input
                        type="number"
                        value={featureAmount}
                        onChange={(e) => setFeatureAmount(e.target.value)}
                        placeholder=""
                      />
                    </label>

                    <Button
                      sx={{
                        paddingTop: "0.9rem",
                        paddingBottom: "0.9rem",
                      }}
                      onClick={handleFeatureAdd}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="Canteen_popup_block">
                  {allFeature.map((item, index) => {
                    return (
                      <div className="add_sibling_search add_sibling_delete_buttun mt-1">
                        <label>
                          <input
                            type="text"
                            placeholder=""
                            value={item?.feeName + " - " + item?.amount}
                          />
                        </label>
                        <DeleteIcon
                          onClick={() => {
                            setAllFeature(
                              allFeature.filter(
                                (data) => item.feeName != data.feeName
                              )
                            );
                            console.log("first");
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex justify-content-between">
                  <span>Total Amounnt</span>
                  <span>{totalFees}</span>
                </div>
                <div className="add_sibling_btn">
                  <a onClick={handlePayFee}>Pay</a>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal> */}

        <Modal
          show={show}
          className="sibling_popup sf_exam_list_popup pay_popup"
          onHide={handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Pay</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="add_sibling_wrap">
              <div className="add_sibling_block">
                <div className="Canteen_popup_block pay_popup_block">
                  <p>Add Recipt Details</p>
                  <div className="add_sibling_search">
                    <label>
                      <input
                        type="text"
                        placeholder="Description"
                        value={featureName}
                        onChange={(e) => setFeatureName(e.target.value)}
                      />
                    </label>
                    <label>
                      <input
                        type="number"
                        value={featureAmount}
                        onChange={(e) => setFeatureAmount(e.target.value)}
                        placeholder=""
                      />
                    </label>

                    <Button
                      sx={{
                        paddingTop: "0.9rem",
                        paddingBottom: "0.9rem",
                      }}
                      onClick={handleFeatureAdd}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="Canteen_popup_block">
                  {allFeature.map((item, index) => {
                    return (
                      <div className="add_sibling_search add_sibling_delete_buttun mt-1">
                        <label>
                          <input
                            type="text"
                            placeholder=""
                            value={item?.feeName + " - " + item?.amount}
                          />
                        </label>
                        <DeleteIcon
                          onClick={() => {
                            setAllFeature(
                              allFeature.filter(
                                (data) => item.feeName != data.feeName,
                              ),
                            );
                            console.log("first");
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex justify-content-between">
                  <span>Total Amounnt</span>
                  <span>{totalFees}</span>
                </div>
                <div className="add_sibling_btn">
                  <a onClick={handlePayFee}>Pay</a>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

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
                          {selectedRenderFun(
                            filter?.classFilter,
                            "classFilter",
                          )}
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="Canteen_popup_block pay_popup_block">
                  <div
                    className=""
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <label>
                      <input
                        type="number"
                        name="min"
                        placeholder="Minimum"
                        className="filter_std"
                        value={filter.pendingFeesFilter.min}
                        onChange={(event) =>
                          setFilter((old) => {
                            return {
                              ...old,
                              pendingFeesFilter: {
                                ...old.pendingFeesFilter,
                                min: Number(event.target.value),
                              },
                            };
                          })
                        }
                      />
                    </label>
                    <label>
                      <input
                        type="number"
                        name="max"
                        placeholder="Maximum"
                        className="filter_std"
                        value={filter.pendingFeesFilter.max}
                        onChange={(event) =>
                          setFilter((old) => {
                            return {
                              ...old,
                              pendingFeesFilter: {
                                ...old.pendingFeesFilter,
                                max: Number(event.target.value),
                              },
                            };
                          })
                        }
                      />
                    </label>
                    {/* <Button
                    sx={{
                      paddingTop: "0.9rem",
                      paddingBottom: "0.9rem",
                    }}
                    onClick={handleFeatureAdd}
                  >
                    +
                  </Button> */}
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
      </div>
    </div>
  );
};

export default Feespending;
