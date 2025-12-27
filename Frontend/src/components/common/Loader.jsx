const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : size === 'lg' ? 'spinner-border-lg' : ''
  
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-5">
      <div className={`spinner-border text-odoo-primary ${sizeClass}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <p className="mt-3 text-muted">{text}</p>}
    </div>
  )
}

export default Loader
