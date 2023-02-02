# Valparaiso University's ACM Chapter Website

A website for the Valparaiso University Chapter of the Association for Computing Machinery.

## Administration Guide

### How to update the Eboard members?

Edit `data/eboard.json` with the appropriate information. Profile photos should be placed in `static/eboard/` in the format `firstname-lastname.webp` to be automatically found.

### How to update ACM events?

Edit `data/events.json` with the semester's events.

### How to update the constitution?

After completing the constitutional process to amend the constitution, replace the `static/constitution.pdf` file with an updated copy.

### How do I preview the development website?

Run `hugo server` and navigate to `localhost:1313` to view the development website.

### How do I publish a website revision?

Commit to the `master` branch. GitHub will automatically run Hugo to generate the website.

