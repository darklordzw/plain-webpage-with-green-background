
import MermaidDiagram from '@/components/MermaidDiagram';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';

export default function UserFlow() {
  const completeFlowDiagram = `graph TB
    Start([User Visits Buildify]) --> Auth{Authenticated?}
    Auth -->|No| Login[Login Page]
    Auth -->|Yes| Dashboard[Dashboard]
    
    Login --> OAuth[OAuth Provider Selection]
    OAuth --> GitHub[GitHub OAuth]
    OAuth --> Google[Google OAuth]
    OAuth --> Apple[Apple OAuth]
    
    GitHub --> CreateUser[Create/Update User Account]
    Google --> CreateUser
    Apple --> CreateUser
    
    CreateUser --> Dashboard
    
    Dashboard --> NewProject[Create New Project]
    Dashboard --> ExistingProject[Open Existing Project]
    
    NewProject --> ProjectSetup[Project Configuration]
    ProjectSetup --> Editor[Code Editor Interface]
    
    ExistingProject --> Editor
    
    Editor --> AIChat[AI Chat Interface]
    AIChat --> SendMessage[Send Message to AI]
    SendMessage --> ProcessMessage[Backend Processing]
    
    ProcessMessage --> CheckCredits{Sufficient Credits?}
    CheckCredits -->|No| BuyCredits[Purchase Credits]
    CheckCredits -->|Yes| SelectModel[Select AI Model]
    
    BuyCredits --> Stripe[Stripe Payment]
    Stripe --> AddCredits[Add Credits to Balance]
    AddCredits --> SelectModel
    
    SelectModel --> GeneratePrompt[Generate System Prompt]
    GeneratePrompt --> CallAPI[Call Claude API]
    CallAPI --> StreamResponse[Stream Response via WebSocket]
    
    StreamResponse --> ParseResponse[Parse File Operations]
    ParseResponse --> UpdateFiles[Update Project Files]
    UpdateFiles --> DeductCredits[Deduct Credits]
    DeductCredits --> Editor
    
    Editor --> GitHubInt{Connect GitHub?}
    GitHubInt -->|Yes| CreateRepo[Create GitHub Repository]
    GitHubInt -->|No| Preview
    
    CreateRepo --> PushCode[Push Code to GitHub]
    PushCode --> Preview[Generate Preview]
    
    Preview --> FlyDeploy[Deploy to Fly.io]
    FlyDeploy --> PreviewURL[Preview URL Generated]
    PreviewURL --> Editor
    
    Editor --> Download[Download Project ZIP]
    Editor --> Continue[Continue Editing]
    
    Continue --> AIChat
    
    style Start fill:#4A9EFF
    style Dashboard fill:#4ADE80
    style Editor fill:#A78BFA
    style StreamResponse fill:#F59E0B
    style PreviewURL fill:#10B981`;

  const authFlowDiagram = `sequenceDiagram
    participant User
    participant Frontend
    participant Django
    participant OAuth as OAuth Provider
    participant DB as Database
    
    User->>Frontend: Click "Sign in with GitHub"
    Frontend->>Django: Initiate OAuth flow
    Django->>OAuth: Redirect to authorization
    OAuth->>User: Request permissions
    User->>OAuth: Grant permissions
    OAuth->>Django: Return authorization code
    Django->>OAuth: Exchange code for token
    OAuth->>Django: Return access token
    Django->>OAuth: Fetch user profile
    OAuth->>Django: Return user data
    Django->>DB: Create/Update user record
    Django->>Frontend: Return JWT token
    Frontend->>Frontend: Store token in localStorage
    Frontend->>User: Redirect to dashboard`;

  const codeGenFlowDiagram = `graph LR
    A[User Message] --> B[WebSocket Connection]
    B --> C[Django Consumer]
    C --> D{Check Credits}
    D -->|Insufficient| E[Return Error]
    D -->|Sufficient| F[Select Model]
    
    F --> G{Context Size}
    G -->|Large >100k| H[Claude Opus 4]
    G -->|Medium >50k| I[Claude Sonnet 4]
    G -->|Small| J[Claude Haiku]
    
    H --> K[Generate System Prompt]
    I --> K
    J --> K
    
    K --> L[Build Message Context]
    L --> M[Call Anthropic API]
    M --> N[Stream Response]
    
    N --> O[Parse Chunks]
    O --> P{File Operation?}
    P -->|Yes| Q[Extract File Content]
    P -->|No| R[Send to Frontend]
    
    Q --> S[Update Project Files]
    S --> R
    
    R --> T[WebSocket Send]
    T --> U[Frontend Display]
    
    style A fill:#4A9EFF
    style M fill:#A78BFA
    style S fill:#4ADE80
    style U fill:#F59E0B`;

  const deploymentFlowDiagram = `graph TB
    A[Project Ready] --> B{GitHub Connected?}
    B -->|No| C[Create GitHub Repo]
    B -->|Yes| D[Get Repo Info]
    
    C --> E[Initialize Repo]
    E --> F[Push Initial Commit]
    F --> G[Set Up Webhooks]
    G --> D
    
    D --> H[Prepare Deployment]
    H --> I[Generate Dockerfile]
    I --> J[Create Fly.io App]
    
    J --> K[Configure Resources]
    K --> L[Set Environment Variables]
    L --> M[Build Docker Image]
    
    M --> N[Push to Fly.io Registry]
    N --> O[Deploy to Fly.io]
    O --> P[Health Check]
    
    P --> Q{Healthy?}
    Q -->|Yes| R[Generate Preview URL]
    Q -->|No| S[Rollback]
    
    S --> T[Notify User of Error]
    R --> U[Update Project Record]
    U --> V[Send URL to User]
    
    style A fill:#4A9EFF
    style J fill:#A78BFA
    style R fill:#4ADE80
    style S fill:#EF4444`;

  const flowSteps = [
    {
      phase: 'Authentication',
      steps: [
        { title: 'User visits Buildify', description: 'Landing page with OAuth options', completed: true },
        { title: 'Select OAuth provider', description: 'GitHub, Google, or Apple sign-in', completed: true },
        { title: 'OAuth authorization', description: 'User grants permissions to Buildify', completed: true },
        { title: 'Account creation', description: 'Django creates user record with OAuth data', completed: true },
        { title: 'JWT token issued', description: 'Frontend stores authentication token', completed: true },
      ],
    },
    {
      phase: 'Project Setup',
      steps: [
        { title: 'Dashboard access', description: 'User sees existing projects and create button', completed: true },
        { title: 'Create new project', description: 'Enter project name and description', completed: true },
        { title: 'Project initialization', description: 'Backend creates project record and file structure', completed: true },
        { title: 'Editor loads', description: 'Code editor interface with file tree and AI chat', completed: true },
      ],
    },
    {
      phase: 'AI Code Generation',
      steps: [
        { title: 'User sends message', description: 'Natural language request to AI assistant', completed: true },
        { title: 'Credit check', description: 'Verify user has sufficient credits', completed: true },
        { title: 'Model selection', description: 'Choose Claude model based on context size', completed: true },
        { title: 'System prompt generation', description: 'Build context with project files and instructions', completed: true },
        { title: 'API call', description: 'Stream response from Anthropic Claude API', completed: true },
        { title: 'Response parsing', description: 'Extract file operations and code blocks', completed: true },
        { title: 'File updates', description: 'Apply changes to project files in database', completed: true },
        { title: 'Credit deduction', description: 'Track usage and deduct from user balance', completed: true },
      ],
    },
    {
      phase: 'GitHub Integration',
      steps: [
        { title: 'Connect GitHub', description: 'User authorizes GitHub access', completed: true },
        { title: 'Create repository', description: 'Buildify creates private repo via GitHub API', completed: true },
        { title: 'Initial commit', description: 'Push all project files to GitHub', completed: true },
        { title: 'Webhook setup', description: 'Configure webhooks for sync events', completed: true },
      ],
    },
    {
      phase: 'Deployment',
      steps: [
        { title: 'Generate preview', description: 'User requests Fly.io deployment', completed: true },
        { title: 'Create Dockerfile', description: 'Generate optimized Dockerfile for project', completed: true },
        { title: 'Fly.io app creation', description: 'Provision Fly.io application', completed: true },
        { title: 'Build and deploy', description: 'Build Docker image and deploy to Fly.io', completed: true },
        { title: 'Health check', description: 'Verify deployment is running correctly', completed: true },
        { title: 'Preview URL', description: 'Return live preview URL to user', completed: true },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="gradient-primary text-gradient">User Flow</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Complete user journey from authentication through project creation, AI-powered code generation,
          GitHub integration, and deployment to production.
        </p>
      </div>

      {/* Complete Flow Diagram */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Complete User Journey</CardTitle>
          <CardDescription>End-to-end flow from sign-in to deployment</CardDescription>
        </CardHeader>
        <CardContent>
          <MermaidDiagram chart={completeFlowDiagram} />
        </CardContent>
      </Card>

      {/* Detailed Flow Tabs */}
      <Tabs defaultValue="auth" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="codegen">Code Generation</TabsTrigger>
          <TabsTrigger value="github">GitHub</TabsTrigger>
          <TabsTrigger value="deploy">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="auth">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Flow</CardTitle>
              <CardDescription>OAuth-based user authentication with multiple providers</CardDescription>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={authFlowDiagram} />
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="mt-0.5">1</Badge>
                  <div>
                    <p className="font-semibold text-sm">OAuth Provider Selection</p>
                    <p className="text-xs text-muted-foreground">
                      Users choose GitHub, Google, or Apple for authentication
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="mt-0.5">2</Badge>
                  <div>
                    <p className="font-semibold text-sm">Authorization & Token Exchange</p>
                    <p className="text-xs text-muted-foreground">
                      Django handles OAuth flow and exchanges authorization code for access token
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="mt-0.5">3</Badge>
                  <div>
                    <p className="font-semibold text-sm">User Account Creation</p>
                    <p className="text-xs text-muted-foreground">
                      Backend creates or updates user record with OAuth profile data
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="mt-0.5">4</Badge>
                  <div>
                    <p className="font-semibold text-sm">JWT Token Issuance</p>
                    <p className="text-xs text-muted-foreground">
                      Frontend receives and stores JWT for subsequent API requests
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="codegen">
          <Card>
            <CardHeader>
              <CardTitle>AI Code Generation Pipeline</CardTitle>
              <CardDescription>Real-time streaming code generation with Claude AI</CardDescription>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={codeGenFlowDiagram} />
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Model Selection Logic</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Context &gt;100k tokens → Claude Opus 4</li>
                    <li>• Context 50k-100k tokens → Claude Sonnet 4</li>
                    <li>• Context &lt;50k tokens → Claude Haiku</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Streaming Architecture</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• WebSocket connection for real-time updates</li>
                    <li>• Server-Sent Events (SSE) from Claude API</li>
                    <li>• Chunk-by-chunk response parsing</li>
                    <li>• Live file updates in editor</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Credit Management</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Pre-request balance verification</li>
                    <li>• Token-based usage tracking</li>
                    <li>• Post-request credit deduction</li>
                    <li>• Transaction history logging</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">File Operations</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Parse ===FILE:path=== markers</li>
                    <li>• Extract file content from response</li>
                    <li>• Update project files in database</li>
                    <li>• Sync changes to frontend editor</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="github">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Integration</CardTitle>
              <CardDescription>Automatic repository creation and code synchronization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Repository Creation
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Buildify creates a private GitHub repository using the user's OAuth token
                  </p>
                  <div className="bg-muted/50 p-3 rounded font-mono text-xs">
                    POST /api/github/create-repo<br />
                    → Creates private repo: buildify-{'{project-slug}'}<br />
                    → Initializes with README.md<br />
                    → Sets up default branch protection
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Code Synchronization
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    All project files are committed and pushed to the GitHub repository
                  </p>
                  <div className="bg-muted/50 p-3 rounded font-mono text-xs">
                    git add .<br />
                    git commit -m "Initial commit from Buildify"<br />
                    git push origin main
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Webhook Configuration
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Webhooks enable bidirectional sync between Buildify and GitHub
                  </p>
                  <div className="bg-muted/50 p-3 rounded font-mono text-xs">
                    Events: push, pull_request, release<br />
                    Payload URL: https://buildify.dev/webhooks/github<br />
                    Secret: Encrypted webhook secret
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deploy">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Pipeline</CardTitle>
              <CardDescription>Automated deployment to Fly.io preview environments</CardDescription>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={deploymentFlowDiagram} />
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-blue-400">Build Phase</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Generate optimized Dockerfile</li>
                      <li>• Install dependencies</li>
                      <li>• Build production assets</li>
                      <li>• Create Docker image</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-purple-400">Deploy Phase</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Push image to Fly.io registry</li>
                      <li>• Create/update Fly.io app</li>
                      <li>• Configure environment variables</li>
                      <li>• Deploy to edge locations</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-green-400">Verify Phase</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Health check endpoints</li>
                      <li>• Verify app is running</li>
                      <li>• Generate preview URL</li>
                      <li>• Update project record</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Step-by-Step Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Breakdown</CardTitle>
          <CardDescription>Detailed walkthrough of each phase in the user journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {flowSteps.map((phase, phaseIndex) => (
              <div key={phaseIndex}>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="outline">{phaseIndex + 1}</Badge>
                  {phase.phase}
                </h3>
                <div className="space-y-2 ml-8">
                  {phase.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      {step.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{step.title}</p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}