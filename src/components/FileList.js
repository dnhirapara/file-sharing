import { Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

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
  const history = useHistory();
  const classes = useStyles();
  let { id } = useParams();
  const [files, setFiles] = useState([]);
  useEffect(async () => {
    await axios
      .get("https://localhost:44319/api/FileUpload/?key=" + id)
      .then((success) => {
        setFiles(success.data);
      })
      .catch(() => {
        history.push("/error");
      });
  }, [setFiles]);

  const handleDonwload = async (key, filename) => {
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
      })
      .catch(() => {});
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
                      onClick={() => handleDonwload(file.Path, file.FileName)}
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
