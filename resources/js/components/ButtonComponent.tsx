import React from 'react';

interface ButtonComponentProps {
    label: string;
    className?: string;
    onClick: () => void;
}

/**
 * ButtonComponent component.
 *
 * @param label
 * @param className
 * @param onClick
 */
export function ButtonComponent({
    label,
    className,
    onClick
}: ButtonComponentProps) {
    return <button
        onClick={onClick}
        className={className}
    >{label}</button>;
}
