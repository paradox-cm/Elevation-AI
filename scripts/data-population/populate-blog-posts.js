const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const blogPosts = [
  {
    slug: "future-business-orchestration",
    title: "The Future of Business Orchestration: How AI is Transforming Enterprise Operations",
    excerpt: "Explore how artificial intelligence is revolutionizing the way businesses orchestrate complex operations, from supply chain management to customer experience optimization.",
    content: `# The Future of Business Orchestration: How AI is Transforming Enterprise Operations

The landscape of enterprise operations is undergoing a seismic shift. As artificial intelligence matures from experimental technology to core business infrastructure, organizations are discovering unprecedented opportunities to orchestrate complex operations with unprecedented efficiency and intelligence.

## The Evolution of Business Orchestration

Traditional business orchestration relied heavily on manual processes, rigid workflows, and human decision-making at every critical juncture. While this approach served businesses for decades, it created bottlenecks, inconsistencies, and limited scalability.

### Key Transformations

**1. Intelligent Process Automation**
Modern AI systems can analyze vast amounts of data in real-time, identifying patterns and optimizing processes that would be impossible for human teams to manage manually.

**2. Predictive Decision Making**
AI orchestration platforms can anticipate business needs before they become critical issues. By analyzing historical data and current trends, these systems can proactively adjust operations.

**3. Adaptive Workflow Management**
Unlike static, rule-based systems, AI-powered orchestration can adapt and evolve based on changing business conditions, market dynamics, and operational requirements.

## Real-World Applications

### Supply Chain Optimization
Leading enterprises are using AI to orchestrate complex supply chains, automatically adjusting inventory levels, optimizing shipping routes, and predicting demand fluctuations.

### Customer Experience Orchestration
AI systems can now orchestrate entire customer journeys, from initial contact through post-purchase support. By analyzing customer behavior and preferences, these systems can personalize interactions.

### Financial Operations
In financial services, AI orchestration is transforming everything from risk assessment to fraud detection, enabling real-time decision-making that would be impossible with traditional systems.

## Conclusion

The future of business orchestration is undeniably AI-powered. Organizations that embrace this transformation will gain significant competitive advantages through improved efficiency, better decision-making, and enhanced customer experiences.`,
    author_id: null,
    published_at: "2025-01-15T00:00:00Z",
    category_name: "AI & Technology",
    featured_image: "/images/blog/featured-article.jpg"
  },
  {
    slug: "scalable-ai-workflows",
    title: "Building Scalable AI Workflows: Best Practices for Enterprise Implementation",
    excerpt: "Learn the key principles and strategies for implementing AI workflows that can scale with your organization's growth and evolving needs.",
    content: `# Building Scalable AI Workflows: Best Practices for Enterprise Implementation

Implementing AI workflows in enterprise environments presents unique challenges that require careful planning, strategic thinking, and a deep understanding of both technical and organizational factors.

## Understanding Scalable AI Workflows

Scalable AI workflows are systems that can handle increasing data volumes, user loads, and complexity without requiring fundamental architectural changes.

### Key Characteristics

**Modular Architecture**: Workflows should be composed of independent, reusable components that can be scaled individually based on demand.

**Data Pipeline Efficiency**: The ability to process large volumes of data efficiently, with proper data validation, transformation, and storage mechanisms.

**Resource Management**: Intelligent allocation and management of computational resources based on workload requirements.

## Design Principles for Scalability

### 1. Microservices Architecture
Breaking down AI workflows into microservices allows for independent scaling and deployment.

### 2. Event-Driven Architecture
Implementing event-driven patterns enables workflows to respond to real-time changes and scale automatically based on demand.

### 3. Containerization and Orchestration
Using containers and orchestration platforms like Kubernetes enables efficient resource utilization and automatic scaling.

## Implementation Roadmap

### Phase 1: Foundation
- Establish basic infrastructure
- Implement core data pipelines
- Deploy initial AI models
- Set up monitoring systems

### Phase 2: Optimization
- Optimize performance and costs
- Implement advanced monitoring
- Enhance security measures
- Improve user experience

### Phase 3: Advanced Features
- Implement advanced AI capabilities
- Add predictive scaling
- Enhance automation
- Integrate with external systems

## Conclusion

Building scalable AI workflows requires a holistic approach that considers technical architecture, data management, model deployment, and operational excellence.`,
    author_id: null,
    published_at: "2025-01-12T00:00:00Z",
    category_name: "Technical Insights",
    featured_image: "/images/blog/ai-workflows.jpg"
  },
  {
    slug: "roi-intelligent-process-automation",
    title: "The ROI of Intelligent Process Automation: A Data-Driven Analysis",
    excerpt: "Discover the measurable benefits of implementing intelligent process automation across different industries and business functions.",
    content: `# The ROI of Intelligent Process Automation: A Data-Driven Analysis

Intelligent Process Automation (IPA) represents a significant evolution from traditional automation, combining robotic process automation with artificial intelligence to create more sophisticated, adaptive solutions.

## Understanding IPA ROI

The return on investment for IPA extends far beyond simple cost savings. Organizations implementing IPA solutions report improvements across multiple business metrics.

### Key ROI Components

**Cost Reduction**: IPA can reduce operational costs by 30-50% through automation of repetitive tasks and improved efficiency.

**Time Savings**: Organizations report 40-60% reduction in process completion times for automated workflows.

**Error Reduction**: IPA systems can reduce human errors by up to 90% in routine processes.

**Scalability**: IPA solutions can handle increased workloads without proportional increases in human resources.

## Industry-Specific ROI Analysis

### Financial Services
- **Cost Savings**: 25-40% reduction in operational costs
- **Processing Speed**: 70% faster loan processing
- **Compliance**: 95% reduction in compliance violations

### Healthcare
- **Administrative Efficiency**: 35% reduction in administrative overhead
- **Patient Processing**: 50% faster patient onboarding
- **Data Accuracy**: 85% improvement in data entry accuracy

### Manufacturing
- **Production Efficiency**: 20-30% improvement in production throughput
- **Quality Control**: 60% reduction in quality issues
- **Supply Chain**: 25% improvement in supply chain visibility

## Measuring IPA Success

### Quantitative Metrics
- Process completion time
- Error rates
- Cost per transaction
- Resource utilization
- Customer satisfaction scores

### Qualitative Benefits
- Employee satisfaction
- Innovation capacity
- Strategic focus
- Competitive advantage
- Risk reduction

## Implementation Best Practices

### Start Small, Scale Smart
Begin with high-impact, well-defined processes that can demonstrate clear ROI.

### Focus on Change Management
Successful IPA implementation requires significant change management efforts.

### Invest in Training
Ensure employees are properly trained to work alongside IPA systems.

### Monitor and Optimize
Continuously monitor performance and optimize processes for maximum ROI.

## Conclusion

The ROI of Intelligent Process Automation is substantial and measurable across multiple dimensions. Organizations that implement IPA strategically can expect significant returns on their investment while positioning themselves for future growth and competitiveness.`,
    author_id: null,
    published_at: "2025-01-10T00:00:00Z",
    category_name: "Business Intelligence",
    featured_image: "/images/blog/roi-analysis.jpg"
  },
  {
    slug: "security-first-ai-systems",
    title: "Security First: Building Trust in AI-Powered Business Systems",
    excerpt: "Understanding the critical security considerations and best practices for deploying AI systems in enterprise environments.",
    content: `# Security First: Building Trust in AI-Powered Business Systems

As AI systems become increasingly integrated into business operations, security considerations must be at the forefront of every implementation decision.

## The Security Imperative

AI systems introduce unique security challenges that traditional security measures may not adequately address. Organizations must adopt a security-first approach to AI implementation.

### Unique AI Security Challenges

**Data Privacy**: AI systems often require access to sensitive data, creating privacy concerns and regulatory compliance requirements.

**Model Security**: AI models themselves can be vulnerable to attacks, including adversarial inputs and model extraction.

**Bias and Fairness**: Security isn't just about preventing attacks—it's also about ensuring AI systems make fair, unbiased decisions.

**Transparency**: The "black box" nature of many AI systems can make it difficult to understand and audit their decisions.

## Security Framework for AI Systems

### 1. Data Protection
- Encryption at rest and in transit
- Access controls and authentication
- Data anonymization and pseudonymization
- Regular security audits

### 2. Model Security
- Secure model training environments
- Model versioning and integrity checks
- Adversarial testing and validation
- Regular model updates and patches

### 3. Operational Security
- Secure deployment environments
- Monitoring and logging
- Incident response procedures
- Regular security assessments

### 4. Compliance and Governance
- Regulatory compliance (GDPR, CCPA, etc.)
- Ethical AI guidelines
- Audit trails and documentation
- Regular compliance reviews

## Best Practices for AI Security

### Design Phase
- Incorporate security requirements from the beginning
- Conduct threat modeling exercises
- Implement secure coding practices
- Plan for security testing and validation

### Development Phase
- Use secure development frameworks
- Implement proper authentication and authorization
- Conduct regular security code reviews
- Test for common vulnerabilities

### Deployment Phase
- Use secure deployment practices
- Implement proper monitoring and logging
- Establish incident response procedures
- Conduct regular security assessments

### Operations Phase
- Monitor system performance and security
- Regular security updates and patches
- Ongoing security training for staff
- Regular security audits and assessments

## Building Trust Through Transparency

### Explainable AI
Implementing explainable AI techniques can help build trust by making AI decisions more transparent and understandable.

### Regular Communication
Maintain open communication with stakeholders about AI system capabilities, limitations, and security measures.

### Performance Monitoring
Continuously monitor AI system performance and security to identify and address issues quickly.

## Conclusion

Security must be a fundamental consideration in every aspect of AI system development and deployment. By adopting a security-first approach, organizations can build trustworthy AI systems that deliver value while protecting sensitive data and maintaining stakeholder confidence.`,
    author_id: null,
    published_at: "2025-01-08T00:00:00Z",
    category_name: "Security & Compliance",
    featured_image: "/images/blog/ai-security.jpg"
  },
  {
    slug: "data-silos-unified-intelligence",
    title: "From Data Silos to Unified Intelligence: A Transformation Guide",
    excerpt: "How organizations can break down data silos and create unified intelligence platforms that drive better decision-making.",
    content: `# From Data Silos to Unified Intelligence: A Transformation Guide

Data silos represent one of the most significant barriers to effective business intelligence and decision-making in modern organizations.

## Understanding Data Silos

Data silos occur when information is isolated within specific departments, systems, or applications, preventing effective sharing and analysis across the organization.

### Common Causes of Data Silos

**Organizational Structure**: Departmental boundaries and lack of cross-functional collaboration can create data isolation.

**Technology Fragmentation**: Multiple systems and platforms that don't integrate effectively can lead to data silos.

**Legacy Systems**: Older systems that weren't designed for integration can create barriers to data sharing.

**Security Concerns**: Overly restrictive security policies can prevent necessary data sharing.

## The Cost of Data Silos

### Operational Inefficiencies
- Duplicate data entry and maintenance
- Inconsistent information across departments
- Delayed decision-making due to incomplete information
- Increased operational costs

### Strategic Limitations
- Inability to see the complete picture
- Missed opportunities for optimization
- Reduced competitive advantage
- Limited innovation potential

## The Unified Intelligence Approach

### Data Integration Strategy
- **Data Lake Architecture**: Centralized storage for all data types
- **API-First Design**: Enabling seamless data sharing between systems
- **Real-Time Integration**: Ensuring data is current and accessible
- **Data Quality Management**: Maintaining accuracy and consistency

### Technology Solutions
- **Cloud-Based Platforms**: Scalable, flexible data storage and processing
- **Data Virtualization**: Creating unified views without physical data movement
- **Master Data Management**: Ensuring consistent, accurate data across systems
- **Advanced Analytics**: Leveraging AI and machine learning for insights

## Implementation Roadmap

### Phase 1: Assessment and Planning
- Audit existing data sources and systems
- Identify key stakeholders and requirements
- Develop integration strategy and architecture
- Establish governance and security policies

### Phase 2: Foundation Building
- Implement core data infrastructure
- Establish data quality standards
- Create initial data integration points
- Train staff on new systems and processes

### Phase 3: Integration and Optimization
- Connect major data sources
- Implement advanced analytics capabilities
- Optimize performance and user experience
- Expand integration to additional systems

### Phase 4: Advanced Capabilities
- Implement AI and machine learning
- Develop predictive analytics
- Create self-service analytics capabilities
- Establish continuous improvement processes

## Best Practices for Success

### Leadership and Governance
- Strong executive sponsorship
- Clear data governance policies
- Cross-functional collaboration
- Regular progress reviews

### Technology and Architecture
- Scalable, flexible architecture
- Security-first design
- User-friendly interfaces
- Comprehensive monitoring and maintenance

### Change Management
- Comprehensive training programs
- Clear communication about benefits
- Gradual rollout and adoption
- Ongoing support and feedback

## Measuring Success

### Key Performance Indicators
- Data accessibility and availability
- Time to insight and decision-making
- Data quality and consistency
- User adoption and satisfaction
- Business impact and ROI

### Continuous Improvement
- Regular system performance reviews
- User feedback and satisfaction surveys
- Technology updates and enhancements
- Process optimization and refinement

## Conclusion

Transforming from data silos to unified intelligence requires a comprehensive approach that addresses technology, processes, and organizational culture. Organizations that successfully make this transformation will gain significant competitive advantages through improved decision-making, operational efficiency, and innovation capabilities.`,
    author_id: null,
    published_at: "2025-01-05T00:00:00Z",
    category_name: "Data Strategy",
    featured_image: "/images/blog/data-unification.jpg"
  },
  {
    slug: "human-ai-collaboration-model",
    title: "The Human-AI Collaboration Model: Maximizing Team Performance",
    excerpt: "Explore how to design effective collaboration between human teams and AI systems for optimal business outcomes.",
    content: `# The Human-AI Collaboration Model: Maximizing Team Performance

The future of work isn't about humans versus AI—it's about humans working with AI to achieve outcomes that neither could accomplish alone.

## Understanding Human-AI Collaboration

Human-AI collaboration represents a new paradigm where artificial intelligence augments human capabilities rather than replacing them, creating synergistic relationships that enhance overall performance.

### Key Principles of Effective Collaboration

**Complementary Strengths**: AI excels at pattern recognition, data processing, and repetitive tasks, while humans bring creativity, emotional intelligence, and strategic thinking.

**Shared Decision-Making**: The most effective collaborations involve both human and AI input in decision-making processes.

**Continuous Learning**: Both humans and AI systems should continuously learn and adapt based on collaboration outcomes.

**Transparency and Trust**: Clear communication about AI capabilities, limitations, and decision-making processes builds trust and improves collaboration.

## Designing Effective Collaboration Models

### 1. Augmented Intelligence
AI systems provide insights and recommendations that humans can use to make better decisions.

**Examples:**
- Medical diagnosis support systems
- Financial analysis and risk assessment
- Customer service chatbots with human escalation

### 2. Collaborative Automation
Humans and AI work together on tasks that require both human judgment and AI processing power.

**Examples:**
- Content moderation with human review
- Quality control with AI-assisted inspection
- Research and analysis with AI data processing

### 3. Human-in-the-Loop Systems
AI systems perform tasks but require human oversight and intervention when needed.

**Examples:**
- Autonomous vehicles with human monitoring
- Automated trading systems with human oversight
- AI-powered customer service with human escalation

## Implementation Strategies

### Organizational Readiness
- **Cultural Transformation**: Foster a culture that embraces AI collaboration
- **Skills Development**: Invest in training programs for human-AI collaboration
- **Change Management**: Implement comprehensive change management strategies
- **Leadership Support**: Ensure strong leadership commitment and support

### Technology Infrastructure
- **Integration Platforms**: Implement systems that seamlessly integrate human and AI workflows
- **User Interfaces**: Design intuitive interfaces that facilitate collaboration
- **Monitoring and Analytics**: Track collaboration performance and outcomes
- **Security and Privacy**: Ensure secure and compliant collaboration environments

### Process Design
- **Workflow Optimization**: Design processes that leverage both human and AI strengths
- **Decision Points**: Clearly define when human intervention is required
- **Feedback Loops**: Implement systems for continuous improvement
- **Performance Metrics**: Establish metrics that measure collaboration effectiveness

## Best Practices for Success

### For Organizations
- Start with pilot projects to test collaboration models
- Invest in comprehensive training and development
- Establish clear governance and ethical guidelines
- Monitor and measure collaboration outcomes

### For Teams
- Embrace AI as a collaborative partner, not a replacement
- Develop skills in AI interaction and interpretation
- Maintain critical thinking and human judgment
- Communicate openly about AI capabilities and limitations

### For Individuals
- Stay informed about AI developments and capabilities
- Develop skills in AI interaction and interpretation
- Maintain focus on uniquely human capabilities
- Embrace continuous learning and adaptation

## Measuring Collaboration Success

### Quantitative Metrics
- Task completion time and accuracy
- Decision quality and outcomes
- Resource utilization and efficiency
- Error rates and correction times

### Qualitative Indicators
- Employee satisfaction and engagement
- Innovation and creativity levels
- Learning and development outcomes
- Trust and confidence in AI systems

## Common Challenges and Solutions

### Resistance to Change
- **Challenge**: Employees may resist AI integration
- **Solution**: Comprehensive change management and training programs

### Trust and Transparency
- **Challenge**: Lack of trust in AI systems
- **Solution**: Transparent communication about AI capabilities and limitations

### Skills and Training
- **Challenge**: Lack of skills for effective AI collaboration
- **Solution**: Investment in training and development programs

### Technology Integration
- **Challenge**: Difficulty integrating AI systems with existing workflows
- **Solution**: Careful planning and phased implementation

## Future Trends

### Advanced Collaboration Models
- More sophisticated AI systems that can understand and respond to human emotions
- Increased automation of routine tasks with human oversight
- Development of AI systems that can learn from human feedback

### Emerging Technologies
- Natural language processing for more intuitive human-AI interaction
- Computer vision for enhanced human-AI collaboration
- Augmented reality for immersive collaboration experiences

## Conclusion

Human-AI collaboration represents the future of work, offering unprecedented opportunities for enhanced performance, innovation, and value creation. Organizations that successfully implement effective collaboration models will gain significant competitive advantages while creating more engaging and fulfilling work environments for their employees.

The key to success lies in understanding that AI is not a replacement for human capabilities but a powerful tool that can augment and enhance human performance. By designing collaboration models that leverage the unique strengths of both humans and AI, organizations can achieve outcomes that neither could accomplish alone.`,
    author_id: null,
    published_at: "2025-01-03T00:00:00Z",
    category_name: "Workplace Innovation",
    featured_image: "/images/blog/human-ai-collab.jpg"
  },
  {
    slug: "ai-transformation-financial-services",
    title: "Industry Spotlight: AI Transformation in Financial Services",
    excerpt: "A deep dive into how financial institutions are leveraging AI for risk management, fraud detection, and customer service.",
    content: `# Industry Spotlight: AI Transformation in Financial Services

The financial services industry is at the forefront of AI transformation, leveraging artificial intelligence to revolutionize everything from customer service to risk management.

## The AI Revolution in Finance

Financial institutions are increasingly turning to AI to address complex challenges, improve operational efficiency, and enhance customer experiences.

### Key Areas of AI Application

**Risk Management**: AI systems can analyze vast amounts of data to identify potential risks and make more accurate predictions.

**Fraud Detection**: Machine learning algorithms can detect fraudulent activities in real-time, protecting both institutions and customers.

**Customer Service**: AI-powered chatbots and virtual assistants provide 24/7 customer support and personalized recommendations.

**Trading and Investment**: AI systems can analyze market data and make trading decisions with speed and accuracy that humans cannot match.

## Risk Management Transformation

### Credit Risk Assessment
AI systems can analyze a borrower's financial history, spending patterns, and other data points to make more accurate credit decisions.

**Benefits:**
- More accurate risk assessment
- Faster loan processing
- Reduced default rates
- Improved customer experience

### Market Risk Analysis
AI can analyze market data, news, and other information to predict market movements and assess portfolio risk.

**Capabilities:**
- Real-time market analysis
- Predictive modeling
- Stress testing
- Scenario analysis

### Operational Risk Management
AI systems can identify potential operational risks and suggest mitigation strategies.

**Applications:**
- Process monitoring
- Compliance checking
- Error detection
- Performance optimization

## Fraud Detection and Prevention

### Real-Time Fraud Detection
AI systems can analyze transactions in real-time to identify suspicious activities.

**Techniques:**
- Pattern recognition
- Anomaly detection
- Behavioral analysis
- Network analysis

### Advanced Analytics
Machine learning algorithms can identify complex fraud patterns that traditional rule-based systems might miss.

**Benefits:**
- Higher detection rates
- Fewer false positives
- Reduced investigation time
- Improved customer experience

## Customer Service Innovation

### AI-Powered Chatbots
Financial institutions are using AI chatbots to provide instant customer support and answer common questions.

**Capabilities:**
- 24/7 availability
- Instant responses
- Personalized recommendations
- Seamless escalation to human agents

### Personalized Financial Advice
AI systems can analyze customer data to provide personalized financial advice and product recommendations.

**Features:**
- Spending analysis
- Investment recommendations
- Budget planning
- Goal setting and tracking

## Trading and Investment

### Algorithmic Trading
AI systems can execute trades based on complex algorithms and market analysis.

**Advantages:**
- Speed and accuracy
- 24/7 market monitoring
- Emotion-free decision making
- Backtesting capabilities

### Portfolio Management
AI can help manage investment portfolios by analyzing market trends and optimizing asset allocation.

**Benefits:**
- Diversification optimization
- Risk management
- Performance monitoring
- Rebalancing recommendations

## Regulatory Compliance

### Automated Compliance Monitoring
AI systems can monitor transactions and activities to ensure compliance with regulations.

**Applications:**
- Anti-money laundering (AML)
- Know Your Customer (KYC)
- Regulatory reporting
- Audit trail maintenance

### Risk Assessment
AI can help assess compliance risks and suggest mitigation strategies.

**Capabilities:**
- Risk scoring
- Trend analysis
- Predictive modeling
- Regulatory change monitoring

## Implementation Challenges

### Data Quality and Integration
Financial institutions often struggle with data quality and integration issues when implementing AI systems.

**Solutions:**
- Data governance frameworks
- Quality assurance processes
- Integration platforms
- Master data management

### Regulatory Compliance
AI systems must comply with various financial regulations and requirements.

**Considerations:**
- Explainability requirements
- Bias and fairness
- Data privacy
- Audit trails

### Change Management
Implementing AI systems requires significant organizational change and employee training.

**Strategies:**
- Comprehensive training programs
- Change management initiatives
- Employee engagement
- Continuous support

## Future Trends

### Advanced AI Capabilities
- More sophisticated natural language processing
- Enhanced computer vision
- Improved predictive analytics
- Better explainability

### Emerging Applications
- Blockchain integration
- Quantum computing
- Edge computing
- 5G connectivity

### Regulatory Evolution
- New AI-specific regulations
- Enhanced privacy requirements
- Increased transparency demands
- International coordination

## Best Practices for Implementation

### Strategic Planning
- Develop a clear AI strategy
- Identify key use cases
- Establish success metrics
- Plan for scalability

### Technology Infrastructure
- Invest in robust data infrastructure
- Implement secure AI platforms
- Ensure system integration
- Plan for maintenance and updates

### Organizational Readiness
- Build AI expertise
- Foster innovation culture
- Implement change management
- Ensure leadership support

### Risk Management
- Establish AI governance
- Implement security measures
- Monitor system performance
- Plan for contingencies

## Conclusion

AI transformation in financial services is not just a trend—it's a fundamental shift that is reshaping the industry. Financial institutions that successfully implement AI solutions will gain significant competitive advantages through improved efficiency, better risk management, and enhanced customer experiences.

The key to success lies in taking a strategic approach to AI implementation, focusing on high-impact use cases, and ensuring that AI systems are designed with security, compliance, and customer needs in mind. As AI technology continues to evolve, financial institutions that embrace this transformation will be well-positioned to thrive in the digital age.`,
    author_id: null,
    published_at: "2025-01-01T00:00:00Z",
    category_name: "Industry Insights",
    featured_image: "/images/blog/financial-services.jpg"
  }
];

