import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "./actions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const { fetchedInput, results } = useSelector(({ results, input }) => ({
    results,
    fetchedInput: input,
  }));
  const debouncedFetch = useCallback(
    _debounce((input) => dispatch(fetchAPI(input)), 200),
    []
  );

  useEffect(() => {
    if (input === "") return;
    //debounced search
    debouncedFetch(input);
  }, [dispatch, input]);

  return (
    <div className="App">
      <div className="search-input">
        <div className="search-input__icon">лупа</div>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          type="text"
        />
        <div className="search-input__close">крестик</div>
      </div>
      <div
        className={`results ${input && results.length ? "results_showed" : ""}`}
      >
        {input &&
          results.map((item, key) => {
            return (
              <div
                key={key}
                className="result"
                dangerouslySetInnerHTML={{
                  __html: item.title
                    .split(fetchedInput)
                    .join(`<strong>${fetchedInput}</strong>`),
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

function _debounce(cb, delay) {
  let time;
  return function () {
    const args = arguments;

    clearTimeout(time);
    time = setTimeout(() => cb(...args), delay);
  };
}

export default App;
