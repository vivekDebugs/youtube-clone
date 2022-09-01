import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  TextField,
  Grid,
  IconButton,
  Drawer,
} from 'components/basic'
import Menu from './Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'

import { PATH } from 'constants/path.contants'

import { useGlobalState } from 'contexts/globalStateContext'
import { ACTION } from 'reducers/globalStateReducers'
import { YOUTUBE_LOGO_URL } from 'constants/app.constants'

const Layout = ({ children }) => {
  const navigate = useNavigate()

  const {
    state: { searchTerm, isDrawerOpen },
    dispatch,
  } = useGlobalState()

  const handleSearchTermChange = e => {
    dispatch({
      type: ACTION.SET_SEARCH_TERM,
      payload: e.target.value,
    })
  }

  const handleToggleMenu = () => {
    dispatch({
      type: ACTION.TOGGLE_DRAWER,
    })
  }

  const handleSearch = e => {
    e.preventDefault()
    if (!searchTerm) return
    navigate(`${PATH.SEARCH_FEED}/${searchTerm}`)
  }

  const handleGoToHome = () => {
    dispatch({
      type: ACTION.SET_VIDEOS_CATEGORY,
      payload: 'New',
    })
    navigate(PATH.HOME_FEED)
  }

  return (
    <Container sx={{ px: { xs: 1 } }}>
      <Grid
        container
        alignItems='center'
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'common.white',
          zIndex: 'appbar',
        }}
      >
        <Grid item xs={4}>
          <Grid container alignItems='center' flexWrap='nowrap'>
            <Grid item>
              <IconButton onClick={handleToggleMenu}>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <img
                src={YOUTUBE_LOGO_URL}
                alt='Youtube Logo'
                style={{
                  width: '100%',
                  maxWidth: '100px',
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
                onClick={handleGoToHome}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <form onSubmit={e => handleSearch(e)}>
            <TextField
              placeholder='Search your favourite video'
              sx={{ width: '90%', maxWidth: 500, m: 1 }}
              value={searchTerm}
              onChange={handleSearchTermChange}
              InputProps={{
                endAdornment: (
                  <IconButton type='submit'>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </form>
        </Grid>
        <Drawer anchor='left' open={isDrawerOpen} onClose={handleToggleMenu}>
          <Menu onMenuClose={handleToggleMenu} />
        </Drawer>
      </Grid>
      {children}
    </Container>
  )
}

export default Layout
