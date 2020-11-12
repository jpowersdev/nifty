import styled from "styled-components";
import {
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineSync,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Sidebar(props) {
  const {
    siteurl,
    list,
    auth,
    done,
    authenticating,
    uploading,
    approved,
  } = useSelector((state: RootState) => state);
  const { csv } = props;
  return (
    <Aside>
      <h1>
        <a href="/">Post Importer</a>
      </h1>
      <ul>
        <li>
          <Options done={siteurl} complete={siteurl} todo={"Enter Site URL"} />
          <Options
            done={list.length > 0}
            complete={`Loaded ${list.length} items`}
            todo={"Upload CSV"}
          />
          <Options
            done={approved}
            complete={`Verified ${list.length} items`}
            todo={"Verify Data"}
          />
          <Options
            done={auth}
            progress={authenticating}
            step={"Authenticating"}
            complete={`Welcome, ${auth?.user_nicename}`}
            todo={"Authenticate"}
          />
          <Options
            done={!uploading && done.length > 0}
            progress={uploading}
            step={"Uploading..."}
            complete={`Upload Complete`}
            todo={"Start Upload"}
          />
        </li>
      </ul>
    </Aside>
  );
}

function Options(props) {
  return (
    <>
      {props.done ? (
        <Option done>
          <AiFillCheckCircle /> {props.complete}
        </Option>
      ) : props.progress ? (
        <Option>
          <AiOutlineSync className="spin" /> {props.step}
        </Option>
      ) : (
        <Option>
          <AiOutlineCheckCircle /> {props.todo}
        </Option>
      )}
    </>
  );
}

const Aside = styled.aside`
  padding: 20px;
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 0.25rem;
    color: #222;

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  ul {
    list-style: none;
    padding-left: 0;
  }
`;

type OptionProps = {
  done?: boolean;
  progress?: boolean;
};

const Option = styled.span<OptionProps>`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;

  color: ${({ done, progress }) =>
    done ? "#222" : progress ? "#444" : "#666"};

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }

  svg {
    margin-right: 0.5em;

    &.spin {
      animation: spin 2s linear infinite;
    }
  }
`;
