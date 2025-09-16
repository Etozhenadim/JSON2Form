import React, { useState } from 'react';
import { FormConfig, FormData } from '../types';
import FormGenerator from './FormGenerator';

interface ResultTabProps {
  config: FormConfig;
  isValid: boolean;
}

const ResultTab: React.FC<ResultTabProps> = ({ config, isValid }) => {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (data: FormData) => {
    setSubmittedData(data);
    setShowModal(true);
  };

  const handleButtonClick = (buttonId: string) => {
    console.log(`Button clicked: ${buttonId}`);
    // Здесь можно добавить дополнительную логику для обработки кнопок
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const copyToClipboard = () => {
    if (submittedData) {
      navigator.clipboard.writeText(JSON.stringify(submittedData, null, 2)).then(() => {
        alert('Data copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy to clipboard');
      });
    }
  };

  if (!isValid) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-[#cccccc] mb-2">Invalid Configuration</h2>
          <p className="text-[#969696]">
            Please fix the JSON configuration errors in the Config tab to see the form preview.
          </p>
        </div>
      </div>
    );
  }

  if (!config || !config.fields || config.fields.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-semibold text-[#cccccc] mb-2">No Form Configuration</h2>
          <p className="text-[#969696]">
            Add some fields to your configuration in the Config tab to see the form preview.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <div className="p-3 sm:p-6">
        <FormGenerator
          config={config}
          onSubmit={handleSubmit}
          onButtonClick={handleButtonClick}
        />
      </div>

      {/* Modal for submitted data */}
      {showModal && submittedData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#252526] rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden border border-[#3e3e42]">
            <div className="flex items-center justify-between p-4 border-b border-[#3e3e42]">
              <h3 className="text-lg font-semibold text-white">Form Data</h3>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 bg-[#0e639c] text-white text-sm rounded-md hover:bg-[#1177bb] focus:outline-none"
                >
                  Copy
                </button>
                <button
                  onClick={closeModal}
                  className="px-3 py-1.5 bg-[#3c3c3c] text-white text-sm rounded-md hover:bg-[#4e4e4e] focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-4 overflow-auto max-h-[60vh]">
              <pre className="bg-[#1e1e1e] p-4 rounded-md text-sm overflow-auto text-[#cccccc] border border-[#3e3e42]">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultTab;
