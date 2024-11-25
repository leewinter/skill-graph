import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";

export function useTabulatorModernStyles() {
  const theme = useTheme();

  const styles = css`
    .tabulator {
      position: relative;
      border: 1px solid ${theme.palette.background.paper};
      background-color: ${theme.palette.background.paper};
      font-size: 16px;
      text-align: left;
      overflow: hidden;
      -webkit-transform: translatez(0);
      -moz-transform: translatez(0);
      -ms-transform: translatez(0);
      -o-transform: translatez(0);
      transform: translatez(0);
    }

    .tabulator[tabulator-layout="fitDataFill"]
      .tabulator-tableholder
      .tabulator-table {
      min-width: 100%;
    }

    .tabulator[tabulator-layout="fitDataTable"] {
      display: inline-block;
    }

    .tabulator.tabulator-block-select {
      user-select: none;
    }

    .tabulator .tabulator-header {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      border-bottom: 1px solid ${theme.palette.primary.dark};
      background-color: ${theme.palette.background.paper};
      color: ${theme.palette.text.primary};
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -o-user-select: none;
    }

    .tabulator .tabulator-header.tabulator-header-hidden {
      display: none;
    }

    .tabulator .tabulator-header .tabulator-col {
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      border-right: 1px solid ${theme.palette.background.paper};
      background: ${theme.palette.background.paper};
      text-align: left;
      vertical-align: bottom;
      overflow: hidden;
    }

    .tabulator .tabulator-header .tabulator-col.tabulator-moving {
      position: absolute;
      border: 1px solid ${theme.palette.primary.dark};
      background: #e6e6e6;
      pointer-events: none;
    }

    .tabulator .tabulator-header .tabulator-col .tabulator-col-content {
      box-sizing: border-box;
      position: relative;
      padding: 4px;
    }

    .tabulator
      .tabulator-header
      .tabulator-col
      .tabulator-col-content
      .tabulator-header-menu-button {
      padding: 0 8px;
    }

    .tabulator
      .tabulator-header
      .tabulator-col
      .tabulator-col-content
      .tabulator-header-menu-button:hover {
      cursor: pointer;
      opacity: 0.6;
    }

    .tabulator
      .tabulator-header
      .tabulator-col
      .tabulator-col-content
      .tabulator-col-title-holder {
      position: relative;
    }

    .tabulator
      .tabulator-header
      .tabulator-col
      .tabulator-col-content
      .tabulator-col-title {
      box-sizing: border-box;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: bottom;
    }

    .tabulator
      .tabulator-header
      .tabulator-col
      .tabulator-col-content
      .tabulator-col-title
      .tabulator-title-editor {
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #999;
      padding: 1px;
      background: ${theme.palette.background.paper};
    }

    .tabulator
      .tabulator-header
      .tabulator-col
      .tabulator-col-content
      .tabulator-col-title
      .tabulator-header-menu-button
      + .tabulator-title-editor {
      width: calc(100% - 22px);
    }

    .tabulator
      .tabulator-header
      .tabulator-col
      .tabulator-col-content
      .tabulator-col-sorter {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 4px;
    }

    .tabulator
      .tabulator-header
      .tabulator-col
      .tabulator-col-content
      .tabulator-col-sorter
      .tabulator-arrow {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #b7c3f1;
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-col-group
      .tabulator-col-group-cols {
      position: relative;
      display: flex;
      border-top: 1px solid ${theme.palette.background.paper};
      overflow: hidden;
      margin-right: -1px;
    }

    .tabulator
      .tabulator-header
      .tabulator-col:first-child
      .tabulator-col-resize-handle.prev {
      display: none;
    }

    .tabulator .tabulator-header .tabulator-col .tabulator-header-filter {
      position: relative;
      box-sizing: border-box;
      margin-top: 2px;
      width: 100%;
      text-align: center;
    }

    .tabulator
      .tabulator-header
      .tabulator-col
      .tabulator-header-filter
      textarea {
      height: auto !important;
    }

    .tabulator .tabulator-header .tabulator-col .tabulator-header-filter svg {
      margin-top: 3px;
    }

    .tabulator
      .tabulator-header
      .tabulator-col
      .tabulator-header-filter
      input::-ms-clear {
      width: 0;
      height: 0;
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-sortable
      .tabulator-col-title {
      padding-right: 25px;
    }

    .tabulator .tabulator-header .tabulator-col.tabulator-sortable:hover {
      cursor: pointer;
      background-color: #e6e6e6;
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-sortable[aria-sort="none"]
      .tabulator-col-content
      .tabulator-col-sorter {
      color: ${theme.palette.text.primary};
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-sortable[aria-sort="none"]
      .tabulator-col-content
      .tabulator-col-sorter
      .tabulator-arrow {
      border-top: none;
      border-bottom: 6px solid #b7c3f1;
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-sortable[aria-sort="asc"]
      .tabulator-col-content
      .tabulator-col-sorter {
      color: ${theme.palette.text.primary};
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-sortable[aria-sort="asc"]
      .tabulator-col-content
      .tabulator-col-sorter
      .tabulator-arrow {
      border-top: none;
      border-bottom: 6px solid ${theme.palette.primary.dark};
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-sortable[aria-sort="desc"]
      .tabulator-col-content
      .tabulator-col-sorter {
      color: ${theme.palette.text.primary};
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-sortable[aria-sort="desc"]
      .tabulator-col-content
      .tabulator-col-sorter
      .tabulator-arrow {
      border-bottom: none;
      border-top: 6px solid ${theme.palette.primary.dark};
      color: ${theme.palette.text.primary};
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-col-vertical
      .tabulator-col-content
      .tabulator-col-title {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-col-vertical.tabulator-col-vertical-flip
      .tabulator-col-title {
      transform: rotate(180deg);
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-col-vertical.tabulator-sortable
      .tabulator-col-title {
      padding-right: 0;
      padding-top: 20px;
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-col-vertical.tabulator-sortable.tabulator-col-vertical-flip
      .tabulator-col-title {
      padding-right: 0;
      padding-bottom: 20px;
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-col-vertical.tabulator-sortable
      .tabulator-col-sorter {
      justify-content: center;
      left: 0;
      right: 0;
      top: 4px;
      bottom: auto;
    }

    .tabulator .tabulator-header .tabulator-frozen {
      display: inline-block;
      position: absolute;
      z-index: 10;
    }

    .tabulator .tabulator-header .tabulator-frozen.tabulator-frozen-left {
      border-right: 2px solid ${theme.palette.background.paper};
    }

    .tabulator .tabulator-header .tabulator-frozen.tabulator-frozen-right {
      border-left: 2px solid ${theme.palette.background.paper};
    }

    .tabulator .tabulator-header .tabulator-calcs-holder {
      box-sizing: border-box;
      min-width: 600%;
      background: white !important;
      border-top: 1px solid ${theme.palette.background.paper};
      border-bottom: 1px solid ${theme.palette.background.paper};
      overflow: hidden;
    }

    .tabulator .tabulator-header .tabulator-calcs-holder .tabulator-row {
      background: white !important;
    }

    .tabulator
      .tabulator-header
      .tabulator-calcs-holder
      .tabulator-row
      .tabulator-col-resize-handle {
      display: none;
    }

    .tabulator .tabulator-header .tabulator-frozen-rows-holder {
      min-width: 600%;
    }

    .tabulator .tabulator-header .tabulator-frozen-rows-holder:empty {
      display: none;
    }

    .tabulator .tabulator-tableholder {
      position: relative;
      width: 100%;
      white-space: nowrap;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .tabulator .tabulator-tableholder:focus {
      outline: none;
    }

    .tabulator .tabulator-tableholder .tabulator-placeholder {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .tabulator
      .tabulator-tableholder
      .tabulator-placeholder[tabulator-render-mode="virtual"] {
      min-height: 100%;
      min-width: 100%;
    }

    .tabulator .tabulator-tableholder .tabulator-placeholder span {
      display: inline-block;
      margin: 0 auto;
      padding: 10px;
      color: ${theme.palette.text.primary};
      font-weight: bold;
      font-size: 20px;
    }

    .tabulator .tabulator-tableholder .tabulator-table {
      position: relative;
      display: inline-block;
      background-color: ${theme.palette.grey[400]};
      white-space: nowrap;
      overflow: visible;
      color: ${theme.palette.text.primary};
    }

    .tabulator
      .tabulator-tableholder
      .tabulator-table
      .tabulator-row.tabulator-calcs {
      font-weight: bold;
      background: #f2f2f2 !important;
    }

    .tabulator
      .tabulator-tableholder
      .tabulator-table
      .tabulator-row.tabulator-calcs.tabulator-calcs-top {
      border-bottom: 2px solid ${theme.palette.background.paper};
    }

    .tabulator
      .tabulator-tableholder
      .tabulator-table
      .tabulator-row.tabulator-calcs.tabulator-calcs-bottom {
      border-top: 2px solid ${theme.palette.background.paper};
    }

    .tabulator .tabulator-footer {
      padding: 5px 10px;
      border-top: 1px solid #999;
      background-color: ${theme.palette.background.paper};
      text-align: right;
      color: ${theme.palette.text.primary};
      font-weight: bold;
      white-space: nowrap;
      user-select: none;
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -o-user-select: none;
    }

    .tabulator .tabulator-footer .tabulator-calcs-holder {
      box-sizing: border-box;
      width: calc(100% + 20px);
      margin: -5px -10px 5px -10px;
      text-align: left;
      background: white !important;
      border-bottom: 1px solid ${theme.palette.background.paper};
      border-top: 1px solid ${theme.palette.background.paper};
      overflow: hidden;
    }

    .tabulator .tabulator-footer .tabulator-calcs-holder .tabulator-row {
      background: white !important;
    }

    .tabulator
      .tabulator-footer
      .tabulator-calcs-holder
      .tabulator-row
      .tabulator-col-resize-handle {
      display: none;
    }

    .tabulator .tabulator-footer .tabulator-calcs-holder:only-child {
      margin-bottom: -5px;
      border-bottom: none;
    }

    .tabulator .tabulator-footer .tabulator-paginator {
      color: ${theme.palette.text.primary};
      font-family: inherit;
      font-weight: inherit;
      font-size: inherit;
    }

    .tabulator .tabulator-footer .tabulator-page-size {
      display: inline-block;
      margin: 0 5px;
      padding: 2px 5px;
      border: 1px solid #aaa;
      border-radius: 3px;
    }

    .tabulator .tabulator-footer .tabulator-pages {
      margin: 0 7px;
    }

    .tabulator .tabulator-footer .tabulator-page {
      display: inline-block;
      margin: 0 2px;
      padding: 2px 5px;
      border: 1px solid #aaa;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.2);
    }

    .tabulator .tabulator-footer .tabulator-page.active {
      color: ${theme.palette.text.primary};
    }

    .tabulator .tabulator-footer .tabulator-page:disabled {
      opacity: 0.5;
    }

    .tabulator .tabulator-footer .tabulator-page:not(.disabled):hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.2);
      color: ${theme.palette.text.primary};
    }

    .tabulator .tabulator-col-resize-handle {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 5px;
    }

    .tabulator .tabulator-col-resize-handle.prev {
      left: 0;
      right: auto;
    }

    .tabulator .tabulator-col-resize-handle:hover {
      cursor: ew-resize;
    }

    .tabulator .tabulator-loader {
      position: absolute;
      display: flex;
      align-items: center;
      top: 0;
      left: 0;
      z-index: 100;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      text-align: center;
    }

    .tabulator .tabulator-loader .tabulator-loader-msg {
      display: inline-block;
      margin: 0 auto;
      padding: 10px 20px;
      border-radius: 10px;
      background: ${theme.palette.background.paper};
      font-weight: bold;
      font-size: 16px;
    }

    .tabulator .tabulator-loader .tabulator-loader-msg.tabulator-loading {
      border: 4px solid ${theme.palette.grey[900]};
      color: ${theme.palette.text.primary};
    }

    .tabulator .tabulator-loader .tabulator-loader-msg.tabulator-error {
      border: 4px solid #d00;
      color: ${theme.palette.text.primary};
    }

    .tabulator-row {
      position: relative;
      box-sizing: border-box;
      min-height: 24px;
      background-color: ${theme.palette.grey[400]};
    }

    .tabulator-row.tabulator-row-even {
      background-color: ${theme.palette.background.paper};
    }

    .tabulator-row.tabulator-selectable:hover {
      background-color: #bbb;
      cursor: pointer;
    }

    .tabulator-row.tabulator-selected {
      background-color: #9abcea;
    }

    .tabulator-row.tabulator-selected:hover {
      background-color: #769bcc;
      cursor: pointer;
    }

    .tabulator-row.tabulator-row-moving {
      border: 1px solid #000;
      background: ${theme.palette.background.paper};
    }

    .tabulator-row.tabulator-moving {
      position: absolute;
      border-top: 1px solid ${theme.palette.background.paper};
      border-bottom: 1px solid ${theme.palette.background.paper};
      pointer-events: none;
      z-index: 15;
    }

    .tabulator-row .tabulator-row-resize-handle {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 5px;
    }

    .tabulator-row .tabulator-row-resize-handle.prev {
      top: 0;
      bottom: auto;
    }

    .tabulator-row .tabulator-row-resize-handle:hover {
      cursor: ns-resize;
    }

    .tabulator-row .tabulator-frozen {
      display: inline-block;
      position: absolute;
      background-color: inherit;
      z-index: 10;
    }

    .tabulator-row .tabulator-frozen.tabulator-frozen-left {
      border-right: 2px solid ${theme.palette.background.paper};
    }

    .tabulator-row .tabulator-frozen.tabulator-frozen-right {
      border-left: 2px solid ${theme.palette.background.paper};
    }

    .tabulator-row .tabulator-responsive-collapse {
      box-sizing: border-box;
      padding: 5px;
      border-top: 1px solid ${theme.palette.background.paper};
      border-bottom: 1px solid ${theme.palette.background.paper};
    }

    .tabulator-row .tabulator-responsive-collapse:empty {
      display: none;
    }

    .tabulator-row .tabulator-responsive-collapse table {
      font-size: 16px;
    }

    .tabulator-row .tabulator-responsive-collapse table tr td {
      position: relative;
    }

    .tabulator-row .tabulator-responsive-collapse table tr td:first-of-type {
      padding-right: 10px;
    }

    .tabulator-row .tabulator-cell {
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      padding: 4px;
      border-right: 1px solid ${theme.palette.background.paper};
      vertical-align: middle;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tabulator-row .tabulator-cell.tabulator-editing {
      border: 1px solid #1d68cd;
      outline: none;
      padding: 0;
    }

    .tabulator-row .tabulator-cell.tabulator-editing input,
    .tabulator-row .tabulator-cell.tabulator-editing select {
      border: 1px;
      background: transparent;
    }

    .tabulator-row .tabulator-cell.tabulator-validation-fail {
      border: 1px solid #dd0000;
    }

    .tabulator-row .tabulator-cell.tabulator-validation-fail input,
    .tabulator-row .tabulator-cell.tabulator-validation-fail select {
      border: 1px;
      background: transparent;
      color: ${theme.palette.text.primary};
    }

    .tabulator-row
      .tabulator-cell:first-child
      .tabulator-col-resize-handle.prev {
      display: none;
    }

    .tabulator-row .tabulator-cell.tabulator-row-handle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -o-user-select: none;
    }

    .tabulator-row
      .tabulator-cell.tabulator-row-handle
      .tabulator-row-handle-box {
      width: 80%;
    }

    .tabulator-row
      .tabulator-cell.tabulator-row-handle
      .tabulator-row-handle-box
      .tabulator-row-handle-bar {
      width: 100%;
      height: 3px;
      margin-top: 2px;
      background: #666;
    }

    .tabulator-row .tabulator-cell .tabulator-data-tree-branch {
      display: inline-block;
      vertical-align: middle;
      height: 9px;
      width: 7px;
      margin-top: -9px;
      margin-right: 5px;
      border-bottom-left-radius: 1px;
      border-left: 2px solid ${theme.palette.background.paper};
      border-bottom: 2px solid ${theme.palette.background.paper};
    }

    .tabulator-row .tabulator-cell .tabulator-data-tree-control {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      height: 11px;
      width: 11px;
      margin-right: 5px;
      border: 1px solid ${theme.palette.grey[900]};
      border-radius: 2px;
      background: rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .tabulator-row .tabulator-cell .tabulator-data-tree-control:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.2);
    }

    .tabulator-row
      .tabulator-cell
      .tabulator-data-tree-control
      .tabulator-data-tree-control-collapse {
      display: inline-block;
      position: relative;
      height: 7px;
      width: 1px;
      background: transparent;
    }

    .tabulator-row
      .tabulator-cell
      .tabulator-data-tree-control
      .tabulator-data-tree-control-collapse:after {
      position: absolute;
      content: "";
      left: -3px;
      top: 3px;
      height: 1px;
      width: 7px;
      background: ${theme.palette.grey[900]};
    }

    .tabulator-row
      .tabulator-cell
      .tabulator-data-tree-control
      .tabulator-data-tree-control-expand {
      display: inline-block;
      position: relative;
      height: 7px;
      width: 1px;
      background: ${theme.palette.grey[900]};
    }

    .tabulator-row
      .tabulator-cell
      .tabulator-data-tree-control
      .tabulator-data-tree-control-expand:after {
      position: absolute;
      content: "";
      left: -3px;
      top: 3px;
      height: 1px;
      width: 7px;
      background: ${theme.palette.grey[900]};
    }

    .tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -o-user-select: none;
      height: 15px;
      width: 15px;
      border-radius: 20px;
      background: #666;
      color: ${theme.palette.text.primary};
      font-weight: bold;
      font-size: 1.1em;
    }

    .tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle:hover {
      opacity: 0.7;
    }

    .tabulator-row
      .tabulator-cell
      .tabulator-responsive-collapse-toggle.open
      .tabulator-responsive-collapse-toggle-close {
      display: initial;
    }

    .tabulator-row
      .tabulator-cell
      .tabulator-responsive-collapse-toggle.open
      .tabulator-responsive-collapse-toggle-open {
      display: none;
    }

    .tabulator-row
      .tabulator-cell
      .tabulator-responsive-collapse-toggle
      .tabulator-responsive-collapse-toggle-close {
      display: none;
    }

    .tabulator-row .tabulator-cell .tabulator-traffic-light {
      display: inline-block;
      height: 14px;
      width: 14px;
      border-radius: 14px;
    }

    .tabulator-row.tabulator-group {
      box-sizing: border-box;
      border-bottom: 1px solid #999;
      border-right: 1px solid ${theme.palette.background.paper};
      border-top: 1px solid #999;
      padding: 5px;
      padding-left: 10px;
      background: #ccc;
      font-weight: bold;
      min-width: 100%;
    }

    .tabulator-row.tabulator-group:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.1);
    }

    .tabulator-row.tabulator-group.tabulator-group-visible .tabulator-arrow {
      margin-right: 10px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid ${theme.palette.primary.dark};
      border-bottom: 0;
    }

    .tabulator-row.tabulator-group.tabulator-group-level-1 {
      padding-left: 30px;
    }

    .tabulator-row.tabulator-group.tabulator-group-level-2 {
      padding-left: 50px;
    }

    .tabulator-row.tabulator-group.tabulator-group-level-3 {
      padding-left: 70px;
    }

    .tabulator-row.tabulator-group.tabulator-group-level-4 {
      padding-left: 90px;
    }

    .tabulator-row.tabulator-group.tabulator-group-level-5 {
      padding-left: 110px;
    }

    .tabulator-row.tabulator-group .tabulator-group-toggle {
      display: inline-block;
    }

    .tabulator-row.tabulator-group .tabulator-arrow {
      display: inline-block;
      width: 0;
      height: 0;
      margin-right: 16px;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 0;
      border-left: 6px solid ${theme.palette.primary.dark};
      vertical-align: middle;
    }

    .tabulator-row.tabulator-group span {
      margin-left: 10px;
      color: ${theme.palette.text.primary};
    }

    .tabulator-menu {
      position: absolute;
      display: inline-block;
      box-sizing: border-box;
      background: ${theme.palette.grey[400]};
      border: 1px solid ${theme.palette.background.paper};
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
      font-size: 16px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      z-index: 10000;
    }

    .tabulator-menu .tabulator-menu-item {
      position: relative;
      box-sizing: border-box;
      padding: 5px 10px;
      user-select: none;
    }

    .tabulator-menu .tabulator-menu-item.tabulator-menu-item-disabled {
      opacity: 0.5;
    }

    .tabulator-menu
      .tabulator-menu-item:not(.tabulator-menu-item-disabled):hover {
      cursor: pointer;
      background: ${theme.palette.background.paper};
    }

    .tabulator-menu .tabulator-menu-item.tabulator-menu-item-submenu {
      padding-right: 25px;
    }

    .tabulator-menu .tabulator-menu-item.tabulator-menu-item-submenu::after {
      display: inline-block;
      position: absolute;
      top: calc(5px + 0.4em);
      right: 10px;
      height: 7px;
      width: 7px;
      content: "";
      border-width: 1px 1px 0 0;
      border-style: solid;
      border-color: ${theme.palette.background.paper};
      vertical-align: top;
      transform: rotate(45deg);
    }

    .tabulator-menu .tabulator-menu-separator {
      border-top: 1px solid ${theme.palette.background.paper};
    }

    .tabulator-edit-select-list {
      position: absolute;
      display: inline-block;
      box-sizing: border-box;
      max-height: 200px;
      background: ${theme.palette.grey[400]};
      border: 1px solid ${theme.palette.background.paper};
      font-size: 16px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      z-index: 10000;
    }

    .tabulator-edit-select-list .tabulator-edit-select-list-item {
      padding: 4px;
      color: ${theme.palette.text.primary};
    }

    .tabulator-edit-select-list .tabulator-edit-select-list-item.active {
      color: ${theme.palette.text.primary};
      background: #1d68cd;
    }

    .tabulator-edit-select-list
      .tabulator-edit-select-list-item.active.focused {
      outline: 1px solid rgba(243, 243, 243, 0.5);
    }

    .tabulator-edit-select-list .tabulator-edit-select-list-item.focused {
      outline: 1px solid #1d68cd;
    }

    .tabulator-edit-select-list .tabulator-edit-select-list-item:hover {
      cursor: pointer;
      color: ${theme.palette.text.primary};
      background: #1d68cd;
    }

    .tabulator-edit-select-list .tabulator-edit-select-list-notice {
      padding: 4px;
      color: ${theme.palette.text.primary};
      text-align: center;
    }

    .tabulator-edit-select-list .tabulator-edit-select-list-group {
      border-bottom: 1px solid ${theme.palette.background.paper};
      padding: 4px;
      padding-top: 6px;
      color: ${theme.palette.text.primary};
      font-weight: bold;
    }

    .tabulator.tabulator-ltr {
      direction: ltr;
    }

    .tabulator.tabulator-rtl {
      text-align: initial;
      direction: rtl;
    }

    .tabulator.tabulator-rtl .tabulator-header .tabulator-col {
      text-align: initial;
      border-left: 1px solid ${theme.palette.background.paper};
      border-right: initial;
    }

    .tabulator.tabulator-rtl
      .tabulator-header
      .tabulator-col.tabulator-col-group
      .tabulator-col-group-cols {
      margin-right: initial;
      margin-left: -1px;
    }

    .tabulator.tabulator-rtl
      .tabulator-header
      .tabulator-col.tabulator-sortable
      .tabulator-col-title {
      padding-right: 0;
      padding-left: 25px;
    }

    .tabulator.tabulator-rtl
      .tabulator-header
      .tabulator-col
      .tabulator-col-content
      .tabulator-arrow {
      left: 8px;
      right: initial;
    }

    .tabulator.tabulator-rtl .tabulator-row .tabulator-cell {
      border-right: initial;
      border-left: 1px solid ${theme.palette.background.paper};
    }

    .tabulator.tabulator-rtl
      .tabulator-row
      .tabulator-cell
      .tabulator-data-tree-branch {
      margin-right: initial;
      margin-left: 5px;
      border-bottom-left-radius: initial;
      border-bottom-right-radius: 1px;
      border-left: initial;
      border-right: 2px solid ${theme.palette.background.paper};
    }

    .tabulator.tabulator-rtl
      .tabulator-row
      .tabulator-cell
      .tabulator-data-tree-control {
      margin-right: initial;
      margin-left: 5px;
    }

    .tabulator.tabulator-rtl .tabulator-col-resize-handle {
      position: absolute;
      left: 0;
      right: auto;
    }

    .tabulator.tabulator-rtl .tabulator-col-resize-handle.prev {
      right: 0;
      left: auto;
    }

    .tabulator-print-fullscreen {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10000;
    }

    body.tabulator-print-fullscreen-hide > *:not(.tabulator-print-fullscreen) {
      display: none !important;
    }

    .tabulator-print-table {
      border-collapse: collapse;
    }

    .tabulator-print-table .tabulator-data-tree-branch {
      display: inline-block;
      vertical-align: middle;
      height: 9px;
      width: 7px;
      margin-top: -9px;
      margin-right: 5px;
      border-bottom-left-radius: 1px;
      border-left: 2px solid ${theme.palette.background.paper};
      border-bottom: 2px solid ${theme.palette.background.paper};
    }

    .tabulator-print-table .tabulator-print-table-group {
      box-sizing: border-box;
      border-bottom: 1px solid #999;
      border-right: 1px solid ${theme.palette.background.paper};
      border-top: 1px solid #999;
      padding: 5px;
      padding-left: 10px;
      background: #ccc;
      font-weight: bold;
      min-width: 100%;
    }

    .tabulator-print-table .tabulator-print-table-group:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.1);
    }

    .tabulator-print-table
      .tabulator-print-table-group.tabulator-group-visible
      .tabulator-arrow {
      margin-right: 10px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid ${theme.palette.primary.dark};
      border-bottom: 0;
    }

    .tabulator-print-table
      .tabulator-print-table-group.tabulator-group-level-1
      td {
      padding-left: 30px !important;
    }

    .tabulator-print-table
      .tabulator-print-table-group.tabulator-group-level-2
      td {
      padding-left: 50px !important;
    }

    .tabulator-print-table
      .tabulator-print-table-group.tabulator-group-level-3
      td {
      padding-left: 70px !important;
    }

    .tabulator-print-table
      .tabulator-print-table-group.tabulator-group-level-4
      td {
      padding-left: 90px !important;
    }

    .tabulator-print-table
      .tabulator-print-table-group.tabulator-group-level-5
      td {
      padding-left: 110px !important;
    }

    .tabulator-print-table
      .tabulator-print-table-group
      .tabulator-group-toggle {
      display: inline-block;
    }

    .tabulator-print-table .tabulator-print-table-group .tabulator-arrow {
      display: inline-block;
      width: 0;
      height: 0;
      margin-right: 16px;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 0;
      border-left: 6px solid ${theme.palette.primary.dark};
      vertical-align: middle;
    }

    .tabulator-print-table .tabulator-print-table-group span {
      margin-left: 10px;
      color: ${theme.palette.text.primary};
    }

    .tabulator-print-table .tabulator-data-tree-control {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      height: 11px;
      width: 11px;
      margin-right: 5px;
      border: 1px solid ${theme.palette.grey[900]};
      border-radius: 2px;
      background: rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .tabulator-print-table .tabulator-data-tree-control:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.2);
    }

    .tabulator-print-table
      .tabulator-data-tree-control
      .tabulator-data-tree-control-collapse {
      display: inline-block;
      position: relative;
      height: 7px;
      width: 1px;
      background: transparent;
    }

    .tabulator-print-table
      .tabulator-data-tree-control
      .tabulator-data-tree-control-collapse:after {
      position: absolute;
      content: "";
      left: -3px;
      top: 3px;
      height: 1px;
      width: 7px;
      background: ${theme.palette.grey[900]};
    }

    .tabulator-print-table
      .tabulator-data-tree-control
      .tabulator-data-tree-control-expand {
      display: inline-block;
      position: relative;
      height: 7px;
      width: 1px;
      background: ${theme.palette.grey[900]};
    }

    .tabulator-print-table
      .tabulator-data-tree-control
      .tabulator-data-tree-control-expand:after {
      position: absolute;
      content: "";
      left: -3px;
      top: 3px;
      height: 1px;
      width: 7px;
      background: ${theme.palette.grey[900]};
    }

    .tabulator .tabulator-header {
      border-bottom: 3px solid ${theme.palette.primary.dark};
      margin-bottom: 4px;
      padding-left: 10px;
      font-size: 1.1em;
    }

    .tabulator .tabulator-header .tabulator-col {
      border-right: 2px solid ${theme.palette.background.paper};
      background-color: ${theme.palette.background.paper};
    }

    .tabulator
      .tabulator-header
      .tabulator-col
      .tabulator-col-content
      .tabulator-col-title
      .tabulator-title-editor {
      border: 1px solid ${theme.palette.primary.dark};
      font-size: 1em;
      color: ${theme.palette.text.primary};
    }

    .tabulator
      .tabulator-header
      .tabulator-col.tabulator-col-group
      .tabulator-col-group-cols {
      border-top: 2px solid ${theme.palette.primary.dark};
    }

    .tabulator .tabulator-header .tabulator-frozen.tabulator-frozen-left {
      padding-left: 10px;
    }

    .tabulator .tabulator-header .tabulator-calcs-holder {
      border-top: 2px solid ${theme.palette.primary.dark} !important;
    }

    .tabulator .tabulator-header .tabulator-calcs-holder .tabulator-row {
      padding-left: 0 !important;
    }

    .tabulator
      .tabulator-header
      .tabulator-calcs-holder
      .tabulator-row
      .tabulator-cell {
      background: none;
    }

    .tabulator .tabulator-tableholder .tabulator-placeholder span {
      color: ${theme.palette.text.primary};
    }

    .tabulator
      .tabulator-tableholder
      .tabulator-table
      .tabulator-row.tabulator-calcs.tabulator-calcs-top {
      border-bottom: 2px solid ${theme.palette.primary.dark};
    }

    .tabulator
      .tabulator-tableholder
      .tabulator-table
      .tabulator-row.tabulator-calcs.tabulator-calcs-bottom {
      border-top: 2px solid ${theme.palette.primary.dark};
    }

    .tabulator .tabulator-footer .tabulator-calcs-holder {
      border-top: 3px solid ${theme.palette.primary.dark} !important;
      border-bottom: 2px solid ${theme.palette.primary.dark} !important;
    }

    .tabulator .tabulator-footer .tabulator-calcs-holder .tabulator-row {
      background: white !important;
    }

    .tabulator
      .tabulator-footer
      .tabulator-calcs-holder
      .tabulator-row
      .tabulator-cell {
      background: none;
    }

    .tabulator
      .tabulator-footer
      .tabulator-calcs-holder
      .tabulator-row
      .tabulator-cell:first-child {
      border-left: 10px solid transparent;
    }

    .tabulator .tabulator-footer .tabulator-calcs-holder:only-child {
      border-bottom: none !important;
    }

    .tabulator-row {
      margin-bottom: 2px;
    }

    .tabulator-row .tabulator-cell:first-child {
      border-left: 10px solid ${theme.palette.primary.dark};
    }

    .tabulator-row:nth-child(even) {
      background-color: ${theme.palette.primary.light};
    }

    .tabulator-row:nth-child(even) .tabulator-cell {
      background-color: ${theme.palette.background.paper};
    }

    .tabulator-row:nth-child(even) .tabulator-cell:first-child {
      border-left: 10px solid ${theme.palette.primary.light};
    }

    .tabulator-row.tabulator-selectable:hover {
      cursor: pointer;
    }

    .tabulator-row.tabulator-selectable:hover .tabulator-cell {
      background-color: #bbb;
    }

    .tabulator-row.tabulator-selected .tabulator-cell {
      background-color: #9abcea;
    }

    .tabulator-row.tabulator-selected:hover .tabulator-cell {
      background-color: #769bcc;
      cursor: pointer;
    }

    .tabulator-row.tabulator-moving {
      pointer-events: none !important;
    }

    .tabulator-row .tabulator-cell {
      padding: 6px 4px;
      border-right: 2px solid ${theme.palette.background.paper};
      background-color: ${theme.palette.grey[400]};
    }

    .tabulator-row.tabulator-group {
      min-width: 100%;
      margin-bottom: 2px;
      border-bottom: 2px solid ${theme.palette.primary.dark};
      border-top: 2px solid ${theme.palette.primary.dark};
      border-right: none;
      background: ${theme.palette.primary.main};
    }

    .tabulator-row.tabulator-group span {
      color: ${theme.palette.text.primary};
    }

    .tabulator-edit-select-list {
      border: 1px solid #1d68cd;
    }

    .tabulator-print-table .tabulator-print-table-group {
      border-bottom: 2px solid ${theme.palette.primary.dark};
      border-top: 2px solid ${theme.palette.primary.dark};
      background: ${theme.palette.primary.main};
      margin-bottom: 2px;
    }

    .tabulator-print-table .tabulator-print-table-group span {
      color: ${theme.palette.text.primary};
    }

    /*# sourceMappingURL=tabulator_modern.css.map */
  `;

  return styles;
}
