import React from "react";

const queryString = window.location.search;
const params = new URLSearchParams(queryString);

const paramDebug = params.get("debug");
export const Logger = {
  debug(value) {
    if (paramDebug === "1") {
      console.log(value);
    } else {
      console.info = () => {};
    }
  },

  info(value) {
    if (queryString === "?debug=1" || queryString === "?info=1") {
      console.log(value);
    } else {
      console.info = () => {};
    }
  },

  error(value) {
    if (
      queryString === "?debug=1" ||
      queryString === "?info=1" ||
      queryString === "?error=1"
    ) {
      console.log(value);
    } else {
      console.error = () => {};
    }
  },
};
