'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DonutChartData {
    label: string;
    value: number;
    color: string;
}

interface DonutChartProps {
    data: DonutChartData[];
}

export default function DonutChart({
    data,
}: DonutChartProps) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = chartRef.current;

        if (!container || !data.length) {
            return;
        }

        const renderChart = () => {
            // Clear previous chart
            d3.select(container)
                .selectAll('*')
                .interrupt()
                .remove();

            const width = container.clientWidth || 400;
            const height = 400;

            const radius =
                Math.min(width, height) / 2 - 60;

            const safeRadius = Math.max(radius, 80);

            const total = data.reduce(
                (sum, item) => sum + Math.max(0, item.value),
                0,
            );

            // Don't render an invalid pie chart
            if (total <= 0) {
                const emptySvg = d3
                    .select(container)
                    .append('svg')
                    .attr('width', '100%')
                    .attr('height', height)
                    .attr(
                        'viewBox',
                        `0 0 ${width} ${height}`,
                    );

                emptySvg
                    .append('text')
                    .attr('x', width / 2)
                    .attr('y', height / 2)
                    .attr('text-anchor', 'middle')
                    .style('font-size', '14px')
                    .style('fill', '#6b7280')
                    .text('No data available');

                return;
            }

            /*
             * SVG
             */
            const svg = d3
                .select(container)
                .append('svg')
                .attr('width', '100%')
                .attr('height', height)
                .attr(
                    'viewBox',
                    `0 0 ${width} ${height}`,
                )
                .attr(
                    'preserveAspectRatio',
                    'xMidYMid meet',
                )
                .style('overflow', 'visible');

            /*
             * Main chart group
             */
            const g = svg
                .append('g')
                .attr(
                    'transform',
                    `translate(${width / 2},${height / 2})`,
                );

            /*
             * Color scale
             */
            const color = d3
                .scaleOrdinal<string, string>()
                .domain(data.map((item) => item.label))
                .range(data.map((item) => item.color));

            /*
             * Pie generator
             */
            const pie = d3
                .pie<DonutChartData>()
                .value((item) => Math.max(0, item.value))
                .sort(null);

            const arcs = pie(data);

            /*
             * Arc generators
             */
            const arc = d3
                .arc<d3.PieArcDatum<DonutChartData>>()
                .innerRadius(safeRadius * 0.58)
                .outerRadius(safeRadius)
                .cornerRadius(5);

            const hoverArc = d3
                .arc<d3.PieArcDatum<DonutChartData>>()
                .innerRadius(safeRadius * 0.58)
                .outerRadius(safeRadius + 8)
                .cornerRadius(5);

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
                .style('color', '#ffffff')
                .style('padding', '8px 12px')
                .style('border-radius', '8px')
                .style(
                    'box-shadow',
                    '0 4px 12px rgba(0, 0, 0, 0.15)',
                )
                .style('pointer-events', 'none')
                .style('font-size', '13px')
                .style('line-height', '1.4')
                .style('white-space', 'nowrap')
                .style('z-index', '20');

            /*
             * Donut slices
             */
            const slices = g
                .selectAll<
                    SVGPathElement,
                    d3.PieArcDatum<DonutChartData>
                >('.donut-slice')
                .data(arcs)
                .enter()
                .append('path')
                .attr('class', 'donut-slice')
                .attr('d', arc)
                .attr('fill', (d) =>
                    color(d.data.label),
                )
                .attr('stroke', 'transparent')
                .attr('stroke-width', 2)
                .style('opacity', 0)
                .style('cursor', 'pointer');

            /*
             * Slice animation
             */
            slices
                .transition()
                .duration(700)
                .delay((_, index) => index * 100)
                .ease(d3.easeCubicOut)
                .style('opacity', 1);

            /*
             * Hover interaction
             */
            slices
                .on(
                    'mouseenter',
                    function (
                        event: MouseEvent,
                        d: d3.PieArcDatum<DonutChartData>,
                    ) {
                        d3.select(this)
                            .interrupt()
                            .transition()
                            .duration(150)
                            .attr('d', hoverArc)
                            .attr('stroke', '#ffffff')
                            .attr('stroke-width', 2);

                        const percentage =
                            (d.data.value / total) * 100;

                        const [mouseX, mouseY] = d3.pointer(
                            event,
                            container,
                        );

                        tooltip
                            .style('visibility', 'visible')
                            .html(
                                `
                  <div style="font-weight: 600; margin-bottom: 2px;">
                    ${d.data.label}
                  </div>
                  <div>
                    ${d.data.value} tools
                    (${percentage.toFixed(1)}%)
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
                            .attr('d', arc)
                            .attr('stroke', 'transparent');

                        tooltip.style(
                            'visibility',
                            'hidden',
                        );
                    },
                );

            /*
             * Center total
             */
            const centerTotal = g
                .append('text')
                .attr('class', 'donut-total')
                .attr('text-anchor', 'middle')
                .attr('dy', '-0.1em')
                .style('font-size', '28px')
                .style('font-weight', '700')
                .style('fill', '#1f2937')
                .style('opacity', 0)
                .text(total);

            centerTotal
                .transition()
                .duration(500)
                .delay(700)
                .style('opacity', 1);

            /*
             * Center subtitle
             */
            const centerLabel = g
                .append('text')
                .attr('class', 'donut-label')
                .attr('y', 26)
                .attr('text-anchor', 'middle')
                .style('font-size', '13px')
                .style('font-weight', '500')
                .style('fill', '#6b7280')
                .style('opacity', 0)
                .text('Total Tools');

            centerLabel
                .transition()
                .duration(500)
                .delay(850)
                .style('opacity', 1);

            /*
             * Legend
             */
            const legendItems = data;

            const legend = svg
                .append('g')
                .attr(
                    'class',
                    'donut-legend',
                );

            const legendX =
                width >= 520
                    ? width - 170
                    : 20;

            const legendY =
                width >= 520
                    ? 20
                    : height - Math.min(
                        legendItems.length * 24 + 10,
                        150,
                    );

            legend.attr(
                'transform',
                `translate(${legendX},${legendY})`,
            );

            legendItems.forEach((item, index) => {
                const row = legend
                    .append('g')
                    .attr(
                        'transform',
                        `translate(0,${index * 24})`,
                    );

                row
                    .append('rect')
                    .attr('width', 12)
                    .attr('height', 12)
                    .attr('rx', 3)
                    .attr('fill', color(item.label));

                row
                    .append('text')
                    .attr('x', 18)
                    .attr('y', 10)
                    .style('font-size', '12px')
                    .style('font-weight', '500')
                    .style('fill', '#4b5563')
                    .text(item.label);
            });
        };

        // Initial render
        renderChart();

        /*
         * Responsive rendering
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