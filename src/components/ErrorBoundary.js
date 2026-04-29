import React from "react";

// Top-level boundary so a render exception inside any page falls back to a
// friendly screen instead of a blank white page.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled error in app", error, info);
  }

  handleReset = () => {
    try {
      // Best-effort: clear stored progress so a corrupt blob can't re-trigger
      // the same crash on next load. Then reload to a clean state.
      localStorage.removeItem("trait-ranker:progress");
      localStorage.removeItem("progress");
    } catch (_) {
      /* ignore */
    }
    window.location.hash = "#/Selection";
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
        role="alert"
      >
        <div>
          <h1 style={{ marginBottom: "0.5rem" }}>Something went wrong</h1>
          <p style={{ marginBottom: "1rem" }}>
            Trait Ranker hit an unexpected error. You can try again from the
            beginning.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              borderRadius: 6,
              border: "1px solid #888",
              cursor: "pointer",
            }}
          >
            Start over
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
