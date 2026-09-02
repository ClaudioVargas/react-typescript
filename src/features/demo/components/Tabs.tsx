import type { TabItem } from '../types';

interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeId, onChange }) => (
  <div className="flex gap-1 overflow-x-auto border-b border-slate-200" role="tablist">
    {tabs.map((tab) => {
      const isActive = tab.id === activeId;
      const Icon = tab.icon;
      return (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={isActive}
          onClick={() => onChange(tab.id)}
          className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
            isActive
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:border-slate-200 hover:text-slate-800'
          }`}
        >
          {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
          {tab.label}
        </button>
      );
    })}
  </div>
);

export default Tabs;