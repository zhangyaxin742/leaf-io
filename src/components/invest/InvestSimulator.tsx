import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeBuilder from "./ThemeBuilder";
import PortfolioView from "./PortfolioView";
import RedirectFlow from "./RedirectFlow";
import CompareView from "./CompareView";
import { Button } from "@/components/ui/custom-button";
import { AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";

const InvestSimulator = () => {
  const [showRedirectModal, setShowRedirectModal] = useState(false);

  return (
    <div className="min-h-screen grid-background pt-20 pb-24 md:pt-24 md:pb-8">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Simulation Banner */}
        <Card className="glass-card border-0 border-l-4 border-l-warning">
          <CardContent className="flex items-center gap-3 p-4">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
            <div className="text-sm">
              <span className="font-semibold text-foreground">Simulation only.</span>{" "}
              <span className="text-text-mid">Not investment advice. No real trades.</span>
            </div>
          </CardContent>
        </Card>

        {/* Theme Builder Section */}
        <ThemeBuilder onRedirectClick={() => setShowRedirectModal(true)} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="w-full md:w-fit">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="compare">Compare</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <PortfolioView />
          </TabsContent>

          <TabsContent value="compare" className="space-y-6">
            <CompareView />
          </TabsContent>
        </Tabs>

        {/* Coming Soon Section */}
        <Card className="glass-card border-0 border-l-4 border-l-leaf-mint">
          <CardContent className="flex items-center gap-3 p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-leaf-mint/20">
              <ShieldCheck className="w-6 h-6 text-leaf-mint" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-foreground mb-1">
                Real Investing Portfolios
              </h3>
              <p className="text-sm text-text-mid">
                Coming soon with parental permission for users under 18
              </p>
            </div>
            <Button variant="outline" size="sm" disabled>
              <Sparkles className="w-4 h-4" />
              Notify Me
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Redirect Flow Modal */}
      <RedirectFlow 
        open={showRedirectModal}
        onClose={() => setShowRedirectModal(false)}
      />
    </div>
  );
};

export default InvestSimulator;