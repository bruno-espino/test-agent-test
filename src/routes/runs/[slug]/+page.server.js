import { reports } from '../data.js';

export function load({ params }) {
    const report = reports.find((report) => report.slug === params.slug);

    return {
        report
    };
}