import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {PhotoProvider} from "react-photo-view";

import './index.css'
import 'react-photo-view/dist/react-photo-view.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PhotoProvider speed={() => 200}>
      <App />
    </PhotoProvider>
  </StrictMode>,
)
