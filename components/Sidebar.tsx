import styled from "styled-components";
import {
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineSync,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Sidebar() {
  const {
    siteurl,
    list,
    auth,
    done,
    authenticating,
    uploading,
    approved,
  } = useSelector((state: RootState) => state);

  return (
    <Aside>
      <h1>
        <a href="/">Post Importer</a>
      </h1>
      <ul>
        <li>
          <Options
            isDone={siteurl}
            complete={siteurl}
            todo={"Enter Site URL"}
          />
          <Options
            isDone={list.length > 0}
            complete={`Loaded ${list.length} items`}
            todo={"Upload CSV"}
          />
          <Options
            isDone={approved}
            complete={`Verified ${list.length} items`}
            todo={"Verify Data"}
          />
          <Options
            isDone={auth}
            hasProgress={authenticating}
            step={"Authenticating"}
            complete={`Welcome, ${auth?.user_nicename}`}
            todo={"Authenticate"}
          />
          <Options
            isDone={!uploading && done.length > 0}
            hasProgress={uploading}
            step={"Uploading..."}
            complete={`Upload Complete`}
            todo={"Start Upload"}
          />
        </li>
      </ul>
    </Aside>
  );
}

type OptionsProps = {
  hasProgress?: boolean;
  isDone: boolean;
  todo: string;
  step?: string;
  complete: string;
};

function Options(props: OptionsProps) {
  return (
    <>
      {props.isDone ? (
        <Option done>
          <AiFillCheckCircle /> {props.complete}
        </Option>
      ) : props.hasProgress ? (
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
