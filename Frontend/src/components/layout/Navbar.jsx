const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center flex-grow-1">
          <button className="btn btn-link text-dark">
            <i className="bi bi-list fs-4"></i>
          </button>
          
          <form className="d-flex ms-3 flex-grow-1" style={{ maxWidth: '500px' }}>
            <input
              className="form-control"
              type="search"
              placeholder="Search equipment, requests..."
              aria-label="Search"
            />
          </form>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-link text-dark position-relative">
            <i className="bi bi-bell fs-5"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3
            </span>
          </button>
          
          <button className="btn btn-link text-dark">
            <i className="bi bi-gear fs-5"></i>
          </button>
          
          <div className="avatar">
            AD
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
