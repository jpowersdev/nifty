import Head from "next/head";
import CSVReader from "react-csv-reader";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled, { createGlobalStyle } from "styled-components";
import Sidebar from "../components/Sidebar";
import { initializeStore, RootState } from "../store";
import Slide from "../components/Slide";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "rc-progress";
import { VscTriangleRight } from "react-icons/vsc";

export default function Home() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const {
    siteurl,
    list,
    auth,
    done,
    authenticating,
    approved,
    uploading,
  } = useSelector((state: RootState) => state);

  // useEffect(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // }, [done]);

  async function upload(list) {
    dispatch({
      type: "START_UPLOADING",
    });
    for (const item of list) {
      const date = moment(item.date).isValid()
        ? moment(item.date).format()
        : null;
      const res = await fetch(siteurl + "/wp-json/wp/v2/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          ...item,
          date,
          status: "publish",
        }),
      }).then((res) => res.json());
      dispatch({
        type: "ADD_DONE",
        payload: res,
      });
    }
    dispatch({
      type: "STOP_UPLOADING",
    });
  }

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

    const { token, user_nicename } = await response.json();
    if (token) {
      dispatch({
        type: "SET_AUTH",
        payload: {
          token,
          user_nicename,
        },
      });
    } else {
      alert("Failed to authenticate. Please check your credentials");
    }
    dispatch({
      type: "STOP_AUTHENTICATING",
    });
  };

  const handleSiteUrl = (values) => {
    dispatch({ type: "CHANGE_SITE_URL", payload: values.siteurl });
  };

  return (
    <Page>
      <Head>
        <title>Importer | NiftyWP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar siteurl={siteurl} csv={list.length > 0} />

      <Main>
        <Slide show={!siteurl}>
          <Title>Enter WordPress Site URL</Title>
          <Content>
            <Info>
              <ul>
                <li>
                  <VscTriangleRight />
                  <span>
                    For Example:
                    <br />
                    <em>https://website.com</em>
                    <br />
                    <em>https://multisite.com/site</em>
                  </span>
                </li>
                <li>
                  <VscTriangleRight />
                  No Trailing Slash
                </li>
              </ul>
            </Info>
            <Form onSubmit={handleSubmit(handleSiteUrl)}>
              <input
                type="text"
                name="siteurl"
                placeholder="Enter Site URL"
                ref={register}
              />
              <input type="submit" value="Save" />
            </Form>
          </Content>
        </Slide>
        <Slide show={siteurl && list.length === 0}>
          <Title>Select CSV File</Title>
          <Content>
            <Info>
              <p>
                Must contain <code>slug</code>, <code>title</code>,{" "}
                <code>date</code>, and <code>content</code>.
              </p>
              <p>All other fields will be ignored.</p>
            </Info>
            <CSVReader
              parserOptions={{ header: true }}
              onFileLoaded={(data, fileInfo) =>
                dispatch({
                  type: "SET_LIST",
                  payload: data,
                })
              }
            />
          </Content>
        </Slide>
        <Slide show={list.length > 0 && !approved}>
          <Title>Approve List</Title>
          <Content>
            <div style={{ textAlign: "left" }}>
              <small>{list.length} items loaded</small>
            </div>
            <List>
              {list?.map((item) => {
                return <li key={item.slug}>{item.title}</li>;
              })}
            </List>
            <button onClick={() => dispatch({ type: "APPROVE_LIST" })}>
              Approve
            </button>
          </Content>
        </Slide>
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
        <Slide show={auth && siteurl && (uploading || done.length === 0)}>
          <Title>Start Upload</Title>
          <Content>
            <em>
              Do not close this window until it is finished or you will have to
              start over.
            </em>
            <br />
            {uploading ? (
              <Line
                className="progress"
                percent={Math.round((done.length / list.length) * 100)}
              />
            ) : (
              <button onClick={() => upload(list)}>Start Upload</button>
            )}
          </Content>
        </Slide>
        <Slide show={!uploading && done.length > 0}>
          <Title>Successful Uploads: {done.length}</Title>
          <Content>
            <List className="small">
              {done.map((item) => (
                <li key={item.id}>
                  {item.id} - {item.slug}
                </li>
              ))}
            </List>
          </Content>
        </Slide>
      </Main>
      <Global />
    </Page>
  );
}

const Global = createGlobalStyle`
  body {
    background-color: #eee;
  }
`;

const Info = styled.div`
  padding: 10px;
  box-shadow: 0 2px 4px rgba(50, 50, 50, 0.1);
  background-color: rgba(150, 150, 150, 0.1);
  margin: 20px 0;

  p {
    margin: 0.25rem 0;
    font-size: 0.85rem;
  }

  ul {
    padding-left: 0px;
    list-style: none;

    li {
      display: flex;
      align-items: flex-start;
      margin: 0.5rem 0;

      svg {
        font-size: 0.75em;
        margin-right: 0.75em;
        margin-top: 1.5%;
      }
    }
  }
`;

const Title = styled.h2`
  position: sticky;
  top: 0;
  background: white;
  padding: 20px 20px 0px 20px;
`;

const Content = styled.div`
  padding: 0px 20px 20px 20px;
`;

const List = styled.ul<{ small?: boolean }>`
  text-align: left;
  list-style: none;
  padding: 10px;
  margin: 5px 0;

  &:not(.small) {
    height: 250px;
    overflow-y: auto;
    box-shadow: inset 0px 0px 6px black;
  }

  &.small {
    font-size: ${(props) => (props.small ? "0.75rem" : "auto")};
  }
`;

const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

const Main = styled.main`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  overflow-y: auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    margin: 4px 0 !important;
  }
`;

export function getServerSideProps() {
  const reduxStore = initializeStore();

  return { props: { initialReduxState: reduxStore.getState() } };
}
