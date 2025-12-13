import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

function RiskBadge({ score }: { score: number }) {
  let className = "risk-low";
  let label = "Low";
  
  if (score >= 80) {
    className = "risk-critical";
    label = "Critical";
  } else if (score >= 60) {
    className = "risk-high";
    label = "High";
  } else if (score >= 40) {
    className = "risk-medium";
    label = "Medium";
  }
  
  return (
    <Badge variant="outline" className={className}>
      {score} - {label}
    </Badge>
  );
}

export default function Transactions() {
  const [network, setNetwork] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  
  const { data: transactions, isLoading } = trpc.transactions.list.useQuery({
    limit: 100,
    network: network === "all" ? undefined : network as any,
    isSuspicious: riskFilter === "suspicious" ? true : undefined,
    minRiskScore: riskFilter === "high" ? 60 : undefined,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">Monitor and analyze blockchain transactions</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Network</label>
              <Select value={network} onValueChange={setNetwork}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Networks</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="bsc">BSC</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Risk Level</label>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="suspicious">Suspicious Only</SelectItem>
                  <SelectItem value="high">High Risk Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {transactions?.length || 0} transactions found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading transactions...</div>
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((tx) => {
                const riskFactors = tx.riskFactors ? JSON.parse(tx.riskFactors) : [];
                
                return (
                  <div key={tx.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                            {tx.txHash.substring(0, 16)}...{tx.txHash.substring(tx.txHash.length - 8)}
                          </code>
                          <Badge variant="secondary">{tx.network}</Badge>
                          {tx.isSuspicious && (
                            <Badge variant="destructive">Suspicious</Badge>
                          )}
                        </div>
                        
                        <div className="text-sm space-y-1">
                          <div className="text-muted-foreground">
                            <span className="font-medium">From:</span> {tx.fromAddress}
                          </div>
                          <div className="text-muted-foreground">
                            <span className="font-medium">To:</span> {tx.toAddress}
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Block #{tx.blockNumber} • {new Date(tx.timestamp).toLocaleString()}
                        </div>
                        
                        {riskFactors.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {riskFactors.map((factor: string, idx: number) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right space-y-2 ml-4">
                        <RiskBadge score={tx.riskScore} />
                        <div className="text-sm font-medium">
                          {(parseFloat(tx.value) / 1e18).toFixed(4)} ETH
                        </div>
                        {tx.mlPrediction && (
                          <div className="text-xs text-muted-foreground">
                            ML: {tx.mlPrediction} ({tx.mlConfidence}%)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No transactions found with current filters
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
