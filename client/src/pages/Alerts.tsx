import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

function SeverityBadge({ severity }: { severity: string }) {
  const variants: Record<string, { className: string; label: string }> = {
    low: { className: "bg-blue-500/10 text-blue-500 border-blue-500/20", label: "Low" },
    medium: { className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", label: "Medium" },
    high: { className: "bg-orange-500/10 text-orange-500 border-orange-500/20", label: "High" },
    critical: { className: "bg-red-500/10 text-red-500 border-red-500/20", label: "Critical" },
  };
  
  const variant = variants[severity] || variants.low;
  
  return (
    <Badge variant="outline" className={variant.className}>
      {variant.label}
    </Badge>
  );
}

export default function Alerts() {
  const utils = trpc.useUtils();
  const { data: alerts, isLoading } = trpc.alerts.list.useQuery({ limit: 50 });
  
  const markAsRead = trpc.alerts.markAsRead.useMutation({
    onSuccess: () => {
      utils.alerts.list.invalidate();
      toast.success("Alert marked as read");
    },
  });
  
  const resolveAlert = trpc.alerts.resolve.useMutation({
    onSuccess: () => {
      utils.alerts.list.invalidate();
      toast.success("Alert resolved");
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alerts</h1>
        <p className="text-muted-foreground">Fraud detection alerts and notifications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>
            {alerts?.filter(a => !a.isResolved).length || 0} active alerts requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading alerts...</div>
          ) : alerts && alerts.length > 0 ? (
            <div className="space-y-4">
              {alerts.map((alert) => {
                const riskFactors = alert.riskFactors ? JSON.parse(alert.riskFactors) : [];
                
                return (
                  <div 
                    key={alert.id} 
                    className={`border rounded-lg p-4 space-y-3 ${
                      alert.isResolved ? 'bg-muted/30 opacity-60' : 'bg-card'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                          <h3 className="font-semibold">{alert.title}</h3>
                          <SeverityBadge severity={alert.severity} />
                          {alert.isResolved && (
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Resolved
                            </Badge>
                          )}
                          {!alert.isRead && !alert.isResolved && (
                            <Badge variant="default">New</Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {alert.description}
                        </p>
                        
                        {riskFactors.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {riskFactors.map((factor: string, idx: number) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="text-xs text-muted-foreground">
                          {new Date(alert.createdAt).toLocaleString()}
                          {alert.resolvedAt && (
                            <span> • Resolved {new Date(alert.resolvedAt).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      
                      {!alert.isResolved && (
                        <div className="flex gap-2 ml-4">
                          {!alert.isRead && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead.mutate({ alertId: alert.id })}
                              disabled={markAsRead.isPending}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => resolveAlert.mutate({ alertId: alert.id })}
                            disabled={resolveAlert.isPending}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No alerts found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
