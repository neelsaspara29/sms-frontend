import React from "react";
import { Modal } from "react-bootstrap";

function Filter({
  show,
  handleShow,
  handleClose,
  handleFilterChange,
  filter,
  handleApplyFilter,
  clearFilter,
  standard,
  setFilter,
  classList,
}) {
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
  return (
    <>
      {" "}
      <Modal
        show={show}
        className="sibling_popup"
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Fees Filter</Modal.Title>
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
                      {standard?.list?.map((std) => (
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

              <div className="Canteen_popup_block">
                <div>
                  <label>
                    <input
                      type="text"
                      name="areaFilter"
                      value={filter?.areaFilter}
                      placeholder="Area"
                      className="filter_std"
                      onChange={handleFilterChange}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="text"
                      name="cityFilter"
                      value={filter?.cityFilter}
                      placeholder="City"
                      className="filter_std"
                      onChange={handleFilterChange}
                    />
                  </label>
                </div>
              </div>

              <div className="Canteen_popup_block">
                <div>
                  <label>
                    <input
                      type="text"
                      name="stateFilter"
                      value={filter?.stateFilter}
                      placeholder="State"
                      className="filter_std"
                      onChange={handleFilterChange}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="text"
                      name="countryFilter"
                      value={filter?.countryFilter}
                      placeholder="country"
                      className="filter_std"
                      onChange={handleFilterChange}
                    />
                  </label>
                </div>
              </div>

              <div className="Canteen_popup_block">
                <div>
                  <label>
                    <input
                      type="text"
                      name="districtFilter"
                      value={filter?.districtFilter}
                      placeholder="District"
                      className="filter_std"
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="text"
                      name="zipCodeFilter"
                      value={filter?.zipCodeFilter}
                      placeholder="Zipcode"
                      className="filter_std"
                    />
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
}

export default Filter;
