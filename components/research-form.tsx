"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ResearchTask } from "@/lib/types"

interface ResearchFormProps {
  onSubmit: (task: ResearchTask) => void
  onResearch: () => void
}

export default function ResearchForm({ onSubmit, onResearch }: ResearchFormProps) {
  const [query, setQuery] = useState("")
  const [description, setDescription] = useState("")
  const [depth, setDepth] = useState("medium")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const task: ResearchTask = {
      id: "", // Will be set by the dashboard
      query,
      description,
      depth,
      status: "pending",
      createdAt: new Date(),
      results: [],
    }

    onSubmit(task)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setQuery("")
    setDescription("")
    setDepth("medium")
    setIsSubmitted(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Research Task</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="query" className="text-sm font-medium">
              Research Query
            </label>
            <Input
              id="query"
              placeholder="What would you like to research?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isSubmitted}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Provide additional context or specific aspects you're interested in..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitted}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="depth" className="text-sm font-medium">
              Research Depth
            </label>
            <Select value={depth} onValueChange={setDepth} disabled={isSubmitted}>
              <SelectTrigger>
                <SelectValue placeholder="Select depth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quick">Quick overview</SelectItem>
                <SelectItem value="medium">Standard depth</SelectItem>
                <SelectItem value="deep">Deep analysis</SelectItem>
                <SelectItem value="comprehensive">Comprehensive research</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          {!isSubmitted ? (
            <>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit">Create Task</Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={handleReset}>
                New Task
              </Button>
              <Button type="button" onClick={onResearch}>
                Start Research
              </Button>
            </>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
