import React from 'react';

type ContentProps = {
    children: React.ReactNode;
}

export const Content: React.FC<ContentProps> = ({children}) => {
    return (<div>{children}</div>);
};
