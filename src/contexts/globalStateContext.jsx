import React, { createContext, useContext, useReducer } from 'react'
import reducer from 'reducers/globalStateReducers'

export const initialState = {
  searchTerm: '',
  isDrawerOpen: false,
  videosCategory: 'New',
}

const GlobalStateContext = createContext()

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalStateContext)
