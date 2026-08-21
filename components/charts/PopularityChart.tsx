// components/charts/PopularityChart.tsx

'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface PopularityChartProps {
    data: {
        name: string;
        popularity: number;
        color: string;
    }[];
}

export default function PopularityChart({
    data,
}: PopularityChartProps) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = chartRef.current;

        if (!container || !data.length) {
            return;
        }

        // Clear previous chart
        d3.select(container).selectAll('*').remove();

        const renderChart = () => {
            // Clear existing chart before re-render
            d3.select(container).selectAll('*').remove();

            const width = container.clientWidth || 600;
            const height = 400;

            const margin = {
                top: 20,
                right: 50,
                bottom: 50,
                left: 130,
            };

            const innerWidth = Math.max(
                width - margin.left - margin.right,
                100,
            );

            const innerHeight = Math.max(
                height - margin.top - margin.bottom,
                100,
            );

            // Sort by popularity descending
            const sortedData = [...data].sort(
                (a, b) => b.popularity - a.popularity,
            );

            // Clamp popularity between 0 and 100
            const normalizedData = sortedData.map((item) => ({
                ...item,
                popularity: Math.max(
                    0,
                    Math.min(100, item.popularity),
                ),
            }));

            /*
             * SVG
             */
            const svg = d3
                .select(container)
                .append('svg')
                .attr('width', '100%')
                .attr('height', height)
                .attr('viewBox', `0 0 ${width} ${height}`)
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .style('overflow', 'visible');

            const g = svg
                .append('g')
                .attr(
                    'transform',
                    `translate(${margin.left},${margin.top})`,
                );

            /*
             * Scales
             */
            const yScale = d3
                .scaleBand<string>()
                .domain(normalizedData.map((item) => item.name))
                .range([0, innerHeight])
                .padding(0.3);

            const xScale = d3
                .scaleLinear()
                .domain([0, 100])
                .range([0, innerWidth])
                .nice();

            /*
             * Color scale
             */
            const colorScale = d3
                .scaleOrdinal<string, string>()
                .domain(normalizedData.map((item) => item.name))
                .range(normalizedData.map((item) => item.color));

            /*
             * Grid
             */
            g.append('g')
                .attr('class', 'grid')
                .call(
                    d3
                        .axisBottom(xScale)
                        .ticks(5)
                        .tickSize(-innerHeight)
                        .tickFormat(() => ''),
                )
                .attr('transform', `translate(0,0)`)
                .call((selection) => {
                    selection.select('.domain').remove();

                    selection
                        .selectAll('.tick line')
                        .attr('stroke', '#e5e7eb')
                        .attr('stroke-dasharray', '4,4')
                        .attr('stroke-width', 0.8);
                });

            /*
             * Tooltip
             */
            const tooltip = d3
                .select(container)
                .append('div')
                .attr('class', 'chart-tooltip')
                .style('position', 'absolute')
                .style('visibility', 'hidden')
                .style('background', 'rgba(17, 24, 39, 0.95)')
                .style('color', '#fff')
                .style('padding', '8px 12px')
                .style('border-radius', '8px')
                .style('box-shadow', '0 4px 12px rgba(0,0,0,0.15)')
                .style('pointer-events', 'none')
                .style('font-size', '13px')
                .style('line-height', '1.4')
                .style('z-index', '20')
                .style('white-space', 'nowrap');

            /*
             * Bars
             */
            const bars = g
                .selectAll<SVGRectElement, (typeof normalizedData)[number]>(
                    '.bar-popularity',
                )
                .data(normalizedData)
                .enter()
                .append('rect')
                .attr('class', 'bar-popularity')
                .attr('x', 0)
                .attr(
                    'y',
                    (d) => yScale(d.name) ?? 0,
                )
                .attr('width', 0)
                .attr('height', yScale.bandwidth())
                .attr('fill', (d) => colorScale(d.name))
                .attr('rx', 6)
                .attr('ry', 6)
                .style('cursor', 'pointer');

            /*
             * Bar animation
             */
            bars
                .transition()
                .duration(800)
                .delay((_, index) => index * 80)
                .ease(d3.easeCubicOut)
                .attr('width', (d) => xScale(d.popularity));

            /*
             * Bar hover
             */
            bars
                .on(
                    'mouseenter',
                    function (event: MouseEvent, d) {
                        d3.select(this)
                            .interrupt()
                            .transition()
                            .duration(150)
                            .attr('opacity', 0.75);

                        const [mouseX, mouseY] = d3.pointer(
                            event,
                            container,
                        );

                        tooltip
                            .style('visibility', 'visible')
                            .html(
                                `
                  <div style="font-weight: 600; margin-bottom: 2px;">
                    ${d.name}
                  </div>
                  <div>
                    Popularity: <strong>${d.popularity}%</strong>
                  </div>
                `,
                            )
                            .style(
                                'left',
                                `${mouseX + 12}px`,
                            )
                            .style(
                                'top',
                                `${mouseY - 45}px`,
                            );
                    },
                )
                .on(
                    'mousemove',
                    function (event: MouseEvent) {
                        const [mouseX, mouseY] = d3.pointer(
                            event,
                            container,
                        );

                        tooltip
                            .style(
                                'left',
                                `${mouseX + 12}px`,
                            )
                            .style(
                                'top',
                                `${mouseY - 45}px`,
                            );
                    },
                )
                .on(
                    'mouseleave',
                    function () {
                        d3.select(this)
                            .interrupt()
                            .transition()
                            .duration(150)
                            .attr('opacity', 1);

                        tooltip.style(
                            'visibility',
                            'hidden',
                        );
                    },
                );

            /*
             * Percentage labels
             */
            g.selectAll('.label-popularity')
                .data(normalizedData)
                .enter()
                .append('text')
                .attr('class', 'label-popularity')
                .attr(
                    'x',
                    (d) => xScale(d.popularity) + 8,
                )
                .attr(
                    'y',
                    (d) =>
                        (yScale(d.name) ?? 0) +
                        yScale.bandwidth() / 2 +
                        4,
                )
                .style('font-size', '11px')
                .style('font-weight', '600')
                .style('fill', '#1f2937')
                .style('opacity', 0)
                .text((d) => `${d.popularity}%`)
                .transition()
                .duration(500)
                .delay((_, index) => index * 80 + 400)
                .style('opacity', 1);

            /*
             * Y Axis
             */
            g.append('g')
                .attr('class', 'y-axis')
                .call(
                    d3.axisLeft(yScale).tickSize(0),
                )
                .call((selection) => {
                    selection.select('.domain').remove();

                    selection
                        .selectAll('.tick text')
                        .attr('fill', '#374151')
                        .style('font-size', '11px')
                        .style('font-weight', '500');
                });

            /*
             * X Axis
             */
            g.append('g')
                .attr(
                    'transform',
                    `translate(0,${innerHeight})`,
                )
                .call(
                    d3
                        .axisBottom(xScale)
                        .ticks(5)
                        .tickFormat((value) => `${value}%`),
                )
                .call((selection) => {
                    selection.select('.domain')
                        .attr('stroke', '#d1d5db');

                    selection
                        .selectAll('.tick text')
                        .attr('fill', '#6b7280')
                        .style('font-size', '11px');
                });
        };

        // Initial render
        renderChart();

        /*
         * Responsive resize
         */
        const resizeObserver = new ResizeObserver(() => {
            renderChart();
        });

        resizeObserver.observe(container);

        /*
         * Cleanup
         */
        return () => {
            resizeObserver.disconnect();

            d3.select(container)
                .selectAll('*')
                .interrupt()
                .remove();
        };
    }, [data]);

    return (
        <div
            ref={chartRef}
            className="relative w-full h-[400px]"
        />
    );
}