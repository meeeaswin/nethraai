import React, { useState } from 'react';
import { Message, ChatState } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Eye } from 'lucide-react';

function App() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
  });

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenAI API key is not configured');
      }

      if (!apiKey.startsWith('sk-')) {
        throw new Error('Invalid OpenAI API key format. The key should start with "sk-"');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content }]
        })
      });

      if (response.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your API key in the .env file.');
      }

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new Error('Invalid API response: No choices returned');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.choices[0].message.content,
        role: 'assistant',
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
      }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Eye className="w-8 h-8 text-black" />
          <h1 className="text-2xl font-semibold text-black">Nethra</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {state.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Eye className="w-20 h-20 text-black mb-6" />
              <h2 className="text-3xl font-semibold text-black mb-4">
                Welcome to Nethra
              </h2>
              <p className="text-gray-600 max-w-md text-lg">
                Please add your OpenAI API key to the .env file. The key should start with "sk-".
              </p>
            </div>
          ) : (
            state.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput onSend={handleSendMessage} disabled={state.isLoading} />
    </div>
  );
}

export default App;