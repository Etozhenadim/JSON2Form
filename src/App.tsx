import React, { useState, useEffect } from 'react';
import { FormConfig } from './types';
import { examples } from './data/examples';
import ConfigTab from './components/ConfigTab';
import ResultTab from './components/ResultTab';

type Tab = 'config' | 'result';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('config');
  const [config, setConfig] = useState<FormConfig>(examples.basic);
  const [isValid, setIsValid] = useState(true);
  const [livePreview, setLivePreview] = useState(false);
  const [hasConfigErrors, setHasConfigErrors] = useState(false);

  // Загрузка конфигурации из localStorage при инициализации
  useEffect(() => {
    const savedConfig = localStorage.getItem('form-generator-config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.warn('Failed to parse saved config:', error);
      }
    }
  }, []);

  // Сохранение конфигурации в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('form-generator-config', JSON.stringify(config));
  }, [config]);

  const handleConfigChange = (newConfig: FormConfig) => {
    setConfig(newConfig);
    setIsValid(true);
    setHasConfigErrors(false);
  };

  const handleConfigErrors = (hasErrors: boolean) => {
    setHasConfigErrors(hasErrors);
    if (hasErrors && activeTab === 'result') {
      setActiveTab('config');
    }
  };

  const handleLivePreviewChange = (enabled: boolean) => {
    setLivePreview(enabled);
  };

  const tabButtonClass = (tab: Tab) => {
    const baseClass = "px-4 py-2 font-medium text-sm border-b-2 transition-colors focus:outline-none";
    const activeClass = "text-[#007acc] border-[#007acc] bg-[#1e1e1e]";
    const inactiveClass = "text-[#cccccc] border-transparent hover:text-white hover:border-[#3e3e42]";
    
    return `${baseClass} ${activeTab === tab ? activeClass : inactiveClass}`;
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      {/* Header */}
      <header className="bg-[#252526] shadow-sm border-b border-[#3e3e42]">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between h-16 py-2">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-white">
                  📝 Form JSON Generator
                </h1>
              </div>
              <div className="hidden sm:ml-4 sm:block">
                <p className="text-sm text-[#cccccc]">
                  Generate React forms from JSON configuration
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-[#252526] border-b border-[#3e3e42]">
        <div className="px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('config')}
              className={tabButtonClass('config')}
            >
              <span className="hidden sm:inline">⚙️ </span>Config
            </button>
            <button
              onClick={() => !hasConfigErrors && setActiveTab('result')}
              className={`${tabButtonClass('result')} ${hasConfigErrors ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={hasConfigErrors}
            >
              <span className="hidden sm:inline">👁️ </span>Result
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <div className="h-[calc(100vh-8rem)]">
          {activeTab === 'config' && (
            <ConfigTab
              config={config}
              onConfigChange={handleConfigChange}
              onConfigErrors={handleConfigErrors}
              onLivePreviewChange={handleLivePreviewChange}
              livePreview={livePreview}
            />
          )}
          {activeTab === 'result' && (
            <ResultTab
              config={config}
              isValid={isValid}
            />
          )}
        </div>
      </main>

      {/* Live Preview Overlay - Hidden on mobile */}
      {livePreview && activeTab === 'config' && (
        <div className="hidden lg:block fixed bottom-4 right-4 w-96 h-96 bg-[#252526] rounded-lg shadow-xl border border-[#3e3e42] z-40">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-[#3e3e42]">
              <h3 className="text-sm font-semibold text-white">Live Preview</h3>
              <button
                onClick={() => setLivePreview(false)}
                className="text-[#cccccc] hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-3">
              <div className="scale-75 origin-top-left">
                <ResultTab
                  config={config}
                  isValid={isValid}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
