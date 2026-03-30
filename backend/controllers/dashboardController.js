// @desc    Get dashboard data (leads, tasks, users)
// @route   GET /api/dashboard
// @access  Private

const getDashboardData = async (req, res) => {
  try {
    const leads = [
      { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', status: 'New', value: '$12,500', source: 'Website', date: '2024-01-15' },
      { id: 2, name: 'TechVentures Inc', email: 'info@techventures.io', status: 'Qualified', value: '$8,200', source: 'Referral', date: '2024-01-14' },
      { id: 3, name: 'Global Retail Group', email: 'sales@globalretail.com', status: 'Proposal', value: '$34,000', source: 'Cold Email', date: '2024-01-13' },
      { id: 4, name: 'StartupHub', email: 'hello@startuphub.dev', status: 'Negotiation', value: '$6,800', source: 'LinkedIn', date: '2024-01-12' },
      { id: 5, name: 'BlueWave Solutions', email: 'bd@bluewave.co', status: 'Closed Won', value: '$21,000', source: 'Conference', date: '2024-01-10' },
      { id: 6, name: 'Meridian Partners', email: 'team@meridian.com', status: 'New', value: '$15,750', source: 'Website', date: '2024-01-09' },
    ];

    const tasks = [
      { id: 1, title: 'Follow up with Acme Corporation', assignee: 'Sarah Johnson', priority: 'High', status: 'In Progress', due: '2024-01-20' },
      { id: 2, title: 'Prepare Q1 sales report', assignee: 'Michael Chen', priority: 'Medium', status: 'Todo', due: '2024-01-25' },
      { id: 3, title: 'Demo call with TechVentures', assignee: 'Emma Davis', priority: 'High', status: 'Todo', due: '2024-01-18' },
      { id: 4, title: 'Update CRM pipeline', assignee: 'James Wilson', priority: 'Low', status: 'Completed', due: '2024-01-15' },
      { id: 5, title: 'Review BlueWave contract', assignee: 'Sarah Johnson', priority: 'High', status: 'In Progress', due: '2024-01-19' },
      { id: 6, title: 'Send onboarding docs to Meridian', assignee: 'Michael Chen', priority: 'Medium', status: 'Todo', due: '2024-01-22' },
    ];

    const users = [
      { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Sales Manager', status: 'Active', deals: 14, joined: '2022-03-10' },
      { id: 2, name: 'Michael Chen', email: 'michael@company.com', role: 'Account Executive', status: 'Active', deals: 9, joined: '2022-07-22' },
      { id: 3, name: 'Emma Davis', email: 'emma@company.com', role: 'BDR', status: 'Active', deals: 6, joined: '2023-01-05' },
      { id: 4, name: 'James Wilson', email: 'james@company.com', role: 'Account Executive', status: 'Away', deals: 11, joined: '2021-11-15' },
      { id: 5, name: 'Priya Patel', email: 'priya@company.com', role: 'Sales Ops', status: 'Active', deals: 0, joined: '2023-04-18' },
      { id: 6, name: 'Carlos Ruiz', email: 'carlos@company.com', role: 'BDR', status: 'Inactive', deals: 3, joined: '2023-08-01' },
    ];

    const stats = {
      totalLeads: leads.length,
      openTasks: tasks.filter(t => t.status !== 'Completed').length,
      activeUsers: users.filter(u => u.status === 'Active').length,
      totalRevenue: '$98,250',
    };

    res.json({ success: true, data: { leads, tasks, users, stats } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardData };
