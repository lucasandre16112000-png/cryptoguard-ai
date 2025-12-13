import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertTriangle, Shield, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function StatCard({ title, value, description, icon: Icon, trend }: {
  title: string;
  value: string | number;
  description: string;
  icon: any;
  trend?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">{trend}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

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

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = trpc.dashboard.stats.useQuery();
  const { data: recentActivity, isLoading: activityLoading } = trpc.dashboard.recentActivity.useQuery({ limit: 10 });

  if (statsLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Real-time blockchain fraud detection overview</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Real-time blockchain fraud detection overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Transactions"
          value={stats?.total.total.toLocaleString() || 0}
          description="All time monitored"
          icon={Activity}
          trend="+12% from last week"
        />
        
        <StatCard
          title="Suspicious Activity"
          value={stats?.total.suspicious || 0}
          description={`${((stats?.total.suspicious || 0) / (stats?.total.total || 1) * 100).toFixed(1)}% of total`}
          icon={AlertTriangle}
          trend={`Last 24h: ${stats?.last24h.suspicious || 0}`}
        />
        
        <StatCard
          title="Average Risk Score"
          value={Math.round(stats?.total.avgRiskScore || 0)}
          description="Across all transactions"
          icon={Shield}
        />
        
        <StatCard
          title="Active Alerts"
          value={stats?.unreadAlerts || 0}
          description="Requiring attention"
          icon={TrendingUp}
          trend={`Last 7d: ${stats?.last7d.suspicious || 0}`}
        />
      </div>

      {/* Recent Suspicious Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Suspicious Transactions</CardTitle>
          <CardDescription>Latest high-risk transactions detected by ML engine</CardDescription>
        </CardHeader>
        <CardContent>
          {activityLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          ) : recentActivity && recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {tx.txHash.substring(0, 10)}...{tx.txHash.substring(tx.txHash.length - 8)}
                      </code>
                      <Badge variant="secondary">{tx.network}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      From: {tx.fromAddress.substring(0, 10)}... {'->'} To: {tx.toAddress.substring(0, 10)}...
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(tx.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <RiskBadge score={tx.riskScore} />
                    <div className="text-sm font-medium">
                      {(parseFloat(tx.value) / 1e18).toFixed(4)} {' ETH'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No suspicious transactions detected yet
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
