import Navigation from "./Navigation";
import Footer from "./Footer";
import SecurityWrapper from "../components/SecurityWrapper";

const Layout = ({ children, user }) => (
  <div className="__layout">
    <Navigation user={user} />
    <main className="page">
      <SecurityWrapper>
        {children}
      </SecurityWrapper>
    </main>
    <Footer />
  </div>
)

export default Layout;