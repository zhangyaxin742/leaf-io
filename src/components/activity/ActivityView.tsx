import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  TrendingUp,
  BookOpen,
  Zap,
  Share2,
  Download,
  Trophy,
  Target,
  DollarSign,
  Leaf,
  Star,
  Activity,
  CheckCircle,
  Gift
} from "lucide-react";

const ActivityView = () => {
  const [selectedMonth, setSelectedMonth] = useState("current");

  // Mock activity data
  const recentActivity = [
    {
      id: 1,
      type: "learn",
      title: "Completed 'Budgeting Basics'",
      description: "Earned Badge: Budget Master",
      timestamp: "2 hours ago",
      icon: BookOpen,
      badge: "Budget Master"
    },
    {
      id: 2,
      type: "redirect",
      title: "Redirected $5 spare change",
      description: "Allocated to Solar & Storage theme",
      timestamp: "Yesterday",
      icon: Zap,
      amount: 5
    },
    {
      id: 3,
      type: "budget",
      title: "Updated budget allocation",
      description: "Adjusted Save+Impact to 25%",
      timestamp: "2 days ago",
      icon: Target,
      change: "+5%"
    },
    {
      id: 4,
      type: "learn",
      title: "Completed 'Green Bonds Explained'",
      description: "Earned Badge: Green Investor",
      timestamp: "3 days ago",
      icon: BookOpen,
      badge: "Green Investor"
    },
    {
      id: 5,
      type: "redirect",
      title: "Redirected $3 spare change",
      description: "Allocated to Community Projects",
      timestamp: "5 days ago",
      icon: Zap,
      amount: 3
    },
    {
      id: 6,
      type: "streak",
      title: "7-day learning streak!",
      description: "Consistent daily progress",
      timestamp: "1 week ago",
      icon: Trophy,
      streak: 7
    }
  ];

  const monthlyReport = {
    current: {
      month: "December 2024",
      summary: "You've made incredible progress this month! Your commitment to learning and simulated impact investing shows real dedication to building a sustainable financial future.",
      metrics: {
        totalActions: 12,
        topTheme: "Solar & Storage",
        redirectedAmount: 23,
        lessonsCompleted: 3,
        badgesEarned: 2,
        streakDays: 7
      },
      highlights: [
        "Completed 3 learning modules",
        "Maintained 7-day learning streak",
        "Simulated $23 in spare change redirects",
        "Top impact theme: Solar & Storage (65%)"
      ]
    }
  };

  const currentReport = monthlyReport[selectedMonth as keyof typeof monthlyReport];

  const handleShareReport = () => {
    // Mock share functionality
    console.log("Sharing monthly impact report...");
  };

  const handleExportPNG = () => {
    // Mock PNG export
    console.log("Exporting PNG share card...");
  };

  const handleExportCSV = () => {
    // Mock CSV export
    console.log("Exporting budget CSV...");
  };

  return (
    <div className="min-h-screen grid-background pt-20 pb-24 md:pt-24 md:pb-8">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
            Activity Feed
          </h1>
          <p className="text-text-mid max-w-2xl mx-auto">
            Track your progress, celebrate achievements, and share your impact
          </p>
        </div>

        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="w-full md:w-fit">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="reports">Monthly Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            {/* Recent Activity Timeline */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-leaf-mint" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors">
                        <div className={`p-2 rounded-lg flex-shrink-0 ${
                          activity.type === "learn" ? "bg-blue-500/20" :
                          activity.type === "redirect" ? "bg-yellow-500/20" :
                          activity.type === "budget" ? "bg-green-500/20" :
                          "bg-purple-500/20"
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            activity.type === "learn" ? "text-blue-400" :
                            activity.type === "redirect" ? "text-yellow-400" :
                            activity.type === "budget" ? "text-green-400" :
                            "text-purple-400"
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-text-mid mt-1">
                            {activity.description}
                          </p>
                          <p className="text-xs text-text-low mt-2">
                            {activity.timestamp}
                          </p>
                        </div>

                        <div className="flex-shrink-0">
                          {activity.badge && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              {activity.badge}
                            </Badge>
                          )}
                          {activity.amount && (
                            <Badge variant="outline" className="text-xs">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {activity.amount}
                            </Badge>
                          )}
                          {activity.change && (
                            <Badge variant="outline" className="text-xs text-success">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {activity.change}
                            </Badge>
                          )}
                          {activity.streak && (
                            <Badge variant="secondary" className="text-xs">
                              <Trophy className="w-3 h-3 mr-1" />
                              {activity.streak} days
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Monthly Impact Report */}
            <Card className="glass-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-leaf-mint" />
                    Monthly Impact Report
                  </CardTitle>
                  <select 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="bg-background border border-border rounded-md px-3 py-1 text-sm"
                  >
                    <option value="current">December 2024</option>
                    <option value="previous">November 2024</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Report Summary */}
                <div className="p-6 rounded-xl bg-leaf-mint/10 border border-leaf-mint/20">
                  <h3 className="font-display font-semibold text-foreground mb-3">
                    {currentReport.month} Summary
                  </h3>
                  <p className="text-sm text-text-mid leading-relaxed">
                    {currentReport.summary}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {currentReport.metrics.totalActions}
                    </div>
                    <div className="text-xs text-text-mid">Total Actions</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-success mb-1">
                      ${currentReport.metrics.redirectedAmount}
                    </div>
                    <div className="text-xs text-text-mid">Spare Change</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {currentReport.metrics.lessonsCompleted}
                    </div>
                    <div className="text-xs text-text-mid">Lessons Done</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-warning mb-1">
                      {currentReport.metrics.badgesEarned}
                    </div>
                    <div className="text-xs text-text-mid">Badges Earned</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      {currentReport.metrics.streakDays}
                    </div>
                    <div className="text-xs text-text-mid">Day Streak</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="text-lg font-bold text-leaf-mint mb-1">
                      {currentReport.metrics.topTheme}
                    </div>
                    <div className="text-xs text-text-mid">Top Theme</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Month Highlights</h4>
                  <div className="space-y-2">
                    {currentReport.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-text-mid">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  <Button 
                    variant="hero" 
                    onClick={handleShareReport}
                    className="flex-1"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Impact
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleExportPNG}
                    className="flex-1"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Export Card
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleExportCSV}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Share Preview */}
            <Card className="glass-card border-0 max-w-sm mx-auto">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="leaf-gradient p-6 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Leaf className="w-6 h-6 text-background" />
                      <span className="font-display font-semibold text-background">leaf.io</span>
                    </div>
                    <div className="text-background">
                      <div className="text-2xl font-bold mb-1">
                        ${currentReport.metrics.redirectedAmount}
                      </div>
                      <div className="text-sm opacity-90">
                        simulated for impact in {currentReport.month}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-text-mid">
                    Preview of your shareable impact card
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ActivityView;