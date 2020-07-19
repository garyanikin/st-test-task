import fetch from "cross-fetch";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
function fetchStart(input) {
  return {
    type: FETCH_START,
    payload: input,
  };
}

function fetchSuccess(results) {
  return {
    type: FETCH_SUCCESS,
    payload: results,
  };
}

// Асинхронный actions для запроса к API
export function fetchAPI(input) {
  return function (dispatch) {
    dispatch(fetchStart(input));

    // Делаем запрос к API
    return fetch(`http://jsonplaceholder.typicode.com/albums`)
      .then((response) => response.json())
      .then((data) => {
        // Оставляем только результаты содержащие input
        const results = data
          .filter(({ title }) => title.indexOf(input) !== -1)
          .slice(0, 5);
        // Отправляем в store результаты запроса к API
        dispatch(fetchSuccess(results));
      });
  };
}
