
// AI Pipeline documentation page with interactive diagrams
import MermaidDiagram from '@/components/MermaidDiagram';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Brain, Zap, Database, Code2, Sparkles, Activity } from 'lucide-react';

export default function AIPipeline() {
  const pipelineOverviewDiagram = `graph TB
    Start([User Message]) --> WS[WebSocket Connection]
    WS --> Consumer[Django Consumer]
    Consumer --> Auth{Authenticated?}
    
    Auth -->|No| Error1[Return 401 Error]
    Auth -->|Yes| Credits{Check Credits}
    
    Credits -->|Insufficient| Error2[Return Insufficient Credits]
    Credits -->|Sufficient| Context[Build Context]
    
    Context --> CountTokens[Count Context Tokens]
    CountTokens --> SelectModel{Select Model}
    
    SelectModel -->|>100k tokens| Opus[Claude Opus 4]
    SelectModel -->|50k-100k| Sonnet[Claude Sonnet 4]
    SelectModel -->|<50k tokens| Haiku[Claude Haiku]
    
    Opus --> BuildPrompt[Generate System Prompt]
    Sonnet --> BuildPrompt
    Haiku --> BuildPrompt
    
    BuildPrompt --> AddFiles[Add Project Files]
    AddFiles --> AddInstructions[Add Instructions]
    AddInstructions --> CallAPI[Call Anthropic API]
    
    CallAPI --> Stream[Stream Response]
    Stream --> Parse[Parse Chunks]
    
    Parse --> CheckType{Chunk Type?}
    CheckType -->|Text| SendText[Send to Frontend]
    CheckType -->|File Marker| ExtractFile[Extract File Content]
    CheckType -->|Tool Use| ExecuteTool[Execute Tool]
    
    ExtractFile --> UpdateDB[Update Project Files]
    UpdateDB --> SendText
    ExecuteTool --> SendText
    
    SendText --> More{More Chunks?}
    More -->|Yes| Stream
    More -->|No| Deduct[Deduct Credits]
    
    Deduct --> Complete[Send Complete Event]
    Complete --> End([End])
    
    style Start fill:#4A9EFF
    style Opus fill:#A78BFA
    style Sonnet fill:#A78BFA
    style Haiku fill:#A78BFA
    style Stream fill:#F59E0B
    style UpdateDB fill:#4ADE80
    style Complete fill:#10B981`;

  const modelSelectionDiagram = `graph LR
    A[Context Size Analysis] --> B{Token Count}
    
    B -->|>100,000| C[Claude Opus 4]
    B -->|50,000-100,000| D[Claude Sonnet 4]
    B -->|<50,000| E[Claude Haiku]
    
    C --> F[Max Context: 200k]
    D --> G[Max Context: 200k]
    E --> H[Max Context: 200k]
    
    F --> I[Cost: $15/$75 per 1M tokens]
    G --> J[Cost: $3/$15 per 1M tokens]
    H --> K[Cost: $0.25/$1.25 per 1M tokens]
    
    I --> L[Best for: Large codebases]
    J --> M[Best for: Medium projects]
    K --> N[Best for: Quick edits]
    
    style C fill:#9333EA
    style D fill:#7C3AED
    style E fill:#6366F1
    style I fill:#EF4444
    style J fill:#F59E0B
    style K fill:#10B981`;

  const systemPromptDiagram = `graph TB
    Start[System Prompt Generation] --> Base[Base Instructions]
    Base --> Framework[Framework Context]
    
    Framework --> React[React + Vite + TypeScript]
    Framework --> Router[React Router 7]
    Framework --> Tailwind[Tailwind CSS]
    Framework --> Shadcn[shadcn/ui Components]
    
    React --> Files[Project Files Context]
    Router --> Files
    Tailwind --> Files
    Shadcn --> Files
    
    Files --> Include{Include Files?}
    Include -->|Yes| AddFiles[Add File Contents]
    Include -->|No| Skip[Skip Files]
    
    AddFiles --> Format[Format as XML]
    Skip --> Format
    
    Format --> Tools[Add Tool Definitions]
    Tools --> FileOps[File Operations Tools]
    Tools --> Search[Search Tools]
    Tools --> View[View Tools]
    
    FileOps --> Combine[Combine All Sections]
    Search --> Combine
    View --> Combine
    
    Combine --> Validate[Validate Token Count]
    Validate --> Final[Final System Prompt]
    
    style Start fill:#4A9EFF
    style Files fill:#A78BFA
    style Tools fill:#F59E0B
    style Final fill:#10B981`;

  const streamingDiagram = `sequenceDiagram
    participant Frontend
    participant WebSocket
    participant Django
    participant Anthropic
    
    Frontend->>WebSocket: Send message
    WebSocket->>Django: Receive message
    Django->>Django: Validate & check credits
    Django->>Django: Build system prompt
    Django->>Anthropic: POST /v1/messages (stream=true)
    
    loop Streaming Response
        Anthropic->>Django: SSE chunk
        Django->>Django: Parse chunk
        alt Text Delta
            Django->>WebSocket: Send text chunk
            WebSocket->>Frontend: Display text
        else File Marker
            Django->>Django: Buffer file content
        else File Complete
            Django->>Django: Save to database
            Django->>WebSocket: Send file update
            WebSocket->>Frontend: Update editor
        end
    end
    
    Anthropic->>Django: Stream complete
    Django->>Django: Deduct credits
    Django->>WebSocket: Send complete event
    WebSocket->>Frontend: Show completion`;

  const fileParsingDiagram = `graph TB
    A[Response Chunk] --> B{Contains File Marker?}
    
    B -->|No| C[Send as Text]
    B -->|Yes| D[Parse Marker]
    
    D --> E{Marker Type?}
    E -->|===FILE:path===| F[Start File Buffer]
    E -->|===END_FILE===| G[Complete File Buffer]
    
    F --> H[Extract File Path]
    H --> I[Initialize Content Buffer]
    I --> J[Continue Streaming]
    
    G --> K[Get Buffered Content]
    K --> L[Validate File Path]
    L --> M{Valid Path?}
    
    M -->|No| N[Log Error]
    M -->|Yes| O[Update Database]
    
    O --> P[ProjectFile.objects.update_or_create]
    P --> Q[Send File Update Event]
    Q --> R[Frontend Updates Editor]
    
    N --> S[Continue Streaming]
    R --> S
    C --> S
    
    style A fill:#4A9EFF
    style F fill:#F59E0B
    style O fill:#4ADE80
    style R fill:#10B981`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="gradient-primary text-gradient">AI Code Generation Pipeline</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Deep dive into Buildify's AI-powered code generation system using Claude AI with streaming responses,
          intelligent model selection, and real-time file updates.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Brain className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Claude Models</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">200k</p>
                <p className="text-xs text-muted-foreground">Max Context Tokens</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Activity className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">Real-time</p>
                <p className="text-xs text-muted-foreground">Streaming Updates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Database className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">WebSocket</p>
                <p className="text-xs text-muted-foreground">Bidirectional Sync</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Complete Pipeline Overview
          </CardTitle>
          <CardDescription>End-to-end flow from user message to code generation</CardDescription>
        </CardHeader>
        <CardContent>
          <MermaidDiagram chart={pipelineOverviewDiagram} />
        </CardContent>
      </Card>

      {/* Detailed Sections */}
      <Tabs defaultValue="models" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="prompt">System Prompt</TabsTrigger>
          <TabsTrigger value="streaming">Streaming</TabsTrigger>
          <TabsTrigger value="parsing">File Parsing</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
        </TabsList>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>Intelligent Model Selection</CardTitle>
              <CardDescription>Automatic model selection based on context size and complexity</CardDescription>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={modelSelectionDiagram} />
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-purple-500/20 bg-purple-500/5 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-purple-500/10">Opus 4</Badge>
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Context: &gt;100k tokens</li>
                    <li>• Use case: Large codebases</li>
                    <li>• Input: $15 per 1M tokens</li>
                    <li>• Output: $75 per 1M tokens</li>
                    <li>• Best for complex refactoring</li>
                  </ul>
                </div>
                <div className="p-4 border border-purple-500/20 bg-purple-500/5 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-purple-500/10">Sonnet 4</Badge>
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Context: 50k-100k tokens</li>
                    <li>• Use case: Medium projects</li>
                    <li>• Input: $3 per 1M tokens</li>
                    <li>• Output: $15 per 1M tokens</li>
                    <li>• Balanced performance/cost</li>
                  </ul>
                </div>
                <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-500/10">Haiku</Badge>
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Context: &lt;50k tokens</li>
                    <li>• Use case: Quick edits</li>
                    <li>• Input: $0.25 per 1M tokens</li>
                    <li>• Output: $1.25 per 1M tokens</li>
                    <li>• Fast, cost-effective</li>
                  </ul>
                </div>
              </div>

              <Alert className="mt-6">
                <Code2 className="h-4 w-4" />
                <AlertTitle>Token Counting Logic</AlertTitle>
                <AlertDescription className="text-xs mt-2">
                  <code className="bg-muted px-2 py-1 rounded text-xs">
                    context_tokens = count_tokens(system_prompt + project_files + user_message)
                  </code>
                  <p className="mt-2">
                    The system analyzes total context size including system instructions, all project files,
                    and the user's message to select the most cost-effective model.
                  </p>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompt">
          <Card>
            <CardHeader>
              <CardTitle>System Prompt Generation</CardTitle>
              <CardDescription>Building comprehensive context for Claude AI</CardDescription>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={systemPromptDiagram} />

              <div className="mt-6 space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Base Instructions</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Core guidelines for code generation, design patterns, and best practices
                  </p>
                  <div className="bg-background p-3 rounded border border-border font-mono text-xs">
                    You are Buildify, an expert web developer...<br />
                    - Use React 18+ with TypeScript<br />
                    - Follow React Router 7 patterns<br />
                    - Use Tailwind CSS with shadcn/ui<br />
                    - Implement responsive design<br />
                    - Ensure accessibility standards
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Framework Context</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Technology stack and configuration details
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-background p-2 rounded border border-border text-xs">
                      <strong>React:</strong> v18.3.1 with hooks
                    </div>
                    <div className="bg-background p-2 rounded border border-border text-xs">
                      <strong>Router:</strong> react-router-dom v6.26
                    </div>
                    <div className="bg-background p-2 rounded border border-border text-xs">
                      <strong>Styling:</strong> Tailwind CSS v3.4
                    </div>
                    <div className="bg-background p-2 rounded border border-border text-xs">
                      <strong>UI:</strong> shadcn/ui + Radix
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Project Files Context</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    All project files are included in XML format for context
                  </p>
                  <div className="bg-background p-3 rounded border border-border font-mono text-xs">
                    {'<project_files>'}<br />
                    {'  <file path="src/App.tsx">'}<br />
                    {'    <content>...</content>'}<br />
                    {'  </file>'}<br />
                    {'  <file path="src/components/Button.tsx">'}<br />
                    {'    <content>...</content>'}<br />
                    {'  </file>'}<br />
                    {'</project_files>'}
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Tool Definitions</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Available tools for file operations and code manipulation
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <Badge variant="outline">bd-create</Badge>
                    <Badge variant="outline">bd-replace-str</Badge>
                    <Badge variant="outline">bd-insert-str</Badge>
                    <Badge variant="outline">bd-view</Badge>
                    <Badge variant="outline">bd-search-str</Badge>
                    <Badge variant="outline">bd-mv</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streaming">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Streaming Architecture</CardTitle>
              <CardDescription>WebSocket-based bidirectional communication</CardDescription>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={streamingDiagram} />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Frontend WebSocket</h4>
                  <div className="bg-muted/50 p-3 rounded font-mono text-xs mb-3">
                    const ws = new WebSocket(<br />
                    &nbsp;&nbsp;'wss://api.buildify.dev/ws/chat/'<br />
                    );<br />
                    ws.onmessage = (event) =&gt; {'{'}<br />
                    &nbsp;&nbsp;const data = JSON.parse(event.data);<br />
                    &nbsp;&nbsp;handleChunk(data);<br />
                    {'}'};
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Persistent connection for real-time updates</li>
                    <li>• Automatic reconnection on disconnect</li>
                    <li>• Message queuing during reconnection</li>
                  </ul>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Django Consumer</h4>
                  <div className="bg-muted/50 p-3 rounded font-mono text-xs mb-3">
                    class ChatConsumer(AsyncWebsocketConsumer):<br />
                    &nbsp;&nbsp;async def receive(self, text_data):<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;# Validate & process<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;async for chunk in stream:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;await self.send(chunk)
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Async processing for concurrent requests</li>
                    <li>• Stream chunks as they arrive</li>
                    <li>• Error handling and recovery</li>
                  </ul>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Anthropic SSE Stream</h4>
                  <div className="bg-muted/50 p-3 rounded font-mono text-xs mb-3">
                    response = anthropic.messages.create(<br />
                    &nbsp;&nbsp;model="claude-sonnet-4",<br />
                    &nbsp;&nbsp;stream=True,<br />
                    &nbsp;&nbsp;messages=[...]<br />
                    )
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Server-Sent Events from Claude API</li>
                    <li>• Chunk-by-chunk response delivery</li>
                    <li>• Low latency, high throughput</li>
                  </ul>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Chunk Types</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">content_block_delta</Badge>
                      <span className="text-xs text-muted-foreground">Text content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">tool_use</Badge>
                      <span className="text-xs text-muted-foreground">File operations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">message_stop</Badge>
                      <span className="text-xs text-muted-foreground">Stream complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parsing">
          <Card>
            <CardHeader>
              <CardTitle>File Operation Parsing</CardTitle>
              <CardDescription>Extracting and applying code changes from AI responses</CardDescription>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={fileParsingDiagram} />

              <div className="mt-6 space-y-4">
                <Alert>
                  <Code2 className="h-4 w-4" />
                  <AlertTitle>File Marker Format</AlertTitle>
                  <AlertDescription className="text-xs mt-2">
                    <div className="bg-muted p-3 rounded font-mono text-xs">
                      ===FILE:src/components/Button.tsx===<br />
                      import {'{ Button }'} from '@/components/ui/button';<br />
                      <br />
                      export default function MyButton() {'{'}<br />
                      &nbsp;&nbsp;return &lt;Button&gt;Click me&lt;/Button&gt;;<br />
                      {'}'}<br />
                      ===END_FILE===
                    </div>
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Parsing Logic</h4>
                    <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Detect ===FILE:path=== marker in stream</li>
                      <li>Extract file path and validate</li>
                      <li>Buffer content until ===END_FILE===</li>
                      <li>Save to ProjectFile model in database</li>
                      <li>Send file update event to frontend</li>
                      <li>Frontend updates Monaco editor</li>
                    </ol>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Database Update</h4>
                    <div className="bg-background p-3 rounded border border-border font-mono text-xs">
                      ProjectFile.objects.update_or_create(<br />
                      &nbsp;&nbsp;project=project,<br />
                      &nbsp;&nbsp;path=file_path,<br />
                      &nbsp;&nbsp;defaults={'{'}<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;'content': file_content,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;'updated_at': timezone.now()<br />
                      &nbsp;&nbsp;{'}'}<br />
                      )
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits">
          <Card>
            <CardHeader>
              <CardTitle>Credit Management System</CardTitle>
              <CardDescription>Token-based usage tracking and billing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-blue-400">Pre-Request Validation</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Check user credit balance before making API call
                  </p>
                  <div className="bg-background/50 p-3 rounded font-mono text-xs">
                    if user.credit_balance &lt; estimated_cost:<br />
                    &nbsp;&nbsp;return {'{'}'error': 'Insufficient credits'{'}'}
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-purple-400">Usage Tracking</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Record input/output tokens for each request
                  </p>
                  <div className="bg-background/50 p-3 rounded font-mono text-xs">
                    CreditTransaction.objects.create(<br />
                    &nbsp;&nbsp;user=user,<br />
                    &nbsp;&nbsp;amount=-cost,<br />
                    &nbsp;&nbsp;input_tokens=usage.input_tokens,<br />
                    &nbsp;&nbsp;output_tokens=usage.output_tokens,<br />
                    &nbsp;&nbsp;model=model_name<br />
                    )
                  </div>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-green-400">Credit Deduction</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Deduct credits after successful completion
                  </p>
                  <div className="bg-background/50 p-3 rounded font-mono text-xs">
                    user.credit_balance -= actual_cost<br />
                    user.save(update_fields=['credit_balance'])
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-400">1:1</p>
                    <p className="text-xs text-muted-foreground mt-1">Credit to Token Ratio</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">$10</p>
                    <p className="text-xs text-muted-foreground mt-1">Minimum Purchase</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">Stripe</p>
                    <p className="text-xs text-muted-foreground mt-1">Payment Processing</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}