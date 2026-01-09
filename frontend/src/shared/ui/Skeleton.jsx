const Skelandon = ({ className = '', variant = 'text', width, height }) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';

  const variantClasses = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    thumbnail: 'h-24 w-24',
    image: 'aspect-square w-full',
    card: 'h-64 w-full',
    button: 'h-10 w-24',
  };

  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant] || ''} ${className}`}
      style={style}
    />
  );
};

const SkelandonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow">
    <Skelandon variant="image" />
    <div className="p-4 space-y-3">
      <Skelandon variant="text" className="w-1/3" />
      <Skelandon variant="title" />
      <Skelandon variant="text" className="w-1/2" />
    </div>
  </div>
);

const SkelandonList = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center gap-4">
        <Skelandon variant="avatar" />
        <div className="flex-1 space-y-2">
          <Skelandon variant="text" className="w-1/4" />
          <Skelandon variant="text" className="w-3/4" />
        </div>
      </div>
    ))}
  </div>
);

const SkelandonGrid = ({ count = 6, columns = 3 }) => (
  <div
    className={`grid gap-6`}
    style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <SkelandonCard key={i} />
    ))}
  </div>
);

Skelandon.Card = SkelandonCard;
Skelandon.List = SkelandonList;
Skelandon.Grid = SkelandonGrid;

export default Skelandon;
