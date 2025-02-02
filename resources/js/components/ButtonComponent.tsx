import React from 'react';

interface ButtonComponentProps {
    label: string;
    onClick: () => void;
}

/**
 * ButtonComponent component.
 *
 * @param label
 * @param onClick
 */
export const ButtonComponent: React.FC<ButtonComponentProps> = ({
    label,
    onClick
}) => {
    return <button
        onClick={onClick}
        className="mt-1 block w-full bg-green-400 rounded text-white p-1"
    >{label}</button>;
};
