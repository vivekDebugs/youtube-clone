import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from 'components/basic'

import { CATEGORIES } from 'constants/app.constants'
import { PATH } from 'constants/path.contants'
import { useGlobalState } from 'contexts/globalStateContext'
import { ACTION } from 'reducers/globalStateReducers'

const Menu = ({ onMenuClose }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { dispatch } = useGlobalState()

  const handleSelectCategory = name => {
    if (location.pathname !== PATH.HOME_FEED) navigate(PATH.HOME_FEED)
    dispatch({
      type: ACTION.SET_VIDEOS_CATEGORY,
      payload: name,
    })
    onMenuClose()
  }

  return (
    <Box sx={{ width: 250 }} role='presentation'>
      <List>
        {CATEGORIES?.map(({ name, icon }) => (
          <ListItem
            key={name}
            disablePadding
            onClick={() => handleSelectCategory(name)}
          >
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Menu
