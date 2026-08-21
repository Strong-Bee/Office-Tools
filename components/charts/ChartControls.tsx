// components/charts/ChartControls.tsx
'use client';

import { useState } from 'react';

interface ChartControlsProps {
    onFilterChange: (filter: string) => void;
    onTimeRangeChange: (range: string) => void;
}

export default function ChartControls({ onFilterChange, onTimeRangeChange }: ChartControlsProps) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeRange, setActiveRange] = useState('6m');

    const filters = [
        { id: 'all', label: 'All Tools' },
        { id: 'pdf', label: 'PDF' },
        { id: 'documents', label: 'Documents' },
        { id: 'images', label: 'Images' },
        { id: 'office', label: 'Office' },
        { id: 'developer', label: 'Developer' },
    ];

    const timeRanges = [
        { id: '1m', label: '1 Month' },
        { id: '3m', label: '3 Months' },
        { id: '6m', label: '6 Months' },
        { id: '1y', label: '1 Year' },
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex flex-wrap gap-1">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => {
                            setActiveFilter(filter.id);
                            onFilterChange(filter.id);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeFilter === filter.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap gap-1 ml-auto">
                {timeRanges.map((range) => (
                    <button
                        key={range.id}
                        onClick={() => {
                            setActiveRange(range.id);
                            onTimeRangeChange(range.id);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeRange === range.id
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {range.label}
                    </button>
                ))}
            </div>
        </div>
    );
}