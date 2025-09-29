# Mockup Images

This directory contains the following mockup images:

1. **add-customers.webp** - A screenshot showing the customer management view
   - Recommended size: 800x600px
   - Show customer list and management interface
   
2. **schedule-jobs.webp** - A screenshot showing job scheduling and calendar view
   - Recommended size: 800x600px
   - Show calendar with appointments and scheduling interface
   
3. **get-paid-faster.webp** - A screenshot showing the invoicing and payment feature
   - Recommended size: 800x600px
   - Show invoice creation and payment tracking interface

## Design Guidelines

- Use a clean, modern UI design
- Ensure images are optimized for web (< 200KB each)
- Use consistent styling across all mockups
- Include realistic but anonymized data

## Placeholder Generation

If you need placeholder images for development:
```bash
# Create placeholder images (requires ImageMagick)
convert -size 800x600 xc:lightgray -gravity center -pointsize 24 -annotate +0+0 'Add Customers Mockup' add-customers.webp
convert -size 800x600 xc:lightgray -gravity center -pointsize 24 -annotate +0+0 'Schedule Jobs Mockup' schedule-jobs.webp
convert -size 800x600 xc:lightgray -gravity center -pointsize 24 -annotate +0+0 'Get Paid Faster Mockup' get-paid-faster.webp
```

