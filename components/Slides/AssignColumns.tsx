import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store";
import { Title, Content } from "../../styles/components";
import Slide from "../Slide";

const WP_FIELDS = ["title", "slug", "date", "content"];

export default function AssignColumns() {
  const dispatch = useDispatch();
  const { columnMappings, list } = useSelector((state: RootState) => state);

  const { register, handleSubmit } = useForm();

  function onSubmit(payload) {
    dispatch({ type: "ASSIGN_COLUMNS", payload });
  }

  return (
    <Slide show={list.length > 0 && !columnMappings}>
      <Title>Assign Columns</Title>
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {list[0] &&
            Object.keys(list[0]).map((key) => (
              <fieldset key={key}>
                <label>{key}</label>
                <span>{"=>"}</span>
                <select name={key} defaultValue={key} ref={register}>
                  {WP_FIELDS.map((field) => (
                    <option key={field} value={field} label={field}></option>
                  ))}
                </select>
              </fieldset>
            ))}
          <input type="submit" value="Approve" />
        </Form>
      </Content>
    </Slide>
  );
}

const Form = styled.form`
  background: #f9f9f9;
  padding: 10px;

  fieldset {
    border: none;
    display: grid;
    grid-template-columns: 1fr 40px 1fr;
    align-items: center;

    label {
      margin-right: 20px;
    }
  }
  input[type="submit"] {
    margin-top: 10px;
  }
`;
