import React, { useEffect, useState } from "react";
import search_icon from "../../Assets/Images/search_icon.png";
import expert from "../../Assets/Images/expert.png";
import Table from "react-bootstrap/Table";
import filter from "../../Assets/Images/filter.png";
import user_img from "../../Assets/Images/user_img.png";
import right_arrow from "../../Assets/Images/right_arrow.png";
import { feesStructure } from "../../Store/Reducers/Fees/feeStructureList";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const FeesStructure = () => {
  const dispatch = useDispatch();
  const feeStructureList = useSelector((state) => state.feesStructure.data);
  console.log("feeStructureList", feeStructureList);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [page_count, setPageCount] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(feesStructure({ page: page, limit: limit, search: search }));
  }, [search, limit, page]);
  useEffect(() => {
    dispatch(feesStructure({ page: page, limit: limit, search: search }));
  }, []);
  return (
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
                />
              </label>
            </div>
          </div>
          <div className="student_filters">
            <ul>
              <li>
                <a href="#0">
                  <img src={expert} />
                  Export
                </a>
              </li>
              <li>
                <a href="#0">
                  <img src={filter} />
                  Filters
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
                  <th>Standard</th>
                  <th>Feature</th>
                  <th>Total Fees</th>
                </tr>
              </thead>
              {feeStructureList?.data?.standard_data.map((feeStructure) => (
                <tbody>
                  <div className="commn_spach"></div>
                  <tr>
                    <td>
                      <img className="user_img" src={user_img} alt="user" />
                      {feeStructure.name}
                    </td>
                    <td>{feeStructure.subjects.join(" , ")}</td>
                    <td>{feeStructure.fees}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
            <div className="fees_select">
              <select name="selectedFruit">
                <option value="1">500$</option>
                <option value="2">600$</option>
                <option value="3">700$</option>
                <option value="4">800$</option>
                <option value="5">900$</option>
              </select>
            </div>
            <div className="student_pagination">
              <div className="pagination_block">
                <Stack sx={{ mt: "2rem", ml: "27rem" }} spacing={2}>
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
  );
};

export default FeesStructure;
