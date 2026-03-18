import React from "react";

function withLoader(Component){

return function WrappedComponent({loading,...props}){

if(loading){
return <h2>Loading...</h2>;
}

return <Component {...props}/>;

}

}

export default withLoader;