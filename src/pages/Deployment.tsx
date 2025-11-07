
// Deployment infrastructure and CI/CD pipeline documentation
import MermaidDiagram from '@/components/MermaidDiagram';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Rocket, GitBranch, Server, Cloud, CheckCircle2, AlertCircle, Zap, Database } from 'lucide-react';

export default function Deployment() {
  const cicdPipelineDiagram = `graph TB
    Start([Push to GitHub]) --> Branch{Branch?}
    
    Branch -->|main| ProdPipeline[Production Pipeline]
    Branch -->|PR| PreviewPipeline[Preview Pipeline]
    
    ProdPipeline --> ProdTests[Run Tests]
    ProdTests --> ProdBuild{Tests Pass?}
    ProdBuild -->|No| ProdFail[❌ Deployment Failed]
    ProdBuild -->|Yes| HerokuDeploy[Deploy to Heroku]
    
    HerokuDeploy --> BuildSlug[Build Slug]
    BuildSlug --> Migrate[Run Migrations]
    Migrate --> Collectstatic[Collect Static Files]
    Collectstatic --> Release[Release to Production]
    Release --> ProdSuccess[✅ Production Live]
    
    PreviewPipeline --> PreviewTests[Run Tests]
    PreviewTests --> PreviewBuild{Tests Pass?}
    PreviewBuild -->|No| PreviewFail[❌ Preview Failed]
    PreviewBuild -->|Yes| FlyDeploy[Deploy to Fly.io]
    
    FlyDeploy --> FlyBuild[Build Docker Image]
    FlyBuild --> FlyMigrate[Run Migrations]
    FlyMigrate --> FlyRelease[Deploy Preview App]
    FlyRelease --> Comment[Post PR Comment]
    Comment --> PreviewSuccess[✅ Preview Ready]
    
    style Start fill:#4A9EFF
    style HerokuDeploy fill:#6366F1
    style FlyDeploy fill:#A78BFA
    style ProdSuccess fill:#10B981
    style PreviewSuccess fill:#10B981
    style ProdFail fill:#EF4444
    style PreviewFail fill:#EF4444`;

  const herokuArchitectureDiagram = `graph LR
    Client[Client Browser] --> CloudFlare[CloudFlare CDN]
    CloudFlare --> Heroku[Heroku Router]
    
    Heroku --> Web1[Web Dyno 1]
    Heroku --> Web2[Web Dyno 2]
    
    Web1 --> Postgres[(PostgreSQL)]
    Web2 --> Postgres
    
    Web1 --> Redis[(Redis Cache)]
    Web2 --> Redis
    
    Web1 --> S3[AWS S3]
    Web2 --> S3
    
    Postgres --> Backup[Automated Backups]
    
    Worker[Worker Dyno] --> Postgres
    Worker --> Redis
    Worker --> S3
    
    Scheduler[Heroku Scheduler] --> Worker
    
    style CloudFlare fill:#F59E0B
    style Heroku fill:#6366F1
    style Postgres fill:#3B82F6
    style Redis fill:#EF4444
    style S3 fill:#F59E0B`;

  const flyArchitectureDiagram = `graph TB
    PR[Pull Request] --> GHA[GitHub Actions]
    GHA --> Build[Build Docker Image]
    
    Build --> Registry[Fly.io Registry]
    Registry --> Deploy[Deploy to Fly.io]
    
    Deploy --> App[Preview App Instance]
    App --> FlyDB[(Fly Postgres)]
    App --> FlyRedis[(Fly Redis)]
    
    App --> Cleanup{PR Merged/Closed?}
    Cleanup -->|Yes| Destroy[Destroy Resources]
    Cleanup -->|No| Keep[Keep Running]
    
    Destroy --> Done[Resources Freed]
    
    style PR fill:#4A9EFF
    style Build fill:#A78BFA
    style App fill:#10B981
    style Destroy fill:#EF4444`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="gradient-primary text-gradient">Deployment Infrastructure</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Production deployment on Heroku with automated CI/CD pipelines and ephemeral preview environments
          on Fly.io for every pull request.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Rocket className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Environments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Server className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">Heroku</p>
                <p className="text-xs text-muted-foreground">Production</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Cloud className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">Fly.io</p>
                <p className="text-xs text-muted-foreground">Preview</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <GitBranch className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">Auto</p>
                <p className="text-xs text-muted-foreground">CI/CD</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CI/CD Pipeline */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            CI/CD Pipeline
          </CardTitle>
          <CardDescription>Automated deployment workflow for production and preview environments</CardDescription>
        </CardHeader>
        <CardContent>
          <MermaidDiagram chart={cicdPipelineDiagram} />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-purple-500/20 bg-purple-500/5 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-500/10">Production</Badge>
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Triggered on push to <code className="bg-muted px-1 rounded">main</code> branch</li>
                <li>• Runs full test suite (pytest, coverage)</li>
                <li>• Deploys to Heroku production</li>
                <li>• Automatic database migrations</li>
                <li>• Zero-downtime deployment</li>
                <li>• Rollback on failure</li>
              </ul>
            </div>
            <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-500/10">Preview</Badge>
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Triggered on pull request creation</li>
                <li>• Runs test suite for validation</li>
                <li>• Deploys to Fly.io ephemeral app</li>
                <li>• Unique URL posted to PR comments</li>
                <li>• Auto-destroyed on PR merge/close</li>
                <li>• Isolated database per preview</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deployment Tabs */}
      <Tabs defaultValue="heroku" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="heroku">Heroku Production</TabsTrigger>
          <TabsTrigger value="flyio">Fly.io Preview</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="heroku">
          <Card>
            <CardHeader>
              <CardTitle>Heroku Production Architecture</CardTitle>
              <CardDescription>Scalable production infrastructure with PostgreSQL, Redis, and S3</CardDescription>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={herokuArchitectureDiagram} />

              <div className="mt-6 space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    Dyno Configuration
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs font-semibold mb-1">Web Dynos</p>
                      <p className="text-xs text-muted-foreground">2x Standard-2X</p>
                      <p className="text-xs text-muted-foreground">1GB RAM each</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs font-semibold mb-1">Worker Dynos</p>
                      <p className="text-xs text-muted-foreground">1x Standard-1X</p>
                      <p className="text-xs text-muted-foreground">512MB RAM</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs font-semibold mb-1">Scheduler</p>
                      <p className="text-xs text-muted-foreground">Heroku Scheduler</p>
                      <p className="text-xs text-muted-foreground">Hourly tasks</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Add-ons & Services
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs font-semibold mb-1">PostgreSQL</p>
                      <p className="text-xs text-muted-foreground">Heroku Postgres Standard-0</p>
                      <p className="text-xs text-muted-foreground">64GB storage, 120 connections</p>
                      <p className="text-xs text-muted-foreground">Daily automated backups</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs font-semibold mb-1">Redis</p>
                      <p className="text-xs text-muted-foreground">Heroku Redis Premium-0</p>
                      <p className="text-xs text-muted-foreground">100MB cache, persistence enabled</p>
                      <p className="text-xs text-muted-foreground">Session & rate limiting</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs font-semibold mb-1">AWS S3</p>
                      <p className="text-xs text-muted-foreground">Static files & user uploads</p>
                      <p className="text-xs text-muted-foreground">CloudFront CDN integration</p>
                      <p className="text-xs text-muted-foreground">Lifecycle policies for cleanup</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs font-semibold mb-1">CloudFlare</p>
                      <p className="text-xs text-muted-foreground">DNS & CDN</p>
                      <p className="text-xs text-muted-foreground">DDoS protection</p>
                      <p className="text-xs text-muted-foreground">SSL/TLS termination</p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Deployment Process</AlertTitle>
                  <AlertDescription className="text-xs mt-2">
                    <ol className="list-decimal list-inside space-y-1">
                      <li>GitHub Actions detects push to <code className="bg-muted px-1 rounded">main</code></li>
                      <li>Runs test suite with pytest and coverage checks</li>
                      <li>Heroku builds slug from <code className="bg-muted px-1 rounded">Procfile</code> and <code className="bg-muted px-1 rounded">requirements.txt</code></li>
                      <li>Executes release phase: <code className="bg-muted px-1 rounded">python manage.py migrate</code></li>
                      <li>Collects static files to S3</li>
                      <li>Releases new version with zero downtime</li>
                    </ol>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flyio">
          <Card>
            <CardHeader>
              <CardTitle>Fly.io Preview Environments</CardTitle>
              <CardDescription>Ephemeral preview apps for every pull request</CardDescription>
            </CardHeader>
            <CardContent>
              <MermaidDiagram chart={flyArchitectureDiagram} />

              <div className="mt-6 space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-blue-400">Why Preview Environments?</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <strong>Test before merge:</strong> Review changes in production-like environment</li>
                    <li>• <strong>Share with team:</strong> Unique URL for stakeholder review</li>
                    <li>• <strong>Catch bugs early:</strong> Integration testing with real data</li>
                    <li>• <strong>Cost-effective:</strong> Auto-destroyed after PR closes</li>
                  </ul>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Deployment Workflow</h4>
                  <div className="space-y-3 mt-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">1</div>
                      <div>
                        <p className="text-xs font-semibold">PR Created</p>
                        <p className="text-xs text-muted-foreground">GitHub Actions workflow triggered</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">2</div>
                      <div>
                        <p className="text-xs font-semibold">Build Docker Image</p>
                        <p className="text-xs text-muted-foreground">Multi-stage build with Python 3.11 and Node.js</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">3</div>
                      <div>
                        <p className="text-xs font-semibold">Deploy to Fly.io</p>
                        <p className="text-xs text-muted-foreground">Create app with unique name: <code className="bg-muted px-1 rounded">buildify-pr-123</code></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">4</div>
                      <div>
                        <p className="text-xs font-semibold">Provision Resources</p>
                        <p className="text-xs text-muted-foreground">Postgres database and Redis instance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400">5</div>
                      <div>
                        <p className="text-xs font-semibold">Post Comment</p>
                        <p className="text-xs text-muted-foreground">GitHub bot posts preview URL to PR</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Resource Specifications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs font-semibold mb-1">App Instance</p>
                      <p className="text-xs text-muted-foreground">shared-cpu-1x</p>
                      <p className="text-xs text-muted-foreground">256MB RAM</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs font-semibold mb-1">Postgres</p>
                      <p className="text-xs text-muted-foreground">shared-cpu-1x</p>
                      <p className="text-xs text-muted-foreground">1GB storage</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs font-semibold mb-1">Redis</p>
                      <p className="text-xs text-muted-foreground">shared-cpu-1x</p>
                      <p className="text-xs text-muted-foreground">256MB cache</p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Automatic Cleanup</AlertTitle>
                  <AlertDescription className="text-xs mt-2">
                    Preview environments are automatically destroyed when:
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Pull request is merged to main</li>
                      <li>Pull request is closed without merging</li>
                      <li>Preview is inactive for 7 days</li>
                    </ul>
                    This keeps costs low and prevents resource sprawl.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Files</CardTitle>
              <CardDescription>Essential deployment configuration and environment setup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Procfile (Heroku)</h4>
                  <div className="bg-background p-3 rounded border border-border font-mono text-xs">
                    web: gunicorn buildify.wsgi --workers 4 --threads 2<br />
                    worker: celery -A buildify worker --loglevel=info<br />
                    release: python manage.py migrate --noinput
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">fly.toml (Fly.io)</h4>
                  <div className="bg-background p-3 rounded border border-border font-mono text-xs">
                    app = "buildify-preview"<br />
                    primary_region = "iad"<br />
                    <br />
                    [build]<br />
                    &nbsp;&nbsp;dockerfile = "Dockerfile"<br />
                    <br />
                    [env]<br />
                    &nbsp;&nbsp;PORT = "8000"<br />
                    &nbsp;&nbsp;DJANGO_SETTINGS_MODULE = "buildify.settings.production"<br />
                    <br />
                    [[services]]<br />
                    &nbsp;&nbsp;internal_port = 8000<br />
                    &nbsp;&nbsp;protocol = "tcp"
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Environment Variables</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div>
                      <p className="text-xs font-semibold mb-2">Required for Production</p>
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs">SECRET_KEY</Badge>
                        <Badge variant="outline" className="text-xs">DATABASE_URL</Badge>
                        <Badge variant="outline" className="text-xs">REDIS_URL</Badge>
                        <Badge variant="outline" className="text-xs">AWS_ACCESS_KEY_ID</Badge>
                        <Badge variant="outline" className="text-xs">AWS_SECRET_ACCESS_KEY</Badge>
                        <Badge variant="outline" className="text-xs">ANTHROPIC_API_KEY</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-2">Optional Services</p>
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs">GITHUB_CLIENT_ID</Badge>
                        <Badge variant="outline" className="text-xs">GITHUB_CLIENT_SECRET</Badge>
                        <Badge variant="outline" className="text-xs">STRIPE_SECRET_KEY</Badge>
                        <Badge variant="outline" className="text-xs">STRIPE_WEBHOOK_SECRET</Badge>
                        <Badge variant="outline" className="text-xs">SENTRY_DSN</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">GitHub Actions Workflow</h4>
                  <div className="bg-background p-3 rounded border border-border font-mono text-xs overflow-x-auto">
                    name: Deploy<br />
                    <br />
                    on:<br />
                    &nbsp;&nbsp;push:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;branches: [main]<br />
                    &nbsp;&nbsp;pull_request:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;types: [opened, synchronize, reopened, closed]<br />
                    <br />
                    jobs:<br />
                    &nbsp;&nbsp;deploy-production:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;if: github.ref == 'refs/heads/main'<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;runs-on: ubuntu-latest<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;steps:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- uses: actions/checkout@v3<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- uses: akhileshns/heroku-deploy@v3.12.12<br />
                    <br />
                    &nbsp;&nbsp;deploy-preview:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;if: github.event_name == 'pull_request'<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;runs-on: ubuntu-latest<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;steps:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- uses: superfly/flyctl-actions@v1.4
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Monitoring & Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Monitoring & Performance
          </CardTitle>
          <CardDescription>Production monitoring and performance optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Application Monitoring</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Sentry for error tracking</li>
                <li>• New Relic APM</li>
                <li>• Custom Django middleware</li>
                <li>• Real-time alerts</li>
              </ul>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Database Performance</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Query optimization with indexes</li>
                <li>• Connection pooling (pgBouncer)</li>
                <li>• Slow query logging</li>
                <li>• Automated vacuum</li>
              </ul>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Caching Strategy</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Redis for session storage</li>
                <li>• API response caching</li>
                <li>• Static file CDN (CloudFlare)</li>
                <li>• Database query caching</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}