import React, { useState, useEffect } from 'react';
import { ShieldAlert, Trash2, MailOpen, Eye, LogOut, Check, X, ClipboardList, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null); // Para modal de detalles
  
  const [secretKey, setSecretKey] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setSecretKey(password);
      setErrorMsg('');
      localStorage.setItem('admin_token', password);
    } else {
      setErrorMsg('❌ Contraseña administrativa incorrecta.');
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken === 'admin123') {
      setIsAuthenticated(true);
      setSecretKey(savedToken);
    }
  }, []);

  const fetchMessages = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/messages`, {
        headers: {
          'x-admin-secret': secretKey
        }
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setMessages(result.data);
      } else {
        console.error('Error fetching messages:', result.error);
      }
    } catch (error) {
      console.error('Network error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [isAuthenticated, secretKey]);

  const handleToggleRead = async (id, currentRead) => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secretKey
        },
        body: JSON.stringify({ read: !currentRead })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setMessages(messages.map(m => m._id === id ? { ...m, read: !currentRead } : m));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage({ ...selectedMessage, read: !currentRead });
        }
      }
    } catch (error) {
      console.error('Error updating read status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este mensaje permanentemente?')) return;
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-secret': secretKey
        }
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setMessages(messages.filter(m => m._id !== id));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleOpenDetail = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      // Auto marcar como leído
      await handleToggleRead(msg._id, false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setSecretKey('');
    localStorage.removeItem('admin_token');
  };

  // Conteo de mensajes
  const totalCount = messages.length;
  const unreadCount = messages.filter(m => !m.read).length;

  if (!isAuthenticated) {
    return (
      <section id="admin" className="admin-section">
        <div className="container">
          <div className="admin-login-box">
            <div className="admin-login-icon">
              <ShieldAlert size={36} />
            </div>
            <h2 className="form-title" style={{ marginBottom: '12px' }}>Acceso Administrativo</h2>
            <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem', marginBottom: '24px' }}>
              Introduce la contraseña de administrador para ver las consultas recibidas.
            </p>

            {errorMsg && <p style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: 600, marginBottom: '16px' }}>{errorMsg}</p>}

            <form onSubmit={handleLogin}>
              <div className="form-group" style={{ marginBottom: '24px', textAlign: 'left' }}>
                <label htmlFor="adminPass">Contraseña Administrativa</label>
                <input
                  type="password"
                  id="adminPass"
                  className="form-control"
                  placeholder="Introduce contraseña..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Ingresar al Panel
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="admin-section">
      <div className="container">
        <div className="admin-dashboard">
          {/* Header del Dashboard */}
          <div className="admin-dashboard-header">
            <div className="admin-dashboard-title">
              <div className="admin-login-icon" style={{ margin: 0, width: 44, height: 44 }}>
                <ClipboardList size={22} />
              </div>
              <div>
                <h2>Panel de Control</h2>
                <div className="admin-stats" style={{ marginTop: '4px' }}>
                  <span className="admin-stat-chip">Total: {totalCount}</span>
                  <span className={`admin-stat-chip ${unreadCount > 0 ? 'admin-stat-chip-unread' : ''}`}>
                    No leídos: {unreadCount}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-secondary" onClick={fetchMessages} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Actualizar
              </button>
              <button className="btn btn-danger" onClick={handleLogout} style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Tabla de Mensajes */}
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'hsl(var(--text-muted))' }}>
              Cargando base de datos de consultas...
            </div>
          ) : messages.length === 0 ? (
            <div className="admin-empty-state">
              <MailOpen size={48} />
              <h3>Bandeja de Entrada Vacía</h3>
              <p style={{ marginTop: '8px' }}>No se han recibido consultas a través del formulario web todavía.</p>
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Contacto</th>
                    <th>Asunto</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg._id} className={!msg.read ? 'admin-row-unread' : ''}>
                      <td>
                        {msg.fecha ? new Date(msg.fecha).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'N/A'}
                      </td>
                      <td style={{ fontWeight: 600, color: '#ffffff' }}>{msg.name}</td>
                      <td>
                        <div style={{ fontSize: '0.9rem' }}>{msg.email}</div>
                        <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>{msg.phone}</div>
                      </td>
                      <td>{msg.subject}</td>
                      <td>
                        <span className={`admin-badge ${msg.read ? 'admin-badge-read' : 'admin-badge-unread'}`}>
                          {msg.read ? 'Leído' : 'Nuevo'}
                        </span>
                      </td>
                      <td>
                        <div className="admin-table-actions">
                          <button
                            className="admin-action-btn"
                            title="Ver detalles"
                            onClick={() => handleOpenDetail(msg)}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="admin-action-btn admin-action-btn-read"
                            title={msg.read ? "Marcar como no leído" : "Marcar como leído"}
                            onClick={() => handleToggleRead(msg._id, msg.read)}
                          >
                            {msg.read ? <X size={16} /> : <Check size={16} />}
                          </button>
                          <button
                            className="admin-action-btn admin-action-btn-delete"
                            title="Eliminar"
                            onClick={() => handleDelete(msg._id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay para ver Detalles de Mensaje */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="admin-modal-overlay">
            <motion.div
              className="admin-modal"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <div className="admin-modal-header">
                <h3>Detalle de Consulta</h3>
                <button className="admin-modal-close" onClick={() => setSelectedMessage(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <h5>Nombre de Cliente</h5>
                    <p>{selectedMessage.name}</p>
                  </div>
                  <div className="admin-detail-item">
                    <h5>Fecha de Envío</h5>
                    <p>{selectedMessage.fecha ? new Date(selectedMessage.fecha).toLocaleString() : 'N/A'}</p>
                  </div>
                  <div className="admin-detail-item">
                    <h5>Correo Electrónico</h5>
                    <p>{selectedMessage.email}</p>
                  </div>
                  <div className="admin-detail-item">
                    <h5>Teléfono</h5>
                    <p>{selectedMessage.phone}</p>
                  </div>
                  <div className="admin-detail-full admin-detail-item">
                    <h5>Asunto</h5>
                    <p>{selectedMessage.subject}</p>
                  </div>
                  <div className="admin-detail-full admin-detail-item">
                    <h5>Mensaje Completo</h5>
                    <div className="admin-detail-message-box">
                      {selectedMessage.message}
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <a
                  href={`mailto:${selectedMessage.email}?subject=RE: Aire Express - ${selectedMessage.subject}&body=Hola ${selectedMessage.name},%0D%0A%0D%0ACon respecto a tu consulta en Aire Express sobre "${selectedMessage.subject}":%0D%0A%0D%0A`}
                  className="btn btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                >
                  <Send size={16} />
                  Simular Responder
                </a>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedMessage(null)}
                  style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AdminPanel;
