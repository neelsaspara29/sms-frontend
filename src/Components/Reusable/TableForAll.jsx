import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import delete_icon from "../../Assets/Images/delete_icon.png";
import table_menu from "../../Assets/Images/table_menu.png";
import right_arrow from "../../Assets/Images/right_arrow.png";
import AlertDialogSlide from "../Layout/Confirmdialogue";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";

function TableForAll({
  colums,
  raws,
  deleteFun,
  editFun,
  page,
  limit,
  setLimit,
  setPage,
  page_count,
  Child_Component,
}) {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  console.log(selectedItem, "sl");

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      <div className="student_table_block">
        <div className="student_table">
          <Table responsive="xl">
            <thead>
              <tr>
                {colums?.map((data) => (
                  <th>{data.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <div className="commn_spach"></div>
              {raws?.map((raw, index) => {
                return (
                  <>
                    {" "}
                    <tr key={raw._id}>
                      {new Array(colums?.length - 1)
                        .fill(0)
                        .map((data, index) => {
                          let field_split = colums[index].field.split(".");
                          console.log(field_split);
                          return (
                            <td>
                              {field_split[1]
                                ? raw[field_split[0]][field_split[1]]
                                : raw[field_split[0]]}
                            </td>
                          );
                        })}
                      <td>
                        <span
                          className="delete_icon"
                          onClick={() => {
                            handleShow();
                            setSelectedItem(raw);
                          }}
                        >
                          <img src={delete_icon} alt="icon" />
                        </span>
                        <span onClick={() => editFun(raw)}>
                          <img src={table_menu} alt="icon" />
                        </span>
                      </td>
                    </tr>
                    <div className="commn_spach"></div>
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
      <AlertDialogSlide
        show={show}
        title={"Are You Sure ,You Want To Delete  Enquiry"}
        alertMessage={"This Will Delete Enquiry  Details From Database"}
        onAgree={() => deleteFun(selectedItem._id)}
        close={handleClose}
      />
    </>
  );
}

export default TableForAll;
