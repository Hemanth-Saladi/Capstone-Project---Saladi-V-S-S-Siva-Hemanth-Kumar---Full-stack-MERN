import React from "react";

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: false };
    }

    static getDerivedStateFromError() {
        return { error: true };
    }

    componentDidCatch(err, info) {
        console.error("App Error:", err, info);
    }

    render() {

        if (this.state.error) {
            return <div className="alert alert-danger">Something went wrong.</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;