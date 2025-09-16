import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { FormConfig, JsonValidationError } from '../types';
import { validateJson, validateConfigSchema } from '../utils/validators';
import { examples, getExampleNames } from '../data/examples';

interface ConfigTabProps {
  config: FormConfig;
  onConfigChange: (config: FormConfig) => void;
  onConfigErrors: (hasErrors: boolean) => void;
  onLivePreviewChange: (enabled: boolean) => void;
  livePreview: boolean;
}

const ConfigTab: React.FC<ConfigTabProps> = ({ 
  config, 
  onConfigChange, 
  onConfigErrors,
  onLivePreviewChange,
  livePreview 
}) => {
  const [jsonString, setJsonString] = useState(() => JSON.stringify(config, null, 2));
  const [validationError, setValidationError] = useState<JsonValidationError | null>(null);
  const [schemaErrors, setSchemaErrors] = useState<string[]>([]);

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value === undefined) return;
    
    setJsonString(value);
    
    // Валидация JSON
    const jsonValidation = validateJson(value);
    setValidationError(jsonValidation.error || null);
    
    if (jsonValidation.isValid && jsonValidation.config) {
      // Валидация схемы
      const schemaValidation = validateConfigSchema(jsonValidation.config);
      setSchemaErrors(schemaValidation.errors);
      
      if (schemaValidation.isValid) {
        onConfigChange(jsonValidation.config);
        onConfigErrors(false);
      } else {
        onConfigErrors(true);
      }
    } else {
      onConfigErrors(true);
    }
  }, [onConfigChange, onConfigErrors]);


  const handleLoadExample = (exampleName: string) => {
    const example = examples[exampleName];
    if (example) {
      const jsonString = JSON.stringify(example, null, 2);
      setJsonString(jsonString);
      onConfigChange(example);
      setValidationError(null);
      setSchemaErrors([]);
    }
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      alert('Configuration copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  const handleReset = () => {
    const defaultConfig: FormConfig = {
      title: "New Form",
      fields: [
        { id: "example", type: "string", label: "Example Field", required: true }
      ],
      buttons: [
        { id: "submit", text: "Submit", type: "submit" }
      ]
    };
    const jsonString = JSON.stringify(defaultConfig, null, 2);
    setJsonString(jsonString);
    onConfigChange(defaultConfig);
    setValidationError(null);
    setSchemaErrors([]);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-[#252526] border-b border-[#3e3e42] p-3 sm:p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <label className="text-sm text-[#cccccc] whitespace-nowrap">Example:</label>
            <select
              onChange={(e) => handleLoadExample(e.target.value)}
              className="flex-1 lg:flex-none px-2 py-1 border border-[#3e3e42] bg-[#3c3c3c] text-white rounded text-sm focus:outline-none"
            >
              <option value="">Select example...</option>
              {getExampleNames().map(name => (
                <option key={name} value={name}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <button
              onClick={handleCopyConfig}
              className="flex-1 sm:flex-none px-3 py-1.5 bg-[#0e639c] text-white text-sm rounded-md hover:bg-[#1177bb] focus:outline-none"
            >
              Copy Config
            </button>
            
            <button
              onClick={handleReset}
              className="flex-1 sm:flex-none px-3 py-1.5 bg-[#a1260d] text-white text-sm rounded-md hover:bg-[#c53030] focus:outline-none"
            >
              Reset
            </button>
          </div>
          
          <div className="hidden lg:flex items-center gap-2 lg:ml-auto">
            <input
              type="checkbox"
              id="live-preview"
              checked={livePreview}
              onChange={(e) => onLivePreviewChange(e.target.checked)}
              className="h-4 w-4 text-[#007acc] focus:outline-none border-[#3e3e42] bg-[#3c3c3c] rounded"
            />
            <label htmlFor="live-preview" className="text-sm text-[#cccccc]">
              Live Preview
            </label>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {(validationError || schemaErrors.length > 0) && (
        <div className="bg-[#5a1d1d] border-b border-[#be1100] p-3 sm:p-4">
          {validationError && (
            <div className="text-sm text-[#f48771] mb-2">
              <strong>JSON Error:</strong> {validationError.message}
              {validationError.line && (
                <span className="ml-2 text-[#f48771]">
                  (Line {validationError.line}, Column {validationError.column})
                </span>
              )}
            </div>
          )}
          {schemaErrors.length > 0 && (
            <div className="text-sm text-[#f48771]">
              <strong>Schema Errors:</strong>
              <ul className="list-disc list-inside mt-1">
                {schemaErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 border border-[#3e3e42]">
        <Editor
          height="100%"
          defaultLanguage="json"
          value={jsonString}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto'
            },
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on'
          }}
          theme="vs-dark"
        />
      </div>
    </div>
  );
};

export default ConfigTab;
