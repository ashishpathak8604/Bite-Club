import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Unexpected application error', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="grid min-h-[70vh] place-items-center bg-cream px-4 py-24">
        <div className="sticker max-w-lg rounded-[2rem] bg-butter p-8 text-center">
          <p className="font-script text-2xl text-choco/60">oops, a little spill</p>
          <h1 className="mt-2 text-3xl text-choco sm:text-4xl">Something went off the menu.</h1>
          <p className="mt-3 text-sm leading-relaxed text-choco/70">
            An unexpected error stopped this page from loading. Refresh to try again, or head back
            to the home page.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full border-[3px] border-choco bg-coral px-5 py-2.5 font-semibold text-choco shadow-[4px_4px_0_0_#553B32] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Refresh page
            </button>
            <a
              href="/"
              className="rounded-full border-[3px] border-choco bg-cream px-5 py-2.5 font-semibold text-choco shadow-[4px_4px_0_0_#553B32] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Back to home
            </a>
          </div>
        </div>
      </main>
    )
  }
}
