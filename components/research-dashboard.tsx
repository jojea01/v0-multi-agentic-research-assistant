"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ResearchForm from "@/components/research-form"
import AgentManager from "@/components/agent-manager"
import ResearchResults from "@/components/research-results"
import type { ResearchTask, Agent } from "@/lib/types"
import { defaultAgents } from "@/lib/default-agents"

export default function ResearchDashboard() {
  const [tasks, setTasks] = useState<ResearchTask[]>([])
  const [agents, setAgents] = useState<Agent[]>(defaultAgents)
  const [activeTask, setActiveTask] = useState<ResearchTask | null>(null)

  const handleCreateTask = (task: ResearchTask) => {
    const newTask = {
      ...task,
      id: `task-${Date.now()}`,
      status: "pending",
      createdAt: new Date(),
      results: [],
    }
    setTasks([...tasks, newTask])
    setActiveTask(newTask)
  }

  const handleAgentUpdate = (updatedAgents: Agent[]) => {
    setAgents(updatedAgents)
  }

  // This will be replaced with actual API calls when you add the LLM integration
  const simulateResearch = async (task: ResearchTask) => {
    // Update task status
    const updatedTasks = tasks.map((t) => (t.id === task.id ? { ...t, status: "in-progress" } : t))
    setTasks(updatedTasks)
    setActiveTask({ ...task, status: "in-progress" })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update with results
    const completedTask = {
      ...task,
      status: "completed",
      results: [
        {
          id: `result-${Date.now()}`,
          agentId: agents[0].id,
          content: `Simulated research results for "${task.query}".\nThis will be replaced with actual LLM-generated content when you integrate your model.`,
          sources: ["Placeholder source"],
          timestamp: new Date(),
        },
      ],
    }

    const finalTasks = tasks.map((t) => (t.id === task.id ? completedTask : t))

    setTasks(finalTasks)
    setActiveTask(completedTask)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Multi-Agent Research Assistant</CardTitle>
          <CardDescription>Collaborate with multiple AI agents to conduct comprehensive research</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="research" className="space-y-4">
        <TabsList>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="research" className="space-y-4">
          <ResearchForm onSubmit={handleCreateTask} onResearch={() => activeTask && simulateResearch(activeTask)} />
          {activeTask && <ResearchResults task={activeTask} />}
        </TabsContent>

        <TabsContent value="agents">
          <AgentManager agents={agents} onUpdate={handleAgentUpdate} />
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Research History</CardTitle>
              <CardDescription>View your past research tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="p-3 border rounded-md cursor-pointer hover:bg-muted"
                    onClick={() => setActiveTask(task)}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{task.query}</span>
                      <span className="text-sm text-muted-foreground">{task.createdAt.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">
                        {task.description.substring(0, 100)}
                        {task.description.length > 100 ? "..." : ""}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          task.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </li>
                ))}
                {tasks.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    No research tasks yet. Create one to get started.
                  </p>
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
