'use client';

import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="card p-8 text-center space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {this.state.error.message || 'Unexpected UI error'}
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
