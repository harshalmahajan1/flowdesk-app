import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ onLoginSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const errs = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email.trim()) errs.email = 'Email is required';
    else if (!emailRegex.test(email)) errs.email = 'Enter a valid email address';
    if (!password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await login(email, password);
      onLoginSuccess();
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (type) => {
    const demos = {
      admin: { email: 'admin@demo.com', password: 'password123' },
      user: { email: 'user@demo.com', password: 'password123' },
    };
    setEmail(demos[type].email);
    setPassword(demos[type].password);
    setErrors({});
    setApiError('');
  };

  return (
    <div style={styles.root}>
      <div style={styles.bgGradient} />
      <div style={styles.bgGrid} />

      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <div style={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#6366F1"/>
              <path d="M7 14L12 19L21 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={styles.logoText}>FlowDesk</span>
        </div>

        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.subheading}>Sign in to your workspace</p>

        {apiError && (
          <div style={styles.alert}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}>
              <circle cx="8" cy="8" r="7" stroke="#F87171" strokeWidth="1.5"/>
              <path d="M8 5v3M8 11h.01" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.field}>
            <label style={styles.label}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p=>({...p,email:''})); }}
              placeholder="you@company.com"
              style={{...styles.input, ...(errors.email ? styles.inputError : {})}}
              autoComplete="email"
            />
            {errors.email && <span style={styles.errMsg}>{errors.email}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <div style={styles.passWrap}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(p=>({...p,password:''})); }}
                placeholder="Enter your password"
                style={{...styles.input, paddingRight:'44px', ...(errors.password ? styles.inputError : {})}}
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPass(v=>!v)} style={styles.eyeBtn}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span style={styles.errMsg}>{errors.password}</span>}
          </div>

          <button type="submit" disabled={loading} style={{...styles.submitBtn, ...(loading ? styles.submitBtnLoading : {})}}>
            {loading ? (
              <span style={styles.spinner} />
            ) : 'Sign In'}
          </button>
        </form>

        <div style={styles.divider}><span style={styles.dividerText}>Quick demo access</span></div>

        <div style={styles.demoRow}>
          <button onClick={() => fillDemo('admin')} style={styles.demoBtn}>
            <span style={styles.demoBadge}>Admin</span> admin@demo.com
          </button>
          <button onClick={() => fillDemo('user')} style={styles.demoBtn}>
            <span style={{...styles.demoBadge, background:'#0EA5E9'}}>User</span> user@demo.com
          </button>
        </div>

        <p style={styles.hint}>Password for all demo accounts: <code style={styles.code}>password123</code></p>
      </div>
    </div>
  );
};

const styles = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#09090B',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    padding: '24px',
  },
  bgGradient: {
    position: 'absolute',
    top: '-30%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '800px',
    height: '600px',
    background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgGrid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    pointerEvents: 'none',
  },
  card: {
    background: 'rgba(24,24,27,0.9)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '440px',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
    position: 'relative',
    zIndex: 1,
  },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' },
  logo: { display: 'flex' },
  logoText: { fontSize: '18px', fontWeight: '700', color: '#F4F4F5', letterSpacing: '-0.3px' },
  heading: { fontSize: '26px', fontWeight: '700', color: '#F4F4F5', margin: '0 0 6px', letterSpacing: '-0.5px' },
  subheading: { fontSize: '14px', color: '#71717A', margin: '0 0 28px' },
  alert: {
    background: 'rgba(248,113,113,0.1)',
    border: '1px solid rgba(248,113,113,0.2)',
    borderRadius: '10px',
    padding: '12px 14px',
    color: '#FCA5A5',
    fontSize: '13.5px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  field: { marginBottom: '18px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '500', color: '#A1A1AA', marginBottom: '6px' },
  input: {
    width: '100%',
    padding: '11px 14px',
    background: 'rgba(39,39,42,0.8)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: '#F4F4F5',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  },
  inputError: { borderColor: 'rgba(248,113,113,0.5)' },
  errMsg: { display: 'block', color: '#F87171', fontSize: '12px', marginTop: '5px' },
  passWrap: { position: 'relative' },
  eyeBtn: {
    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '0',
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'opacity 0.2s',
    fontFamily: 'inherit',
    letterSpacing: '-0.2px',
  },
  submitBtnLoading: { opacity: 0.7, cursor: 'not-allowed' },
  spinner: {
    width: '18px', height: '18px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: 'white',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.7s linear infinite',
  },
  divider: { textAlign: 'center', margin: '24px 0 16px', position: 'relative' },
  dividerText: {
    fontSize: '12px', color: '#52525B', background: 'rgba(24,24,27,0.9)',
    padding: '0 10px', position: 'relative', zIndex: 1,
  },
  demoRow: { display: 'flex', gap: '10px', marginBottom: '16px' },
  demoBtn: {
    flex: 1, padding: '9px 12px', background: 'rgba(39,39,42,0.6)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px',
    color: '#A1A1AA', fontSize: '12px', cursor: 'pointer', textAlign: 'left',
    fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px',
  },
  demoBadge: {
    background: '#6366F1', color: 'white', borderRadius: '4px',
    padding: '2px 6px', fontSize: '10px', fontWeight: '600',
  },
  hint: { textAlign: 'center', color: '#52525B', fontSize: '12px', margin: 0 },
  code: { background: 'rgba(99,102,241,0.2)', color: '#A78BFA', padding: '1px 5px', borderRadius: '4px', fontFamily: 'monospace' },
};

export default LoginPage;
