import React from "react";

function withLoading(Component) {

  return function WrappedComponent(props) {

    const { isLoading } = props;

    if (isLoading) {
      return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    }

    return <Component {...props} />;
  };

}

export default withLoading;