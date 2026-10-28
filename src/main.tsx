import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router"
import { App } from "@/app/ui/App"
import { Provider } from "react-redux"
import { store } from "@/app/model/store.ts"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
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
