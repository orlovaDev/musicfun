import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { App } from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// import './index.css'
//
// import { createRoot } from 'react-dom/client'
// import { Provider } from 'react-redux'
// import { BrowserRouter } from 'react-router'
//
// import { store } from '@/app/model/store.ts'
//
// import { App } from './app/ui/App/App.tsx'
//
// createRoot(document.getElementById('root')!).render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </BrowserRouter>,
// )
