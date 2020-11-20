import moment from "moment";
import { Line } from "rc-progress";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Title, Content } from "../../styles/components";
import Slide from "../Slide";

export default function Upload() {
  const dispatch = useDispatch();
  const {
    siteurl,
    approved,
    columnMappings,
    uploading,
    auth,
    done,
  } = useSelector((state: RootState) => state);

  async function upload(approved) {
    dispatch({
      type: "START_UPLOADING",
    });
    for (const item of approved) {
      const date = moment(item.date).isValid()
        ? moment(item.date).format()
        : null;

      const prepared = {
        status: "publish",
      };

      Object.keys(columnMappings).forEach((key) => {
        const value = columnMappings[key];
        prepared[value] = value === "date" ? date : item[key];
      });

      console.log(auth);

      const res = await fetch(siteurl + "/wp-json/wp/v2/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(prepared),
      });

      if (res.ok) {
        const record = await res.json();
        dispatch({
          type: "ADD_DONE",
          payload: {
            status: "success",
            record,
          },
        });
      } else {
        dispatch({
          type: "ADD_DONE",
          payload: {
            status: "failure",
            record: prepared,
          },
        });
      }
    }
    dispatch({
      type: "STOP_UPLOADING",
    });
  }

  return (
    <Slide
      show={
        auth &&
        siteurl &&
        (uploading || (done.success.length === 0 && done.failure.length === 0))
      }
    >
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
            percent={Math.round(
              ((done.success.length + done.failure.length) / approved.length) *
                100
            )}
          />
        ) : (
          <button onClick={() => upload(approved)}>Start Upload</button>
        )}
      </Content>
    </Slide>
  );
}
