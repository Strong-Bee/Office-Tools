// components/charts/ToolsStatsChart.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ToolsStatsChartProps {
    data: {
        category: string;
        count: number;
        color: string;
    }[];
}

export default function ToolsStatsChart({ data }: ToolsStatsChartProps) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current || !data.length) return;

        // Clear previous chart
        d3.select(chartRef.current).selectAll('*').remove();

        const width = chartRef.current.clientWidth || 600;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 60, left: 60 };
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

        // X Scale
        const xScale = d3
            .scaleBand()
            .domain(data.map((d) => d.category))
            .range([0, innerWidth])
            .padding(0.3);

        // Y Scale
        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.count) || 0])
            .range([innerHeight, 0]);

        // Color Scale
        const colorScale = d3
            .scaleOrdinal<string>()
            .domain(data.map((d) => d.category))
            .range(data.map((d) => d.color));

        // Bars
        g.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => xScale(d.category) || 0)
            .attr('y', innerHeight)
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            .attr('fill', (d) => colorScale(d.category))
            .attr('rx', 6)
            .attr('ry', 6)
            .transition()
            .duration(800)
            .delay((_, i) => i * 100)
            .attr('y', (d) => yScale(d.count))
            .attr('height', (d) => innerHeight - yScale(d.count));

        // Bar hover effect
        g.selectAll('.bar')
            .on('mouseenter', function (this: SVGRectElement, event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 0.8)
                    .attr('transform', 'scale(1.05)');

                // Show tooltip
                const tooltip = d3.select(chartRef.current)
                    .append('div')
                    .attr('class', 'chart-tooltip')
                    .style('position', 'absolute')
                    .style('background', 'white')
                    .style('padding', '8px 12px')
                    .style('border-radius', '8px')
                    .style('box-shadow', '0 4px 6px rgba(0,0,0,0.1)')
                    .style('pointer-events', 'none')
                    .style('font-size', '14px')
                    .style('z-index', '10');

                tooltip
                    .html(`<strong>${d.category}</strong><br/>${d.count} tools`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 10) + 'px');
            })
            .on('mouseleave', function () {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 1)
                    .attr('transform', 'scale(1)');

                d3.select(chartRef.current).selectAll('.chart-tooltip').remove();
            });

        // X Axis
        g.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale))
            .style('font-size', '12px')
            .style('font-weight', '500');

        // Y Axis
        g.append('g')
            .call(d3.axisLeft(yScale))
            .style('font-size', '12px');

        // Labels on bars
        g.selectAll('.label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr('x', (d) => (xScale(d.category) || 0) + xScale.bandwidth() / 2)
            .attr('y', (d) => yScale(d.count) - 8)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', '600')
            .style('fill', '#1f2937')
            .style('opacity', 0)
            .text((d) => d.count)
            .transition()
            .duration(800)
            .delay((_, i) => i * 100 + 400)
            .style('opacity', 1);

        // Responsive resize
        const resizeObserver = new ResizeObserver(() => {
            if (chartRef.current) {
                const newWidth = chartRef.current.clientWidth || 600;
                const newHeight = 300;
                svg
                    .attr('width', newWidth)
                    .attr('height', newHeight);
            }
        });

        resizeObserver.observe(chartRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [data]);

    return <div ref={chartRef} className="w-full h-[300px]" />;
}