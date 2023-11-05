import React, { useState, useEffect } from "react";
import Introduction from "./MainItems/Introduction";
import AboutHome from "./MainItems/AboutHome";
import AboutSchool from "./MainItems/AboutSchool";
import Activities from "./MainItems/Activities";
import Newsletter from "./MainItems/Newsletter";
import { StyledMain } from "./styles";
import AboutSchoolNo3D from "./MainItems/AboutSchoolNo3D";
import AboutHomeNo3D from "./MainItems/AboutHomeNo3D";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import IconModel from "../../../assets/3d-model.png";

const Main = () => {
  const [display3D, setDisplay3D] = useState(true);
  const [open, setOpen] = useState(false);

  const handleDisplayChange = (display) => {
    setDisplay3D(display);
    setOpen(false);
    localStorage.setItem("display3D", JSON.stringify(display));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  useEffect(() => {
    const storedDisplay = JSON.parse(localStorage.getItem("display3D"));
    if (storedDisplay !== null) {
      setDisplay3D(storedDisplay);
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleWindowUnload = () => {
      localStorage.removeItem("display3D");
    };

    window.addEventListener("beforeunload", handleWindowUnload);

    return () => {
      window.removeEventListener("beforeunload", handleWindowUnload);
    };
  }, []);

  return (
    <StyledMain style={{ position: "relative" }}>
      <button
        onClick={handleOpenDialog}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          cursor: "pointer",
        }}
      >
        <img
          src={IconModel}
          alt="3D Model"
          style={{ width: "50px", height: "50px", background: "#e7e7e7" }}
        />
      </button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        style={{backdropFilter: "blur(10px)"}}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, textAlign: "center" }}
          id="customized-dialog-title"
        >
          <ReportProblemIcon sx={{ fontSize: 36 }} />
        </DialogTitle>
        <DialogContent dividers style={{ textAlign: "center" }}>
          <h2>Zależy nam na twojej wygodzie</h2>
          <p>
            Ze względu na duże obciążenie modeli 3D, mogą mieć one wpływ na
            słabsze urządzenia. Czy chcesz je wyświetlać?
          </p>
          <p>
            Opcje mozesz zmienic w kazdej chwili klikając{" "}
            <img
              src={IconModel}
              alt="3D Model"
              style={{
                width: "35px",
                height: "35px",
                background: "none",
                verticalAlign: "middle",
              }}
            />
          </p>
          <Button
            autoFocus
            sx={{ mx: 1 }}
            onClick={() => handleDisplayChange(true)}
          >
            Tak
          </Button>
          <Button sx={{ mx: 1 }} onClick={() => handleDisplayChange(false)}>
            Nie
          </Button>
        </DialogContent>
      </Dialog>
      <Introduction />
      {display3D ? <AboutHome /> : <AboutHomeNo3D />}
      {display3D ? <AboutSchool /> : <AboutSchoolNo3D />}
      <Activities />
      <Newsletter />
    </StyledMain>
  );
};

export default Main;
