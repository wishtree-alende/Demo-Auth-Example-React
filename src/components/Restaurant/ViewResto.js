import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewResto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location.state.filename", location.state.filename);
  return (
    <>
      <div className="main-card">
        <div className="card-section">
          <Card sx={{ maxWidth: 500 }} className="main-card-body">
            {location.state.filename ? (
              <CardMedia
                component="img"
                height="140"
                image={location.state.filename}
                alt="green iguana"
              />
            ) : // <img src={location.state.filename} alt="" />
            null}
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="card-title"
              >
                Restaurant Details
              </Typography>
              <div className="card-div">
                <div>
                  <h3>Name : </h3>
                  <label>{location.state.name}</label>
                </div>
                <div>
                  <h3>Address : </h3>
                  <label>{location.state.address}</label>
                </div>
                <div>
                  <h3>Opentime : </h3>
                  <label>{location.state.opentime}</label>
                </div>
                <div>
                  <h3>Closetime : </h3>
                  <label>{location.state.closetime}</label>
                </div>
                {/* <div>
                  <h3>image : </h3>
                  <img
                    className="img-fluid"
                    src={location.state.filename}
                    alt=""
                  />
                </div> */}
              </div>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={(event) => {
                  navigate("/editResto", { state: location.state.id });
                }}
                className={"smt-btn view-btn"}
              >
                Edit
              </Button>
              <Button
                style={{ marginLeft: "25px" }}
                size="small"
                onClick={(event) => navigate("/restoList")}
                className={"smt-btn view-btn"}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ViewResto;
