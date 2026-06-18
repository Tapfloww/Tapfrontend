interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
}

export default function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="page-title">{title}</h1>
          {badge && <span className="badge badge-info">{badge}</span>}
        </div>
        {description && <p className="page-description">{description}</p>}
      </div>
    </div>
  );
}
