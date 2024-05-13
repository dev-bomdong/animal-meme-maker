import React, { ReactNode, Component, ErrorInfo } from 'react';

type Props = {
  fallback: ReactNode;
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('error:', error, 'errorInfo: ', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <React.Fragment>{this.props.fallback}</React.Fragment>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
