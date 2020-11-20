import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store";
import { Title, Content, List } from "../../styles/components";
import Slide from "../Slide";

function columnSettings(cell) {
  switch (cell) {
    case "content":
      return {
        grow: 20,
        maxWidth: "60vw",
      };
    case "date":
    case "title":
    case "slug":
    default:
      return {
        grow: 1,
      };
  }
}

export default function ApproveList() {
  const dispatch = useDispatch();
  const { approved, columnMappings, list } = useSelector(
    (state: RootState) => state
  );

  const [data, setData] = useState({
    allSelected: true,
    selectedCount: list.length,
    selectedRows: list,
  });
  const columns = columnMappings
    ? Object.keys(columnMappings).map((key) => ({
        name: columnMappings[key],
        selector: key,
        sortable: true,
        ...columnSettings(columnMappings[key]),
      }))
    : [];

  function handleSelectionChange(val) {
    setData(val);
  }

  return (
    <Slide show={columnMappings && !approved}>
      <Title>Approve List</Title>
      <Content
        style={{
          paddingTop: 0,
        }}
      >
        <DataTableWrapper
          title={`${list.length} items`}
          data={list}
          columns={columns}
          selectableRows
          onSelectedRowsChange={handleSelectionChange}
          dense
        />
        <button
          onClick={() =>
            dispatch({ type: "APPROVE_LIST", payload: data.selectedRows })
          }
        >
          Approve
        </button>
      </Content>
    </Slide>
  );
}

const DataTableWrapper = styled(DataTable)`
  max-width: 80vw;
  padding: 10px;
  overflow: auto;
  max-height: 60vh;
`;
