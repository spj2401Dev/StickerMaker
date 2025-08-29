# StickerMaker

A Blazor Server application that allows users to upload images and create A4 sticker sheets for printing.

## Features

- **Image Upload**: Support for PNG, JPG, GIF, WebP, and SVG files up to 10MB
- **Flexible Layout**: Customizable sticker sizes, spacing, and margins
- **Round & Square Stickers**: Toggle between round and rectangular sticker shapes
- **Size Presets**: Quick presets for common sticker sizes
- **A4 Preview**: Real-time preview of how stickers will look on the printed page
- **Print Optimization**: Print-friendly CSS for perfect A4 printing
- **Responsive Design**: Works on desktop and mobile devices
- **Zoom Controls**: Adjust preview zoom level for better visibility

## How to Use

1. **Upload an Image**: Click "Upload Image" and select your image file
2. **Configure Settings**:
   - Choose a size preset or enter custom dimensions
   - Adjust spacing between stickers
   - Set page margins
   - Toggle round stickers if desired
3. **Generate Layout**: Click "Generate A4 Page" to create the layout
4. **Print**: Use the "Print Page" button to print your sticker sheet

## Technical Details

- **Framework**: ASP.NET Core 8.0 with Blazor Server
- **Page Format**: Standard A4 (210mm × 297mm)
- **Supported Image Formats**: PNG, JPG, GIF, WebP, SVG
- **Maximum File Size**: 10MB
- **Browser Requirements**: Modern browsers with JavaScript enabled

## Getting Started

1. Clone the repository
2. Run `dotnet restore` to install dependencies
3. Run `dotnet run` to start the application
4. Navigate to `https://localhost:5001` (or the displayed URL)
5. Click on "Sticker Maker" in the navigation menu

## Project Structure

- `Pages/StickerMaker.razor` - Main sticker maker page
- `Pages/Index.razor` - Home page with instructions
- `wwwroot/css/stickermaker.css` - Sticker maker specific styles
- `wwwroot/js/stickermaker.js` - JavaScript utilities
- `Shared/NavMenu.razor` - Navigation menu

## Features in Detail

### Sticker Size Presets
- Small (30×30mm)
- Medium (50×50mm) 
- Large (70×70mm)
- Round Small (25mm diameter)
- Round Medium (40mm diameter)
- Rectangle (60×40mm)
- Custom sizes (10-100mm)

### Layout Calculation
The application automatically calculates the optimal number of stickers that fit on an A4 page based on:
- Sticker dimensions
- Spacing between stickers
- Page margins
- A4 page dimensions (210×297mm)

### Print Optimization
- Print-specific CSS hides UI elements
- A4 page scaling for perfect printing
- Sticker borders removed in print mode
- Page break optimization

## Tips for Best Results

- Use high-resolution images for crisp printing
- Test print on regular paper before using sticker paper
- Adjust margins to allow for cutting tolerance
- Consider your printer's margin limitations
- Use appropriate sticker paper for your printer type

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Internet Explorer 11+ (limited support)

## License

This project is open source. Feel free to modify and distribute as needed.