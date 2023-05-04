# Valparaiso University's ACM Chapter Website

A website for the Valparaiso University Chapter of the Association for Computing Machinery.

## Administration Guide

### How to update the Eboard members?

Edit `data/eboard.json` with the appropriate information. Profile photos should be placed in `static/eboard/` in the format `firstname-lastname.webp` to be automatically found.

You can convert an image to .webp by using cwebp:

```
cwebp -q 75 input_file.png -o output_file.webp
```

### How to update ACM events?

Edit `data/events.json` with the semester's events. Note: the `slides` url is optional.

### How to update the constitution?

After completing the constitutional process to amend the constitution, replace the `static/constitution.pdf` file with an updated copy.

### How do I preview the development website?

Run `hugo server` and navigate to `localhost:1313` to view the development website.

### How do I publish a website revision?

Commit to the `master` branch. A GitHub Action will automatically run Hugo to generate and deploy the website.

