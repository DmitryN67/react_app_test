import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const addCar = async (data) => {
  const url = `http://localhost:8000/api/cars/`;
  await axios.post(url, data).then((response) => response.data);
};
const updateCar = async (data) => {
  const url = `http://localhost:8000/api/cars/${data.id}/`;
  await axios.patch(url, data).then((response) => response.data);
};
// brand', 'car_model', 'slug', 'release_date', 'state_num', 'vin_num', 'owner', 'car_order'

const initialData = {
  brand: "",
  car_model: "",
  state_num: "",
  vin_num: "",
};

export default function UserForm({ data }) {
  const [open, setOpen] = React.useState(false);
  const [userValues, setUserValues] = useState(data ? data : initialData);
  const queryClient = useQueryClient();
  const mutationAdd = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries("cars");
    },
  });
  const mutationUpdate = useMutation(updateCar, {
    onSuccess: () => {
      queryClient.invalidateQueries("cars");
    },
  });

  const handleSubmit = () => {
    // const { data, error, mutate } = useSWR([url, userValues], addUser);
    if (!data) {
      mutationAdd.mutate(userValues);
    } else {

      mutationUpdate.mutate(userValues);
    }
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValues({
      ...userValues,
      [name]: value,
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="brand"
            name="brand"
            label="Brand"
            value={userValues.brand}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="car_model"
            name="car_model"
            label="Car model"
            value={userValues.car_model}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="state_num"
            name="state_num"
            label="State num"
            value={userValues.state_num}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="vin_num"
            name="vin_num"
            label="Vin num"
            value={userValues.vin_num}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add user</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
