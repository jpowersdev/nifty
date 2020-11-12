import moment from "moment";
import { Line } from "rc-progress";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Title, Content } from "../../styles/components";
import Slide from "../Slide";

export default function Upload() {
  const dispatch = useDispatch();
  const { siteurl, list, uploading, auth, done } = useSelector(
    (state: RootState) => state
  );

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

  return (
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
  );
}
