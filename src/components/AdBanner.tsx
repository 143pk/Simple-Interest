import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  slotId: number;
  label?: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slotId, label = `Advertisement Slot #${slotId}`, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous contents
    containerRef.current.innerHTML = '';

    // Create an iframe to safely execute the ad script without interfering with React DOM
    const iframe = document.createElement('iframe');
    iframe.width = '728';
    iframe.height = '90';
    iframe.style.border = 'none';
    iframe.style.maxWidth = '100%';
    iframe.style.height = '90px';
    iframe.style.overflow = 'hidden';
    iframe.style.borderRadius = '8px';
    iframe.title = `Ad Banner ${slotId}`;
    iframe.loading = 'lazy';

    containerRef.current.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 0;
                background-color: #0f172a;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                font-family: system-ui, -apple-system, sans-serif;
                color: #64748b;
                overflow: hidden;
              }
              .ad-fallback {
                font-size: 11px;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                border: 1px dashed #334155;
                padding: 12px 24px;
                border-radius: 6px;
                background: #1e293b;
                color: #94a3b8;
              }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key' : '4b1b9d605a12c38864a9d825b1c23827',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="https://www.highperformanceformat.com/4b1b9d605a12c38864a9d825b1c23827/invoke.js"></script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [slotId]);

  return (
    <div className={`my-6 flex flex-col items-center justify-center w-full ${className}`}>
      <span className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-mono">
        {label} (Ad)
      </span>
      <div 
        ref={containerRef} 
        className="w-full max-w-[728px] min-h-[90px] flex items-center justify-center bg-slate-800/40 rounded-lg border border-slate-700/50 p-1 shadow-inner overflow-hidden"
      />
    </div>
  );
};
