import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes/Router'
import Layout from 'containers/Layout'

import { GlobalStateProvider } from 'contexts/globalStateContext'

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </GlobalStateProvider>
  )
}

export default App
