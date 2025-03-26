import * as React from "react";
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          error={this.state.error}
          reset={() => this.setState({ hasError: false, error: null })}
        />
      );
    }
    return this.props.children;
  }
}

function ErrorDisplay({ error }: { error: Error | null; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <h2 className="mb-2 text-2x l font-bold">Something went wrong</h2>
      <p className="mb-6 text-muted-foreground">
        We're sorry for the inconvenience. The error has been logged and we're
        working on it.
      </p>
      {error && (
        <div className="p-4 mb-6 bg-muted max-w-full w-full max-h-[200px]"></div>
      )}
    </div>
  );
}

export default ErrorBoundary;
