
import React, { useState } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="p-4 bg-white border-t border-gray-200"
    >
      <div className="flex items-center gap-2 max-w-4xl mx-auto">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Parašykite žinutę..."
          disabled={disabled}
          className="flex-1 bg-gray-100 border-none rounded-full py-3 px-5 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm md:text-base"
        />
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className={`p-3 rounded-full transition-all ${
            !text.trim() || disabled 
              ? 'bg-gray-200 text-gray-400' 
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
