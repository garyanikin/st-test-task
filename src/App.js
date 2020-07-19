import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "./actions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const { fetchedInput, results, isFetching } = useSelector(
    ({ results, input, isFetching }) => ({
      results,
      fetchedInput: input,
      isFetching,
    })
  );
  const debouncedFetch = useCallback(
    _debounce((input) => dispatch(fetchAPI(input)), 200),
    []
  );

  useEffect(() => {
    if (input === "") return;
    //При пользовательском вводе ограничиваем количество запросов к API c помощью _debounce
    debouncedFetch(input);
  }, [dispatch, input]);

  return (
    <div className="App">
      <div className="search-input">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Поиск по магазину"
          type="text"
        />
        <div className="search-input__icon">
          <span>лупа</span>
        </div>
        {/* Если есть input показываем кнопку для очистки input'a */}
        {input && (
          <div className="search-input__close" onClick={() => setInput("")}>
            <span>крестик</span>
          </div>
        )}
      </div>
      <div
        className={`results ${
          input && results.length && !isFetching ? "results_showed" : ""
        }`}
      >
        {input
          ? results.map((item, key) => {
              // Подсвечиваем ввод пользователя в найденых результатах
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
            })
          : null}
      </div>
    </div>
  );
}

// Функция для дебаунса
function _debounce(cb, delay) {
  let time;
  return function () {
    const args = arguments;

    clearTimeout(time);
    time = setTimeout(() => cb(...args), delay);
  };
}

export default App;
