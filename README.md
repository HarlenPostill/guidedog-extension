GuideDog 🐾

Your path to accessible code.

Overview

GuideDog is a powerful VS Code extension for developers aiming to improve the accessibility of their codebases. GuideDog leverages OpenAI’s advanced language models to scan code for accessibility issues, provide detailed breakdowns of accessibility scores, and offer actionable insights with inline fixes. Built for accessibility-focused development, GuideDog simplifies code compliance with key standards, making it easier to deliver inclusive software to all users.

Key Features

    •	Full Codebase Accessibility Scanning: Analyse entire codebases with an OpenAI API key, uncovering accessibility issues across files and modules.
    •	Accessibility Score Breakdown: Receive comprehensive accessibility scores for your codebase with easy-to-understand insights and suggestions.
    •	Prioritised Issue Reporting: GuideDog prioritises detected issues based on their importance, enabling developers to focus on critical accessibility improvements.
    •	Inline Fix Suggestions: See detailed, inline suggestions to fix issues directly in your code, saving time and boosting productivity.
    •	Visual Data Insights: Access rich data visualisations and graphs for a deeper understanding of accessibility in your project.
    •	Automatic Updates: The extension continuously updates its accessibility database and scanning algorithms, ensuring the latest standards and practices.

• Entirely supported in over 10 languages! natively in the front-end

Installation

    1.	Prerequisites:
    •	A valid OpenAI API key
    •	VS Code version 1.5 or later
    2.	Installation Process:
    •	Open VS Code.
    •	Navigate to Extensions (or press Ctrl+Shift+X).
    •	Search for “GuideDog”.
    •	Click Install to add GuideDog to your extensions.

Setup and Configuration

    1.	Add OpenAI API Key:
    •	After installation, go to Settings → Extensions → GuideDog.
    •	Enter your OpenAI API key in the API Key field to enable scanning and code generation.
    2.	Adjust Preferences (Optional):
    •	Issue Severity Threshold: Adjust the minimum severity of issues shown.
    •	Auto-Fix Inline Suggestions: Enable auto-application of inline fix suggestions for common issues.

Usage Guide

Running an Accessibility Scan

    1.	Start a Scan:
    •	Right-click on your project folder and select GuideDog → Run Accessibility Scan.
    •	The scan will analyse your codebase and generate an accessibility score.
    2.	Review Accessibility Score and Insights:
    •	Upon completion, GuideDog will display an overall score, highlighting key metrics and issues.
    •	Navigate to the GuideDog Panel in the sidebar to view detailed breakdowns, including data visualisations.

Issue Breakdown and Fixes

    •	Issue Prioritisation:

Issues are ranked by importance (Critical, High, Medium, Low) so you can prioritise the most impactful fixes.
• Inline Fix Suggestions:
Hover over highlighted issues to view suggested fixes directly in the code editor. Click Apply Fix to implement them instantly.

Understanding the Accessibility Score

GuideDog calculates a composite accessibility score based on several metrics:

    •	Readability Compliance: Measures text size, colour contrast, and readability standards.
    •	Navigation and Focus Control: Evaluates focus management, tab order, and screen reader accessibility.
    •	Keyboard Accessibility: Ensures that interactive elements are usable via keyboard-only navigation.
    •	Alt Text and Labels: Checks for proper labelling and alt text on images and interactive elements.

Each section contributes to the overall score, providing a comprehensive view of accessibility.

Visual Data Insights

GuideDog presents data insights through graphs and charts, including:

    •	Issue Distribution by Severity: A bar graph shows the number and severity of accessibility issues.
    •	Component-Specific Accessibility Scores: View scores for different sections of your codebase (e.g., forms, navigation).
    •	Trends Over Time: Track improvements over time as you resolve issues and re-scan the code.

FAQ

Q: Does GuideDog support different coding languages?
A: GuideDog supports all languages compatible with OpenAI’s code generation and analysis, including HTML, JavaScript, Python, and more.

Q: How does GuideDog rank issue importance?
A: GuideDog ranks issues based on accessibility best practices and impact on user experience, with Critical issues having the highest impact.

Q: Can I customise the accessibility standards GuideDog checks?
A: GuideDog currently aligns with WCAG 2.1 standards and will be updated as new guidelines emerge. Customisation options for specific rules are in development.
