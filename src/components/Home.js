import axios from "axios";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import { FormControl } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import { Paper, Grid, FormGroup } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Fab } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { positions, zIndex } from "@material-ui/system";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 16,
    margin: 20,
    maxWidth: "1000",
  },
  input: {
    display: "none",
  },
}));

function Home() {
  const classes = useStyles();
  var [email, setEmail] = useState("");
  const [dense, setDense] = React.useState(false);
  var [loading, setLoadings] = useState(false);
  var [files, setFiles] = useState([]);
  var [validateEmail, setValidateEmail] = useState({ ok: true, error: "" });
  var [alert, setAlert] = useState({
    type: "success",
    message: "Welcome To File Upload",
  });
  var [isAlert, setIsAlert] = useState(false);
  const doAlert = (type, message, time = 2500) => {
    setTimeout(() => {
      handleAlertClose();
    }, time);
    setIsAlert(true);
    setAlert({ type: type, message: message });
  };
  const handleAlertClose = (e) => {
    setIsAlert(false);
  };

  const getFileSize = (size) => {
    if (size > 1000 * 1000 * 1000) {
      return (size / (1000 * 1000 * 1000)).toFixed(2) + " GB";
    } else if (size > 1000 * 1000) {
      return (size / (1000 * 1000)).toFixed(2) + " MB";
    } else if (size > 1000) {
      return (size / 1000).toFixed(2) + " KB";
    }
  };

  const handleSubmit = async (e) => {
    setLoadings(true);
    console.log("Submit Form Clicked");
    e.preventDefault();
    const formData = new FormData();
    for (var j = 0; j < files.length; j++) {
      formData.append("files", files[j]);
    }
    formData.append("email", email);
    formData.forEach((data) => console.log(data));
    console.log(formData.get("email"));
    var config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    await axios
      .post("https://localhost:44319/api/FileUpload/", formData, config)
      .then((success) => {
        setFiles([]);
        setEmail("");
        doAlert(
          "success",
          "File Uploaded Successfully. We Sent You Download Link On Provided E-Mail Address.",
          90000
        );
        setLoadings(false);
        console.log(success);
      })
      .catch((error) => {
        doAlert("error", error.message);
        console.log(error);
        setLoadings(false);
      });
  };
  const handleEmail = async (e) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(e.target.value)) {
      console.log("Email Not Valid.");
      setValidateEmail({ ok: false, error: "Email Is Not Valid." });
    } else {
      setValidateEmail({ ok: true, error: "" });
    }
    await setEmail(e.target.value);
    console.log(email);
  };
  const handleFiles = async (e) => {
    console.log(e.target.files);
    var data = [...files];
    for (var i = 0; i < e.target.files.length; i++) {
      if (
        data.filter((file) => {
          return file.name === e.target.files[i].name;
        }).length == 0
      ) {
        data = [...data, e.target.files[i]];
      } else {
        doAlert("warning", e.target.files[i].name + " File Already Exists");
      }
      //   data.push(e.target.files[i]);
    }
    await setFiles(data);
    console.log("Files Start");
    console.log(files);
    console.log("Files End");
  };
  const handleDelete = async (e, key) => {
    console.log(e.target.value);
    console.log(e.currentTarget.value);
    console.log(key);
    const targetInedex = key;
    console.log(targetInedex);
    var data = files.filter((file, index) => {
      return index != targetInedex;
    });
    await setFiles(data);
  };
  return (
    <div>
      <Container maxWidth="lg">
        {isAlert ? (
          <Alert
            styple={{ margin: 15 }}
            severity={alert.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleAlertClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {alert.message}
          </Alert>
        ) : null}
        <FormControl>
          <form onSubmit={handleSubmit}>
            <Paper className={classes.paper}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    id="user-email"
                    type="email"
                    name="email"
                    onChange={handleEmail}
                    value={email}
                    error={!validateEmail.ok}
                    helperText={validateEmail.error}
                    required
                    disabled={loading}
                  />
                </Grid>
              </Grid>
              {/* <label htmlFor="user-email">
                Email
                <input
                  id="user-email"
                  type="email"
                  name="email"
                  onChange={handleEmail}
                  value={email}
                  required
                ></input>
              </label>
              <br></br> */}
              <label htmlFor="user-files">
                <input
                  type="file"
                  name="files"
                  id="user-files"
                  onChange={handleFiles}
                  multiple
                  className={classes.input}
                  required
                  disabled={loading}
                ></input>
                <Fab
                  disabled={loading}
                  color="primary"
                  aria-label="add"
                  onClick={() => {
                    document.getElementById("user-files").click();
                  }}
                  style={{ margin: 15 }}
                >
                  <AddIcon />
                </Fab>
                Add Files
              </label>
              {Array.from(files).map((file, key) => (
                <List key={key}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography nowrap={true}>{file.name} </Typography>
                      }
                      secondary={getFileSize(file.size)}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={(e) => handleDelete(e, key)}
                        value={key}
                        disabled={loading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              ))}
              <br></br>
              {loading ? <Loader /> : null}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Uploading Files..." : "Upload"}
              </Button>
            </Paper>
          </form>
        </FormControl>
      </Container>
    </div>
  );
}

export default Home;
