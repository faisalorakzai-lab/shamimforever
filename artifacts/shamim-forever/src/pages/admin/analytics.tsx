import { useGetAdminStats } from "@workspace/api-client-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminAnalytics() {
  const { data: stats, isLoading } = useGetAdminStats();

  if (isLoading) {
    return <div className="animate-pulse space-y-8"><div className="h-64 bg-secondary/30 rounded"></div></div>;
  }

  const chartData = stats?.revenueByMonth || [];

  return (
    <div className="space-y-8 max-w-7xl">
      <header>
        <h1 className="text-3xl font-serif text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">Financial performance over time.</p>
      </header>

      <div className="bg-secondary/30 border border-border p-6 h-[400px]">
        <h2 className="text-xl font-serif text-foreground mb-6">Revenue Overview</h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rs ${value}`} />
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "hsl(var(--secondary))", borderColor: "hsl(var(--border))", borderRadius: 0 }}
                itemStyle={{ color: "hsl(var(--primary))" }}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground font-serif">
            Not enough data to display chart.
          </div>
        )}
      </div>
    </div>
  );
}
