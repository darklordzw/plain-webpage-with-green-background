
import { useState } from 'react';
import AppCard, { DjangoApp } from '@/components/AppCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function BackendApps() {
  const [searchQuery, setSearchQuery] = useState('');

  const djangoApps: DjangoApp[] = [
    {
      name: 'accounts',
      directory: 'accounts/',
      purpose: 'User authentication and management with social OAuth providers',
      icon: 'database',
      color: 'blue',
      models: [
        { name: 'User', description: 'Custom user model with social auth fields' },
        { name: 'UserProfile', description: 'Extended user profile information' },
      ],
      keyFiles: [
        { name: 'models.py', description: 'User and profile models' },
        { name: 'views.py', description: 'Authentication endpoints' },
        { name: 'serializers.py', description: 'User data serialization' },
      ],
      codeExample: {
        filename: 'accounts/models.py',
        language: 'python',
        code: `class User(AbstractUser):
    # Social auth providers
    github_id = models.CharField(max_length=255, unique=True, null=True)
    google_id = models.CharField(max_length=255, unique=True, null=True)
    apple_id = models.CharField(max_length=255, unique=True, null=True)

    # Profile data
    avatar_url = models.URLField(null=True, blank=True)
    bio = models.TextField(blank=True)
    website = models.URLField(null=True, blank=True)

    # Credits & subscription
    credit_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    subscription_tier = models.CharField(max_length=50, default='free')`,
      },
    },
    {
      name: 'projects',
      directory: 'projects/',
      purpose: 'Project and file management with version control',
      icon: 'code',
      color: 'green',
      models: [
        { name: 'Project', description: 'User projects with GitHub integration' },
        { name: 'ProjectFile', description: 'Individual files within projects' },
        { name: 'ProjectAsset', description: 'Images and binary assets' },
      ],
      keyFiles: [
        { name: 'models.py', description: 'Project and file models' },
        { name: 'views.py', description: 'CRUD operations' },
        { name: 'serializers.py', description: 'Project data serialization' },
      ],
      codeExample: {
        filename: 'projects/models.py',
        language: 'python',
        code: `class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    slug = models.SlugField(unique=True)

    # GitHub integration
    github_repo = models.ForeignKey('github_integration.GitHubRepository',
                                   null=True, on_delete=models.SET_NULL)

    # Fly.io preview
    fly_app_name = models.CharField(max_length=100, null=True)
    preview_url = models.URLField(null=True)

    # File storage
    files = models.JSONField(default=dict)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)`,
      },
    },
    {
      name: 'code_gen',
      directory: 'code_gen/',
      purpose: 'AI code generation core with conversation management',
      icon: 'code',
      color: 'purple',
      models: [
        { name: 'Conversation', description: 'AI chat conversations' },
        { name: 'ChatMessage', description: 'Individual messages with streaming' },
        { name: 'ConversationTemplate', description: 'Reusable conversation templates' },
      ],
      keyFiles: [
        { name: 'models.py', description: 'Conversation and message models' },
        { name: 'views.py', description: 'Message streaming endpoints' },
        { name: 'system_prompt.py', description: 'Prompt generation logic' },
        { name: 'consumers.py', description: 'WebSocket consumers' },
      ],
      codeExample: {
        filename: 'code_gen/system_prompt.py',
        language: 'python',
        code: `def generate_system_prompt_code_generation(conversation, options):
    """Generate system prompt for code generation mode."""
    
    buildify_md_instructions = (
        f"# Planning Document Management\\n"
        f"Maintain a structured planning document at {BUILDIFY_MD_PATH} "
        "with Requirements, Design, Tasks, and Discussions sections.\\n"
    ) if options.use_buildify_md else ""

    file_instructions = (
        "# File Operations\\n"
        "To create or update files, use the following format:\\n"
        "===FILE:path/to/file.ext===\\n"
        "[file content]\\n"
        "===FILE:END===\\n"
    )

    return f"{conversation.system_prompt}\\n{buildify_md_instructions}\\n{file_instructions}"`,
      },
    },
    {
      name: 'github_integration',
      directory: 'github_integration/',
      purpose: 'GitHub repository connectivity and synchronization',
      icon: 'code',
      color: 'blue',
      models: [
        { name: 'GitHubRepository', description: 'Connected GitHub repos' },
        { name: 'GitHubWebhook', description: 'Webhook event handlers' },
      ],
      keyFiles: [
        { name: 'models.py', description: 'GitHub connection models' },
        { name: 'views.py', description: 'Repo creation and sync' },
        { name: 'github_client.py', description: 'GitHub API wrapper' },
      ],
      codeExample: {
        filename: 'github_integration/views.py',
        language: 'python',
        code: `def create_github_repo(project_id):
    """Create GitHub repository for Buildify project."""
    project = Project.objects.get(id=project_id)
    user = project.user

    # Get user's GitHub token
    social_auth = user.social_auth.get(provider='github')
    github_token = social_auth.extra_data['access_token']

    # GitHub API client
    gh = Github(github_token)

    # Create repository
    repo = gh.get_user().create_repo(
        name=project.slug,
        description=project.description,
        private=True,
        auto_init=True
    )

    # Save GitHub connection
    github_repo = GitHubRepository.objects.create(
        project=project,
        repo_name=repo.name,
        repo_url=repo.html_url,
        default_branch=repo.default_branch
    )

    return github_repo`,
      },
    },
    {
      name: 'payments',
      directory: 'payments/',
      purpose: 'Stripe payment processing and subscription management',
      icon: 'database',
      color: 'green',
      models: [
        { name: 'StripeCustomer', description: 'Stripe customer records' },
        { name: 'PaymentIntent', description: 'Payment transaction records' },
        { name: 'Subscription', description: 'Recurring subscriptions' },
      ],
      keyFiles: [
        { name: 'models.py', description: 'Payment models' },
        { name: 'views.py', description: 'Payment endpoints' },
        { name: 'stripe_client.py', description: 'Stripe API integration' },
        { name: 'webhooks.py', description: 'Stripe webhook handlers' },
      ],
      codeExample: {
        filename: 'payments/webhooks.py',
        language: 'python',
        code: `@csrf_exempt
def stripe_webhook(request):
    """Handle Stripe webhook events."""
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        return HttpResponse(status=400)

    # Handle the event
    if event.type == 'payment_intent.succeeded':
        payment_intent = event.data.object
        handle_successful_payment(payment_intent)
    elif event.type == 'customer.subscription.updated':
        subscription = event.data.object
        update_user_subscription(subscription)

    return HttpResponse(status=200)`,
      },
    },
    {
      name: 'credits',
      directory: 'credits/',
      purpose: 'Usage tracking and credit balance management',
      icon: 'database',
      color: 'purple',
      models: [
        { name: 'CreditBalance', description: 'User credit balances' },
        { name: 'CreditTransaction', description: 'Credit usage history' },
        { name: 'CreditPackage', description: 'Purchasable credit packages' },
      ],
      keyFiles: [
        { name: 'models.py', description: 'Credit models' },
        { name: 'views.py', description: 'Credit management endpoints' },
        { name: 'usage_tracker.py', description: 'Usage metering logic' },
      ],
      codeExample: {
        filename: 'credits/usage_tracker.py',
        language: 'python',
        code: `def track_ai_usage(user, model_name, input_tokens, output_tokens):
    """Track AI API usage and deduct credits."""
    
    # Calculate cost based on model pricing
    cost_per_1k_input = MODEL_PRICING[model_name]['input']
    cost_per_1k_output = MODEL_PRICING[model_name]['output']
    
    total_cost = (
        (input_tokens / 1000) * cost_per_1k_input +
        (output_tokens / 1000) * cost_per_1k_output
    )
    
    # Deduct from user balance
    balance = CreditBalance.objects.get(user=user)
    balance.balance -= Decimal(total_cost)
    balance.save()
    
    # Record transaction
    CreditTransaction.objects.create(
        user=user,
        amount=-Decimal(total_cost),
        transaction_type='ai_usage',
        metadata={'model': model_name, 'tokens': input_tokens + output_tokens}
    )`,
      },
    },
    {
      name: 'agents',
      directory: 'agents/',
      purpose: 'AI agent orchestration and multi-agent workflows',
      icon: 'code',
      color: 'blue',
      models: [
        { name: 'Agent', description: 'Agent definitions and configurations' },
        { name: 'AgentTool', description: 'Available tools for agents' },
        { name: 'AgentExecution', description: 'Agent execution history' },
      ],
      keyFiles: [
        { name: 'models.py', description: 'Agent models' },
        { name: 'orchestrator.py', description: 'Multi-agent coordination' },
        { name: 'tools.py', description: 'Tool definitions' },
      ],
      codeExample: {
        filename: 'agents/orchestrator.py',
        language: 'python',
        code: `class AgentOrchestrator:
    """Coordinate multiple AI agents for complex tasks."""
    
    def execute_workflow(self, workflow_config, context):
        """Execute multi-agent workflow."""
        results = {}
        
        for step in workflow_config['steps']:
            agent = Agent.objects.get(id=step['agent_id'])
            
            # Prepare agent context with previous results
            agent_context = {**context, 'previous_results': results}
            
            # Execute agent
            result = self.execute_agent(agent, agent_context)
            results[step['name']] = result
            
            # Check if workflow should continue
            if not self.should_continue(step, result):
                break
        
        return results`,
      },
    },
    {
      name: 'classifiers',
      directory: 'classifiers/',
      purpose: 'ML-based content classification and intent detection',
      icon: 'database',
      color: 'green',
      models: [
        { name: 'ClassificationResult', description: 'Classification outputs' },
        { name: 'ClassifierModel', description: 'Trained classifier metadata' },
      ],
      keyFiles: [
        { name: 'models.py', description: 'Classifier models' },
        { name: 'intent_classifier.py', description: 'Intent detection logic' },
        { name: 'safety_classifier.py', description: 'Content safety checks' },
      ],
      codeExample: {
        filename: 'classifiers/intent_classifier.py',
        language: 'python',
        code: `def classify_user_intent(message_text):
    """Classify user message intent."""
    
    # Use Claude for intent classification
    response = anthropic.messages.create(
        model="claude-3-5-haiku-20241022",
        max_tokens=100,
        messages=[{
            "role": "user",
            "content": f"Classify this message intent: {message_text}\\n\\nCategories: code_generation, question, bug_report, feature_request"
        }]
    )
    
    intent = response.content[0].text.strip().lower()
    
    ClassificationResult.objects.create(
        input_text=message_text,
        classification=intent,
        confidence=0.95
    )
    
    return intent`,
      },
    },
    {
      name: 'interstitials',
      directory: 'interstitials/',
      purpose: 'User notifications, modals, and onboarding flows',
      icon: 'settings',
      color: 'purple',
      models: [
        { name: 'Interstitial', description: 'Notification/modal definitions' },
        { name: 'UserInterstitialState', description: 'User interaction tracking' },
      ],
      keyFiles: [
        { name: 'models.py', description: 'Interstitial models' },
        { name: 'views.py', description: 'Interstitial delivery endpoints' },
        { name: 'triggers.py', description: 'Display trigger logic' },
      ],
      codeExample: {
        filename: 'interstitials/triggers.py',
        language: 'python',
        code: `def check_interstitials_for_user(user, context):
    """Check which interstitials should be shown to user."""
    
    active_interstitials = Interstitial.objects.filter(
        is_active=True,
        start_date__lte=timezone.now(),
        end_date__gte=timezone.now()
    )
    
    to_show = []
    for interstitial in active_interstitials:
        # Check if user has already seen it
        state = UserInterstitialState.objects.filter(
            user=user,
            interstitial=interstitial
        ).first()
        
        if not state or interstitial.can_show_again:
            # Check trigger conditions
            if evaluate_trigger_conditions(interstitial, user, context):
                to_show.append(interstitial)
    
    return to_show`,
      },
    },
    {
      name: 'lm_apis',
      directory: 'lm_apis/',
      purpose: 'Language model API integrations and response parsing',
      icon: 'code',
      color: 'blue',
      models: [],
      keyFiles: [
        { name: 'anthropic_client.py', description: 'Claude API wrapper' },
        { name: 'streaming.py', description: 'SSE streaming handler' },
        { name: 'token_counter.py', description: 'Token counting utilities' },
        { name: 'response_parser.py', description: 'Response parsing logic' },
      ],
      codeExample: {
        filename: 'lm_apis/anthropic_client.py',
        language: 'python',
        code: `def select_model(conversation, message_context):
    """Determine the best Claude model for this request."""
    
    # Check user preference
    if conversation.preferred_model:
        return conversation.preferred_model
    
    # Calculate context size
    token_count = count_tokens(message_context)
    
    if token_count > 100000:
        return "claude-opus-4-20250514"  # Large context
    elif token_count > 50000:
        return "claude-sonnet-4-20250514"  # Balanced
    else:
        return "claude-3-5-haiku-20241022"  # Fast`,
      },
    },
    {
      name: 'api',
      directory: 'api/',
      purpose: 'General API utilities and common endpoints',
      icon: 'settings',
      color: 'green',
      models: [],
      keyFiles: [
        { name: 'views.py', description: 'Common API views' },
        { name: 'serializers.py', description: 'Shared serializers' },
        { name: 'urls.py', description: 'API routing' },
        { name: 'permissions.py', description: 'Custom permissions' },
      ],
      codeExample: {
        filename: 'api/permissions.py',
        language: 'python',
        code: `class IsProjectOwner(permissions.BasePermission):
    """Permission check for project ownership."""
    
    def has_object_permission(self, request, view, obj):
        # Check if user owns the project
        if hasattr(obj, 'user'):
            return obj.user == request.user
        elif hasattr(obj, 'project'):
            return obj.project.user == request.user
        return False

class HasSufficientCredits(permissions.BasePermission):
    """Permission check for credit balance."""
    
    def has_permission(self, request, view):
        balance = CreditBalance.objects.get(user=request.user)
        return balance.balance > 0`,
      },
    },
    {
      name: 'fly_io',
      directory: 'fly_io/',
      purpose: 'Preview deployment system with Fly.io integration',
      icon: 'code',
      color: 'purple',
      models: [],
      keyFiles: [
        { name: 'deploy.py', description: 'Deployment orchestration' },
        { name: 'fly_api.py', description: 'Fly.io API client' },
        { name: 'dockerfile_template.py', description: 'Dynamic Dockerfile generation' },
      ],
      codeExample: {
        filename: 'fly_io/deploy.py',
        language: 'python',
        code: `def deploy_project_preview(project_id):
    """Deploy project to Fly.io preview environment."""
    
    project = Project.objects.get(id=project_id)
    
    # Generate Dockerfile based on project type
    dockerfile = generate_dockerfile(project)
    
    # Create or update Fly.io app
    if not project.fly_app_name:
        app_name = f"buildify-{project.slug}-preview"
        create_fly_app(app_name)
        project.fly_app_name = app_name
        project.save()
    
    # Build and deploy
    deploy_result = fly_deploy(
        app_name=project.fly_app_name,
        dockerfile=dockerfile,
        files=project.get_all_files()
    )
    
    # Update preview URL
    project.preview_url = f"https://{project.fly_app_name}.fly.dev"
    project.save()
    
    return deploy_result`,
      },
    },
  ];

  const categories = ['All', 'Core', 'Integration', 'Infrastructure'];

  const getCategoryApps = (category: string) => {
    if (category === 'All') return djangoApps;
    if (category === 'Core')
      return djangoApps.filter((app) =>
        ['accounts', 'projects', 'code_gen', 'credits'].includes(app.name)
      );
    if (category === 'Integration')
      return djangoApps.filter((app) =>
        ['github_integration', 'payments', 'lm_apis', 'api'].includes(app.name)
      );
    if (category === 'Infrastructure')
      return djangoApps.filter((app) =>
        ['agents', 'classifiers', 'interstitials', 'fly_io'].includes(app.name)
      );
    return djangoApps;
  };

  const filterApps = (apps: DjangoApp[]) => {
    if (!searchQuery) return apps;
    const query = searchQuery.toLowerCase();
    return apps.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        app.purpose.toLowerCase().includes(query) ||
        app.models.some((m) => m.name.toLowerCase().includes(query))
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="gradient-primary text-gradient">Backend Apps</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Comprehensive documentation of all 12 Django applications powering the Buildify platform backend.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search apps, models, or functionality..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs for Categories */}
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => {
          const apps = filterApps(getCategoryApps(category));
          return (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apps.map((app) => (
                  <AppCard key={app.name} app={app} />
                ))}
              </div>
              {apps.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No apps found matching "{searchQuery}"
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}