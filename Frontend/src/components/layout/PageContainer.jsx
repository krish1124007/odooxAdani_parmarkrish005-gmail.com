const PageContainer = ({ title, subtitle, actions, children }) => {
  return (
    <div className="page-container">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          {title && <h2 className="mb-1">{title}</h2>}
          {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
        </div>
        {actions && <div className="d-flex gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  )
}

export default PageContainer
