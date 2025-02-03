import React from 'react';

type InputComponentProps = {
    type: string;
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * InputComponent
 *
 * @param type
 * @param value
 * @param placeholder
 * @param onChange
 */
export function InputComponent({
    type,
    value,
    placeholder,
    onChange
}: InputComponentProps){
    return <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block border-solid border rounded w-full focus:shadow-md p-2"
    />;
}
