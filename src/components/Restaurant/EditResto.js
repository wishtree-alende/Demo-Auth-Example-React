import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import InputField from "../InputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import restoService from "../../services/resto.service";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const addRestoFormSchema = yup.object().shape({
  //   id: yup.string().required("Id is required"),
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  phonenumber: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  opentime: yup.string().required("Open time is required"),
  closetime: yup.string().required("Close time is required"),
});
const EditResto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [restoData, setRestoData] = useState({});
  // const [value1, setValue1] = React.useState(dayjs(location.state.opentime));
  // const [value2, setValue2] = React.useState(dayjs(location.state.closetime));
  // const handleChange = (newValue) => {
  //   setValue1(newValue);
  // };
  // const handleChangeclose = (newValue) => {
  //   setValue2(newValue);
  // };
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addRestoFormSchema),
  });

  useEffect(() => {
    // axios
    //   .get(`http://localhost:8080/data/show/${location.state}`)
    restoService
      .showById(location.state)
      .then((resto) => {
        const fields = [
          "name",
          "address",
          "phonenumber",
          "opentime",
          "closetime",
          "filename",
          "mimetype",
          "pic",
        ];
        fields.forEach((field) => setValue(field, resto.data[field]));

        setRestoData(resto);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  console.log("restoData", location);
  const submitData = async (data) => {
    console.log("Data in edit form", data);
    // try {
    // const response = await axios.put(
    //   `http://localhost:8080/data/change/${location.state}`,
    //   data
    // );
    restoService
      .updateRestoById(location.state, data)
      .then((response) => {
        if (response.status === 200) {
          console.log("response data", response.data);
          Swal.fire("Data updated successfully!", "", "success");
          navigate("/restoList");
          reset({
            name: "",
            address: "",
            phonenumber: "",
            opentime: "",
            closetime: "",
            filename: "",
            mimetype: "",
            pic: "",
          });
        }
      })
      .catch((error) => {
        Swal.fire("Something went wrong!!", "", "error");
        console.log(error);
      });
  };
  return (
    <>
      <div className="main-card">
        <div className="breadcrumb-wrapper">
          <div className="container">
            <ul className="breadcrumb">
              <li>
                <Link to="/restoList">Restaurants</Link>
              </li>
              <li>Edit Restaurant</li>
            </ul>
          </div>
        </div>
        <section className="edit-section">
          <div className="container">
            <form onSubmit={handleSubmit(submitData)}>
              <div className="form-header flex-between">
                <h2 className="add-heading">Edit Restaurant</h2>
              </div>
              <div className="card-wrapper">
                <div className="card-block flex-between">
                  <div className="card-form-field">
                    <div className="add-form-group">
                      <label htmlFor="name">
                        Name <span className="mandatory">*</span>
                      </label>

                      <TextField
                        fullWidth
                        className={`input-field ${
                          errors.name && "input-error"
                        }`}
                        id="outlined-basic"
                        placeholder="Enter name"
                        variant="outlined"
                        {...register("name")}
                      />
                      <p className={`password-error`}>
                        {errors?.name ? (
                          errors.name?.message
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="card-form-field">
                    <div className="add-form-group">
                      <label htmlFor="phonenumber">
                        Phone number <span className="mandatory">*</span>
                      </label>

                      <TextField
                        fullWidth
                        className={`input-field ${
                          errors.phonenumber && "input-error"
                        }`}
                        id="outlined-basic"
                        placeholder="Enter phonenumber"
                        variant="outlined"
                        {...register("phonenumber")}
                        //   helperText={errors.email ? errors.email.message : " "}
                      />
                      <p className={`password-error`}>
                        {errors?.phonenumber ? (
                          errors.phonenumber?.message
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* <div> */}
                  <div className="card-form-field">
                    <div className="add-form-group">
                      <label htmlFor="opentime">
                        Open time
                        {/* <span className="mandatory">*</span> */}
                      </label>
                      <TextField
                        fullWidth
                        className={`input-field ${
                          errors.address && "input-error"
                        }`}
                        id="outlined-basic"
                        placeholder="Enter opentime"
                        variant="outlined"
                        {...register("opentime")}
                        disabled
                        //   helperText={errors.email ? errors.email.message : " "}
                      />
                      <p className={`password-error`}>
                        {errors?.opentime ? (
                          errors.opentime?.message
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p>{" "}
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          className={`input-field ${
                            errors.opentime && "input-error"
                          }`}
                          // value={value1}
                          onChange={handleChange}
                          renderInput={(params) => (
                            <TextField {...params} {...register("opentime")} />
                          )}
                        />
                        <p className={`password-error`}>
                          {errors?.opentime ? (
                            errors.opentime?.message
                          ) : (
                            <span>&nbsp;</span>
                          )}
                        </p>
                      </LocalizationProvider> */}
                    </div>
                  </div>
                  <div className="card-form-field">
                    <div className="add-form-group">
                      <label htmlFor="closetime">
                        Close time
                        {/* <span className="mandatory">*</span> */}
                      </label>

                      <TextField
                        fullWidth
                        className={`input-field ${
                          errors.address && "input-error"
                        }`}
                        id="outlined-basic"
                        placeholder="Enter closetime"
                        variant="outlined"
                        disabled
                        {...register("closetime")}
                        //   helperText={errors.email ? errors.email.message : " "}
                      />
                      <p className={`password-error`}>
                        {errors?.closetime ? (
                          errors.closetime?.message
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p>
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          className={`input-field ${
                            errors.closetime && "input-error"
                          }`}
                          value={value2}
                          onChange={handleChangeclose}
                          renderInput={(params) => (
                            <TextField {...params} {...register("closetime")} />
                          )}
                        />
                        <p className={`password-error`}>
                          {errors?.closetime ? (
                            errors.closetime?.message
                          ) : (
                            <span>&nbsp;</span>
                          )}
                        </p>
                      </LocalizationProvider> */}
                    </div>
                  </div>
                  {/* </div> */}

                  <div className="card-form-field">
                    <div className="add-form-group">
                      <label htmlFor="address">
                        Address <span className="mandatory">*</span>
                      </label>

                      <TextField
                        fullWidth
                        className={`input-field ${
                          errors.address && "input-error"
                        }`}
                        id="outlined-basic"
                        placeholder="Enter address"
                        variant="outlined"
                        {...register("address")}
                        //   helperText={errors.email ? errors.email.message : " "}
                      />
                      <p className={`password-error`}>
                        {errors?.address ? (
                          errors.address?.message
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="btn-class">
                  <button
                    type={"reset"}
                    onClick={() => navigate("/restoList")}
                    className="smt-btn cancel"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="smt-btn save">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditResto;