async function populateBlogPosts() {
  try {
    console.log('🚀 Starting blog posts population...');

    // First, ensure blog categories exist
    const categories = [
      { name: "AI & Technology", slug: "ai-technology", description: "Articles about artificial intelligence and technology trends" },
      { name: "Technical Insights", slug: "technical-insights", description: "Technical articles and implementation guides" },
      { name: "Business Intelligence", slug: "business-intelligence", description: "Business strategy and intelligence articles" },
      { name: "Security & Compliance", slug: "security-compliance", description: "Security and compliance related content" },
      { name: "Data Strategy", slug: "data-strategy", description: "Data management and strategy articles" },
      { name: "Workplace Innovation", slug: "workplace-innovation", description: "Workplace and innovation topics" },
      { name: "Industry Insights", slug: "industry-insights", description: "Industry-specific insights and analysis" }
    ];

    const categoryMap = {};

    for (const category of categories) {
      const { data: existingCategory, error: fetchError } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('name', category.name)
        .single();

      if (existingCategory) {
        console.log(`📁 Using existing category: ${category.name}`);
        categoryMap[category.name] = existingCategory.id;
      } else {
        console.log(`📁 Creating new category: ${category.name}`);
        const { data: newCategory, error: createError } = await supabase
          .from('blog_categories')
          .insert(category)
          .select()
          .single();
        
        if (createError) throw createError;
        categoryMap[category.name] = newCategory.id;
      }
    }

    // Now create blog posts
    for (const post of blogPosts) {
      const { data: existingPost, error: fetchError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', post.slug)
        .single();

      if (existingPost) {
        console.log(`📝 Updating existing post: ${post.title}`);
        await supabase
          .from('blog_posts')
          .update({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author_id: post.author_id,
            published_at: post.published_at,
            featured_image: post.featured_image,
            category_id: categoryMap[post.category_name],
            updated_at: new Date().toISOString()
          })
          .eq('id', existingPost.id);
      } else {
        console.log(`📝 Creating new post: ${post.title}`);
        await supabase
          .from('blog_posts')
          .insert({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author_id: post.author_id,
            published_at: post.published_at,
            featured_image: post.featured_image,
            category_id: categoryMap[post.category_name],
            is_published: true
          });
      }
    }

    console.log('✅ Blog posts population completed successfully!');
    console.log(`📊 Created/updated ${blogPosts.length} blog posts`);
    console.log(`📁 Created/updated ${categories.length} blog categories`);

  } catch (error) {
    console.error('❌ Error populating blog posts:', error.message);
    process.exit(1);
  }
}

populateBlogPosts();
