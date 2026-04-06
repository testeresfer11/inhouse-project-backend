import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getToken } from "@/lib/api";
import LoginPage from "@/pages/Login";
import BlogListPage from "@/pages/BlogList";
import BlogEditPage from "@/pages/BlogEdit";
import ContactsPage from "@/pages/Contacts";
import SeoSettingsPage from "@/pages/SeoSettings";
import PagesPage from "@/pages/Pages";
import DashboardPage from "@/pages/Dashboard";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } } });

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  if (!getToken() && location !== "/login") {
    return <Redirect to="/login" />;
  }
  return <>{children}</>;
}

function Router() {
  return (
    <AuthGuard>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={DashboardPage} />
        <Route path="/blog" component={BlogListPage} />
        <Route path="/blog/new" component={() => <BlogEditPage />} />
        <Route path="/blog/:id" component={({ params }) => <BlogEditPage id={Number(params.id)} />} />
        <Route path="/contacts" component={ContactsPage} />
        <Route path="/pages" component={PagesPage} />
        <Route path="/seo" component={SeoSettingsPage} />
        <Route>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold">404 — Page not found</h1>
              <a href="/" className="text-purple-600 mt-4 inline-block">← Back to dashboard</a>
            </div>
          </div>
        </Route>
      </Switch>
    </AuthGuard>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
