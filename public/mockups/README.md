# Mockup Images

This directory should contain the following mockup images:

1. **calendar.png** - A screenshot showing the calendar/scheduling view
   - Recommended size: 800x600px
   - Show a weekly calendar with some appointments
   
2. **reminders.png** - A screenshot showing SMS/email reminder setup
   - Recommended size: 800x600px
   - Show reminder configuration or sent reminders
   
3. **invoices.png** - A screenshot showing the invoicing feature
   - Recommended size: 800x600px
   - Show an invoice or payment tracking view

## Design Guidelines

- Use a clean, modern UI design
- Ensure images are optimized for web (< 200KB each)
- Use consistent styling across all mockups
- Include realistic but anonymized data

## Placeholder Generation

If you need placeholder images for development:
```bash
# Create placeholder images (requires ImageMagick)
convert -size 800x600 xc:lightgray -gravity center -pointsize 24 -annotate +0+0 'Calendar Mockup' calendar.png
convert -size 800x600 xc:lightgray -gravity center -pointsize 24 -annotate +0+0 'Reminders Mockup' reminders.png
convert -size 800x600 xc:lightgray -gravity center -pointsize 24 -annotate +0+0 'Invoices Mockup' invoices.png
```

