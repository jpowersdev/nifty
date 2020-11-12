import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Title, Content, List } from "../../styles/components";
import Slide from "../Slide";

export default function ApproveList() {
  const dispatch = useDispatch();
  const { approved, list } = useSelector((state: RootState) => state);
  return (
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
  );
}
