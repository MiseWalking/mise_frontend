import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { userService } from "./userService.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #fffff",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function JoinModal(props) {
  let { handleOpen, open } = props;
  const [userName, setUserName] = React.useState();
  const [userPass, setPass] = React.useState();
  const [userAge, setUserAge] = React.useState();
  const [userGender, setUserGender] = React.useState();
  const [userHeight, setUserHeight] = React.useState();
  const [userObject, setUserObject] = React.useState();

  const [isOpen, setOpen] = React.useState(false);

  async function checkIsEqual() {
    if (
      !userName ||
      !userPass ||
      !userAge ||
      !userGender ||
      !userHeight ||
      !userObject
    ) {
      alert("항목을 모두 입력해주세요.");
      return false;
    }
    const resJson = await userService.signUp(
      userName,
      userPass,
      userAge,
      userGender,
      userHeight,
      userObject
    );
    console.log(resJson);
    // if ( === 201) {
    handleClose();
    // }
  }
  useEffect(() => {
    setOpen(open);
  }, [open]);
  const handleClose = () => {
    setUserName("");
    setUserAge("");
    setUserGender("");
    setUserHeight("");
    setUserObject("");
    setPass("");
    setOpen(false);
    handleOpen();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2 style={{ color: "black" }}>회원 가입</h2>
            <TextField
              id="userName"
              label="이름*"
              variant="outlined"
              style={{ width: "70%", marginBottom: "10px" }}
              onChange={(newValue) => setUserName(newValue.target.value)}
            />
            <TextField
              id="userPass"
              label="비밀번호*"
              variant="outlined"
              style={{ width: "70%", marginBottom: "10px" }}
              onChange={(newValue) => setPass(newValue.target.value)}
            />
            <TextField
              id="userAge"
              label="나이"
              variant="outlined"
              style={{
                width: "35%",
                marginBottom: "10px",
                marginRight: "3px",
              }}
              onChange={(newValue) => setUserAge(newValue.target.value)}
            />
            <TextField
              id="userGender"
              label="성별"
              variant="outlined"
              style={{
                width: "34%",
                marginBottom: "10px",
                marginLeft: "3px",
              }}
              onChange={(newValue) => setUserGender(newValue.target.value)}
            />
            <TextField
              id="userHeight"
              label="키"
              variant="outlined"
              style={{
                width: "35%",
                marginBottom: "10px",
                marginRight: "3px",
              }}
              onChange={(newValue) => setUserHeight(newValue.target.value)}
            />
            <TextField
              id="userObject"
              label="목표 운동량"
              variant="outlined"
              style={{
                width: "34%",
                marginBottom: "10px",
                marginLeft: "3px",
              }}
              onChange={(newValue) => setUserObject(newValue.target.value)}
            />
            <button onClick={() => checkIsEqual()}> 회원 가입 </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
