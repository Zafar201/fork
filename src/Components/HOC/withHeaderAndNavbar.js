import Footer from "../Footer";
import Header from "../Header";

export const withHeaderAndNavbar = (WrappedComponent) => {
  return (props) => {
    if (props.hideNavbar) {
      return <WrappedComponent {...props} />;
    }
    return (
      <div>
        <Header />
        <WrappedComponent {...props} />
        <Footer />
      </div>
    );
  };
};
