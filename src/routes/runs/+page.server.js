import { reports } from './data.js';

export function load() {
    return {
        reports: reports.map((report) => ({
            slug: report.slug,
            summary: report.summary
        }))
    };
}