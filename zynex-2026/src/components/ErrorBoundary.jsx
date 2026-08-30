import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center p-8 bg-zinc-900 border border-red-500 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <h1 className="text-4xl text-red-500 font-orbitron font-bold mb-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
              SYSTEM FAILURE
            </h1>
            <p className="text-gray-400 mb-6">Rebooting connection... An unexpected error occurred.</p>
            <button 
              onClick={() => window.location.href = '/'} 
              className="px-6 py-2 bg-red-500/20 border border-red-500 text-red-500 rounded hover:bg-red-500/40 transition-colors"
            >
              RETURN HOME
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
