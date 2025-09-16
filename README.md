# 📝 JSON2Form

A powerful React + TypeScript application that generates dynamic forms from JSON configuration. Create complex forms with various field types, validation rules, and custom styling through a simple JSON schema.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-blue.svg)](https://tailwindcss.com/)
[![Monaco Editor](https://img.shields.io/badge/Monaco%20Editor-4.6.0-blue.svg)](https://microsoft.github.io/monaco-editor/)

## ✨ Features

- 🎨 **Visual Form Builder**: Real-time form preview with live editing
- 📝 **Multiple Field Types**: Support for text, number, textarea, checkbox, date, and enum fields
- ✅ **Built-in Validation**: Client-side validation with custom rules
- 🔧 **JSON Editor**: Monaco Editor with syntax highlighting and validation
- 📱 **Responsive Design**: Mobile-friendly interface with TailwindCSS
- 💾 **Local Storage**: Automatic saving of configurations
- 🎯 **Live Preview**: Real-time form preview while editing
- 📋 **Example Templates**: Pre-built form configurations
- 🌙 **Dark Theme**: VS Code-inspired dark theme
- 🚫 **Smart Validation**: Result tab blocked when config has errors

## Supported Field Types

- **String**: Single-line text input
- **Multi-line**: Multi-line textarea
- **Numeric**: Number input with min/max validation
- **Boolean**: Checkbox input
- **Date**: Date picker
- **Enum**: Radio button group with custom options

## JSON Schema

```json
{
  "title": "string",
  "fields": [
    {
      "id": "string",
      "type": "numeric|string|multi-line|boolean|date|enum",
      "label": "string",
      "placeholder": "string?",
      "default": "any?",
      "required": true|false?,
      "min": number?,
      "max": number?,
      "minLength": number?,
      "maxLength": number?,
      "options": [
        { "value": "string|number", "label": "string" }
      ]
    }
  ],
  "buttons": [
    { "id": "string", "text": "string", "type": "submit|button|reset" }
  ]
}
```

## Example Configurations

### Basic Contact Form
```json
{
  "title": "Contact Form",
  "fields": [
    { 
      "id": "name", 
      "type": "string", 
      "label": "Full Name", 
      "required": true,
      "placeholder": "Enter your full name"
    },
    { 
      "id": "email", 
      "type": "string", 
      "label": "Email Address", 
      "required": true,
      "placeholder": "your@email.com"
    },
    { 
      "id": "subscribe", 
      "type": "boolean", 
      "label": "Subscribe to newsletter", 
      "default": false 
    }
  ],
  "buttons": [
    { "id": "submit", "text": "Submit", "type": "submit" },
    { "id": "reset", "text": "Reset", "type": "reset" }
  ]
}
```

### Survey Form with All Field Types
```json
{
  "title": "Customer Survey",
  "fields": [
    { 
      "id": "age", 
      "type": "numeric", 
      "label": "Age", 
      "required": true,
      "min": 0, 
      "max": 120 
    },
    { 
      "id": "gender", 
      "type": "enum", 
      "label": "Gender", 
      "required": true,
      "options": [
        { "value": "male", "label": "Male" },
        { "value": "female", "label": "Female" },
        { "value": "other", "label": "Other" }
      ]
    },
    { 
      "id": "feedback", 
      "type": "multi-line", 
      "label": "Additional Feedback",
      "placeholder": "Please share your thoughts...",
      "minLength": 10,
      "maxLength": 500
    }
  ],
  "buttons": [
    { "id": "submit", "text": "Submit Survey", "type": "submit" }
  ]
}
```

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-green.svg)](https://etozhenadim.github.io/JSON2Form/)

## 📸 Screenshots

### Config Tab
- JSON Editor with syntax highlighting
- Real-time validation
- Example templates
- Live preview toggle

### Result Tab
- Generated form preview
- Field validation
- Form submission with data display

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/etozhenadim/JSON2Form.git
cd JSON2Form
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add deploy script to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

## Usage

1. **Config Tab**: Use the JSON editor to define your form configuration
2. **Result Tab**: View the generated form and test its functionality
3. **Live Preview**: Enable live preview to see changes in real-time
4. **Examples**: Load pre-built templates from the dropdown
5. **Validation**: Built-in JSON and schema validation with error highlighting

## Validation Rules

- **Required Fields**: Mark fields as required for mandatory validation
- **String Length**: Set minLength and maxLength for text fields
- **Number Range**: Set min and max values for numeric fields
- **Enum Options**: Define available options for radio button groups
- **Date Validation**: Automatic date format validation

## Customization

The application uses TailwindCSS for styling. You can customize the appearance by:

1. Modifying the Tailwind configuration in `tailwind.config.js`
2. Updating component styles in the respective `.tsx` files
3. Adding custom CSS in `src/index.css`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions and support, please open an issue in the repository.
