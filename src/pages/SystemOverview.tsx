
import MermaidDiagram from '@/components/MermaidDiagram';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Cloud, Zap, Lock, CreditCard, Cpu } from 'lucide-react';

export default function SystemOverview() {
  const techStack = [
    {
      category: 'Backend',
      icon: Database,
      color: 'text-primary',
      technologies: [
        { name: 'Django 5.2', description: 'Web framework' },
        { name: 'Django REST Framework', description: 'API toolkit' },
        { name: 'Django Ninja', description: 'Fast API framework' },
        { name: 'PostgreSQL', description: 'Primary database' },
        { name: 'Redis', description: 'Cache & queue' },
        { name: 'Celery', description: 'Background tasks' },
      ],
    },
    {
      category: 'Frontend',
      icon: Cpu,
      color: 'text-secondary',
      technologies: [
        { name: 'React Router 7', description: 'Routing with SSR' },
        { name: 'TypeScript', description: 'Type safety' },
        { name: 'Tailwind CSS', description: 'Styling framework' },
        { name: 'Jotai', description: 'State management' },
        { name: 'React Query', description: 'Server state' },
        { name: 'Monaco Editor', description: 'Code editor' },
      ],
    },
    {
      category: 'AI & ML',
      icon: Zap,
      color: 'text-accent',
      technologies: [
        { name: 'Anthropic Claude', description: 'LLM provider' },
        { name: 'Opus 4', description: 'Complex reasoning' },
        { name: 'Sonnet 4', description: 'Balanced performance' },
        { name: 'Haiku 3.5', description: 'Fast responses' },
        { name: 'Streaming API', description: 'Real-time output' },
      ],
    },
    {
      category: 'Infrastructure',
      icon: Cloud,
      color: 'text-primary',
      technologies: [
        { name: 'Heroku', description: 'Production hosting' },
        { name: 'Fly.io', description: 'Preview environments' },
        { name: 'AWS S3', description: 'File storage' },
        { name: 'CloudFront', description: 'CDN delivery' },
        { name: 'GitHub Actions', description: 'CI/CD pipeline' },
      ],
    },
    {
      category: 'Authentication',
      icon: Lock,
      color: 'text-secondary',
      technologies: [
        { name: 'Django Social Auth', description: 'OAuth framework' },
        { name: 'GitHub OAuth', description: 'Developer auth' },
        { name: 'Google OAuth', description: 'Social login' },
        { name: 'Apple Sign In', description: 'iOS integration' },
        { name: 'PKCE', description: 'Security enhancement' },
      ],
    },
    {
      category: 'Payments',
      icon: CreditCard,
      color: 'text-accent',
      technologies: [
        { name: 'Stripe', description: 'Payment processing' },
        { name: 'Subscriptions', description: 'Recurring billing' },
        { name: 'Webhooks', description: 'Event handling' },
        { name: 'Credit System', description: 'Usage tracking' },
      ],
    },
  ];

  const systemDiagram = `graph TB
    subgraph "Client Layer"
        A[Web Browser]
        B[Mobile Browser]
    end
    
    subgraph "Frontend - React Router 7"
        C[Landing Pages]
        D[Dashboard]
        E[Code Editor]
        F[Project Settings]
    end
    
    subgraph "Backend - Django"
        G[API Gateway]
        H[Authentication]
        I[Project Management]
        J[Code Generation]
        K[GitHub Integration]
    end
    
    subgraph "AI Services"
        L[Claude Opus 4]
        M[Claude Sonnet 4]
        N[Claude Haiku 3.5]
    end
    
    subgraph "Data Layer"
        O[(PostgreSQL)]
        P[(Redis Cache)]
        Q[S3 Storage]
    end
    
    subgraph "External Services"
        R[GitHub API]
        S[Stripe API]
        T[Fly.io API]
    end
    
    A --> C
    B --> C
    C --> G
    D --> G
    E --> G
    F --> G
    
    G --> H
    G --> I
    G --> J
    G --> K
    
    J --> L
    J --> M
    J --> N
    
    H --> O
    I --> O
    J --> O
    K --> O
    
    G --> P
    I --> Q
    
    K --> R
    H --> S
    I --> T
    
    classDef frontend fill:#4A9EFF,stroke:#3B82F6,color:#fff
    classDef backend fill:#A78BFA,stroke:#9333EA,color:#fff
    classDef ai fill:#4ADE80,stroke:#22C55E,color:#000
    classDef data fill:#F59E0B,stroke:#D97706,color:#fff
    classDef external fill:#EC4899,stroke:#DB2777,color:#fff
    
    class A,B,C,D,E,F frontend
    class G,H,I,J,K backend
    class L,M,N ai
    class O,P,Q data
    class R,S,T external`;

  const performanceMetrics = [
    { label: 'API Response Time', value: '250ms', description: 'Average endpoint latency' },
    { label: 'WebSocket Latency', value: '<50ms', description: 'Real-time update speed' },
    { label: 'Page Load Time', value: '1.2s', description: 'First Contentful Paint' },
    { label: 'Concurrent Users', value: '500+', description: 'Simultaneous connections' },
    { label: 'Database Size', value: '~15GB', description: 'Production data volume' },
    { label: 'CDN Cache Hit', value: '95%', description: 'Static asset delivery' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="gradient-primary text-gradient">System Overview</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Comprehensive architecture of the Buildify platform, including backend Django apps, frontend React
          components, AI integration, and deployment infrastructure.
        </p>
      </div>

      {/* System Architecture Diagram */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            System Architecture
          </CardTitle>
          <CardDescription>High-level component interaction and data flow</CardDescription>
        </CardHeader>
        <CardContent>
          <MermaidDiagram chart={systemDiagram} />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <span className="text-sm text-muted-foreground">Frontend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent"></div>
              <span className="text-sm text-muted-foreground">Backend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-secondary"></div>
              <span className="text-sm text-muted-foreground">AI Services</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#F59E0B' }}></div>
              <span className="text-sm text-muted-foreground">Data Layer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#EC4899' }}></div>
              <span className="text-sm text-muted-foreground">External</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
          <CardDescription>Core technologies powering the Buildify platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Backend" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {techStack.map((stack) => (
                <TabsTrigger key={stack.category} value={stack.category}>
                  {stack.category}
                </TabsTrigger>
              ))}
            </TabsList>
            {techStack.map((stack) => {
              const Icon = stack.icon;
              return (
                <TabsContent key={stack.category} value={stack.category} className="mt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className={`h-6 w-6 ${stack.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{stack.category}</h3>
                      <p className="text-sm text-muted-foreground">
                        {stack.technologies.length} technologies
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stack.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                        <div>
                          <h4 className="font-semibold text-foreground">{tech.name}</h4>
                          <p className="text-sm text-muted-foreground">{tech.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Production system performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceMetrics.map((metric) => (
              <div key={metric.label} className="text-center p-6 bg-card border border-border rounded-lg">
                <div className="text-3xl font-bold gradient-primary text-gradient mb-2">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">{metric.label}</div>
                <div className="text-xs text-muted-foreground">{metric.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Real-Time Collaboration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Django Channels + WebSockets for live updates</p>
            <p>• Redis channel layer for horizontal scaling</p>
            <p>• 1000+ concurrent connections per dyno</p>
            <p>• File sync, chat streaming, preview notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scalable Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Microservices-ready Django app structure</p>
            <p>• Celery for async background processing</p>
            <p>• S3 + CloudFront for global asset delivery</p>
            <p>• Heroku auto-scaling with performance dynos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}