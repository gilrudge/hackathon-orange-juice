import { createBrowserRouter } from "react-router-dom"
import App from "../App.jsx"
import Descobrir from "../pages/Descobrir.jsx"
import MeuPortfolio from "../pages/MeuPortfolio.jsx"
import PrivateRoutes from "./privateRoutes.jsx"
import TelaLogin from "../pages/TelaLogin.jsx"
import RegistrationPage from "../pages/RegistrationPage.jsx"
import Header from '../components/main-header/Header.jsx'
import Erro from "../pages/Erro.jsx"

export const router = createBrowserRouter([

  {
    path:'/' ,
    element: <App/>,
    children: [
      {
        path:'/login',
        element: <TelaLogin/>
      },
      {
        path:'/cadastro',
        element: <RegistrationPage/>
      },
      {
        path: "/",
        element: 
          <PrivateRoutes>
            <Header/>
            <Descobrir/>
          </PrivateRoutes>
      },
      {
        path: "meus-projetos",        
        element: 
          <PrivateRoutes>
            <Header/>
            <MeuPortfolio/>
          </PrivateRoutes>
      },
      {
        path:'*',
        element: <Erro/>
      }
    ]
  }
])
