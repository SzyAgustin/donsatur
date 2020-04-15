import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CustomDatePicker from "../custom-date-picker/custom-date-picker.component";
import TurnoService from "../../services/turno.service";
import { firestore } from '../../firebase/firebase.utils';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const FormTurno = () => {
  const handleOnChange = (e) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    console.log(inputs);
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
  };
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    age: 18,
    email: "",
  });

  const date = useSelector((state) => state.form.dateSelected);

  const submitTurno = async (e) => {
    e.preventDefault();
    console.log(date);
    // TurnoService.setTurno({...inputs, date});
    firestore.collection("turnos")
      .add({
        nombre: inputs.name,
        apellido: inputs.lastName,
        edad: inputs.age,
        email: inputs.email,
        fecha: date,
        postaId: "2",
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={require('../../assets/donarg-icon.png')}/>
        <Typography component="h1" variant="h5">
          Donarg Turnos
        </Typography>
        <form
          id="formTurno"
          className={classes.form}
          noValidate
          onSubmit={submitTurno}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nombre"
                autoFocus
                onChange={handleOnChange}
                value={inputs.name}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="lname"
                onChange={handleOnChange}
                value={inputs.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="age"
                label="Edad"
                name="age"
                autoComplete="lage"
                type="number"
                onChange={handleOnChange}
                value={inputs.age}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleOnChange}
                value={inputs.email}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomDatePicker />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Solicitar Turno
          </Button>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};

export default FormTurno;
