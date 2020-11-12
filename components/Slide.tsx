import styled from "styled-components";

export default function Slide(props) {
  return <Section>{props.show && props.children}</Section>;
}

const Section = styled.section`
  button,
  .progress {
    margin: 1rem 0;
  }
`;
