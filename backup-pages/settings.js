import { memo, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Form from '../components/forms/Form';
import { TabNavigation } from '../components/navigation';

const NotificationSettings = memo(function NotificationSettings({ settings, onChange }) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>🔔 Notification Preferences</Card.Title>
      </Card.Header>
      <Card.Content className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Email Notifications</h4>
            <p className="text-sm text-gray-500">Receive notifications via email</p>
          </div>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => onChange({ ...settings, emailNotifications: e.target.checked })}
            className="rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Push Notifications</h4>
            <p className="text-sm text-gray-500">Receive browser push notifications</p>
          </div>
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) => onChange({ ...settings, pushNotifications: e.target.checked })}
            className="rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Service Alerts</h4>
            <p className="text-sm text-gray-500">Get alerts when services go down</p>
          </div>
          <input
            type="checkbox"
            checked={settings.serviceAlerts}
            onChange={(e) => onChange({ ...settings, serviceAlerts: e.target.checked })}
            className="rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Marketing Updates</h4>
            <p className="text-sm text-gray-500">Receive product updates and promotions</p>
          </div>
          <input
            type="checkbox"
            checked={settings.marketingUpdates}
            onChange={(e) => onChange({ ...settings, marketingUpdates: e.target.checked })}
            className="rounded"
          />
        </div>
      </Card.Content>
    </Card>
  );
});

const SecuritySettings = memo(function SecuritySettings({ settings, onChange }) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>🔒 Security Settings</Card.Title>
      </Card.Header>
      <Card.Content className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500">Add an extra layer of security</p>
          </div>
          <Button variant={settings.twoFactorEnabled ? 'danger' : 'primary'} size="sm">
            {settings.twoFactorEnabled ? 'Disable' : 'Enable'}
          </Button>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Change Password</h4>
          <Form className="space-y-3">
            <Form.Group>
              <Form.Label htmlFor="currentPassword">Current Password</Form.Label>
              <Form.Input id="currentPassword" type="password" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="newPassword">New Password</Form.Label>
              <Form.Input id="newPassword" type="password" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="confirmPassword">Confirm New Password</Form.Label>
              <Form.Input id="confirmPassword" type="password" />
            </Form.Group>
            <Button size="sm">Update Password</Button>
          </Form>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Active Sessions</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div>
                <p className="text-sm font-medium">Current Session</p>
                <p className="text-xs text-gray-500">Chrome on MacOS • 192.168.1.100</p>
              </div>
              <span className="text-xs text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div>
                <p className="text-sm font-medium">Mobile App</p>
                <p className="text-xs text-gray-500">iOS App • Last seen 2 hours ago</p>
              </div>
              <Button variant="outline" size="sm">Revoke</Button>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
});

const AppearanceSettings = memo(function AppearanceSettings({ settings, onChange }) {
  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' }
  ];
  
  return (
    <Card>
      <Card.Header>
        <Card.Title>🎨 Appearance</Card.Title>
      </Card.Header>
      <Card.Content className="space-y-4">
        <Form.Group>
          <Form.Label htmlFor="theme">Theme</Form.Label>
          <Form.Select
            id="theme"
            value={settings.theme}
            onChange={(e) => onChange({ ...settings, theme: e.target.value })}
            options={themes}
          />
        </Form.Group>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Reduce Motion</h4>
            <p className="text-sm text-gray-500">Minimize animations for better performance</p>
          </div>
          <input
            type="checkbox"
            checked={settings.reduceMotion}
            onChange={(e) => onChange({ ...settings, reduceMotion: e.target.checked })}
            className="rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Compact Mode</h4>
            <p className="text-sm text-gray-500">Show more content in less space</p>
          </div>
          <input
            type="checkbox"
            checked={settings.compactMode}
            onChange={(e) => onChange({ ...settings, compactMode: e.target.checked })}
            className="rounded"
          />
        </div>
      </Card.Content>
    </Card>
  );
});

const APISettings = memo(function APISettings() {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production API', key: 'ak_prod_****', created: '2024-01-15', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development API', key: 'ak_dev_****', created: '2024-01-10', lastUsed: '1 day ago' }
  ]);
  
  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title>🔑 API Keys</Card.Title>
          <Button size="sm">Generate New Key</Button>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-3">
          {apiKeys.map((key) => (
            <div key={key.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{key.name}</h4>
                <p className="text-sm text-gray-500">Key: {key.key}</p>
                <p className="text-xs text-gray-400">Created: {key.created} • Last used: {key.lastUsed}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Copy</Button>
                <Button variant="danger" size="sm">Revoke</Button>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
});

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    serviceAlerts: true,
    marketingUpdates: false,
    
    // Security settings
    twoFactorEnabled: false,
    
    // Appearance settings
    theme: 'light',
    reduceMotion: false,
    compactMode: false,
  });
  
  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'api', label: 'API', icon: '🔑' }
  ];
  
  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Here you would typically make an API call to save settings
  };
  
  return (
    <Layout title="Settings - Aranya One">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🔧 Settings</h1>
            <p className="text-gray-600">Manage your empire preferences and configuration</p>
          </div>
          
          <Button onClick={handleSaveSettings}>
            💾 Save Changes
          </Button>
        </div>
        
        {/* Tab Navigation */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'general' && (
            <Card>
              <Card.Header>
                <Card.Title>⚙️ General Settings</Card.Title>
              </Card.Header>
              <Card.Content className="space-y-4">
                <Form.Group>
                  <Form.Label htmlFor="orgName">Organization Name</Form.Label>
                  <Form.Input id="orgName" defaultValue="Aranya One Empire" />
                </Form.Group>
                
                <Form.Group>
                  <Form.Label htmlFor="timezone">Timezone</Form.Label>
                  <Form.Select
                    id="timezone"
                    defaultValue="UTC"
                    options={[
                      { value: 'UTC', label: 'UTC' },
                      { value: 'EST', label: 'Eastern Time' },
                      { value: 'PST', label: 'Pacific Time' },
                      { value: 'GMT', label: 'Greenwich Mean Time' }
                    ]}
                  />
                </Form.Group>
                
                <Form.Group>
                  <Form.Label htmlFor="language">Language</Form.Label>
                  <Form.Select
                    id="language"
                    defaultValue="en"
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'es', label: 'Spanish' },
                      { value: 'fr', label: 'French' },
                      { value: 'de', label: 'German' }
                    ]}
                  />
                </Form.Group>
              </Card.Content>
            </Card>
          )}
          
          {activeTab === 'notifications' && (
            <NotificationSettings settings={settings} onChange={setSettings} />
          )}
          
          {activeTab === 'security' && (
            <SecuritySettings settings={settings} onChange={setSettings} />
          )}
          
          {activeTab === 'appearance' && (
            <AppearanceSettings settings={settings} onChange={setSettings} />
          )}
          
          {activeTab === 'api' && (
            <APISettings />
          )}
        </div>
      </div>
    </Layout>
  );
}