"use client";
import React from 'react';

interface FieldArrayProps {
    label: string;
    items: { value: string, availability?: string, hospitalAffiliations?: string[] }[];
    namePrefix: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    addField: () => void;
    removeField: (index: number) => void;
}

const FieldArray: React.FC<FieldArrayProps> = ({ label, items, namePrefix, handleChange, addField, removeField }) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            {items.map((item, index) => (
                <div key={index} className="space-y-2">
                    {item.availability !== undefined ? (
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                name={`${namePrefix}_${index}_day`}
                                placeholder="Day"
                                value={item.value}
                                onChange={handleChange}
                                className="input input-bordered flex-1"
                            />
                            <input
                                type="text"
                                name={`${namePrefix}_${index}_hours`}
                                placeholder="Hours"
                                value={item.availability}
                                onChange={handleChange}
                                className="input input-bordered flex-1"
                            />
                            <button type="button" onClick={() => removeField(index)} className="btn btn-error">Remove</button>
                        </div>
                    ) : item.hospitalAffiliations !== undefined ? (
                        <div className="space-y-2">
                            <input
                                type="text"
                                name={`${namePrefix}_${index}_name`}
                                placeholder="Hospital Name"
                                value={item.value}
                                onChange={handleChange}
                                className="input input-bordered flex-1"
                            />
                            {item.hospitalAffiliations.map((affiliation, affIndex) => (
                                <input
                                    key={affIndex}
                                    type="text"
                                    name={`${namePrefix}_${index}_address_${affIndex}`}
                                    placeholder={["Street", "City", "State", "Postal Code", "Country"][affIndex]}
                                    value={affiliation}
                                    onChange={handleChange}
                                    className="input input-bordered flex-1"
                                />
                            ))}
                            <button type="button" onClick={() => removeField(index)} className="btn btn-error">Remove</button>
                        </div>
                    ) : (
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                name={`${namePrefix}_${index}`}
                                placeholder={label}
                                value={item.value}
                                onChange={handleChange}
                                className="input input-bordered flex-1"
                            />
                            <button type="button" onClick={() => removeField(index)} className="btn btn-error">Remove</button>
                        </div>
                    )}
                </div>
            ))}
            <button type="button" onClick={addField} className="btn btn-primary mt-2">Add {label}</button>
        </div>
    );
};

export default FieldArray;
