import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero section */}
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <div className="container-fluid py-4">
          <h1 className="display-5 fw-bold">Welcome to MyNotesApp</h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">
            A simple place to capture your thoughts, tasks, and ideas —
            organized, searchable, and always at your fingertips.
          </p>
          <div className="d-flex justify-content-center gap-2 mt-4">
            <Link to="/register" className="btn btn-primary btn-lg px-4">
              Get Started
            </Link>
            <Link to="/notes" className="btn btn-outline-secondary btn-lg px-4">
              View Notes
            </Link>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="fs-1 mb-2">📝</div>
                <h5 className="card-title">Quick Notes</h5>
                <p className="card-text text-muted">
                  Jot down ideas in seconds and pick up right where you left
                  off.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="fs-1 mb-2">🔍</div>
                <h5 className="card-title">Easy Search</h5>
                <p className="card-text text-muted">
                  Find any note instantly, no matter how long ago you wrote it.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="fs-1 mb-2">🔒</div>
                <h5 className="card-title">Secure & Private</h5>
                <p className="card-text text-muted">
                  Your notes are yours alone — protected behind your account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats / info strip */}
        <div className="row text-center bg-light rounded-3 py-4 mb-5">
          <div className="col-6 col-md-3">
            <h3 className="fw-bold mb-0">10k+</h3>
            <p className="text-muted">Notes Created</p>
          </div>
          <div className="col-6 col-md-3">
            <h3 className="fw-bold mb-0">2.5k</h3>
            <p className="text-muted">Active Users</p>
          </div>
          <div className="col-6 col-md-3">
            <h3 className="fw-bold mb-0">99.9%</h3>
            <p className="text-muted">Uptime</p>
          </div>
          <div className="col-6 col-md-3">
            <h3 className="fw-bold mb-0">24/7</h3>
            <p className="text-muted">Support</p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mb-5">
          <h2 className="mb-3">Ready to get organized?</h2>
          <p className="text-muted mb-4">
            Create your first note in under a minute — no credit card, no
            hassle.
          </p>
          <Link to="/register" className="btn btn-success btn-lg px-5">
            Sign Up Free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
