import React from 'react';
import tabsStyles from './tabs.css';
import {Tab} from './Tab';

type Tab = {
    id: string;
    label: string;
    content: React.ReactNode;
}

type TabsProps = {
    tabs: Tab[];
}

export const Tabs: React.FC<TabsProps> = ({tabs}) => {
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
                    <Tab title={tab.label} active={activeTab === tab.id} />
                </button>
            </li>)}


        </ul>

        <section className={tabsStyles.content}>
            {activeTabElement?.content}
        </section>
    </div>;
};

