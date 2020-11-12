import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Title, Content, List } from "../../styles/components";
import Slide from "../Slide";

export default function Results() {
  const { uploading, done } = useSelector((state: RootState) => state);
  return (
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
  );
}
