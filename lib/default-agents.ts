import type { Agent } from "./types"

export const defaultAgents: Agent[] = [
  {
    id: "agent-researcher",
    name: "Primary Researcher",
    role: "Lead Researcher",
    description: "Conducts primary research and coordinates other agents",
    isActive: true,
    capabilities: ["Web search", "Information synthesis", "Query analysis"],
  },
  {
    id: "agent-fact-checker",
    name: "Fact Checker",
    role: "Verification Specialist",
    description: "Verifies information and cross-references sources",
    isActive: true,
    capabilities: ["Fact verification", "Source validation", "Contradiction detection"],
  },
  {
    id: "agent-summarizer",
    name: "Summarizer",
    role: "Content Summarizer",
    description: "Creates concise summaries of research findings",
    isActive: true,
    capabilities: ["Text summarization", "Key point extraction", "Report generation"],
  },
]
