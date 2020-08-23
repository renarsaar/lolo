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
      return { loading: true, content: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, content: action.payload.content };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        content: [],
      };

    default:
      return state;
  }
}

export default function useFetchContent() {
  const [state, dispatch] = useReducer(reducer, { content: [], loading: true });

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    axios.get('/content', { responseType: 'document' })
      .then((response) => {
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: { content: response.data.getElementsByTagName('item') },
        });
      })
      .catch((error) => dispatch({ type: ACTIONS.ERROR, payload: { error } }));
  }, []);

  return state;
}
