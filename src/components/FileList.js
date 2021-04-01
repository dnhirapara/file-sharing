import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";
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
import FolderIcon from "@material-ui/icons/Folder";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Fab } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
const Fs = require("fs");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    // color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: "#303F9F",
  },
}));

function FileList() {
  const classes = useStyles();
  let { id } = useParams();
  const [files, setFiles] = useState([]);
  useEffect(async () => {
    await axios
      .get("https://localhost:44319/api/FileUpload/?key=" + id)
      .then((success) => {
        setFiles(success.data);
        console.log(JSON.stringify(success));
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }, [setFiles]);

  const handleDonwload = async (key, filename) => {
    console.log(key);
    const config = {
      responseType: "blob",
    };
    await axios
      .get("https://localhost:44319/api/FileUpload/?fileKey=" + key, config)
      .then((success) => {
        const url = window.URL.createObjectURL(new Blob([success.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });
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

  return (
    <div>
      <Container maxWidth="md">
        <h1>File List : {id}</h1>
        <Paper variant="outlined">
          {files.map((file, key) => (
            <>
              <List key={key}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.purple}>{key + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={file.FileName}
                    secondary={getFileSize(file.Length)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => handleDonwload(file.Path, file.FileName)}
                    >
                      <CloudDownloadIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              {/* <a
                href={
                  "https://localhost:44319/api/FileUpload/?fileKey=" + file.Path
                }
              >
                Download
              </a> */}
            </>
          ))}
        </Paper>
      </Container>
    </div>
  );
}

export default FileList;
