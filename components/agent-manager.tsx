"use client"

import { useState } from "react"
import { PlusCircle, Trash2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { Agent } from "@/lib/types"

interface AgentManagerProps {
  agents: Agent[]
  onUpdate: (agents: Agent[]) => void
}

export default function AgentManager({ agents, onUpdate }: AgentManagerProps) {
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newAgent, setNewAgent] = useState<Omit<Agent, "id">>({
    name: "",
    role: "",
    description: "",
    isActive: true,
    capabilities: [],
  })

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent)
    setIsCreating(false)
  }

  const handleUpdateAgent = () => {
    if (editingAgent) {
      const updatedAgents = agents.map((a) => (a.id === editingAgent.id ? editingAgent : a))
      onUpdate(updatedAgents)
      setEditingAgent(null)
    }
  }

  const handleToggleAgent = (agentId: string, isActive: boolean) => {
    const updatedAgents = agents.map((a) => (a.id === agentId ? { ...a, isActive } : a))
    onUpdate(updatedAgents)
  }

  const handleDeleteAgent = (agentId: string) => {
    const updatedAgents = agents.filter((a) => a.id !== agentId)
    onUpdate(updatedAgents)
    if (editingAgent?.id === agentId) {
      setEditingAgent(null)
    }
  }

  const handleCreateAgent = () => {
    const agent: Agent = {
      ...newAgent,
      id: `agent-${Date.now()}`,
    }
    onUpdate([...agents, agent])
    setNewAgent({
      name: "",
      role: "",
      description: "",
      isActive: true,
      capabilities: [],
    })
    setIsCreating(false)
  }

  const handleAddCapability = (agent: Agent, capability: string) => {
    if (capability.trim() === "") return

    if (agent === editingAgent) {
      setEditingAgent({
        ...agent,
        capabilities: [...agent.capabilities, capability.trim()],
      })
    } else {
      setNewAgent({
        ...newAgent,
        capabilities: [...newAgent.capabilities, capability.trim()],
      })
    }
  }

  const handleRemoveCapability = (agent: Agent, index: number) => {
    if (agent === editingAgent) {
      setEditingAgent({
        ...agent,
        capabilities: agent.capabilities.filter((_, i) => i !== index),
      })
    } else {
      setNewAgent({
        ...newAgent,
        capabilities: newAgent.capabilities.filter((_, i) => i !== index),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Research Agents</h2>
        <Button
          onClick={() => {
            setIsCreating(true)
            setEditingAgent(null)
          }}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-4">
          {agents.map((agent) => (
            <Card
              key={agent.id}
              className={`cursor-pointer transition-all ${editingAgent?.id === agent.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleEditAgent(agent)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{agent.name}</h3>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={agent.isActive}
                      onCheckedChange={(checked) => handleToggleAgent(agent.id, checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteAgent(agent.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{agent.role}</p>
                <p className="text-xs mt-2 line-clamp-2">{agent.description}</p>
              </CardContent>
            </Card>
          ))}

          {agents.length === 0 && !isCreating && (
            <Card className="border-dashed cursor-pointer" onClick={() => setIsCreating(true)}>
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Add your first research agent</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-2">
          {(editingAgent || isCreating) && (
            <Card>
              <CardHeader>
                <CardTitle>{isCreating ? "Create New Agent" : "Edit Agent"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Agent Name
                  </label>
                  <Input
                    id="name"
                    value={isCreating ? newAgent.name : editingAgent?.name || ""}
                    onChange={(e) =>
                      isCreating
                        ? setNewAgent({ ...newAgent, name: e.target.value })
                        : setEditingAgent({ ...editingAgent!, name: e.target.value })
                    }
                    placeholder="e.g., Research Specialist"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <Input
                    id="role"
                    value={isCreating ? newAgent.role : editingAgent?.role || ""}
                    onChange={(e) =>
                      isCreating
                        ? setNewAgent({ ...newAgent, role: e.target.value })
                        : setEditingAgent({ ...editingAgent!, role: e.target.value })
                    }
                    placeholder="e.g., Primary Researcher"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={isCreating ? newAgent.description : editingAgent?.description || ""}
                    onChange={(e) =>
                      isCreating
                        ? setNewAgent({ ...newAgent, description: e.target.value })
                        : setEditingAgent({ ...editingAgent!, description: e.target.value })
                    }
                    placeholder="Describe what this agent does..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Capabilities</label>
                  <div className="flex gap-2">
                    <Input
                      id="capability"
                      placeholder="Add a capability"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          const target = e.target as HTMLInputElement
                          isCreating
                            ? handleAddCapability({ ...newAgent, id: "" } as Agent, target.value)
                            : handleAddCapability(editingAgent!, target.value)
                          target.value = ""
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        const input = document.getElementById("capability") as HTMLInputElement
                        isCreating
                          ? handleAddCapability({ ...newAgent, id: "" } as Agent, input.value)
                          : handleAddCapability(editingAgent!, input.value)
                        input.value = ""
                      }}
                    >
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {(isCreating ? newAgent.capabilities : editingAgent?.capabilities || []).map((cap, index) => (
                      <div key={index} className="bg-muted px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <span>{cap}</span>
                        <button
                          type="button"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() =>
                            isCreating
                              ? handleRemoveCapability({ ...newAgent, id: "" } as Agent, index)
                              : handleRemoveCapability(editingAgent!, index)
                          }
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingAgent(null)
                      setIsCreating(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={isCreating ? handleCreateAgent : handleUpdateAgent}
                    className="flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" />
                    {isCreating ? "Create Agent" : "Update Agent"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!editingAgent && !isCreating && (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select an agent to edit or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
