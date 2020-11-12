import { createGlobalStyle } from "styled-components";

export const Globals = createGlobalStyle`
    html,
    body {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    * {
        box-sizing: border-box;
    }

    h1, h2, h3, h4, h5, h6 {
        margin-top: 0;
        font-family: 'ZCOOL XiaoWei', serif;
    }

    strong {
        font-family: 'ZCOOL XiaoWei', serif;
    }
`;
