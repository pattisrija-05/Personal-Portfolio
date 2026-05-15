import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Code2,
  ExternalLink,
  Filter,
  Github,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Moon,
  Pencil,
  Plus,
  Send,
  Sun,
  Trash2,
  X
} from 'lucide-react';
import { api } from './api';

const emptyProject = {
  title: '',
  description: '',
  imageUrl: '',
  techStack: '',
  githubUrl: '',
  liveUrl: '',
  featured: false
};

const skills = [
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'REST APIs',
  'JavaScript',
  'Responsive UI',
  'Authentication'
];

const demoProjects = [
  {
    _id: 'demo-1',
    title: 'TaskFlow Dashboard',
    category: 'Dashboard',
    description: 'A responsive task manager with project lanes, progress stats, and quick filters for busy teams.',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    techStack: ['React', 'Node', 'MongoDB'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://example.com/',
    featured: true
  },
  {
    _id: 'demo-2',
    title: 'Cafe Finder',
    category: 'Web App',
    description: 'A location-friendly cafe discovery app with saved spots, ratings, and clean mobile-first browsing.',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    techStack: ['React', 'Express', 'REST API'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://example.com/',
    featured: false
  },
  {
    _id: 'demo-3',
    title: 'Portfolio CMS',
    category: 'Full Stack',
    description: 'An admin-managed portfolio system with protected routes, contact messages, and editable project cards.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    techStack: ['MERN', 'Auth', 'CRUD'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://example.com/',
    featured: false
  },
  {
    _id: 'demo-4',
    title: 'Budget Tracker',
    category: 'Web App',
    description: 'A personal finance tracker with monthly summaries, transaction categories, and spending insights.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    techStack: ['JavaScript', 'Charts', 'Local Data'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://example.com/',
    featured: false
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('portfolio_theme') === 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectError, setProjectError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('portfolio_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoadingProjects(true);
    setProjectError('');

    try {
      const data = await api.getProjects();
      setProjects(data.length ? data : demoProjects);
    } catch (error) {
      setProjectError('Showing sample projects while the backend is offline.');
      setProjects(demoProjects);
    } finally {
      setLoadingProjects(false);
    }
  }

  const featuredProject = useMemo(() => projects.find((project) => project.featured) || projects[0], [projects]);
  const categories = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.category || 'Full Stack'))],
    [projects]
  );
  const filteredProjects = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((project) => (project.category || 'Full Stack') === activeCategory),
    [activeCategory, projects]
  );

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          <Code2 size={24} />
          <span>Rahul Satyadev</span>
        </a>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
          <button className="text-button" onClick={() => setAdminOpen(true)}>
            <LayoutDashboard size={18} />
            Admin
          </button>
        </nav>

        <div className="header-actions">
          <button className="icon-button" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle dark mode">
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="icon-button mobile-only" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Full-stack developer</p>
            <h1>Building clean web experiences with thoughtful APIs behind them.</h1>
            <p>
              I design and ship responsive React interfaces, practical Node services, and MongoDB-backed features
              that keep portfolios, dashboards, and product sites easy to maintain.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#projects">View Projects</a>
              <a className="secondary-button" href="#contact">Contact Me</a>
            </div>
          </div>
          <div className="hero-panel" aria-label="Portfolio highlights">
            <div>
              <span className="stat-value">{projects.length || '0'}+</span>
              <span className="stat-label">Projects stored in MongoDB</span>
            </div>
            <div>
              <span className="stat-value">MERN</span>
              <span className="stat-label">React, Node, Express, MongoDB</span>
            </div>
            <div>
              <span className="stat-value">{featuredProject ? 'Live' : 'Ready'}</span>
              <span className="stat-label">Admin-managed project cards</span>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>Developer with a product-minded approach.</h2>
          </div>
          <p>
            I enjoy turning rough ideas into polished products: mapping the data model, shaping the API, and building
            a frontend that feels fast, accessible, and comfortable on every screen size.
          </p>
        </section>

        <section id="skills" className="section skills-section">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Tools I use to build modern web apps.</h2>
          </div>
          <div className="skill-grid">
            {skills.map((skill) => (
              <span key={skill} className="skill-pill">{skill}</span>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-heading inline-heading">
            <div>
              <p className="eyebrow">Projects</p>
              <h2>Selected work</h2>
            </div>
            <button className="secondary-button" onClick={loadProjects}>Refresh</button>
          </div>

          {featuredProject && (
            <article className="project-spotlight">
              <img src={featuredProject.imageUrl} alt={featuredProject.title} />
              <div>
                <p className="eyebrow">Featured build</p>
                <h3>{featuredProject.title}</h3>
                <p>{featuredProject.description}</p>
                <button className="primary-button" onClick={() => setSelectedProject(featuredProject)}>
                  Explore Project
                  <ArrowRight size={18} />
                </button>
              </div>
            </article>
          )}

          <div className="filter-bar" aria-label="Project filters">
            <Filter size={18} />
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? 'filter-chip active' : 'filter-chip'}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {projectError && <p className="status error">{projectError}</p>}
          {loadingProjects ? (
            <p className="status">Loading projects...</p>
          ) : (
            <div className="project-grid">
              {filteredProjects.length ? (
                filteredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} onPreview={setSelectedProject} />
                ))
              ) : (
                <p className="status">No projects match this filter yet.</p>
              )}
            </div>
          )}
        </section>

        <ContactSection />
      </main>

      <footer className="site-footer">
        <span>Built with React, Express, and MongoDB.</span>
        <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
      </footer>

      {adminOpen && (
        <AdminDashboard
          projects={projects}
          onClose={() => setAdminOpen(false)}
          onProjectsChange={loadProjects}
        />
      )}

      {selectedProject && (
        <ProjectPreview project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}

function ProjectCard({ project, onPreview }) {
  return (
    <article className="project-card">
      <img src={project.imageUrl} alt={project.title} />
      <div className="project-card-body">
        <div className="project-title-row">
          <h3>{project.title}</h3>
          {project.featured && <span className="featured-badge">Featured</span>}
        </div>
        <p>{project.description}</p>
        <div className="tech-list">
          {project.techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-links">
          <button className="text-button" onClick={() => onPreview(project)}>
            <ArrowRight size={18} />
            Preview
          </button>
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            <Github size={18} />
            Code
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectPreview({ project, onClose }) {
  return (
    <div className="modal-backdrop preview-backdrop" onClick={onClose}>
      <article className="project-preview" onClick={(event) => event.stopPropagation()}>
        <button className="icon-button preview-close" onClick={onClose} aria-label="Close project preview">
          <X size={22} />
        </button>
        <img src={project.imageUrl} alt={project.title} />
        <div className="project-preview-body">
          <p className="eyebrow">{project.category || 'Full Stack'}</p>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <div className="tech-list">
            {project.techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="project-links">
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <Github size={18} />
              Code
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={18} />
                Live
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus('');

    try {
      const response = await api.sendContact(form);
      setStatus(response.message);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>Tell me about your next idea.</h2>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Name
            <input name="name" value={form.name} onChange={updateField} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} required />
          </label>
        </div>
        <label>
          Subject
          <input name="subject" value={form.subject} onChange={updateField} required />
        </label>
        <label>
          Message
          <textarea name="message" rows="5" value={form.message} onChange={updateField} required />
        </label>
        <button className="primary-button" type="submit" disabled={submitting}>
          <Send size={18} />
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
        {status && <p className="status">{status}</p>}
      </form>
    </section>
  );
}

function AdminDashboard({ projects, onClose, onProjectsChange }) {
  const [token, setToken] = useState(localStorage.getItem('portfolio_admin_token') || '');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (token) {
      loadMessages();
    }
  }, [token]);

  function updateCredentials(event) {
    setCredentials((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function updateProjectForm(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleLogin(event) {
    event.preventDefault();
    setNotice('');

    try {
      const data = await api.login(credentials);
      localStorage.setItem('portfolio_admin_token', data.token);
      setToken(data.token);
      setNotice('Logged in.');
    } catch (error) {
      setNotice(error.message);
    }
  }

  function logout() {
    localStorage.removeItem('portfolio_admin_token');
    setToken('');
    setMessages([]);
  }

  function editProject(project) {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      techStack: project.techStack.join(', '),
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl || '',
      featured: project.featured
    });
  }

  async function saveProject(event) {
    event.preventDefault();
    setNotice('');

    const payload = {
      ...form,
      techStack: form.techStack.split(',').map((tech) => tech.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await api.updateProject(editingId, payload);
        setNotice('Project updated.');
      } else {
        await api.createProject(payload);
        setNotice('Project added.');
      }

      setForm(emptyProject);
      setEditingId(null);
      onProjectsChange();
    } catch (error) {
      setNotice(error.message);
    }
  }

  async function removeProject(id) {
    const confirmed = window.confirm('Delete this project?');

    if (!confirmed) {
      return;
    }

    try {
      await api.deleteProject(id);
      setNotice('Project deleted.');
      onProjectsChange();
    } catch (error) {
      setNotice(error.message);
    }
  }

  async function loadMessages() {
    try {
      const data = await api.getMessages();
      setMessages(data);
    } catch (error) {
      setNotice(error.message);
    }
  }

  return (
    <div className="modal-backdrop">
      <aside className="admin-panel">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Admin</p>
            <h2>Dashboard</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close dashboard">
            <X size={22} />
          </button>
        </div>

        {!token ? (
          <form className="admin-form" onSubmit={handleLogin}>
            <label>
              Email
              <input name="email" type="email" value={credentials.email} onChange={updateCredentials} required />
            </label>
            <label>
              Password
              <input name="password" type="password" value={credentials.password} onChange={updateCredentials} required />
            </label>
            <button className="primary-button" type="submit">Log In</button>
            {notice && <p className="status">{notice}</p>}
          </form>
        ) : (
          <div className="admin-content">
            <div className="admin-toolbar">
              <button className="secondary-button" onClick={() => { setForm(emptyProject); setEditingId(null); }}>
                <Plus size={18} />
                New Project
              </button>
              <button className="text-button" onClick={logout}>
                <LogOut size={18} />
                Log Out
              </button>
            </div>

            <form className="admin-form" onSubmit={saveProject}>
              <label>
                Title
                <input name="title" value={form.title} onChange={updateProjectForm} required />
              </label>
              <label>
                Description
                <textarea name="description" rows="4" value={form.description} onChange={updateProjectForm} required />
              </label>
              <label>
                Image URL
                <input name="imageUrl" value={form.imageUrl} onChange={updateProjectForm} required />
              </label>
              <label>
                Tech Stack
                <input name="techStack" value={form.techStack} onChange={updateProjectForm} placeholder="React, Node, MongoDB" />
              </label>
              <div className="form-row">
                <label>
                  GitHub URL
                  <input name="githubUrl" value={form.githubUrl} onChange={updateProjectForm} required />
                </label>
                <label>
                  Live URL
                  <input name="liveUrl" value={form.liveUrl} onChange={updateProjectForm} />
                </label>
              </div>
              <label className="checkbox-label">
                <input name="featured" type="checkbox" checked={form.featured} onChange={updateProjectForm} />
                Featured project
              </label>
              <button className="primary-button" type="submit">
                {editingId ? 'Update Project' : 'Add Project'}
              </button>
            </form>

            {notice && <p className="status">{notice}</p>}

            <div className="admin-list">
              <h3>Projects</h3>
              {projects.map((project) => (
                <div className="admin-list-item" key={project._id}>
                  <span>{project.title}</span>
                  <div>
                    <button className="icon-button" onClick={() => editProject(project)} aria-label={`Edit ${project.title}`}>
                      <Pencil size={17} />
                    </button>
                    <button className="icon-button danger" onClick={() => removeProject(project._id)} aria-label={`Delete ${project.title}`}>
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-list">
              <div className="admin-list-heading">
                <h3>Contact Messages</h3>
                <button className="text-button" onClick={loadMessages}>
                  <Mail size={17} />
                  Refresh
                </button>
              </div>
              {messages.length ? (
                messages.map((message) => (
                  <div className="message-item" key={message._id}>
                    <strong>{message.subject}</strong>
                    <span>{message.name} · {message.email}</span>
                    <p>{message.message}</p>
                  </div>
                ))
              ) : (
                <p className="status">No messages yet.</p>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default App;
