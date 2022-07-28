import { useRouter } from "next/router";
import { connect } from "react-redux";

const WithAuth = ({ WrappedComponent, state }) => {
  const { metamaskStatus } = state;
  const Router = useRouter();
  // eslint-disable-next-line react/display-name
  return (props) => {
    if (typeof window !== "undefined") {
      if (!metamaskStatus) {
        Router.replace("/login");
        return null;
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps)(WithAuth);
