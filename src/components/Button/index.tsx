/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Button(props: { text: any; onClick: any }) {
  const { text, onClick } = props;

  const styles = css`
    background-color: #556cd6;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0 0 inset;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui, "Segoe UI", "Liberation Sans",
      sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.15385;
    margin: 0;
    outline: none;
    padding: 8px 0.8em;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    white-space: nowrap;
    margin-right: 5px;

    :hover,
    :focus {
      background-color: #07c;
    }

    :focus {
      box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
    }

    :active {
      background-color: #0064bd;
      box-shadow: none;
    }
  `;

  return (
    <button css={styles} role="button" onClick={onClick}>
      {text}
    </button>
  );
}
