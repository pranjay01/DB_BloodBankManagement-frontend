//SJSU CMPE 138 Spring2020 TEAM7
import React, { Component } from "react";
import { getDonorByEmailId, deleteDonor } from "./action";
import { addSearchDonorList } from "../../reducer/appReducer";
import { connect } from "react-redux";
import { history } from "../../Routes";
import Modal from "../../components/Modal";
import AddBloodUnit from "../blood/AddBloodUnit";
import UpdateDonor from "./UpdateDonor";
class SearchDonor extends Component {
  state = {
    data: {
      Email_id: "",
    },
    isOpen: false,
    isEditOpen: false,
  };
  addUnit = () => {
    this.setState({ isOpen: true });
  };
  updateDonor = () => {
    this.setState({ isEditOpen: true });
  };
  closeUpdateDonor = () => {
    this.setState({ isEditOpen: false });
  };
  closeModal = () => {
    this.setState({ isOpen: false });
  };
  componentWillUnmount() {
    this.props.reset();
  }
  handleChange = (e) => {
    const key = e.target.name;
    let { data } = this.state;
    data[key] = e.target.value;
    this.setState({ data });
  };
  deleteDonor = () => {
    const { searchedData } = this.props;
    this.props.deleteDonor(searchedData, () => {
      this.props.reset();
    });
  };
  search = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const { Email_id } = data;

    if (Email_id) {
      this.props.reset();
      this.props.getDonorByEmailId(data, () => {
        history.push("/");
      });
    } else {
      alert("Please enter valid data");
    }
  };
  render() {
    const { Email_id } = this.state.data;
    const { isOpen, isEditOpen } = this.state;
    const { searchedData } = this.props;
    return (
      <React.Fragment>
        <div className="card" style={{ textAlign: "left" }}>
          <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>
            Search Donor
            <button
              style={{
                margin: "10px",
                display: "inline-block",
                float: "right",
              }}
              className="commonbtn"
              onClick={() => {
                history.push("/AddDonor");
              }}
            >
              Add Donor
            </button>
          </h4>
          <form onSubmit={this.search}>
            <div style={{ margin: "10px", display: "inline-block" }}>
              <label>Email : </label>
              <input
                type="email"
                name="Email_id"
                value={Email_id}
                onChange={this.handleChange}
              />
            </div>
            <div style={{ margin: "10px", display: "inline-block" }}>
              <button type="submit" className="commonbtn">
                Search
              </button>
            </div>
          </form>
        </div>
        {searchedData && (
          <div className="card">
            <div
              style={{
                textAlign: "left",
                marginLeft: "10px",
                marginRight: "10px",
                borderBottom: "grey solid 1px",
                marginBottom: "5px",
                cursor: "pointer",
              }}
            >
              <div style={{ minWidth: "220px", display: "inline-block" }}>
                Donor Name
              </div>
              <div style={{ minWidth: "150px", display: "inline-block" }}>
                Blood Group
              </div>
              <div style={{ minWidth: "200px", display: "inline-block" }}>
                Street
              </div>
              <div style={{ minWidth: "200px", display: "inline-block" }}>
                City
              </div>
              <div style={{ minWidth: "250px", display: "inline-block" }}>
                Add Blood Unit
              </div>
              <div style={{ minWidth: "50px", display: "inline-block" }}>
                Edit
              </div>
              <div style={{ minWidth: "70px", display: "inline-block" }}>
                Delete
              </div>
              <div style={{ minWidth: "230px", display: "inline-block" }}>
                Emergency Contact
              </div>
            </div>
            <div
              style={{
                textAlign: "left",
                marginLeft: "10px",
                marginRight: "10px",
                borderBottom: "grey solid 1px",
                marginBottom: "5px",
                cursor: "pointer",
              }}
            >
              <div style={{ minWidth: "220px", display: "inline-block" }}>
                {searchedData.Name}
              </div>
              <div style={{ minWidth: "150px", display: "inline-block" }}>
                {searchedData.Blood_group}
              </div>
              <div style={{ minWidth: "200px", display: "inline-block" }}>
                {searchedData.Street}
              </div>
              <div style={{ minWidth: "200px", display: "inline-block" }}>
                {searchedData.City}
              </div>
              <div
                style={{ minWidth: "250px", display: "inline-block" }}
                onClick={this.addUnit}
              >
                <a href="#">Add Blood Unit</a>
              </div>
              <div
                style={{ minWidth: "50px", display: "inline-block" }}
                onClick={this.updateDonor}
              >
                {" "}
                <a href="#">Edit</a>
              </div>
              <div
                style={{ minWidth: "70px", display: "inline-block" }}
                onClick={this.deleteDonor}
              >
                <a href="#">Delete</a>
              </div>
              <div
                style={{ minWidth: "230px", display: "inline-block" }}
                onClick={() => {
                  history.push(
                    `/ListEmergencyContacts/${searchedData.Donor_id}/${searchedData.Name}`
                  );
                }}
              >
                <a href="#">Get</a>
              </div>
            </div>
          </div>
        )}
        {searchedData && (
          <Modal open={isOpen} closeHandler={this.closeModal}>
            <AddBloodUnit
              closeModal={this.closeModal}
              Donor_id={searchedData.Donor_id}
            />
          </Modal>
        )}
        {searchedData && (
          <Modal open={isEditOpen} closeHandler={this.closeUpdateDonor}>
            <UpdateDonor
              closeModal={this.closeUpdateDonor}
              data={searchedData}
            />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.app.allOperators,
    searchedData: state.app.searchDonor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDonorByEmailId: (data) => {
      dispatch(getDonorByEmailId(data));
    },
    deleteDonor: (data, callback) => {
      dispatch(deleteDonor(data, callback));
    },
    reset: () => {
      dispatch(addSearchDonorList(null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchDonor);
