export interface ResearchTask {
  id: string
  query: string
  description: string
  depth: "quick" | "medium" | "deep" | "comprehensive"
  status: "pending" | "in-progress" | "completed" | "failed"
  createdAt: Date
  results: ResearchResult[]
}

export interface ResearchResult {
  id: string
  agentId: string
  content: string
  sources: string[]
  timestamp: Date
}

export interface Agent {
  id: string
  name: string
  role: string
  description: string
  isActive: boolean
  capabilities: string[]
}
