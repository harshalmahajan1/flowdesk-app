import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const statusColor = {
  'New': '#6366F1', 'Qualified': '#0EA5E9', 'Proposal': '#F59E0B',
  'Negotiation': '#EC4899', 'Closed Won': '#10B981',
  'High': '#F87171', 'Medium': '#F59E0B', 'Low': '#6EE7B7',
  'In Progress': '#6366F1', 'Todo': '#71717A', 'Completed': '#10B981',
  'Active': '#10B981', 'Away': '#F59E0B', 'Inactive': '#F87171',
};
const statusBg = {
  'New': 'rgba(99,102,241,0.12)', 'Qualified': 'rgba(14,165,233,0.12)',
  'Proposal': 'rgba(245,158,11,0.12)', 'Negotiation': 'rgba(236,72,153,0.12)',
  'Closed Won': 'rgba(16,185,129,0.12)',
  'High': 'rgba(248,113,113,0.12)', 'Medium': 'rgba(245,158,11,0.12)', 'Low': 'rgba(110,231,183,0.12)',
  'In Progress': 'rgba(99,102,241,0.12)', 'Todo': 'rgba(113,113,122,0.12)', 'Completed': 'rgba(16,185,129,0.12)',
  'Active': 'rgba(16,185,129,0.12)', 'Away': 'rgba(245,158,11,0.12)', 'Inactive': 'rgba(248,113,113,0.12)',
};

const Badge = ({ status }) => (
  <span style={{
    padding: '3px 10px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '600',
    color: statusColor[status] || '#71717A', background: statusBg[status] || 'rgba(113,113,122,0.12)',
    display: 'inline-block', whiteSpace: 'nowrap',
  }}>{status}</span>
);

