import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './state/Hooks'
import { connectToWebsocket } from './state/websocket/WebsocketActions'
import ChatButton from './components/ChatButton'
import { ThemeOptions } from '@mui/material/styles'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import ThemeModeButton from './components/ThemeModeButton'
import { width } from '@mui/system'

// @ts-ignore
let theme = createTheme({});

const DarkTheme: ThemeOptions = createTheme({
  palette: {
      mode: "dark",
      primary: {
          main: "#3f51b5"
      },
      secondary: {
          main: "#f50057"
      }
  }
});

const LightTheme: ThemeOptions = createTheme({
  palette: {
      mode: "light",
      primary: {
          main: "#4f51b5"
      },
      secondary: {
          main: "#f50057"
      }
  }
});

function App() {
  const mode = useAppSelector(state => state.theme.mode);
  const theme = mode === "light" ? LightTheme : DarkTheme;

  
  const [count, setCount] = useState(0)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connectToWebsocket());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{width: "100vw"}}>
      <ThemeModeButton/>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ChatButton/>
      </Container>
    </ThemeProvider>
  )
}

export default App
