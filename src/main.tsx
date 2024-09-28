
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import store from "./store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import "../src/assets/scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)
