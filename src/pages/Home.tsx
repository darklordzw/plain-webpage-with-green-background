
import { ArrowRight, Database, Zap, Cloud, Code, GitBranch, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      icon: Database,
      title: 'Backend Architecture',
      description: '12+ Django apps handling auth, projects, AI generation, and integrations',
      link: '/backend-apps',
    },
    {
      icon: Zap,
      title: 'AI Pipeline',
      description: 'Claude-powered code generation with streaming responses and tool execution',
      link: '/ai-pipeline',
    },
    {
      icon: Cloud,
      title: 'Deployment',
      description: 'Heroku production + Fly.io preview environments with automated CI/CD',
      link: '/deployment',
    },
    {
      icon: Code,
      title: 'Frontend Stack',
      description: 'React Router 7 with SSR, TypeScript, and real-time WebSocket updates',
      link: '/system-overview',
    },
    {
      icon: GitBranch,
      title: 'User Flow',
      description: 'Complete authentication to deployment workflow with GitHub integration',
      link: '/user-flow',
    },
    {
      icon: Cpu,
      title: 'API Reference',
      description: 'REST endpoints for projects, code generation, and GitHub operations',
      link: '/api-reference',
    },
  ];

  const techStack = [
    { category: 'Backend', items: ['Django 5.2', 'PostgreSQL', 'Redis', 'Celery'] },
    { category: 'Frontend', items: ['React Router 7', 'TypeScript', 'Tailwind CSS', 'Jotai'] },
    { category: 'AI', items: ['Anthropic Claude', 'Streaming API', 'Tool Execution'] },
    { category: 'Infrastructure', items: ['Heroku', 'Fly.io', 'AWS S3', 'CloudFront'] },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 gradient-accent opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              <span className="gradient-primary text-gradient">Buildify Platform</span>
              <br />
              <span className="text-foreground">System Architecture</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              Comprehensive documentation of the Buildify platform architecture, including backend Django apps,
              frontend React components, AI code generation pipeline, and deployment infrastructure.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/system-overview"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity glow-primary"
              >
                Explore Architecture
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/user-flow"
                className="inline-flex items-center gap-2 px-6 py-3 bg-card text-foreground border border-border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                View User Flow
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((stack) => (
            <div key={stack.category} className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">{stack.category}</h3>
              <ul className="space-y-2">
                {stack.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Architecture Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                to={feature.link}
                className="group bg-card border border-border rounded-lg p-6 hover:border-primary transition-all hover:glow-primary"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* System Stats */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">System Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-primary text-gradient mb-2">12+</div>
              <div className="text-sm text-muted-foreground">Django Apps</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-secondary text-gradient mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Concurrent Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-accent text-gradient mb-2">&lt;50ms</div>
              <div className="text-sm text-muted-foreground">WebSocket Latency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-primary text-gradient mb-2">95%</div>
              <div className="text-sm text-muted-foreground">CDN Cache Hit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}