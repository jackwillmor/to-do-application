import React from 'react';

interface SelectComponentProps {
    options: { value: string; label: string }[];
    emptyResults: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Select component.
 *
 * @param options
 * @param emptyResults
 * @param onChange
 */
export const SelectComponent: React.FC<SelectComponentProps> = ({
    options,
    emptyResults,
    onChange
}) => {
    return (
        <select
            onChange={onChange}
            className="mt-1 block border-solid border rounded w-full focus:shadow-md p-2"
        >
            {
                options.length === 0 && (
                    <option value="">{emptyResults}</option>
                )
            }
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
