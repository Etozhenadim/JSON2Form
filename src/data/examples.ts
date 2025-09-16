import { FormConfig } from '../types';

export const examples: { [key: string]: FormConfig } = {
  basic: {
    title: "Contact Form",
    fields: [
      { 
        id: "name", 
        type: "string", 
        label: "Full Name", 
        required: true,
        placeholder: "Enter your full name"
      },
      { 
        id: "email", 
        type: "string", 
        label: "Email Address", 
        required: true,
        placeholder: "your@email.com"
      },
      { 
        id: "phone", 
        type: "string", 
        label: "Phone Number",
        placeholder: "+1 (555) 123-4567"
      },
      { 
        id: "subscribe", 
        type: "boolean", 
        label: "Subscribe to newsletter", 
        default: false 
      }
    ],
    buttons: [
      { id: "submit", text: "Submit", type: "submit" },
      { id: "reset", text: "Reset", type: "reset" }
    ]
  },

  survey: {
    title: "Customer Survey",
    fields: [
      { 
        id: "age", 
        type: "numeric", 
        label: "Age", 
        required: true,
        min: 0, 
        max: 120 
      },
      { 
        id: "gender", 
        type: "enum", 
        label: "Gender", 
        required: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
          { value: "prefer-not-to-say", label: "Prefer not to say" }
        ]
      },
      { 
        id: "satisfaction", 
        type: "numeric", 
        label: "Satisfaction Rating (1-10)", 
        required: true,
        min: 1, 
        max: 10 
      },
      { 
        id: "feedback", 
        type: "multi-line", 
        label: "Additional Feedback",
        placeholder: "Please share your thoughts...",
        minLength: 10,
        maxLength: 500
      },
      { 
        id: "visit-date", 
        type: "date", 
        label: "Date of Visit",
        required: true
      }
    ],
    buttons: [
      { id: "submit", text: "Submit Survey", type: "submit" }
    ]
  },

  allTypes: {
    title: "All Field Types Demo",
    fields: [
      { 
        id: "text-field", 
        type: "string", 
        label: "Text Field", 
        placeholder: "Enter text",
        required: true,
        minLength: 3,
        maxLength: 50
      },
      { 
        id: "number-field", 
        type: "numeric", 
        label: "Number Field", 
        placeholder: "Enter number",
        required: true,
        min: 0,
        max: 100
      },
      { 
        id: "textarea-field", 
        type: "multi-line", 
        label: "Multi-line Text", 
        placeholder: "Enter multiple lines of text",
        minLength: 10,
        maxLength: 200
      },
      { 
        id: "checkbox-field", 
        type: "boolean", 
        label: "Checkbox Field", 
        default: false
      },
      { 
        id: "date-field", 
        type: "date", 
        label: "Date Field",
        required: true
      },
      { 
        id: "select-field", 
        type: "enum", 
        label: "Select Field", 
        required: true,
        options: [
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" }
        ]
      }
    ],
    buttons: [
      { id: "submit", text: "Submit", type: "submit" },
      { id: "reset", text: "Reset", type: "reset" },
      { id: "cancel", text: "Cancel", type: "button" }
    ]
  },

  minimal: {
    title: "Minimal Form",
    fields: [
      { 
        id: "name", 
        type: "string", 
        label: "Name", 
        required: true 
      }
    ],
    buttons: [
      { id: "ok", text: "OK", type: "submit" }
    ]
  }
};

export const getExampleNames = (): string[] => Object.keys(examples);
export const getExample = (name: string): FormConfig | undefined => examples[name];
