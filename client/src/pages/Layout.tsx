import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {

  return (
    <div className="app container bg-strong">
      <Header/>

      <div className="application">
        <div className="view">
          <main className="page position-relative top bottom left right">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
};

export default Layout;