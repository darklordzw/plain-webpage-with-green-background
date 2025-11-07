
import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { mermaidConfig } from '@/lib/mermaid-config';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export default function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      mermaid.initialize(mermaidConfig);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (elementRef.current && isInitialized) {
      const renderDiagram = async () => {
        try {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          if (elementRef.current) {
            elementRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error);
          if (elementRef.current) {
            elementRef.current.innerHTML = `<div class="text-destructive p-4">Error rendering diagram</div>`;
          }
        }
      };

      renderDiagram();
    }
  }, [chart, isInitialized]);

  return (
    <div
      ref={elementRef}
      className={`mermaid-diagram bg-card border border-border rounded-lg p-6 overflow-x-auto ${className}`}
    />
  );
}