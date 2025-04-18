import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { LightTheme, DarkTheme } from "./theme";
import Router from "./Router";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }

  *[hidden] {
    display: none;
  }

  body {
    line-height: 1;
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }

  menu, ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .theme-button, .back-button {
    position: fixed;
    top: 10px;
    padding: 6px 10px;
    font-size: 14px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    border-radius: 4px;
    z-index: 999;
  }

  .theme-button {
    right: 10px;
  }

  .back-button {
    left: 10px;
  }
`;

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark((prev) => !prev);

  const location = useLocation();
  const history = useHistory();
  const isHome = location.pathname === "/";

  const handleBack = () => {
    if (location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
      <GlobalStyle />
      {!isHome && (
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
      )}
      <button className="theme-button" onClick={toggleTheme}>
        {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
}

export default App;