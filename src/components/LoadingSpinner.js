import React from 'react';

export default function LoadingSpinner({ 
  message = "Cargando...", 
  size = "medium",
  fullScreen = false,
  className = ""
}) {
  const sizeStyles = {
    small: { width: '20px', height: '20px', borderWidth: '2px' },
    medium: { width: '40px', height: '40px', borderWidth: '4px' },
    large: { width: '60px', height: '60px', borderWidth: '6px' }
  };

  const containerStyles = fullScreen ? {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    gap: '20px'
  } : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontSize: '16px',
    gap: '15px'
  };

  return (
    <div style={containerStyles} className={className}>
      <div style={{
        ...sizeStyles[size],
        border: `${sizeStyles[size].borderWidth} solid #f3f3f3`,
        borderTop: `${sizeStyles[size].borderWidth} solid #007bff`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      {message && <p style={{ margin: 0, textAlign: 'center' }}>{message}</p>}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 