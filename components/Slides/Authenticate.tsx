import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Title, Content, Form } from "../../styles/components";
import Slide from "../Slide";

export default function Authenticate() {
  const { handleSubmit, register } = useForm();

  const dispatch = useDispatch();
  const { siteurl, approved, auth, authenticating } = useSelector(
    (state: RootState) => state
  );

  const setCredentials = async (values) => {
    dispatch({
      type: "START_AUTHENTICATING",
    });
    const { username, password } = values;
    const response = await fetch(siteurl + "/wp-json/jwt-auth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const { success, data } = await response.json();
    if (success) {
      dispatch({
        type: "SET_AUTH",
        payload: {
          token: data.token,
          user_nicename: data.nicename,
        },
      });
    } else {
      alert("Failed to authenticate. Please check your credentials");
    }
    dispatch({
      type: "STOP_AUTHENTICATING",
    });
  };
  return (
    <Slide show={approved && !auth}>
      <Title>Enter your WP Credentials</Title>
      <Content>
        <Form onSubmit={handleSubmit(setCredentials)}>
          <label>
            Username
            <input type="text" name="username" ref={register}></input>
          </label>
          <label>
            Password
            <input type="password" name="password" ref={register}></input>
          </label>
          <input
            disabled={authenticating}
            type="submit"
            value={authenticating ? "Authenticating..." : "Authenticate"}
          />
        </Form>
      </Content>
    </Slide>
  );
}
