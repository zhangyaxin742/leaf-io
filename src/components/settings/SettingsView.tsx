import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User,
  Shield,
  Bell,
  Settings as SettingsIcon,
  Download,
  RotateCcw,
  FileText,
  Eye,
  EyeOff,
  Smartphone,
  DollarSign,
  Moon,
  Sun,
  Target,
  Grid3x3,
  Accessibility,
  AlertTriangle
} from "lucide-react";

const SettingsView = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    goalReached: true,
    overspendAlert: true,
    learnStreak: true
  });

  const handleExportData = () => {
    console.log("Exporting user data...");
  };

  const handleResetData = () => {
    console.log("Resetting user data...");
  };

  return (
    <div className="min-h-screen grid-background pt-20 pb-24 md:pt-24 md:pb-8">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
            Settings
          </h1>
          <p className="text-text-mid max-w-2xl mx-auto">
            Manage your account, preferences, and privacy settings
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-leaf-mint" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Photo */}
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 leaf-gradient rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-background" />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                      <p className="text-sm text-text-mid">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Alex Johnson" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="alex@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="cad">CAD (C$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                          <span className="text-sm">{darkMode ? "Dark" : "Light"} Mode</span>
                        </div>
                        <Switch 
                          checked={darkMode} 
                          onCheckedChange={setDarkMode}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="hero">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-leaf-mint" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Change Password */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                    </div>
                    <Button variant="outline">
                      Update Password
                    </Button>
                  </div>

                  <Separator />

                  {/* Two-Factor Authentication */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
                        <p className="text-sm text-text-mid">
                          Add extra security to your account with 2FA
                        </p>
                      </div>
                      <Switch 
                        checked={twoFAEnabled} 
                        onCheckedChange={setTwoFAEnabled}
                      />
                    </div>
                    
                    {twoFAEnabled && (
                      <div className="p-4 rounded-lg bg-muted/30 space-y-3">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-success" />
                          <span className="text-sm font-medium text-foreground">SMS Authentication</span>
                          <Badge variant="secondary" className="text-xs">Active</Badge>
                        </div>
                        <p className="text-sm text-text-mid">
                          Verification codes will be sent to your phone: •••• •••• ••34
                        </p>
                        <Button variant="outline" size="sm">
                          Update Phone Number
                        </Button>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Session Management */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium text-foreground">Current Session</p>
                          <p className="text-sm text-text-mid">Chrome on MacOS • New York, NY</p>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium text-foreground">Mobile App</p>
                          <p className="text-sm text-text-mid">iOS App • 2 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-leaf-mint" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    {/* Goal Notifications */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">Goal Reached</h3>
                        <p className="text-sm text-text-mid">
                          Get notified when you achieve your financial goals
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.goalReached} 
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, goalReached: checked }))
                        }
                      />
                    </div>

                    <Separator />

                    {/* Overspend Alerts */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">Overspend Alerts</h3>
                        <p className="text-sm text-text-mid">
                          Receive warnings when you exceed budget categories
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.overspendAlert} 
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, overspendAlert: checked }))
                        }
                      />
                    </div>

                    <Separator />

                    {/* Learning Streak */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">Learn Streak Nudges</h3>
                        <p className="text-sm text-text-mid">
                          Gentle reminders to maintain your learning streak
                        </p>
                      </div>
                      <Switch 
                        checked={notifications.learnStreak} 
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, learnStreak: checked }))
                        }
                      />
                    </div>

                    <Separator />

                    {/* Delivery Settings */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Delivery Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Email Notifications</Label>
                          <Select defaultValue="important">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All notifications</SelectItem>
                              <SelectItem value="important">Important only</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Push Notifications</Label>
                          <Select defaultValue="enabled">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="enabled">Enabled</SelectItem>
                              <SelectItem value="disabled">Disabled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5 text-leaf-mint" />
                    App Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Default Budget Split */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Default Budget Split</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Income</Label>
                        <div className="flex items-center gap-2">
                          <Input defaultValue="100" className="text-center" />
                          <span className="text-sm text-text-mid">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Needs</Label>
                        <div className="flex items-center gap-2">
                          <Input defaultValue="50" className="text-center" />
                          <span className="text-sm text-text-mid">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Wants</Label>
                        <div className="flex items-center gap-2">
                          <Input defaultValue="30" className="text-center" />
                          <span className="text-sm text-text-mid">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Save+Impact</Label>
                        <div className="flex items-center gap-2">
                          <Input defaultValue="20" className="text-center" />
                          <span className="text-sm text-text-mid">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Display Preferences */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Display & Accessibility</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Grid3x3 className="w-4 h-4" />
                          <span className="font-medium text-foreground">Show Grid Background</span>
                        </div>
                        <p className="text-sm text-text-mid">
                          Display decorative grid pattern in the background
                        </p>
                      </div>
                      <Switch 
                        checked={showGrid} 
                        onCheckedChange={setShowGrid}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Accessibility className="w-4 h-4" />
                          <span className="font-medium text-foreground">Reduce Motion</span>
                        </div>
                        <p className="text-sm text-text-mid">
                          Minimize animations and transitions for better accessibility
                        </p>
                      </div>
                      <Switch 
                        checked={reduceMotion} 
                        onCheckedChange={setReduceMotion}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Data Management */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        onClick={handleExportData}
                        className="justify-start"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Data (CSV)
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={handleResetData}
                        className="justify-start text-destructive hover:text-destructive"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset All Data
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Legal Links */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Legal & Support</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="glass" className="justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Terms of Service
                      </Button>
                      
                      <Button variant="glass" className="justify-start">
                        <Eye className="w-4 h-4 mr-2" />
                        Privacy Policy
                      </Button>
                      
                      <Button variant="glass" className="justify-start">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Disclaimers
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Budget Rules Reference */}
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-leaf-mint" />
                    Active Budget Rules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">Auto-categorize Uber</p>
                        <p className="text-sm text-text-mid">Merchant contains "UBER" → Wants</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">Grocery categorization</p>
                        <p className="text-sm text-text-mid">Merchant contains "WHOLE FOODS" → Needs</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Manage All Rules
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;