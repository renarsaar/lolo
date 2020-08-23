import { useEffect, useReducer } from 'react';
import axios from 'axios';

const ACTIONS = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_DATA: 'GET_DATA',
  ERROR: 'ERROR',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, data: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, data: action.payload.data };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: [],
      };

    default:
      return state;
  }
}

export default function useFetchClutterFreeData(url) {
  const [state, dispatch] = useReducer(reducer, { data: [], loading: true });

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    axios.get(`/article/?url=${url}`)
      .then((data) => dispatch({ type: ACTIONS.GET_DATA, payload: data }))
      .catch((error) => dispatch({ type: ACTIONS.ERROR, payload: error }))
  }, [url]);

  return state;
}
