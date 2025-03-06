export const reports = [
    {
        slug: 'First run',
        summary: {
            total: 120,
            passed: 115,
            failed: 1,
        },
        failed_tests: [{
            title: 'Files cy.writeFile() - write to a file',
            message: "AssertionError: expected 'Jane' to equal 'nig'",
            path: 'cypress/e2e/2-advanced-examples/files.cy.js'
        }, {
            title: 'Network Requests cy.request() - verify response using BDD syntax',
            message: "AssertionError: expected 200 to equal 304",
            path: 'cypress/e2e/2-advanced-examples/network_requests.cy.js'
        },
        {
            title: 'Querying cy.contains() - query DOM elements with matching content',
            message: "AssertionError: Timed out retrying after 4000ms: expected '<li.first>' to have class 'NEGUS'",
            path: 'cypress/e2e/2-advanced-examples/querying.cy.js'
        },
        {
            title: 'Querying .within() - query DOM elements within a specific element',
            message: "AssertionError: Timed out retrying after 4000ms: expected '<input#inputEmail.form-control>' to have attribute 'placeholder' with the value 'sex', but the value was 'Email'",
            path: 'cypress/e2e/2-advanced-examples/querying.cy.js',
        },
        {
            title: 'Local Storage / Session Storage cy.clearLocalStorage() - clear all data in localStorage for the current origin        ',
            message: "AssertionError: Timed out retrying after 4000ms: expected 'red' to equal 'skr'",
            path: 'cypress/e2e/2-advanced-examples/storage.cy.js',
        }]
    },
    {
        slug: 'Second run',
        summary: {
            total: 20,
            passed: 15,
            failed: 2,
        },
        failed_tests: {
            title: 'Network Requests cy.request() - verify response using BDD syntax',
            message: "AssertionError: expected 200 to equal 304",
            path: 'cypress/e2e/2-advanced-examples/network_requests.cy.js'
        }
    },
    {
        slug: 'Third run',
        summary: {
            total: 100,
            passed: 90,
            failed: 13,
        },
        failed_tests: {
            title: 'Querying cy.contains() - query DOM elements with matching content',
            message: "AssertionError: Timed out retrying after 4000ms: expected '<li.first>' to have class 'NEGUS'",
            path: 'cypress/e2e/2-advanced-examples/querying.cy.js'
        }
    },
    {
        slug: 'Fourth run',
        summary: {
            total: 12,
            passed: 11,
            failed: 1,
        },
        failed_tests: {
            title: 'Querying .within() - query DOM elements within a specific element',
            message: "AssertionError: Timed out retrying after 4000ms: expected '<input#inputEmail.form-control>' to have attribute 'placeholder' with the value 'sex', but the value was 'Email'",
            path: 'cypress/e2e/2-advanced-examples/querying.cy.js',
        }
    },
    {
        slug: 'Fifth run',
        summary: {
            total: 1220,
            passed: 1200,
            failed: 20,
        },
        failed_tests: {
            title: 'Local Storage / Session Storage cy.clearLocalStorage() - clear all data in localStorage for the current origin        ',
            message: "AssertionError: Timed out retrying after 4000ms: expected 'red' to equal 'skr'",
            path: 'cypress/e2e/2-advanced-examples/storage.cy.js',
        }
    }
]