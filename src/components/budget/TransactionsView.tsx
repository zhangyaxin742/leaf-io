import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download, Filter, Edit, Trash2, Building, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  notes?: string;
  isSubscription?: boolean;
}

const TransactionsView = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2024-01-15",
      merchant: "Starbucks",
      category: "Wants",
      amount: -5.45,
      notes: "Morning coffee",
    },
    {
      id: "2",
      date: "2024-01-14",
      merchant: "Grocery Store",
      category: "Needs",
      amount: -67.32,
      notes: "Weekly groceries",
    },
    {
      id: "3",
      date: "2024-01-14",
      merchant: "Netflix",
      category: "Wants",
      amount: -15.99,
      notes: "Monthly subscription",
      isSubscription: true,
    },
    {
      id: "4",
      date: "2024-01-13",
      merchant: "Salary Deposit",
      category: "Income",
      amount: 3247.00,
      notes: "Monthly salary",
    },
    {
      id: "5",
      date: "2024-01-12",
      merchant: "Clean Energy ETF",
      category: "Save+Impact",
      amount: -100.00,
      notes: "Investment contribution",
    },
  ]);

  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<Date>();
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const { toast } = useToast();

  const categories = ["Income", "Needs", "Wants", "Save+Impact"];
  
  const subscriptions = [
    { name: "Netflix", amount: 15.99, nextBilling: "2024-02-14", status: "active" },
    { name: "Spotify", amount: 9.99, nextBilling: "2024-02-18", status: "active" },
    { name: "Adobe Creative", amount: 52.99, nextBilling: "2024-02-20", status: "reminded" },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
    const matchesDate = !dateFilter || transaction.date === format(dateFilter, "yyyy-MM-dd");
    return matchesCategory && matchesDate;
  });

  const handleBulkRecategorize = (newCategory: string) => {
    setTransactions(prev =>
      prev.map(transaction =>
        selectedTransactions.includes(transaction.id)
          ? { ...transaction, category: newCategory }
          : transaction
      )
    );
    setSelectedTransactions([]);
    toast({
      title: "Transactions Updated",
      description: `${selectedTransactions.length} transactions recategorized to ${newCategory}`,
    });
  };

  const handleImport = () => {
    setShowImportModal(false);
    toast({
      title: "Import Completed (Mock)",
      description: "12 new transactions imported from bank account",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground">Transactions</h2>
          <p className="text-text-mid">Track and categorize your spending</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Dialog open={showSubscriptions} onOpenChange={setShowSubscriptions}>
            <DialogTrigger asChild>
              <Button variant="glass">
                <CreditCard className="w-4 h-4" />
                Subscriptions
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Subscription Manager</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {subscriptions.map((sub, index) => (
                  <Card key={index} className="glass-card border-0 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{sub.name}</h4>
                        <p className="text-sm text-text-mid">${sub.amount}/month • Next: {sub.nextBilling}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={sub.status === "active" ? "default" : "secondary"}>
                          {sub.status}
                        </Badge>
                        <Button variant="ghost" size="sm">Cancel</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Building className="w-4 h-4" />
                Import from Bank
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Connect Your Bank Account</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-border rounded-lg">
                  <Building className="w-12 h-12 mx-auto text-text-mid mb-4" />
                  <h3 className="font-medium text-foreground mb-2">Secure Bank Connection</h3>
                  <p className="text-sm text-text-mid mb-4">
                    Connect securely with bank-level encryption
                  </p>
                  <Button onClick={handleImport} className="w-full">
                    Connect Bank Account (Mock)
                  </Button>
                </div>
                <div className="text-xs text-text-mid text-center">
                  🔒 Powered by Plaid • Bank-level security • Read-only access
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="glass-card border-0 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-mid" />
            <Label className="text-sm text-text-mid">Filters:</Label>
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-40 justify-start text-left font-normal",
                  !dateFilter && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFilter ? format(dateFilter, "MMM dd") : "Pick date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {(categoryFilter !== "all" || dateFilter) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setCategoryFilter("all");
                setDateFilter(undefined);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedTransactions.length > 0 && (
        <Card className="glass-card border-0 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-mid">
              {selectedTransactions.length} transactions selected
            </span>
            <div className="flex gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant="glass"
                  size="sm"
                  onClick={() => handleBulkRecategorize(category)}
                >
                  Move to {category}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Transactions Table */}
      <Card className="glass-card border-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedTransactions.length === filteredTransactions.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTransactions(filteredTransactions.map(t => t.id));
                    } else {
                      setSelectedTransactions([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTransactions.includes(transaction.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTransactions(prev => [...prev, transaction.id]);
                      } else {
                        setSelectedTransactions(prev => prev.filter(id => id !== transaction.id));
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="text-text-mid">
                  {format(new Date(transaction.date), "MMM dd")}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  <div className="flex items-center gap-2">
                    {transaction.merchant}
                    {transaction.isSubscription && (
                      <Badge variant="secondary" className="text-xs">SUB</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell className={`font-semibold ${
                  transaction.amount > 0 ? 'text-success' : 'text-foreground'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell className="text-text-mid text-sm">
                  {transaction.notes}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default TransactionsView;