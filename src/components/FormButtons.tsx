import React from 'react';
import { ButtonConfig } from '../types';

interface FormButtonsProps {
  buttons: ButtonConfig[];
  onSubmit: () => void;
  onReset: () => void;
  onButtonClick: (buttonId: string) => void;
  disabled?: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({ 
  buttons, 
  onSubmit, 
  onReset, 
  onButtonClick, 
  disabled = false 
}) => {
  const handleClick = (button: ButtonConfig) => {
    switch (button.type) {
      case 'submit':
        onSubmit();
        break;
      case 'reset':
        onReset();
        break;
      case 'button':
      default:
        onButtonClick(button.id);
        break;
    }
  };

  const getButtonStyles = (type?: string) => {
    const baseStyles = "px-4 py-2 rounded-md font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
    
    switch (type) {
      case 'submit':
        return `${baseStyles} bg-[#0e639c] text-white hover:bg-[#1177bb]`;
      case 'reset':
        return `${baseStyles} bg-[#3c3c3c] text-white hover:bg-[#4e4e4e]`;
      case 'button':
      default:
        return `${baseStyles} bg-[#3c3c3c] text-[#cccccc] hover:bg-[#4e4e4e]`;
    }
  };

  if (buttons.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 pt-4 border-t border-[#3e3e42]">
      {buttons.map((button) => (
        <button
          key={button.id}
          type={button.type === 'submit' ? 'submit' : 'button'}
          onClick={() => handleClick(button)}
          disabled={disabled}
          className={getButtonStyles(button.type)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default FormButtons;
