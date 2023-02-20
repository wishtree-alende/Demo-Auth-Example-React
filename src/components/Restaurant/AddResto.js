import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import InputField from "../InputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, TextField } from "@mui/material";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
  // phonenumber: yup.string().required("Phone number is required"),
  phonenumber: yup
    .string()
    .required("Phone number is required")
    .max(10, "Phone number must be 10 digits")
    .matches(phoneRegExp, "Phone number is not valid"),

  opentime: yup.string(),
  // .required("Open time is required"),
  closetime: yup.string(),
  // .required("Close time is required"),
  file: yup.string(),
});
const AddResto = () => {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState({ file: null });
  const [restoId, setRestoId] = useState("");
  const [value, setValue] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleChangeclose = (newValue) => {
    setValue2(newValue);
  };
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addRestoFormSchema),
  });

  const handleChangeImage = (event) => {
    let formData = new FormData();

    formData.append("file", imageData);
    // setRestoData({ file: imageData });
  };

  const submitData = async (data) => {
    // let formData = new FormData();
    // let formData = new FormData();
    let formData = new FormData();

    formData.append("document", imageData);
    formData.append("document", JSON.stringify(data));
    console.log("Formdata****", typeof formData);

    formData.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
    });
    try {
      console.log("Data in add form", imageData);
      // const response = await axios.post(
      //   "http://localhost:8080/data/add",
      restoService
        .addResto(
          data
          // imageData,
          // {
          //   headers: {
          //     type: "application/json",
          //     "Content-Type": "multipart/form-data",
          //   },
          // }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log("response data", response.data.id);
            setRestoId(response.data.id);
            Swal.fire("Data added successfully!", "", "success");
            navigate("/restoList");
            reset({
              name: "",
              address: "",
              phonenumber: "",
              opentime: "",
              closetime: "",
              // file: "",
            });
          }
        });
    } catch (error) {
      Swal.fire("Something went wrong!!", "", "error");
      console.log(error);
    }
  };
  console.log("Restodata", restoId);
  return (
    <>
      <div className="main-card">
        <div className="breadcrumb-wrapper">
          <div className="container">
            <ul className="breadcrumb">
              <li>
                <Link to="/restoList">Restaurants</Link>
              </li>
              <li>Add Restaurant</li>
            </ul>
          </div>
        </div>
        <section>
          <div className="container">
            <form
              onSubmit={handleSubmit(submitData)}
              enctype="multipart/form-data"
            >
              <div className="form-header flex-between">
                <h2 className="add-heading">Add Restaurant</h2>
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
                        autoComplete={"off"}
                        //   helperText={errors.email ? errors.email.message : " "}
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
                        inputProps={{ maxLength: 10 }}
                        {...register("phonenumber")}
                        autoComplete={"off"}
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

                  <div className="card-form-field">
                    <div className="add-form-group">
                      <label htmlFor="opentime">
                        Open time <span className="mandatory">*</span>
                      </label>

                      {/* <TextField
                        fullWidth
                        className={`input-field ${
                          errors.address && "input-error"
                        }`}
                        id="outlined-basic"
                        placeholder="Enter opentime"
                        variant="outlined"
                        {...register("opentime")}
                        //   helperText={errors.email ? errors.email.message : " "}
                      /> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          fullWidth
                          // className={`input-field
                          // ${errors.opentime && "input-error"}
                          // `}
                          // label={!value ? "Select open time" : ""}
                          value={value}
                          placeholder={"Select open time"}
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
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="card-form-field">
                    <div className="add-form-group">
                      <label htmlFor="closetime">
                        Close time <span className="mandatory">*</span>
                      </label>

                      {/* <TextField
                        fullWidth
                        className={`input-field ${
                          errors.address && "input-error"
                        }`}
                        id="outlined-basic"
                        placeholder="Enter closetime"
                        variant="outlined"
                        {...register("closetime")}
                        //   helperText={errors.email ? errors.email.message : " "}
                      />
                      <p className={`password-error`}>
                        {errors?.closetime ? (
                          errors.closetime?.message
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p> */}

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          fullWidth
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
                      </LocalizationProvider>
                    </div>
                  </div>

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
                  {/* <div className="card-form-field">
                    <div className="add-form-group">
                      <label htmlFor="file">Image</label>

                      <input
                        type="file"
                        multiple={false}
                        name="file"
                        // style="width: 210px"
                        // accept=".png,.jpg,.jpeg,.jfif"
                        onChange={(event) => {
                          setImageData({ file: event.target.files[0] });

                          handleChangeImage(event);
                        }}
                      />
                    </div>
                  </div> */}
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
                    Save
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

export default AddResto;
