import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import classes from "./Auth.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSliceActions } from "../../store/auth";
import { fetchEmailActions } from "../../store/fetchemail";
import { sendEmailSliceActions } from "../../store/sendemail";

const Auth = () => {
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const handleClickShowPasswordOne = () => {
    setShowPasswordOne((show) => !show);
  };
  const handleClickShowPasswordTwo = () => {
    setShowPasswordTwo((show) => !show);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (name.length < 3 || password !== confirmPassword) {
      alert(
        "Invalid input: Name should be at least 3 characters and passwords should match."
      );
      setIsLoading(false);
      return;
    }
    let url;
    if (isLogin) {
      url = process.env.REACT_APP_SIGNIN;
    } else {
      url = process.env.REACT_APP_SIGNUP;
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error.message);
      }
      if (res.ok) {
        dispatch(
          authSliceActions.login({
            idToken: data.idToken,
            userEmail: data.email,
            userName: name,
          })
        );
        dispatch(fetchEmailActions.userEmail(data.email));
        dispatch(sendEmailSliceActions.userName(name));
        navigate("/", { replace: true });
      }

      setIsLoading(false);
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };
  const forgotPasswordHandler = () => {};
  return (
    <Grid>
      <Paper className={classes.paper} elevation={20}>
        <Card className={classes.card}>
          <Box className={classes.box}>
            <CardContent>
              <Typography component="div" variant="h3" align="center">
                {isLogin ? "LOGIN" : "SIGN UP"}
              </Typography>
              <Typography variant="caption" textAlign="center">
                {!isLogin
                  ? "Please Fill This Form To Create An Account!"
                  : "Please Fill This Form To Enter Into Your Account!"}
              </Typography>
              <form onSubmit={submitHandler}>
                <FormControl variant="standard" required fullWidth>
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    id="outlined-required text"
                    label="Name"
                    variant="standard"
                    fullWidth
                  />
                </FormControl>
                <FormControl variant="standard" required fullWidth>
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    id="outlined-required email"
                    type="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    inputProps={{ inputMode: "email" }}
                  />
                </FormControl>
                <FormControl variant="standard" required fullWidth>
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    id="standard-adornment-password"
                    fullWidth
                    type={showPasswordOne ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordOne}
                        >
                          {showPasswordOne ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl variant="standard" required fullWidth>
                  <InputLabel htmlFor="standard-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    id="standard-adornment-password confirm"
                    fullWidth
                    type={showPasswordTwo ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordTwo}
                        >
                          {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <div className={classes.action}>
                  {!isLoading && (
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.button}
                    >
                      {!isLogin ? "Sign Up" : "Log In"}
                    </Button>
                  )}
                  {isLoading && <p>Sending request..</p>}
                  <button
                    type="submit"
                    className={classes.forgot}
                    onClick={forgotPasswordHandler}
                  >
                    Forgot Password?
                  </button>
                  <button
                    type="button"
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}
                  >
                    {isLogin
                      ? "Create new account"
                      : "Login with existing account"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            className={classes.img}
            image="https://media.istockphoto.com/id/1285800846/photo/open-mailbox-with-letters-on-rural-backgound.jpg?s=612x612&w=0&k=20&c=cAg08sXDKlmyT7PTrok_mbiiPKvq09_G6etTmoTtvbk="
            alt="mailBox image"
          />
        </Card>
      </Paper>
    </Grid>
  );
};

export default Auth;
