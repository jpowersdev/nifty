import React from "react";
import { useForm } from "react-hook-form";
import { VscTriangleRight } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Title, Content, Info, Form } from "../../styles/components";
import Slide from "../Slide";

export default function GetSiteUrl() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const { siteurl } = useSelector((state: RootState) => state);

  const handleSiteUrl = (values) => {
    dispatch({ type: "CHANGE_SITE_URL", payload: values.siteurl });
  };

  return (
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
  );
}
