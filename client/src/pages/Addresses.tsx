import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, XCircle } from "lucide-react";

function RiskBadge({ score }: { score: number }) {
  let className = "risk-low";
  let label = "Low Risk";
  
  if (score >= 80) {
    className = "risk-critical";
    label = "Critical";
  } else if (score >= 60) {
    className = "risk-high";
    label = "High Risk";
  } else if (score >= 40) {
    className = "risk-medium";
    label = "Medium";
  }
  
  return (
    <Badge variant="outline" className={className}>
      {score}/100 - {label}
    </Badge>
  );
}

export default function Addresses() {
  const { data: addresses, isLoading } = trpc.addresses.list.useQuery({ limit: 100 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Addresses</h1>
        <p className="text-muted-foreground">Monitored blockchain addresses and risk scores</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Address Risk Analysis</CardTitle>
          <CardDescription>
            {addresses?.length || 0} addresses monitored
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading addresses...</div>
          ) : addresses && addresses.length > 0 ? (
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                          {addr.address}
                        </code>
                        <Badge variant="secondary">{addr.network}</Badge>
                        {addr.isWhitelisted && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Whitelisted
                          </Badge>
                        )}
                        {addr.isBlacklisted && (
                          <Badge variant="outline" className="bg-red-500/10 text-red-500">
                            <XCircle className="h-3 w-3 mr-1" />
                            Blacklisted
                          </Badge>
                        )}
                      </div>
                      
                      {addr.label && (
                        <div className="text-sm text-muted-foreground">
                          Label: {addr.label}
                        </div>
                      )}
                      
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>Total Txs: {addr.totalTransactions}</span>
                        <span>Suspicious: {addr.suspiciousTransactions}</span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        First seen: {new Date(addr.firstSeen).toLocaleString()} • 
                        Last seen: {new Date(addr.lastSeen).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2 ml-4">
                      <RiskBadge score={addr.riskScore} />
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        Risk Score
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No addresses found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
