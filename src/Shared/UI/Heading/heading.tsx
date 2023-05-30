import React from 'react';

type HeadingProps = {
    className?: string,
    lineHeight?: string,
    color?: string,
    children?: React.ReactNode
}

export const Heading = (props: HeadingProps) => {
    return (
        <div className={'flex flex-row items-center'}>
            <hr className={`grow mr-2.5 ${props.color}`} style={{height: props.lineHeight}}/>
            <div>{props.children}</div>
            <hr className={`grow ml-2.5 ${props.color}`} style={{height: props.lineHeight}}/>
        </div>
    );
};