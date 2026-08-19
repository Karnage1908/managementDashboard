// ============================================
// STORE — Data Layer with localStorage + Seed Data
// ============================================

const Store = {
  _data: null,
  _listeners: [],
  STORAGE_KEY: 'dashboard_data',

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        this._data = JSON.parse(saved);
        // Ensure all collections exist (for upgrades)
        const defaults = this._getDefaults();
        for (const key of Object.keys(defaults)) {
          if (!this._data[key]) this._data[key] = defaults[key];
        }
      } catch (e) {
        console.warn('Failed to parse stored data, using seed data');
        this._data = this._getSeedData();
      }
    } else {
      this._data = this._getSeedData();
    }
    this._save();
  },

  _save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._data));
    this._listeners.forEach(fn => fn(this._data));
  },

  onChange(fn) {
    this._listeners.push(fn);
  },

  get(collection) {
    return this._data[collection] || [];
  },

  getById(collection, id) {
    return (this._data[collection] || []).find(item => item.id === id);
  },

  add(collection, item) {
    if (!this._data[collection]) this._data[collection] = [];
    item.id = item.id || this._generateId();
    item.createdAt = item.createdAt || new Date().toISOString();
    this._data[collection].push(item);
    this._save();
    return item;
  },

  update(collection, id, updates) {
    const arr = this._data[collection] || [];
    const idx = arr.findIndex(item => item.id === id);
    if (idx !== -1) {
      arr[idx] = { ...arr[idx], ...updates, updatedAt: new Date().toISOString() };
      this._save();
      return arr[idx];
    }
    return null;
  },

  remove(collection, id) {
    if (!this._data[collection]) return;
    this._data[collection] = this._data[collection].filter(item => item.id !== id);
    this._save();
  },

  getSettings() {
    return this._data.settings || {};
  },

  updateSettings(updates) {
    this._data.settings = { ...this._data.settings, ...updates };
    this._save();
  },

  exportData() {
    return JSON.stringify(this._data, null, 2);
  },

  importData(jsonStr) {
    try {
      this._data = JSON.parse(jsonStr);
      this._save();
      return true;
    } catch (e) {
      return false;
    }
  },

  resetData() {
    this._data = this._getSeedData();
    this._save();
  },

  _generateId() {
    return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
  },

  _getDefaults() {
    return {
      courses: [], assignments: [], exams: [], tasks: [], projects: [],
      goals: [], applications: [], skills: [], achievements: [], events: [],
      documents: [], notifications: [], settings: {}
    };
  },

  _getSeedData() {
    const today = new Date();
    const d = (offset) => {
      const dt = new Date(today);
      dt.setDate(dt.getDate() + offset);
      return dt.toISOString().split('T')[0];
    };
    const dt = (offset, hour, min) => {
      const dtObj = new Date(today);
      dtObj.setDate(dtObj.getDate() + offset);
      dtObj.setHours(hour, min || 0, 0, 0);
      return dtObj.toISOString();
    };

    return {
      settings: {
        theme: 'dark',
        currentSemester: 'Fall 2026',
        academicYear: '2026-27',
        userName: 'Student',
        gpa: 3.72,
        targetGpa: 3.85,
        productivityStreak: 12,
        studyHoursThisWeek: 24,
        deepWorkHoursThisWeek: 16
      },

      courses: [
        { id: 'c1', name: 'Data Structures & Algorithms', code: 'CS201', professor: 'Dr. Sarah Chen', credits: 4, semester: 'Fall 2026', currentGrade: 88, targetGrade: 92, attendance: 94, status: 'Active', color: '#6eb4e2' },
        { id: 'c2', name: 'Machine Learning', code: 'CS405', professor: 'Dr. James Park', credits: 3, semester: 'Fall 2026', currentGrade: 91, targetGrade: 95, attendance: 100, status: 'Active', color: '#b47ee2' },
        { id: 'c3', name: 'Database Management Systems', code: 'CS301', professor: 'Prof. Lisa Wang', credits: 3, semester: 'Fall 2026', currentGrade: 85, targetGrade: 90, attendance: 88, status: 'Active', color: '#7ec984' },
        { id: 'c4', name: 'Operating Systems', code: 'CS302', professor: 'Dr. Mike Johnson', credits: 4, semester: 'Fall 2026', currentGrade: 78, targetGrade: 85, attendance: 82, status: 'Active', color: '#e27ea8' },
        { id: 'c5', name: 'Linear Algebra', code: 'MATH301', professor: 'Dr. Elena Petrov', credits: 3, semester: 'Fall 2026', currentGrade: 92, targetGrade: 95, attendance: 96, status: 'Active', color: '#e2b714' },
        { id: 'c6', name: 'Web Development', code: 'CS250', professor: 'Prof. Alex Turner', credits: 3, semester: 'Fall 2026', currentGrade: 95, targetGrade: 97, attendance: 100, status: 'Active', color: '#7ee2c1' }
      ],

      assignments: [
        { id: 'a1', title: 'Binary Tree Implementation', courseId: 'c1', course: 'Data Structures', description: 'Implement AVL tree with self-balancing', deadline: d(2), weightage: 15, status: 'In Progress', score: null, expectedScore: 88, submissionStatus: 'Not Submitted', priority: 'High' },
        { id: 'a2', title: 'Neural Network from Scratch', courseId: 'c2', course: 'Machine Learning', description: 'Build a 3-layer neural network using only NumPy', deadline: d(5), weightage: 20, status: 'In Progress', score: null, expectedScore: 92, submissionStatus: 'Not Submitted', priority: 'High' },
        { id: 'a3', title: 'SQL Query Optimization', courseId: 'c3', course: 'DBMS', description: 'Optimize given queries and write execution plans', deadline: d(-1), weightage: 10, status: 'Overdue', score: null, expectedScore: 80, submissionStatus: 'Not Submitted', priority: 'Critical' },
        { id: 'a4', title: 'Process Scheduler Simulation', courseId: 'c4', course: 'Operating Systems', description: 'Simulate FCFS, SJF, Round Robin schedulers', deadline: d(8), weightage: 15, status: 'Not Started', score: null, expectedScore: 85, submissionStatus: 'Not Submitted', priority: 'Medium' },
        { id: 'a5', title: 'Eigenvalue Computation', courseId: 'c5', course: 'Linear Algebra', description: 'Power method and QR algorithm implementation', deadline: d(3), weightage: 12, status: 'Submitted', score: 94, expectedScore: 90, submissionStatus: 'Submitted', priority: 'Low' },
        { id: 'a6', title: 'REST API Development', courseId: 'c6', course: 'Web Development', description: 'Build a RESTful API with authentication', deadline: d(6), weightage: 18, status: 'In Progress', score: null, expectedScore: 96, submissionStatus: 'Not Submitted', priority: 'Medium' },
        { id: 'a7', title: 'Graph Algorithms Lab', courseId: 'c1', course: 'Data Structures', description: 'Implement Dijkstra and Bellman-Ford', deadline: d(-3), weightage: 10, status: 'Graded', score: 91, expectedScore: 88, submissionStatus: 'Submitted', priority: 'Low' },
        { id: 'a8', title: 'CNN Image Classifier', courseId: 'c2', course: 'Machine Learning', description: 'Build CNN for CIFAR-10 classification', deadline: d(12), weightage: 25, status: 'Not Started', score: null, expectedScore: 90, submissionStatus: 'Not Submitted', priority: 'Medium' },
        { id: 'a9', title: 'ER Diagram Design', courseId: 'c3', course: 'DBMS', description: 'Design ER diagram for university system', deadline: d(-5), weightage: 8, status: 'Graded', score: 87, expectedScore: 85, submissionStatus: 'Submitted', priority: 'Low' },
        { id: 'a10', title: 'Memory Management Lab', courseId: 'c4', course: 'Operating Systems', description: 'Implement page replacement algorithms', deadline: d(15), weightage: 12, status: 'Not Started', score: null, expectedScore: 82, submissionStatus: 'Not Submitted', priority: 'Low' },
        { id: 'a11', title: 'React Dashboard Project', courseId: 'c6', course: 'Web Development', description: 'Build an interactive analytics dashboard', deadline: d(10), weightage: 30, status: 'In Progress', score: null, expectedScore: 95, submissionStatus: 'Not Submitted', priority: 'High' },
        { id: 'a12', title: 'Matrix Decomposition', courseId: 'c5', course: 'Linear Algebra', description: 'LU, QR, and SVD decomposition exercises', deadline: d(7), weightage: 15, status: 'Not Started', score: null, expectedScore: 90, submissionStatus: 'Not Submitted', priority: 'Medium' }
      ],

      exams: [
        { id: 'e1', subject: 'Data Structures & Algorithms', courseId: 'c1', type: 'Midterm', date: d(12), syllabusTopics: 'Trees, Graphs, Hashing, Sorting', preparationPercent: 42, targetScore: 90, actualScore: null, status: 'Upcoming' },
        { id: 'e2', subject: 'Machine Learning', courseId: 'c2', type: 'Quiz', date: d(5), syllabusTopics: 'Linear Regression, Gradient Descent, Neural Networks', preparationPercent: 65, targetScore: 92, actualScore: null, status: 'Upcoming' },
        { id: 'e3', subject: 'Operating Systems', courseId: 'c4', type: 'Midterm', date: d(18), syllabusTopics: 'Process Management, Scheduling, Memory', preparationPercent: 20, targetScore: 82, actualScore: null, status: 'Upcoming' },
        { id: 'e4', subject: 'Linear Algebra', courseId: 'c5', type: 'Quiz', date: d(-8), syllabusTopics: 'Vectors, Matrices, Determinants', preparationPercent: 100, targetScore: 95, actualScore: 96, status: 'Completed' }
      ],

      tasks: [
        { id: 't1', title: 'Complete AVL tree implementation', description: 'Finish insertion and deletion methods', category: 'Academic', project: 'p1', goalId: 'g2', priority: 'High', status: 'In Progress', dueDate: d(2), estimatedTime: 3, actualTime: 1.5, recurrence: null, notes: 'Check lecture slides for rotation cases' },
        { id: 't2', title: 'Review ML lecture notes', description: 'Chapters 4-6 on neural networks', category: 'Academic', project: null, goalId: 'g2', priority: 'High', status: 'Todo', dueDate: d(1), estimatedTime: 2, actualTime: 0, recurrence: null, notes: '' },
        { id: 't3', title: 'Apply to Google SWE Intern', description: 'Submit application on careers page', category: 'Professional', project: null, goalId: 'g1', priority: 'Critical', status: 'Todo', dueDate: d(3), estimatedTime: 1.5, actualTime: 0, recurrence: null, notes: 'Use resume v3, tailor cover letter' },
        { id: 't4', title: 'LeetCode daily practice', description: 'Solve 2 medium problems', category: 'Professional', project: null, goalId: 'g5', priority: 'Medium', status: 'Todo', dueDate: d(0), estimatedTime: 1.5, actualTime: 0, recurrence: 'Daily', notes: 'Focus on graph problems' },
        { id: 't5', title: 'Update portfolio website', description: 'Add ML project and update design', category: 'Professional', project: 'p2', goalId: 'g6', priority: 'Medium', status: 'Todo', dueDate: d(4), estimatedTime: 3, actualTime: 0, recurrence: null, notes: '' },
        { id: 't6', title: 'Research paper literature review', description: 'Read 5 papers on attention mechanisms', category: 'Academic', project: 'p3', goalId: 'g7', priority: 'High', status: 'In Progress', dueDate: d(6), estimatedTime: 5, actualTime: 2, recurrence: null, notes: 'Check Google Scholar' },
        { id: 't7', title: 'Submit DBMS assignment', description: 'SQL query optimization - OVERDUE', category: 'Academic', project: null, goalId: 'g2', priority: 'Critical', status: 'Overdue', dueDate: d(-1), estimatedTime: 2, actualTime: 0, recurrence: null, notes: 'Contact TA about late submission' },
        { id: 't8', title: 'Mock interview prep', description: 'Practice system design questions', category: 'Professional', project: null, goalId: 'g1', priority: 'High', status: 'Todo', dueDate: d(2), estimatedTime: 2, actualTime: 0, recurrence: 'Weekly', notes: '' },
        { id: 't9', title: 'Contribute to open source', description: 'Fix issue #234 on TensorFlow repo', category: 'Project', project: 'p4', goalId: 'g6', priority: 'Low', status: 'Todo', dueDate: d(7), estimatedTime: 4, actualTime: 0, recurrence: null, notes: '' },
        { id: 't10', title: 'Gym workout', description: 'Upper body strength training', category: 'Personal', project: null, goalId: null, priority: 'Low', status: 'Todo', dueDate: d(0), estimatedTime: 1.5, actualTime: 0, recurrence: 'Daily', notes: '' },
        { id: 't11', title: 'Follow up with Microsoft recruiter', description: 'Send thank you email after phone screen', category: 'Professional', project: null, goalId: 'g1', priority: 'High', status: 'Todo', dueDate: d(1), estimatedTime: 0.5, actualTime: 0, recurrence: null, notes: '' },
        { id: 't12', title: 'Study for ML quiz', description: 'Review gradient descent and backpropagation', category: 'Academic', project: null, goalId: 'g2', priority: 'Critical', status: 'In Progress', dueDate: d(4), estimatedTime: 6, actualTime: 2, recurrence: null, notes: '' },
        { id: 't13', title: 'Prepare presentation slides', description: 'Final project presentation for Web Dev', category: 'Academic', project: null, goalId: null, priority: 'Medium', status: 'Not Started', dueDate: d(9), estimatedTime: 3, actualTime: 0, recurrence: null, notes: '' },
        { id: 't14', title: 'Complete AWS certification module', description: 'Finish EC2 and S3 modules', category: 'Professional', project: null, goalId: 'g4', priority: 'Medium', status: 'In Progress', dueDate: d(10), estimatedTime: 4, actualTime: 1.5, recurrence: null, notes: '' },
        { id: 't15', title: 'Review PR for ML project', description: 'Review teammates code changes', category: 'Project', project: 'p1', goalId: null, priority: 'Medium', status: 'Todo', dueDate: d(1), estimatedTime: 1, actualTime: 0, recurrence: null, notes: '' },
        { id: 't16', title: 'Weekly planner review', description: 'Review and plan next week\'s tasks', category: 'Personal', project: null, goalId: null, priority: 'Medium', status: 'Todo', dueDate: d(0), estimatedTime: 0.5, actualTime: 0, recurrence: 'Weekly', notes: '' },
        { id: 't17', title: 'Debug REST API auth middleware', description: 'Fix JWT validation issue', category: 'Academic', project: null, goalId: null, priority: 'High', status: 'In Progress', dueDate: d(5), estimatedTime: 2, actualTime: 0.5, recurrence: null, notes: '' },
        { id: 't18', title: 'Read "Designing Data-Intensive Applications"', description: 'Chapter 5-6', category: 'Professional', project: null, goalId: 'g4', priority: 'Low', status: 'Todo', dueDate: d(14), estimatedTime: 3, actualTime: 0, recurrence: null, notes: '' },
        { id: 't19', title: 'Update LinkedIn profile', description: 'Add new projects and skills', category: 'Professional', project: null, goalId: 'g6', priority: 'Low', status: 'Todo', dueDate: d(5), estimatedTime: 1, actualTime: 0, recurrence: null, notes: '' },
        { id: 't20', title: 'Team meeting for ML project', description: 'Discuss model architecture decisions', category: 'Project', project: 'p1', goalId: null, priority: 'High', status: 'Todo', dueDate: d(1), estimatedTime: 1, actualTime: 0, recurrence: null, notes: '' }
      ],

      projects: [
        { id: 'p1', name: 'ML Sentiment Analysis Engine', description: 'Build a sentiment analysis model for product reviews using transformers', objective: 'Achieve 92%+ accuracy on benchmark dataset', category: 'Academic', startDate: d(-20), deadline: d(25), status: 'Active', completion: 45, priority: 'High', collaborators: ['Alice Chen', 'Bob Kim'], repository: 'github.com/user/sentiment-engine', documentation: '', deliverables: ['Trained model', 'API endpoint', 'Research report'], milestones: [
            { id: 'm1', title: 'Data Collection & Preprocessing', status: 'Completed', date: d(-10), completion: 100 },
            { id: 'm2', title: 'Model Architecture Design', status: 'Completed', date: d(-5), completion: 100 },
            { id: 'm3', title: 'Training & Evaluation', status: 'Active', date: d(5), completion: 40 },
            { id: 'm4', title: 'API Development', status: 'Pending', date: d(15), completion: 0 },
            { id: 'm5', title: 'Final Report & Presentation', status: 'Pending', date: d(25), completion: 0 }
          ]},
        { id: 'p2', name: 'Personal Portfolio Website', description: 'Build a modern portfolio showcasing projects and skills', objective: 'Create a professional online presence', category: 'Professional', startDate: d(-30), deadline: d(15), status: 'Active', completion: 70, priority: 'Medium', collaborators: [], repository: 'github.com/user/portfolio', documentation: '', deliverables: ['Live website', 'Blog section', 'Project showcase'], milestones: [
            { id: 'm6', title: 'Design & Wireframing', status: 'Completed', date: d(-25), completion: 100 },
            { id: 'm7', title: 'Core Pages Development', status: 'Completed', date: d(-10), completion: 100 },
            { id: 'm8', title: 'Project Showcase Integration', status: 'Active', date: d(5), completion: 60 },
            { id: 'm9', title: 'Blog & SEO Optimization', status: 'Pending', date: d(15), completion: 0 }
          ]},
        { id: 'p3', name: 'Research Paper: Attention Mechanisms', description: 'Survey paper on attention mechanisms in NLP', objective: 'Submit to undergraduate research conference', category: 'Academic', startDate: d(-15), deadline: d(30), status: 'Active', completion: 30, priority: 'High', collaborators: ['Dr. James Park'], repository: '', documentation: 'Overleaf link', deliverables: ['Survey paper', 'Presentation'], milestones: [
            { id: 'm10', title: 'Literature Review', status: 'Active', date: d(6), completion: 60 },
            { id: 'm11', title: 'Comparative Analysis', status: 'Pending', date: d(15), completion: 0 },
            { id: 'm12', title: 'Draft Submission', status: 'Pending', date: d(25), completion: 0 },
            { id: 'm13', title: 'Final Submission', status: 'Pending', date: d(30), completion: 0 }
          ]},
        { id: 'p4', name: 'Open Source Contribution', description: 'Contribute to TensorFlow and scikit-learn', objective: 'Get 3 PRs merged in major open source projects', category: 'Professional', startDate: d(-45), deadline: d(60), status: 'Active', completion: 20, priority: 'Low', collaborators: [], repository: 'github.com/tensorflow/tensorflow', documentation: '', deliverables: ['Merged PRs', 'Bug fixes', 'Documentation improvements'], milestones: [
            { id: 'm14', title: 'First PR Submitted', status: 'Completed', date: d(-20), completion: 100 },
            { id: 'm15', title: 'First PR Merged', status: 'Active', date: d(10), completion: 50 },
            { id: 'm16', title: 'Second Contribution', status: 'Pending', date: d(30), completion: 0 },
            { id: 'm17', title: 'Third Contribution', status: 'Pending', date: d(60), completion: 0 }
          ]}
      ],

      goals: [
        { id: 'g1', title: 'Secure Summer Internship', level: 'Semester', parent: null, target: 'Get internship at top tech company', currentValue: 3, targetValue: 10, unit: 'applications sent', progress: 30, deadline: d(60), status: 'In Progress', priority: 'Critical', milestones: ['Complete resume', 'Apply to 10 companies', 'Get 3 interviews', 'Receive offer'] },
        { id: 'g2', title: 'Achieve 3.85 GPA', level: 'Semester', parent: null, target: 'Maintain 3.85+ GPA this semester', currentValue: 3.72, targetValue: 3.85, unit: 'GPA', progress: 72, deadline: d(90), status: 'In Progress', priority: 'High', milestones: ['Score 90+ in all midterms', 'Complete all assignments on time', 'Attend all classes'] },
        { id: 'g3', title: 'Complete ML Project', level: 'Semester', parent: null, target: 'Finish sentiment analysis engine with 92%+ accuracy', currentValue: 45, targetValue: 100, unit: '% complete', progress: 45, deadline: d(25), status: 'In Progress', priority: 'High', milestones: ['Train baseline model', 'Fine-tune transformer', 'Build API', 'Write report'] },
        { id: 'g4', title: 'Learn Cloud Computing', level: 'Yearly', parent: null, target: 'Get AWS Solutions Architect certification', currentValue: 40, targetValue: 100, unit: '% modules complete', progress: 40, deadline: d(120), status: 'In Progress', priority: 'Medium', milestones: ['Complete all modules', 'Pass practice exams', 'Take certification exam'] },
        { id: 'g5', title: 'LeetCode 300 Problems', level: 'Yearly', parent: null, target: 'Solve 300 LeetCode problems', currentValue: 187, targetValue: 300, unit: 'problems solved', progress: 62, deadline: d(150), status: 'In Progress', priority: 'Medium', milestones: ['100 easy', '150 medium', '50 hard'] },
        { id: 'g6', title: 'Build Professional Portfolio', level: 'Semester', parent: null, target: 'Create portfolio with 5 showcase projects', currentValue: 3, targetValue: 5, unit: 'projects', progress: 60, deadline: d(45), status: 'In Progress', priority: 'Medium', milestones: ['Portfolio website', 'Add ML project', 'Add web app', 'Add research', 'Add open source'] },
        { id: 'g7', title: 'Publish Research Paper', level: 'Yearly', parent: null, target: 'Submit survey paper to undergraduate conference', currentValue: 30, targetValue: 100, unit: '% complete', progress: 30, deadline: d(30), status: 'In Progress', priority: 'High', milestones: ['Literature review', 'Draft paper', 'Peer review', 'Submit'] },
        { id: 'g8', title: 'Weekly Study Target', level: 'Weekly', parent: 'g2', target: 'Study 30 hours per week', currentValue: 24, targetValue: 30, unit: 'hours', progress: 80, deadline: d(2), status: 'In Progress', priority: 'High', milestones: [] }
      ],

      applications: [
        { id: 'app1', company: 'Google', role: 'Software Engineering Intern', location: 'Mountain View, CA', applicationDate: d(-10), deadline: d(20), jobUrl: 'careers.google.com', resumeVersion: 'v3', coverLetter: true, referral: 'Yes - John Doe', stage: 'Interview', nextAction: 'Prepare for technical interview', followUpDate: d(2), interviewDate: d(7), result: null, notes: 'Passed phone screen, technical round scheduled' },
        { id: 'app2', company: 'Microsoft', role: 'SDE Intern', location: 'Redmond, WA', applicationDate: d(-15), deadline: null, jobUrl: 'careers.microsoft.com', resumeVersion: 'v3', coverLetter: true, referral: null, stage: 'OA/Test', nextAction: 'Complete online assessment', followUpDate: d(1), interviewDate: null, result: null, notes: 'OA due tomorrow' },
        { id: 'app3', company: 'Amazon', role: 'SDE Intern', location: 'Seattle, WA', applicationDate: d(-8), deadline: d(30), jobUrl: 'amazon.jobs', resumeVersion: 'v3', coverLetter: false, referral: null, stage: 'Applied', nextAction: 'Wait for response', followUpDate: d(7), interviewDate: null, result: null, notes: '' },
        { id: 'app4', company: 'Meta', role: 'ML Engineering Intern', location: 'Menlo Park, CA', applicationDate: d(-20), deadline: null, jobUrl: 'metacareers.com', resumeVersion: 'v2', coverLetter: true, referral: 'Yes - Jane Smith', stage: 'Final Round', nextAction: 'Prepare for system design interview', followUpDate: d(3), interviewDate: d(5), result: null, notes: 'Final round with hiring manager' },
        { id: 'app5', company: 'Apple', role: 'Software Engineer Intern', location: 'Cupertino, CA', applicationDate: d(-5), deadline: d(25), jobUrl: 'jobs.apple.com', resumeVersion: 'v3', coverLetter: true, referral: null, stage: 'Applied', nextAction: 'Follow up in 1 week', followUpDate: d(9), interviewDate: null, result: null, notes: '' },
        { id: 'app6', company: 'Netflix', role: 'Data Engineering Intern', location: 'Los Gatos, CA', applicationDate: null, deadline: d(15), jobUrl: 'jobs.netflix.com', resumeVersion: null, coverLetter: false, referral: null, stage: 'Saved', nextAction: 'Prepare application materials', followUpDate: null, interviewDate: null, result: null, notes: 'Interesting role, need to tailor resume' },
        { id: 'app7', company: 'Stripe', role: 'Backend Engineering Intern', location: 'San Francisco, CA', applicationDate: null, deadline: d(20), jobUrl: 'stripe.com/jobs', resumeVersion: null, coverLetter: false, referral: null, stage: 'Preparing', nextAction: 'Write cover letter', followUpDate: null, interviewDate: null, result: null, notes: '' },
        { id: 'app8', company: 'Uber', role: 'SDE Intern', location: 'San Francisco, CA', applicationDate: d(-25), deadline: null, jobUrl: 'uber.com/careers', resumeVersion: 'v2', coverLetter: false, referral: null, stage: 'Rejected', nextAction: null, followUpDate: null, interviewDate: d(-12), result: 'Rejected', notes: 'Rejected after phone screen. Review areas: system design' },
        { id: 'app9', company: 'Airbnb', role: 'Software Engineer Intern', location: 'San Francisco, CA', applicationDate: d(-30), deadline: null, jobUrl: 'careers.airbnb.com', resumeVersion: 'v2', coverLetter: true, referral: null, stage: 'Offer', nextAction: 'Review offer details', followUpDate: d(5), interviewDate: d(-15), result: 'Offer', notes: 'Offer received! $55/hr. Deadline to respond in 2 weeks.' },
        { id: 'app10', company: 'Databricks', role: 'ML Engineering Intern', location: 'San Francisco, CA', applicationDate: d(-3), deadline: d(30), jobUrl: 'databricks.com/careers', resumeVersion: 'v3', coverLetter: true, referral: 'Yes - Prof. Park', stage: 'Applied', nextAction: 'Wait for response', followUpDate: d(11), interviewDate: null, result: null, notes: 'Applied through professor referral' }
      ],

      skills: [
        { id: 's1', name: 'Python', category: 'Programming', currentLevel: 85, targetLevel: 95, evidence: ['ML Project', 'LeetCode solutions', 'Open source'], coursesCompleted: ['CS201', 'CS405'], certifications: [], lastPracticed: d(0), hoursInvested: 450 },
        { id: 's2', name: 'JavaScript', category: 'Programming', currentLevel: 80, targetLevel: 90, evidence: ['Portfolio website', 'Web Dev course'], coursesCompleted: ['CS250'], certifications: [], lastPracticed: d(-1), hoursInvested: 300 },
        { id: 's3', name: 'Machine Learning', category: 'Data Science', currentLevel: 65, targetLevel: 85, evidence: ['Sentiment Analysis Project', 'Course work'], coursesCompleted: ['CS405'], certifications: [], lastPracticed: d(0), hoursInvested: 200 },
        { id: 's4', name: 'TensorFlow/PyTorch', category: 'Machine Learning', currentLevel: 55, targetLevel: 80, evidence: ['ML Project'], coursesCompleted: [], certifications: [], lastPracticed: d(-3), hoursInvested: 120 },
        { id: 's5', name: 'React', category: 'Web Development', currentLevel: 70, targetLevel: 85, evidence: ['Portfolio website', 'Dashboard project'], coursesCompleted: ['CS250'], certifications: [], lastPracticed: d(-2), hoursInvested: 180 },
        { id: 's6', name: 'AWS', category: 'Cloud', currentLevel: 35, targetLevel: 75, evidence: ['AWS modules'], coursesCompleted: [], certifications: [], lastPracticed: d(-5), hoursInvested: 60 },
        { id: 's7', name: 'SQL', category: 'Databases', currentLevel: 75, targetLevel: 90, evidence: ['DBMS course', 'Projects'], coursesCompleted: ['CS301'], certifications: [], lastPracticed: d(-1), hoursInvested: 150 },
        { id: 's8', name: 'Data Structures', category: 'Algorithms', currentLevel: 72, targetLevel: 90, evidence: ['LeetCode', 'DSA course'], coursesCompleted: ['CS201'], certifications: [], lastPracticed: d(0), hoursInvested: 350 },
        { id: 's9', name: 'System Design', category: 'Algorithms', currentLevel: 40, targetLevel: 75, evidence: ['Interview prep', 'OS course'], coursesCompleted: [], certifications: [], lastPracticed: d(-4), hoursInvested: 80 },
        { id: 's10', name: 'Git/GitHub', category: 'Programming', currentLevel: 82, targetLevel: 90, evidence: ['All projects', 'Open source'], coursesCompleted: [], certifications: [], lastPracticed: d(0), hoursInvested: 200 },
        { id: 's11', name: 'Docker', category: 'Cloud', currentLevel: 30, targetLevel: 65, evidence: ['Deployment practice'], coursesCompleted: [], certifications: [], lastPracticed: d(-14), hoursInvested: 25 },
        { id: 's12', name: 'Communication', category: 'Communication', currentLevel: 75, targetLevel: 85, evidence: ['Presentations', 'Team projects'], coursesCompleted: [], certifications: [], lastPracticed: d(0), hoursInvested: null },
        { id: 's13', name: 'Leadership', category: 'Leadership', currentLevel: 60, targetLevel: 80, evidence: ['CS Club Vice President', 'Team lead for ML project'], coursesCompleted: [], certifications: [], lastPracticed: d(-3), hoursInvested: null },
        { id: 's14', name: 'Node.js', category: 'Web Development', currentLevel: 65, targetLevel: 80, evidence: ['REST API project', 'Web Dev course'], coursesCompleted: ['CS250'], certifications: [], lastPracticed: d(-2), hoursInvested: 130 },
        { id: 's15', name: 'NLP', category: 'Data Science', currentLevel: 45, targetLevel: 75, evidence: ['Research paper', 'ML project'], coursesCompleted: [], certifications: [], lastPracticed: d(-5), hoursInvested: 70 }
      ],

      achievements: [
        { id: 'ach1', title: 'Dean\'s List — Spring 2026', date: d(-90), category: 'Academic', description: 'Achieved GPA above 3.7 for Spring 2026 semester', evidence: 'Transcript', skills: ['Discipline', 'Time Management'] },
        { id: 'ach2', title: 'HackTech 2026 — 2nd Place', date: d(-45), category: 'Hackathon', description: 'Built an AI-powered study assistant in 36 hours', evidence: 'devpost.com/hacktech2026', skills: ['Python', 'ML', 'Teamwork', 'React'] },
        { id: 'ach3', title: 'CS Club Vice President', date: d(-60), category: 'Leadership', description: 'Elected VP of Computer Science Club, organizing workshops and events', evidence: 'club website', skills: ['Leadership', 'Communication', 'Event Planning'] },
        { id: 'ach4', title: 'AWS Cloud Practitioner', date: d(-30), category: 'Certification', description: 'Passed AWS Cloud Practitioner certification exam', evidence: 'Credly badge', skills: ['AWS', 'Cloud Computing'] },
        { id: 'ach5', title: 'LeetCode 150 Milestone', date: d(-20), category: 'Achievement', description: 'Solved 150+ problems on LeetCode', evidence: 'LeetCode profile', skills: ['DSA', 'Problem Solving', 'Python'] },
        { id: 'ach6', title: 'Open Source First PR', date: d(-20), category: 'Achievement', description: 'First pull request merged in TensorFlow repository', evidence: 'github.com/tensorflow/tensorflow/pull/xxxxx', skills: ['Python', 'TensorFlow', 'Open Source'] }
      ],

      events: [
        { id: 'ev1', title: 'Data Structures Lecture', category: 'Academic', date: dt(0, 9, 0), endDate: dt(0, 10, 30), type: 'Class', recurring: 'MWF', courseId: 'c1' },
        { id: 'ev2', title: 'Machine Learning Lecture', category: 'Academic', date: dt(0, 11, 0), endDate: dt(0, 12, 30), type: 'Class', recurring: 'TTh', courseId: 'c2' },
        { id: 'ev3', title: 'DBMS Lab', category: 'Academic', date: dt(0, 14, 0), endDate: dt(0, 16, 0), type: 'Class', recurring: 'W', courseId: 'c3' },
        { id: 'ev4', title: 'OS Lecture', category: 'Academic', date: dt(1, 10, 0), endDate: dt(1, 11, 30), type: 'Class', recurring: 'TTh', courseId: 'c4' },
        { id: 'ev5', title: 'Linear Algebra', category: 'Academic', date: dt(0, 13, 0), endDate: dt(0, 14, 0), type: 'Class', recurring: 'MWF', courseId: 'c5' },
        { id: 'ev6', title: 'Web Dev Workshop', category: 'Academic', date: dt(2, 15, 0), endDate: dt(2, 17, 0), type: 'Class', recurring: 'F', courseId: 'c6' },
        { id: 'ev7', title: 'ML Project Team Meeting', category: 'Project', date: dt(1, 16, 0), endDate: dt(1, 17, 0), type: 'Meeting', recurring: null, courseId: null },
        { id: 'ev8', title: 'Google Technical Interview', category: 'Professional', date: dt(7, 14, 0), endDate: dt(7, 15, 0), type: 'Interview', recurring: null, courseId: null },
        { id: 'ev9', title: 'Meta Final Round', category: 'Professional', date: dt(5, 10, 0), endDate: dt(5, 12, 0), type: 'Interview', recurring: null, courseId: null },
        { id: 'ev10', title: 'Study Session — DSA Midterm', category: 'Academic', date: dt(3, 18, 0), endDate: dt(3, 21, 0), type: 'Study', recurring: null, courseId: 'c1' },
        { id: 'ev11', title: 'CS Club General Meeting', category: 'Personal', date: dt(4, 17, 0), endDate: dt(4, 18, 30), type: 'Meeting', recurring: 'Bi-weekly', courseId: null },
        { id: 'ev12', title: 'Career Fair', category: 'Professional', date: dt(10, 10, 0), endDate: dt(10, 16, 0), type: 'Event', recurring: null, courseId: null },
        { id: 'ev13', title: 'ML Quiz', category: 'Academic', date: dt(5, 11, 0), endDate: dt(5, 12, 0), type: 'Exam', recurring: null, courseId: 'c2' },
        { id: 'ev14', title: 'Portfolio Review with Mentor', category: 'Professional', date: dt(6, 15, 0), endDate: dt(6, 16, 0), type: 'Meeting', recurring: null, courseId: null },
        { id: 'ev15', title: 'Research Meeting with Dr. Park', category: 'Academic', date: dt(3, 14, 0), endDate: dt(3, 15, 0), type: 'Meeting', recurring: 'Weekly', courseId: null }
      ],

      documents: [
        { id: 'doc1', title: 'Resume v3', category: 'Career', type: 'PDF', url: '#', tags: ['resume', 'career', 'applications'], updatedAt: d(-2) },
        { id: 'doc2', title: 'Cover Letter Template', category: 'Career', type: 'Doc', url: '#', tags: ['cover letter', 'career'], updatedAt: d(-5) },
        { id: 'doc3', title: 'ML Lecture Notes', category: 'Academic', type: 'Notes', url: '#', tags: ['ML', 'lectures', 'CS405'], updatedAt: d(-1) },
        { id: 'doc4', title: 'DSA Cheat Sheet', category: 'Academic', type: 'PDF', url: '#', tags: ['DSA', 'algorithms', 'interview'], updatedAt: d(-10) },
        { id: 'doc5', title: 'System Design Primer', category: 'Career', type: 'Link', url: 'github.com/donnemartin/system-design-primer', tags: ['system design', 'interview'], updatedAt: d(-15) },
        { id: 'doc6', title: 'AWS Study Guide', category: 'Certification', type: 'PDF', url: '#', tags: ['AWS', 'cloud', 'certification'], updatedAt: d(-8) },
        { id: 'doc7', title: 'Research Paper Draft', category: 'Academic', type: 'Overleaf', url: '#', tags: ['research', 'NLP', 'attention'], updatedAt: d(-3) },
        { id: 'doc8', title: 'Internship Tracker Spreadsheet', category: 'Career', type: 'Sheet', url: '#', tags: ['internship', 'applications'], updatedAt: d(-1) }
      ],

      notifications: [
        { id: 'n1', title: 'SQL Assignment Overdue', message: 'Your DBMS assignment was due yesterday. Contact your TA about late submission.', type: 'critical', category: 'Academic', read: false, date: d(-1) },
        { id: 'n2', title: 'Microsoft OA Due Tomorrow', message: 'Complete the online assessment for Microsoft SDE Intern position.', type: 'high', category: 'Professional', read: false, date: d(0) },
        { id: 'n3', title: 'DSA Exam in 12 Days', message: 'Your preparation is only 42% complete. Consider increasing study hours.', type: 'high', category: 'Academic', read: false, date: d(0) },
        { id: 'n4', title: 'Meta Final Round in 5 Days', message: 'Prepare for system design interview with hiring manager.', type: 'high', category: 'Professional', read: false, date: d(0) },
        { id: 'n5', title: 'ML Project Milestone Due', message: 'Training & Evaluation milestone is approaching. Current progress: 40%.', type: 'medium', category: 'Project', read: false, date: d(0) },
        { id: 'n6', title: '3 Assignments Due This Week', message: 'AVL Tree (2 days), Eigenvalue (3 days), ML Quiz (5 days).', type: 'medium', category: 'Academic', read: true, date: d(-1) },
        { id: 'n7', title: 'Airbnb Offer Response', message: 'You have an offer from Airbnb. Review details and respond within 2 weeks.', type: 'high', category: 'Professional', read: false, date: d(0) },
        { id: 'n8', title: 'Weekly LeetCode Target', message: 'You are behind your monthly LeetCode target by 8 problems.', type: 'low', category: 'Professional', read: true, date: d(-2) }
      ]
    };
  }
};
