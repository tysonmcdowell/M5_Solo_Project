import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

// Action Types
const LOAD_SPOTS = "spots/loadSpots";
const UPDATE_SPOT = "spots/updateSpot";
const ADD_REVIEWS = "spots/addReviews";

// Action Creators
const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

const addReviews = (reviews, spotId) => ({
  type: ADD_REVIEWS,
  spotId,
  reviews,
});

// Thunks
export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const data = await response.json();
  dispatch(loadSpots(data.Spots));
  return response;
};

export const fetchSpotDetails = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const data = await response.json();
  dispatch(updateSpot(data));
  return response;
};

export const fetchSpotReviews = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`);
  const data = await response.json();
  dispatch(addReviews(data.Reviews, id));
  return response;
};

// Selectors
const selectSpotsState = (state) => state.spots;

export const selectSpotsArray = createSelector(
  selectSpotsState,
  (spots) => Object.values(spots)
);

// Reducer
const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = {};
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    case UPDATE_SPOT: {
      return {
        ...state,
        [action.spot.id]: {
          ...state[action.spot.id],
          ...action.spot,
        },
      };
    }
    case ADD_REVIEWS: {
      return {
        ...state,
        [action.spotId]: {
          ...state[action.spotId],
          reviews: action.reviews,
        },
      };
    }
    default:
      return state;
  }
};

export default spotsReducer;
