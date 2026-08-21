// components/charts/UsageTrendChart.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface UsageTrendChartProps {
    data: {
        date: string;
        users: number;
        files: number;
    }[];
}

export default function UsageTrendChart({ data }: UsageTrendChartProps) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current || !data.length) return;

        d3.select(chartRef.current).selectAll('*').remove();

        const width = chartRef.current.clientWidth || 600;
        const height = 300;
        const margin = { top: 20, right: 40, bottom: 60, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3
            .select(chartRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('overflow', 'visible');

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Parse dates
        const parseDate = d3.timeParse('%Y-%m-%d');
        const dates = data.map(d => parseDate(d.date) || new Date());

        // Scales
        const xScale = d3
            .scaleTime()
            .domain(d3.extent(dates) as [Date, Date])
            .range([0, innerWidth]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => Math.max(d.users, d.files)) || 0])
            .range([innerHeight, 0]);

        // Line generators
        const usersLine = d3
            .line<typeof data[0]>()
            .x((d, i) => xScale(dates[i]))
            .y((d) => yScale(d.users))
            .curve(d3.curveMonotoneX);

        const filesLine = d3
            .line<typeof data[0]>()
            .x((d, i) => xScale(dates[i]))
            .y((d) => yScale(d.files))
            .curve(d3.curveMonotoneX);

        // Area for users
        const usersArea = d3
            .area<typeof data[0]>()
            .x((d, i) => xScale(dates[i]))
            .y0(innerHeight)
            .y1((d) => yScale(d.users))
            .curve(d3.curveMonotoneX);

        // Area for files
        const filesArea = d3
            .area<typeof data[0]>()
            .x((d, i) => xScale(dates[i]))
            .y0(innerHeight)
            .y1((d) => yScale(d.files))
            .curve(d3.curveMonotoneX);

        // Users area
        g.append('path')
            .datum(data)
            .attr('class', 'users-area')
            .attr('d', usersArea)
            .attr('fill', 'rgba(59, 130, 246, 0.1)')
            .style('opacity', 0)
            .transition()
            .duration(1000)
            .style('opacity', 1);

        // Files area
        g.append('path')
            .datum(data)
            .attr('class', 'files-area')
            .attr('d', filesArea)
            .attr('fill', 'rgba(139, 92, 246, 0.1)')
            .style('opacity', 0)
            .transition()
            .duration(1000)
            .delay(300)
            .style('opacity', 1);

        // Users line
        g.append('path')
            .datum(data)
            .attr('class', 'users-line')
            .attr('d', usersLine)
            .attr('fill', 'none')
            .attr('stroke', '#3b82f6')
            .attr('stroke-width', 2.5)
            .attr('stroke-linecap', 'round')
            .attr('stroke-linejoin', 'round')
            .style('stroke-dasharray', '0 100%')
            .transition()
            .duration(1000)
            .style('stroke-dasharray', '100% 0');

        // Files line
        g.append('path')
            .datum(data)
            .attr('class', 'files-line')
            .attr('d', filesLine)
            .attr('fill', 'none')
            .attr('stroke', '#8b5cf6')
            .attr('stroke-width', 2.5)
            .attr('stroke-linecap', 'round')
            .attr('stroke-linejoin', 'round')
            .style('stroke-dasharray', '0 100%')
            .transition()
            .duration(1000)
            .delay(300)
            .style('stroke-dasharray', '100% 0');

        // Dots for users
        g.selectAll('.dot-users')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot-users')
            .attr('cx', (d, i) => xScale(dates[i]))
            .attr('cy', (d) => yScale(d.users))
            .attr('r', 4)
            .attr('fill', '#3b82f6')
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay((_, i) => i * 50 + 500)
            .style('opacity', 1);

        // Dots for files
        g.selectAll('.dot-files')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot-files')
            .attr('cx', (d, i) => xScale(dates[i]))
            .attr('cy', (d) => yScale(d.files))
            .attr('r', 4)
            .attr('fill', '#8b5cf6')
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay((_, i) => i * 50 + 800)
            .style('opacity', 1);

        // Axes
        g.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale).ticks(6))
            .style('font-size', '11px');

        g.append('g')
            .call(d3.axisLeft(yScale))
            .style('font-size', '11px');

        // Legend
        const legend = g.append('g')
            .attr('transform', `translate(${innerWidth - 180}, 0)`);

        legend.append('rect')
            .attr('width', 12)
            .attr('height', 12)
            .attr('rx', 3)
            .attr('fill', '#3b82f6');

        legend.append('text')
            .attr('x', 18)
            .attr('y', 10)
            .style('font-size', '12px')
            .style('fill', '#4b5563')
            .text('Users');

        legend.append('rect')
            .attr('x', 0)
            .attr('y', 20)
            .attr('width', 12)
            .attr('height', 12)
            .attr('rx', 3)
            .attr('fill', '#8b5cf6');

        legend.append('text')
            .attr('x', 18)
            .attr('y', 30)
            .style('font-size', '12px')
            .style('fill', '#4b5563')
            .text('Files Processed');

    }, [data]);

    return <div ref={chartRef} className="w-full h-[300px]" />;
}