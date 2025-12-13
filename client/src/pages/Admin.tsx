import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, Database } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const { data: users, isLoading: usersLoading } = trpc.admin.users.useQuery();
  const { data: config, isLoading: configLoading } = trpc.admin.config.useQuery();
  
  const seedData = trpc.admin.seedData.useMutation({
    onSuccess: () => {
      toast.success("Seed data generated successfully!");
    },
    onError: () => {
      toast.error("Failed to generate seed data");
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">System administration and configuration</p>
      </div>

      {/* Users Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Users
          </CardTitle>
          <CardDescription>Manage system users and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {usersLoading ? (
            <div className="text-center py-4">Loading users...</div>
          ) : users && users.length > 0 ? (
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                  <div>
                    <div className="font-medium">{user.name || 'Unknown'}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                    <div className="text-xs text-muted-foreground">
                      Last login: {new Date(user.lastSignedIn).toLocaleString()}
                    </div>
                  </div>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">No users found</div>
          )}
        </CardContent>
      </Card>

      {/* System Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuration
          </CardTitle>
          <CardDescription>System settings and thresholds</CardDescription>
        </CardHeader>
        <CardContent>
          {configLoading ? (
            <div className="text-center py-4">Loading configuration...</div>
          ) : config ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Risk Threshold</div>
                  <div className="text-sm text-muted-foreground">
                    Minimum score to trigger alerts
                  </div>
                </div>
                <Badge variant="outline">{config.riskThreshold}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Alert Email</div>
                  <div className="text-sm text-muted-foreground">
                    Email for critical alerts
                  </div>
                </div>
                <Badge variant="outline">{config.alertEmail || 'Not set'}</Badge>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">No configuration found</div>
          )}
        </CardContent>
      </Card>

      {/* Database Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Management
          </CardTitle>
          <CardDescription>Generate test data and manage database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Generate Seed Data</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Create sample transactions for testing and demonstration
              </p>
              <Button 
                onClick={() => seedData.mutate({ count: 50 })}
                disabled={seedData.isPending}
              >
                {seedData.isPending ? 'Generating...' : 'Generate 50 Transactions'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
