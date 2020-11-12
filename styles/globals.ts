import { createGlobalStyle } from "styled-components";

export const Globals = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html,
    body {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    body {
        background-color: #eee;
    }

    code {
        font-family: 'Source Code Pro', monospace;
        font-size: 1.1em;
    }

    h1, h2, h3, h4, h5, h6 {
        margin-top: 0;
        font-family: 'ZCOOL XiaoWei', serif;
    }
`;
