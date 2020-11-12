import styled from "styled-components";

export const Info = styled.div`
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

export const Title = styled.h2`
  position: sticky;
  top: 0;
  background: white;
  padding: 20px 20px 0px 20px;
`;

export const Content = styled.div`
  padding: 0px 20px 20px 20px;
`;

export const List = styled.ul<{ small?: boolean }>`
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

export const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

export const Main = styled.main`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  overflow-y: auto;
`;

export const Form = styled.form`
  label,
  input {
    display: block;
    margin: 4px 0 !important;
  }
`;
