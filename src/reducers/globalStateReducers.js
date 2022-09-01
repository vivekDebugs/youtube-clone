export const ACTION = {
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  SET_VIDEOS_CATEGORY: 'SET_VIDEOS_CATEGORY',
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      }

    case ACTION.TOGGLE_DRAWER:
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      }

    case ACTION.SET_VIDEOS_CATEGORY:
      return {
        ...state,
        videosCategory: action.payload,
      }

    default:
      return state
  }
}

export default reducer
