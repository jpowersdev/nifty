import React from "react";
import CSVReader from "react-csv-reader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Title, Content, Info } from "../../styles/components";
import Slide from "../Slide";

export default function SelectFile() {
  const dispatch = useDispatch();
  const { siteurl, list } = useSelector((state: RootState) => state);
  return (
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
          onFileLoaded={(data) =>
            dispatch({
              type: "SET_LIST",
              payload: data,
            })
          }
        />
      </Content>
    </Slide>
  );
}
