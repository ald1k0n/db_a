import React from 'react';

type ButtonProps = {
    value: any,
    onChange: ()=>void,
    variant?: VariantType,
    children?: React.ReactNode,
    className?: string,
    size?: string,
}

type VariantType = 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary'

export const Button = (props: ButtonProps) => {
    return (
        <div>

        </div>
    );
};