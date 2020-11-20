import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Title, Content, List } from "../../styles/components";
import Slide from "../Slide";

export default function Results() {
  const { uploading, done } = useSelector((state: RootState) => state);
  return (
    <Slide
      show={!uploading && (done.success.length > 0 || done.failure.length > 0)}
    >
      <Title>Upload Results</Title>
      <Content>
        <h3>Successful Uploads: {done.success.length}</h3>
        <List className="small">
          {done.success.map((item) => (
            <li key={item.id}>
              {item.id} - {item.slug}
            </li>
          ))}
        </List>
        <h3>Failed Uploads: {done.failure.length}</h3>
        <List className="small" style={{ padding: 0 }}>
          {done.failure.map((item, index) => (
            <li
              key={item.slug}
              style={{
                background: index % 2 === 0 ? "#eee" : "white",
                margin: "10px 0",
                padding: "4px",
              }}
            >
              <p>{item.slug}</p>
              <p>{item.title}</p>
              <p>{item.date}</p>
              <p>{item.content}</p>
            </li>
          ))}
        </List>
      </Content>
    </Slide>
  );
}
