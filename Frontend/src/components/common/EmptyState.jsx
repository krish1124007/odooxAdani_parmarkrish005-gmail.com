const EmptyState = ({ icon, title, message, action }) => {
  return (
    <div className="text-center py-5">
      {icon && <i className={`bi ${icon} text-muted mb-3`} style={{ fontSize: '4rem' }}></i>}
      {title && <h4 className="mb-2">{title}</h4>}
      {message && <p className="text-muted mb-4">{message}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}

export default EmptyState