const StatCard = ({ icon, label, value, color }) => (
  <div style={styles.statCard}>
    <div style={{...styles.statIcon, background: `${color}20`}}>
      <span style={{fontSize:'20px'}}>{icon}</span>
    </div>
    <div>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  </div>
);

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('leads');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.data);
      } catch (err) {
        // Use static fallback data if API isn't running
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const tabs = [
    { id: 'leads', label: 'Leads', icon: '🎯' },
    { id: 'tasks', label: 'Tasks', icon: '✅' },
    { id: 'users', label: 'Team', icon: '👥' },
  ];

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  if (loading) return (
    <div style={styles.loadingWrap}>
      <div style={styles.loadingSpinner} />
      <p style={{color:'#71717A', marginTop:'16px'}}>Loading dashboard...</p>
    </div>
  );

  return (
    <div style={styles.root}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <div style={styles.logo}>
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#6366F1"/>
              <path d="M7 14L12 19L21 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={styles.logoText}>FlowDesk</span>
        </div>

        <nav style={styles.nav}>
          {[
            { icon: '📊', label: 'Dashboard', active: true },
            { icon: '🎯', label: 'Leads' },
            { icon: '✅', label: 'Tasks' },
            { icon: '👥', label: 'Team' },
            { icon: '⚙️', label: 'Settings' },
          ].map(item => (
            <div key={item.label} style={{...styles.navItem, ...(item.active ? styles.navItemActive : {})}}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.avatarSmall}>{initials}</div>
          <div style={{flex:1, minWidth:0}}>
            <div style={styles.sidebarUserName}>{user?.name || 'User'}</div>
            <div style={styles.sidebarUserRole}>{user?.role || 'Member'}</div>
          </div>
          <button onClick={logout} style={styles.logoutBtnSmall} title="Logout">↪</button>
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>Dashboard</h1>
            <p style={styles.pageSubtitle}>Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋</p>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.searchBar}>
              <span style={{color:'#52525B'}}>🔍</span>
              <input placeholder="Search..." style={styles.searchInput} />
            </div>
            <div style={styles.avatar}>{initials}</div>
          </div>
        </header>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <StatCard icon="🎯" label="Total Leads" value={data?.stats?.totalLeads || 6} color="#6366F1" />
          <StatCard icon="✅" label="Open Tasks" value={data?.stats?.openTasks || 5} color="#0EA5E9" />
          <StatCard icon="👥" label="Active Users" value={data?.stats?.activeUsers || 4} color="#10B981" />
          <StatCard icon="💰" label="Total Revenue" value={data?.stats?.totalRevenue || '$98,250'} color="#F59E0B" />
        </div>

        {error && <div style={styles.warnBanner}>{error}</div>}

        {/* Tab Panel */}
        <div style={styles.panel}>
          <div style={styles.tabBar}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{...styles.tabBtn, ...(tab === t.id ? styles.tabBtnActive : {})}}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          <div style={styles.tableWrap}>
            {tab === 'leads' && (
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['Company', 'Email', 'Status', 'Value', 'Source', 'Date'].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(data?.leads || []).map(lead => (
                    <tr key={lead.id} style={styles.tr}>
                      <td style={{...styles.td, fontWeight:'600', color:'#F4F4F5'}}>{lead.name}</td>
                      <td style={styles.td}>{lead.email}</td>
                      <td style={styles.td}><Badge status={lead.status} /></td>
                      <td style={{...styles.td, color:'#10B981', fontWeight:'600'}}>{lead.value}</td>
                      <td style={styles.td}>{lead.source}</td>
                      <td style={styles.td}>{lead.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === 'tasks' && (
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['Task', 'Assignee', 'Priority', 'Status', 'Due Date'].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(data?.tasks || []).map(task => (
                    <tr key={task.id} style={styles.tr}>
                      <td style={{...styles.td, fontWeight:'500', color:'#E4E4E7'}}>{task.title}</td>
                      <td style={styles.td}>{task.assignee}</td>
                      <td style={styles.td}><Badge status={task.priority} /></td>
                      <td style={styles.td}><Badge status={task.status} /></td>
                      <td style={styles.td}>{task.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === 'users' && (
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['Name', 'Email', 'Role', 'Status', 'Deals', 'Joined'].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(data?.users || []).map(u => (
                    <tr key={u.id} style={styles.tr}>
                      <td style={styles.td}>
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                          <div style={styles.miniAvatar}>{u.name.split(' ').map(n=>n[0]).join('')}</div>
                          <span style={{fontWeight:'600', color:'#F4F4F5'}}>{u.name}</span>
                        </div>
                      </td>
                      <td style={styles.td}>{u.email}</td>
                      <td style={styles.td}>{u.role}</td>
                      <td style={styles.td}><Badge status={u.status} /></td>
                      <td style={{...styles.td, textAlign:'center'}}>{u.deals}</td>
                      <td style={styles.td}>{u.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Static fallback data used when backend isn't running
const fallbackData = {
  stats: { totalLeads: 6, openTasks: 5, activeUsers: 4, totalRevenue: '$98,250' },
  leads: [
    { id:1, name:'Acme Corporation', email:'contact@acme.com', status:'New', value:'$12,500', source:'Website', date:'2024-01-15' },
    { id:2, name:'TechVentures Inc', email:'info@techventures.io', status:'Qualified', value:'$8,200', source:'Referral', date:'2024-01-14' },
    { id:3, name:'Global Retail Group', email:'sales@globalretail.com', status:'Proposal', value:'$34,000', source:'Cold Email', date:'2024-01-13' },
    { id:4, name:'StartupHub', email:'hello@startuphub.dev', status:'Negotiation', value:'$6,800', source:'LinkedIn', date:'2024-01-12' },
    { id:5, name:'BlueWave Solutions', email:'bd@bluewave.co', status:'Closed Won', value:'$21,000', source:'Conference', date:'2024-01-10' },
    { id:6, name:'Meridian Partners', email:'team@meridian.com', status:'New', value:'$15,750', source:'Website', date:'2024-01-09' },
  ],
  tasks: [
    { id:1, title:'Follow up with Acme Corporation', assignee:'Sarah Johnson', priority:'High', status:'In Progress', due:'2024-01-20' },
    { id:2, title:'Prepare Q1 sales report', assignee:'Michael Chen', priority:'Medium', status:'Todo', due:'2024-01-25' },
    { id:3, title:'Demo call with TechVentures', assignee:'Emma Davis', priority:'High', status:'Todo', due:'2024-01-18' },
    { id:4, title:'Update CRM pipeline', assignee:'James Wilson', priority:'Low', status:'Completed', due:'2024-01-15' },
    { id:5, title:'Review BlueWave contract', assignee:'Sarah Johnson', priority:'High', status:'In Progress', due:'2024-01-19' },
    { id:6, title:'Send onboarding docs to Meridian', assignee:'Michael Chen', priority:'Medium', status:'Todo', due:'2024-01-22' },
  ],
  users: [
    { id:1, name:'Sarah Johnson', email:'sarah@company.com', role:'Sales Manager', status:'Active', deals:14, joined:'2022-03-10' },
    { id:2, name:'Michael Chen', email:'michael@company.com', role:'Account Executive', status:'Active', deals:9, joined:'2022-07-22' },
    { id:3, name:'Emma Davis', email:'emma@company.com', role:'BDR', status:'Active', deals:6, joined:'2023-01-05' },
    { id:4, name:'James Wilson', email:'james@company.com', role:'Account Executive', status:'Away', deals:11, joined:'2021-11-15' },
    { id:5, name:'Priya Patel', email:'priya@company.com', role:'Sales Ops', status:'Active', deals:0, joined:'2023-04-18' },
    { id:6, name:'Carlos Ruiz', email:'carlos@company.com', role:'BDR', status:'Inactive', deals:3, joined:'2023-08-01' },
  ],
};

const styles = {
  root: { display:'flex', minHeight:'100vh', background:'#09090B', fontFamily:"'DM Sans','Segoe UI',sans-serif" },
  loadingWrap: { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh', background:'#09090B' },
  loadingSpinner: { width:'36px', height:'36px', border:'3px solid rgba(99,102,241,0.2)', borderTopColor:'#6366F1', borderRadius:'50%', animation:'spin 0.8s linear infinite' },

  sidebar: { width:'220px', background:'rgba(18,18,20,0.95)', borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', padding:'24px 16px', flexShrink:0 },
  sidebarLogo: { display:'flex', alignItems:'center', gap:'10px', marginBottom:'36px', paddingLeft:'8px' },
  logo: { display:'flex' },
  logoText: { fontSize:'17px', fontWeight:'700', color:'#F4F4F5', letterSpacing:'-0.3px' },
  nav: { flex:1, display:'flex', flexDirection:'column', gap:'4px' },
  navItem: { display:'flex', alignItems:'center', gap:'10px', padding:'9px 12px', borderRadius:'8px', color:'#71717A', fontSize:'13.5px', cursor:'pointer', transition:'all 0.15s' },
  navItemActive: { background:'rgba(99,102,241,0.15)', color:'#A5B4FC' },
  sidebarFooter: { display:'flex', alignItems:'center', gap:'10px', paddingTop:'16px', borderTop:'1px solid rgba(255,255,255,0.06)', marginTop:'16px' },
  avatarSmall: { width:'32px', height:'32px', borderRadius:'8px', background:'linear-gradient(135deg,#6366F1,#8B5CF6)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'12px', fontWeight:'700', flexShrink:0 },
  sidebarUserName: { fontSize:'13px', fontWeight:'600', color:'#E4E4E7', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' },
  sidebarUserRole: { fontSize:'11px', color:'#52525B', textTransform:'capitalize' },
  logoutBtnSmall: { background:'none', border:'none', color:'#52525B', cursor:'pointer', fontSize:'16px', padding:'4px', borderRadius:'4px' },

  main: { flex:1, display:'flex', flexDirection:'column', overflow:'hidden' },
  header: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'24px 32px', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(15,15,17,0.8)', backdropFilter:'blur(10px)' },
  pageTitle: { margin:0, fontSize:'22px', fontWeight:'700', color:'#F4F4F5', letterSpacing:'-0.4px' },
  pageSubtitle: { margin:'2px 0 0', fontSize:'13px', color:'#52525B' },
  headerRight: { display:'flex', alignItems:'center', gap:'16px' },
  searchBar: { display:'flex', alignItems:'center', gap:'8px', background:'rgba(39,39,42,0.5)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'8px', padding:'8px 14px' },
  searchInput: { background:'none', border:'none', outline:'none', color:'#A1A1AA', fontSize:'13px', width:'140px', fontFamily:'inherit' },
  avatar: { width:'36px', height:'36px', borderRadius:'10px', background:'linear-gradient(135deg,#6366F1,#8B5CF6)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'13px', fontWeight:'700', cursor:'pointer' },

  statsGrid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', padding:'24px 32px 0' },
  statCard: { background:'rgba(24,24,27,0.8)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'14px', padding:'20px', display:'flex', alignItems:'center', gap:'16px' },
  statIcon: { width:'48px', height:'48px', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  statValue: { fontSize:'22px', fontWeight:'700', color:'#F4F4F5', letterSpacing:'-0.5px' },
  statLabel: { fontSize:'12px', color:'#71717A', marginTop:'2px' },

  warnBanner: { margin:'16px 32px 0', padding:'10px 14px', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:'8px', color:'#FCD34D', fontSize:'13px' },

  panel: { margin:'20px 32px 32px', background:'rgba(18,18,20,0.8)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', overflow:'hidden', flex:1 },
  tabBar: { display:'flex', gap:'4px', padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.06)' },
  tabBtn: { padding:'7px 16px', borderRadius:'8px', border:'none', background:'none', color:'#71717A', fontSize:'13px', fontWeight:'500', cursor:'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', gap:'6px' },
  tabBtnActive: { background:'rgba(99,102,241,0.15)', color:'#A5B4FC' },

  tableWrap: { overflowX:'auto' },
  table: { width:'100%', borderCollapse:'collapse' },
  th: { padding:'11px 16px', textAlign:'left', fontSize:'11px', fontWeight:'600', color:'#52525B', textTransform:'uppercase', letterSpacing:'0.5px', background:'rgba(24,24,27,0.5)', whiteSpace:'nowrap' },
  tr: { borderBottom:'1px solid rgba(255,255,255,0.04)', transition:'background 0.15s' },
  td: { padding:'13px 16px', fontSize:'13px', color:'#A1A1AA', whiteSpace:'nowrap' },
  miniAvatar: { width:'28px', height:'28px', borderRadius:'7px', background:'rgba(99,102,241,0.25)', display:'flex', alignItems:'center', justifyContent:'center', color:'#A5B4FC', fontSize:'11px', fontWeight:'700', flexShrink:0 },
};

export default DashboardPage;
