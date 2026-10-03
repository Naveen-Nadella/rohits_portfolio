import type { Certification } from '../types/portfolio';

export const certificationsData: Certification[] = [
  {
    id: "azure-az900",
    title: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    year: "2024",
    sealCode: "AZ",
    skills: ["Cloud Computing", "Azure Core Services", "Security & Governance", "Cloud Architecture", "Resource Management"],
    description: "Official Microsoft certification validating foundational understanding of cloud concepts, Azure core architectures, privacy, security, and workload management.",
    credentialUrl: "https://learn.microsoft.com"
  }
];
