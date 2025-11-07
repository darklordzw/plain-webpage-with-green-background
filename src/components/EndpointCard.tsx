import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CodeBlock from './CodeBlock';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface Endpoint {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  authentication: 'None' | 'JWT' | 'OAuth Token';
  requestBody?: { filename: string; code: string; language: string };
  responseBody?: { filename: string; code: string; language: string };
  queryParams?: Array<{ name: string; type: string; description: string; required: boolean }>;
  pathParams?: Array<{ name: string; type: string; description: string }>;
}

interface EndpointCardProps {
  endpoint: Endpoint;
}

const methodColors = {
  GET: 'bg-green-500/10 text-green-400',
  POST: 'bg-blue-500/10 text-blue-400',
  PUT: 'bg-orange-500/10 text-orange-400',
  DELETE: 'bg-red-500/10 text-red-400',
};

export default function EndpointCard({ endpoint }: EndpointCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={`${methodColors[endpoint.method]} font-bold`}>{endpoint.method}</Badge>
            <CardTitle className="text-xl font-mono">{endpoint.path}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">Auth: {endpoint.authentication}</Badge>
        </div>
        <CardDescription className="mt-2">{endpoint.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {endpoint.pathParams && endpoint.pathParams.length > 0 && (
            <AccordionItem value="path-params">
              <AccordionTrigger className="text-sm font-semibold">Path Parameters</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {endpoint.pathParams.map((param) => (
                    <div key={param.name} className="p-2 bg-muted/50 rounded">
                      <code className="font-semibold text-foreground">{param.name}</code>: <span className="text-sm text-muted-foreground">{param.type}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">{param.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {endpoint.queryParams && endpoint.queryParams.length > 0 && (
            <AccordionItem value="query-params">
              <AccordionTrigger className="text-sm font-semibold">Query Parameters</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {endpoint.queryParams.map((param) => (
                    <div key={param.name} className="p-2 bg-muted/50 rounded">
                      <code className="font-semibold text-foreground">{param.name}</code>: <span className="text-sm text-muted-foreground">{param.type} {param.required && <Badge variant="secondary">Required</Badge>}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">{param.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {endpoint.requestBody && (
            <AccordionItem value="request-body">
              <AccordionTrigger className="text-sm font-semibold">Request Body</AccordionTrigger>
              <AccordionContent>
                <CodeBlock
                  code={endpoint.requestBody.code}
                  language={endpoint.requestBody.language}
                  filename={endpoint.requestBody.filename}
                />
              </AccordionContent>
            </AccordionItem>
          )}

          {endpoint.responseBody && (
            <AccordionItem value="response-body">
              <AccordionTrigger className="text-sm font-semibold">Response Body</AccordionTrigger>
              <AccordionContent>
                <CodeBlock
                  code={endpoint.responseBody.code}
                  language={endpoint.responseBody.language}
                  filename={endpoint.responseBody.filename}
                />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
}
