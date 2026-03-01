import React from 'react';
import tabsStyles from './tabs.css';

type TabProperty = {
    id: string;
    label: string;
    content: React.ReactNode;
}

type TabsProps = {
    tabs: TabProperty[];
    renderFunction: (label: string, tabId: string, activeTab: string) => React.ReactNode
}

export const Tabs: React.FC<TabsProps> = ({tabs, renderFunction}) => {
    const [activeTab, setActiveTab] = React.useState<string>(tabs[0]?.id ?? '');


    const onClick = (id: string) => {
        setActiveTab(id);
    };

    const activeTabElement = tabs.find(tab => tab.id === activeTab);


    return <div className={tabsStyles.container}>
        <ul className={tabsStyles.tabList}>
            {tabs.map(tab => <li key={tab.id}>
                <button onClick={(e) => {
                    onClick(tab.id);
                    e.stopPropagation();
                }} className={tabsStyles.tabButton}>
                    {renderFunction(tab.label, tab.id, activeTab)}
                </button>
            </li>)}
        </ul>

        <section className={tabsStyles.content}>
            {activeTabElement?.content}
        </section>
    </div>;
};

