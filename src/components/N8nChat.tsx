'use client';

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function N8nChat() {
  useEffect(() => {
    // Get webhook URL from environment variables
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    
    // Check if webhook URL is configured
    if (!webhookUrl || webhookUrl === 'YOUR_PRODUCTION_WEBHOOK_URL') {
      console.warn('N8N Chat: Webhook URL not configured. Please set NEXT_PUBLIC_N8N_WEBHOOK_URL in your environment file.');
      return;
    }

    // Initialize the n8n chat widget
    createChat({
      webhookUrl,
      mode: 'window',
      target: '#n8n-chat',
      showWelcomeScreen: false,
      loadPreviousSession: true,
      defaultLanguage: 'en',
      initialMessages: [
        'Hi there! 👋',
        'Welcome to Kikpot! How can I help you with our IT solutions today?'
      ],
      i18n: {
        en: {
          title: 'Kikpot Support 💬',
          subtitle: "We're here to help you 24/7 with innovative IT solutions.",
          footer: '',
          getStarted: 'Start Chat',
          inputPlaceholder: 'Ask about our IT services...',
          closeButtonTooltip: 'Close chat'
        }
      },
      metadata: {
        source: 'website',
        page: 'kikpot.com'
      },
      enableStreaming: false
    });
  }, []);

  return <div id="n8n-chat" className="fixed" />;
}