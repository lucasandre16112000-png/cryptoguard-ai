import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Addresses from "./pages/Addresses";
import Alerts from "./pages/Alerts";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./_core/hooks/useAuth";
import { trpc, trpcClient, trpcQueryClient } from "./lib/trpc";
import { QueryClientProvider } from "@tanstack/react-query";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <DashboardLayout>
      <Component {...rest} />
    </DashboardLayout>
  );
};

function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={trpcQueryClient}>
      <QueryClientProvider client={trpcQueryClient}>
        <ErrorBoundary>
          <ThemeProvider defaultTheme="dark">
            <TooltipProvider>
              <Toaster />
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/" component={Dashboard} />
                <PrivateRoute path="/transactions" component={Transactions} />
                <PrivateRoute path="/addresses" component={Addresses} />
                <PrivateRoute path="/alerts" component={Alerts} />
                <PrivateRoute path="/admin" component={Admin} />
                <Route>404: Not Found</Route>
              </Switch>
            </TooltipProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
