import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";

import store from "./redux/store";
import RootRoutes from "./routes/RootRoutes";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";
import { ToastContainer } from "react-toastify";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "Roboto",
        "Popins",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootRoutes />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
