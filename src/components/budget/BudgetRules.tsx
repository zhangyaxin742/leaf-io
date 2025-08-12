import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BudgetRule {
  id: string;
  name: string;
  condition: "contains" | "equals" | "startsWith" | "endsWith";
  value: string;
  category: string;
  isActive: boolean;
}

const BudgetRules = () => {
  const [rules, setRules] = useState<BudgetRule[]>([
    {
      id: "1",
      name: "Uber Rides",
      condition: "contains",
      value: "UBER",
      category: "Wants",
      isActive: true,
    },
    {
      id: "2",
      name: "Salary",
      condition: "contains",
      value: "SALARY",
      category: "Income",
      isActive: true,
    },
    {
      id: "3",
      name: "Grocery Stores",
      condition: "contains",
      value: "GROCERY",
      category: "Needs",
      isActive: true,
    },
    {
      id: "4",
      name: "Investment Transfers",
      condition: "startsWith",
      value: "ETF",
      category: "Save+Impact",
      isActive: false,
    },
  ]);

  const [showCreateRule, setShowCreateRule] = useState(false);
  const [newRule, setNewRule] = useState({
    name: "",
    condition: "contains" as const,
    value: "",
    category: "Needs",
  });

  const { toast } = useToast();

  const categories = ["Income", "Needs", "Wants", "Save+Impact"];

  const createRule = () => {
    if (!newRule.name || !newRule.value) return;

    const rule: BudgetRule = {
      id: Date.now().toString(),
      ...newRule,
      isActive: true,
    };

    setRules(prev => [...prev, rule]);
    setNewRule({
      name: "",
      condition: "contains",
      value: "",
      category: "Needs",
    });
    setShowCreateRule(false);

    toast({
      title: "Rule Created",
      description: `New rule "${rule.name}" will automatically categorize transactions`,
    });
  };

  const toggleRule = (id: string) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
    toast({
      title: "Rule Deleted",
      description: "Categorization rule has been removed",
    });
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case "contains": return "contains";
      case "equals": return "equals";
      case "startsWith": return "starts with";
      case "endsWith": return "ends with";
      default: return condition;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground">Budget Rules</h2>
          <p className="text-text-mid">Automatically categorize transactions with custom rules</p>
        </div>
        
        <Dialog open={showCreateRule} onOpenChange={setShowCreateRule}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4" />
              Create Rule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Categorization Rule</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="rule-name">Rule Name</Label>
                <Input
                  id="rule-name"
                  placeholder="e.g., Uber Rides"
                  value={newRule.name}
                  onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="condition">If merchant name</Label>
                  <Select
                    value={newRule.condition}
                    onValueChange={(value: any) => setNewRule(prev => ({ ...prev, condition: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contains">contains</SelectItem>
                      <SelectItem value="equals">equals</SelectItem>
                      <SelectItem value="startsWith">starts with</SelectItem>
                      <SelectItem value="endsWith">ends with</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rule-value">Value</Label>
                  <Input
                    id="rule-value"
                    placeholder="e.g., UBER"
                    value={newRule.value}
                    onChange={(e) => setNewRule(prev => ({ ...prev, value: e.target.value.toUpperCase() }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Then categorize as</Label>
                <Select
                  value={newRule.category}
                  onValueChange={(value) => setNewRule(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="glass" className="flex-1" onClick={() => setShowCreateRule(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={createRule}>
                  Create Rule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id} className="glass-card border-0 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-foreground">{rule.name}</h3>
                  <Badge 
                    variant={rule.isActive ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {rule.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                
                <div className="text-sm text-text-mid">
                  If merchant name <span className="font-medium text-foreground">{getConditionText(rule.condition)}</span> "
                  <span className="font-medium text-leaf-mint">{rule.value}</span>
                  " then categorize as <span className="font-medium text-foreground">{rule.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleRule(rule.id)}
                  className="text-xs"
                >
                  {rule.isActive ? "Disable" : "Enable"}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-error hover:text-error"
                  onClick={() => deleteRule(rule.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Rule Examples */}
      <Card className="glass-card border-0 p-6 bg-muted/20">
        <div className="flex items-start gap-3">
          <Settings className="w-5 h-5 text-leaf-mint mt-1" />
          <div>
            <h3 className="font-medium text-foreground mb-2">Rule Examples</h3>
            <div className="space-y-1 text-sm text-text-mid">
              <p>• Merchant contains "STARBUCKS" → Categorize as Wants</p>
              <p>• Merchant starts with "PAYCHECK" → Categorize as Income</p>
              <p>• Merchant equals "RENT PAYMENT" → Categorize as Needs</p>
              <p>• Merchant ends with "INVESTMENT" → Categorize as Save+Impact</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BudgetRules;