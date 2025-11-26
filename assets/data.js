window.siteData = {
  yaml: [
    "apiVersion: v1",
    "kind: SoftwareEngineer",
    "metadata:",
    "  name: Abu Kalam Babuji",
    "  learning: Always",
    "spec:",
    "  domains: [Backend, Cloud, DevOps, AI]",
    "  stack:",
    "    - Spring Boot",
    "    - Python (Automation & Scripting)",
    "    - Docker",
    "    - Kubernetes",
    "    - Helm",
    "    - Terraform",
    "    - AWS | GCP | Azure",
    "  focus: automation, uptime, user feedback",
    "  contact: abukalam2909@gmail.com"
  ].join("\n"),
  badges: ["Spring Boot", "Docker", "Kubernetes", "Helm", "Terraform", "AWS SAA", "CI/CD", "Robot Framework"],
  projects: [
    {
      title: "YouTube Analytics Studio",
      stack: "Serverless RAG · Bedrock · Comprehend",
      media: "assets/Images/Projects/YouTubeAnalyticsStudio.png",
      summary: "GenAI pipeline for YouTube content with sentiment-aware retrieval and LLM insights.",
      bullets: [
        "Multi-Lambda orchestration with DynamoDB/S3; combined Comprehend scoring with Claude 3 prompts.",
        "Resilient reporting tuned for bot/spam noise; IaC and CI for reproducible deploys."
      ],
      links: [
        { label: "View GitHub", href: "https://github.com/abukalam2909/Youtube_insight_engine" }
      ]
    },
    {
      title: "NutriLens",
      stack: "EKS · Terraform · Spring Boot",
      media: "assets/Images/Projects/NutriLens.jpg",
      summary: "Cloud-native microservices serving nutrition analysis for 3.8M+ products with sub-second latency.",
      bullets: [
        "Provisioned Amazon EKS with Terraform; automated deploys via GitHub Actions and blue/green rollouts.",
        "Optimized container images with multi-stage builds; NGINX ingress and S3/DynamoDB data layers."
      ],
      links: [
        { label: "View GitHub", href: "https://github.com/abukalam2909/ProductScanner" }
      ]
    },
    {
      title: "E-commerce Inventory App",
      stack: "GKE · Terraform · CI/CD",
      media: "assets/Images/Projects/E-commerceInventoryApp.png",
      summary: "Spring Boot services on GKE with lean Docker images and modular IaC.",
      bullets: [
        "Cut image sizes by ~80% to improve cold starts and rollout speeds across environments.",
        "Cloud Build pipelines with Terraform for multi-env provisioning and gated releases."
      ],
      links: [
        { label: "View GitHub", href: "https://github.com/abukalam2909/K8s_microservices" }
      ]
    },
    {
      title: "TaskTap",
      stack: "Serverless · RBAC · GuardDuty",
      media: "assets/Images/Projects/TaskTap.png",
      summary: "Household task platform with JWT-based RBAC and observability baked in.",
      bullets: [
        "AWS Lambda + API Gateway authorizers with DynamoDB for scheduling logic.",
        "Terraform-managed stack with GuardDuty and CloudWatch alerts for anomaly tracking."
      ],
      links: [
        { label: "View GitHub", href: "https://github.com/abukalam2909/TaskTap" }
      ]
    }
  ],
  experience: [
    {
      date: "Sept 2025 – Dec 2025",
      role: "Machine Learning Intern",
      company: "Deepsense",
      location: "Halifax, Canada",
      bullets: [
        "Built an autoencoder anomaly detection pipeline for marine engine telemetry; normalized multi-sensor time-series data.",
        "Containerized models and prepared edge-ready deployment patterns with Kubernetes-based MLOps workflows."
      ]
    },
    {
      date: "Jan 2023 – Jul 2024",
      role: "Software Engineer",
      company: "Ericsson R&D",
      location: "Chennai, India",
      bullets: [
        "Developed RESTful cloud-native microservices for monitoring/logging tools used by 3+ global teams.",
        "Authored a Python CLI to diff Helmfile versions across releases, streamlining deployment verification.",
        "Optimized Helm/Kubernetes pipelines, cutting production downtime by 30% and automating 150+ tests."
      ]
    },
    {
      date: "Sept 2024 – Dec 2024",
      role: "Teaching Assistant",
      company: "VIT University",
      location: "Chennai, India",
      bullets: [
        "Guided 100+ students through OOP/problem-solving labs and grading.",
        "Created Python grading scripts that reduced evaluation time by 30%."
      ]
    }
  ],
  skills: [
    { title: "Cloud & DevOps", items: ["AWS", "Azure", "GCP", "Terraform", "Docker", "Kubernetes", "Helm", "Jenkins", "GitHub Actions", "Prometheus", "Grafana"] },
    { title: "Backend", items: ["Java", "Spring Boot", "Python", "Flask", "REST", "OpenSearch"] },
    { title: "Data & ML", items: ["SQL", "Python", "R", "Amazon Bedrock"] },
    { title: "Quality & Process", items: ["Robot Framework", "JUnit", "Postman", "Agile/Scrum", "CI/CD pipelines"] }
  ],
  certifications: [
    { name: "CKAD", url: "https://www.credly.com/badges/f65ddab3-3f11-4373-8aaa-4697af23f93a/public_url", badge: "./assets/Images/Certifications/CKAD.png" },
    { name: "AWS Certified Solutions Architect – Associate (SAA-C03)", url: "https://www.credly.com/badges/b1038e0b-2887-4e7a-8a9d-3d11d2ba27c2/public_url", badge: "assets/Images/Certifications/SolutionsArchitect.png" },
    { name: "AWS Certified AI Practitioner", url: "https://www.credly.com/badges/db246e12-fe8d-493e-917f-5c0bd8902169/public_url", badge: "assets/Images/Certifications/AIPractitioner.png" },
    { name: "AWS Certified Cloud Practitioner", url: "https://www.credly.com/badges/bc0df4d0-6a22-4228-80c2-c813d4756c27/public_url", badge: "assets/Images/Certifications/CloudPractitioner.png" },
    { name: "Microsoft Azure Fundamentals (AZ-900)", url: "https://www.credly.com/badges/b79bc1cf-362c-4840-8394-745cbb6fe274/public_url", badge: "assets/Images/Certifications/AZ900.png" }
  ]
};
