import React from 'react';
import { User, Eye } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex items-start gap-4 p-6 ${isUser ? 'bg-gray-50' : 'bg-white'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
        ${isUser ? 'bg-gray-700' : 'bg-black'}`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Eye className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <p className="font-medium text-sm text-gray-500">
          {isUser ? 'You' : 'Nethra'}
        </p>
        <div className="prose prose-gray prose-sm max-w-none text-gray-800">
          {message.content}
        </div>
      </div>
    </div>
  );
}