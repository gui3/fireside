import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Watermark from "../components/Watermark"

const Layout = () => {

  return (
    <div className="app container bg-strong fullsize flex column">
      <Header/>

      <div className="application stretch position-relative">
		<Watermark/>
        <div className="view scroll fullsize">
          <main className="page fullsize responsive-padding">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
};

export default Layout;