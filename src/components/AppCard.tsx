
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CodeBlock from './CodeBlock';
import { Database, FileCode, Settings } from 'lucide-react';

export interface DjangoApp {
  name: string;
  directory: string;
  purpose: string;
  icon: string;
  color: string;
  models: Array<{ name: string; description: string }>;
  keyFiles: Array<{ name: string; description: string }>;
  codeExample?: { filename: string; code: string; language: string };
}

interface AppCardProps {
  app: DjangoApp;
}

export default function AppCard({ app }: AppCardProps) {
  const iconMap: Record<string, React.ReactNode> = {
    database: <Database className="h-5 w-5" />,
    code: <FileCode className="h-5 w-5" />,
    settings: <Settings className="h-5 w-5" />,
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-${app.color}-500/10`}>
              {iconMap[app.icon] || iconMap.database}
            </div>
            <div>
              <CardTitle className="text-xl">{app.name}</CardTitle>
              <CardDescription className="font-mono text-xs mt-1">{app.directory}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            Django App
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{app.purpose}</p>

        <Accordion type="single" collapsible className="w-full">
          {/* Models Section */}
          {app.models.length > 0 && (
            <AccordionItem value="models">
              <AccordionTrigger className="text-sm font-semibold">
                Models ({app.models.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {app.models.map((model) => (
                    <div key={model.name} className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5"></div>
                      <div>
                        <code className="text-sm font-semibold text-foreground">{model.name}</code>
                        <p className="text-xs text-muted-foreground mt-0.5">{model.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Key Files Section */}
          {app.keyFiles.length > 0 && (
            <AccordionItem value="files">
              <AccordionTrigger className="text-sm font-semibold">
                Key Files ({app.keyFiles.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {app.keyFiles.map((file) => (
                    <div key={file.name} className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                      <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-1.5"></div>
                      <div>
                        <code className="text-sm font-semibold text-foreground">{file.name}</code>
                        <p className="text-xs text-muted-foreground mt-0.5">{file.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Code Example Section */}
          {app.codeExample && (
            <AccordionItem value="code">
              <AccordionTrigger className="text-sm font-semibold">Code Example</AccordionTrigger>
              <AccordionContent>
                <CodeBlock
                  code={app.codeExample.code}
                  language={app.codeExample.language}
                  filename={app.codeExample.filename}
                />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
}