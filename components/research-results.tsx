"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ResearchTask } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface ResearchResultsProps {
  task: ResearchTask
}

export default function ResearchResults({ task }: ResearchResultsProps) {
  const [activeTab, setActiveTab] = useState("summary")

  if (task.status === "pending") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Research Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">Start the research to see results</p>
        </CardContent>
      </Card>
    )
  }

  if (task.status === "in-progress") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Research in Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Agents are working on your research query...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Research Results: {task.query}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="details">Detailed Findings</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            {task.results.length > 0 ? (
              <div className="prose max-w-none dark:prose-invert">
                <p>{task.results[0].content}</p>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No summary available</p>
            )}
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {task.results.length > 0 ? (
              <div className="space-y-6">
                {task.results.map((result, index) => (
                  <div key={result.id} className="space-y-2">
                    <h3 className="font-medium">Finding {index + 1}</h3>
                    <div className="prose max-w-none dark:prose-invert">
                      <p>{result.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Agent: {result.agentId} • {result.timestamp.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No detailed findings available</p>
            )}
          </TabsContent>

          <TabsContent value="sources" className="space-y-4">
            {task.results.length > 0 && task.results[0].sources.length > 0 ? (
              <ul className="space-y-2">
                {task.results[0].sources.map((source, index) => (
                  <li key={index} className="p-3 border rounded-md">
                    {source}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground py-4">No sources available</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
