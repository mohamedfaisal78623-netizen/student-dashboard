<<<<<<< HEAD

import { useState } from "react";
import "./App.css";

// ======================================
// STUDENT DATA
// Replace sample marks with actual marks
// ======================================

const students = [
  {
    id: 1,
    name: "Mohamed Mushthar",
    register: "311824201033",
    initials: "MM",
    department: "Artificial Intelligence & Data Science",
    college: "Mohamed Sathak AJ College of Engineering",
    year: "Not added",
    section: "Not added",
    email: "Not added",
    phone: "Not added",
    attendance: 92,
    subjects: [
      { code: "AI", name: "Artificial Intelligence", marks: 88 },
      { code: "MCI", name: "MCI", marks: 84 },
      { code: "CN", name: "Computer Networks", marks: 91 },
      { code: "OS", name: "Operating Systems", marks: 86 },
    ],
  },
  {
    id: 2,
    name: "Mohamed Faisal",
    register: "311824201027",
    initials: "MF",
    department: "Artificial Intelligence & Data Science",
    college: "Mohamed Sathak AJ College of Engineering",
    year: "Not added",
    section: "Not added",
    email: "Not added",
    phone: "Not added",
    attendance: 89,
    subjects: [
      { code: "AI", name: "Artificial Intelligence", marks: 90 },
      { code: "MCI", name: "MCI", marks: 87 },
      { code: "CN", name: "Computer Networks", marks: 85 },
      { code: "OS", name: "Operating Systems", marks: 89 },
    ],
  },
];

// ======================================
// HELPER FUNCTIONS
// ======================================

function calculateAverage(subjects) {
  if (!subjects.length) return 0;

  const total = subjects.reduce(
    (sum, subject) => sum + subject.marks,
    0
  );

  return Math.round(total / subjects.length);
}

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  return "Needs Improvement";
}

function getProgressColor(value) {
  if (value >= 90) return "excellent";
  if (value >= 75) return "good";
  return "average";
}

// ======================================
// REUSABLE COMPONENTS
// ======================================

function MetricCard({ title, value, description, icon, color }) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span>{title}</span>
        <span className={`metric-icon ${color}`}>{icon}</span>
      </div>

      <h2>{value}</h2>

      <p>{description}</p>
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="progress-track">
      <div
        className={`progress-fill ${getProgressColor(value)}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function AttendanceCircle({ percentage, large = false }) {
  return (
    <div
      className={`attendance-circle ${large ? "large-circle" : ""}`}
      style={{ "--attendance": `${percentage}%` }}
    >
      <div>
        <strong>{percentage}%</strong>
        <span>Attendance</span>
      </div>
    </div>
  );
}

// ======================================
// MAIN APPLICATION
// ======================================

function App() {
  const [selected, setSelected] = useState(0);
  const [page, setPage] = useState("Dashboard");

  const student = students[selected];

  const average = calculateAverage(student.subjects);
  const grade = getGrade(average);

  // Navigation menu
  const navigation = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Academic Performance", icon: "▥" },
    { name: "Attendance", icon: "◷" },
    { name: "Student Profile", icon: "♙" },
    { name: "ID Card", icon: "▣" },
    { name: "All Students", icon: "♧" },
  ];

  // ====================================
  // DASHBOARD PAGE
  // ====================================

  function DashboardPage() {
    return (
      <>
        <section className="welcome-card">
          <div>
            <span className="active-status">
              ● ACTIVE STUDENT
            </span>

            <h2>Welcome back, {student.name}!</h2>

            <p>
              Your academic performance and student overview.
            </p>
          </div>

          <div className="welcome-avatar">
            {student.initials}
          </div>
        </section>

        <section className="metric-grid">
          <MetricCard
            title="Attendance"
            value={`${student.attendance}%`}
            description="Overall attendance"
            icon="◷"
            color="blue"
          />

          <MetricCard
            title="Marks Percentage"
            value={`${average}%`}
            description="Average of all subjects"
            icon="▥"
            color="purple"
          />

          <MetricCard
            title="Total Subjects"
            value={student.subjects.length}
            description="Subjects recorded"
            icon="▤"
            color="green"
          />

          <MetricCard
            title="Overall Grade"
            value={grade}
            description="Calculated from marks"
            icon="★"
            color="orange"
          />
        </section>

        <section className="content-grid">

          {/* SUBJECT PERFORMANCE */}

          <div className="panel">
            <div className="panel-heading">
              <div>
                <h2>Subject Performance</h2>
                <p>Your subject-wise marks overview</p>
              </div>

              <button
                className="text-button"
                onClick={() => setPage("Academic Performance")}
              >
                View all →
              </button>
            </div>

            {student.subjects.map((subject) => (
              <div className="subject-row" key={subject.code}>
                <div className="subject-icon">
                  {subject.code}
                </div>

                <div className="subject-details">
                  <strong>{subject.name}</strong>
                  <ProgressBar value={subject.marks} />
                </div>

                <strong className="subject-score">
                  {subject.marks}%
                </strong>
              </div>
            ))}
          </div>

          {/* ATTENDANCE OVERVIEW */}

          <div className="panel attendance-panel">
            <div className="panel-heading">
              <div>
                <h2>Attendance Overview</h2>
                <p>Overall attendance record</p>
              </div>
            </div>

            <AttendanceCircle
              percentage={student.attendance}
            />

            <p className="attendance-message">
              {student.attendance >= 75
                ? "Above the 75% reference attendance level."
                : "Below the 75% reference attendance level."}
            </p>

            <div className="attendance-legend">
              <span>
                <i className="legend-blue"></i>
                Recorded attendance
              </span>

              <span>
                <i className="legend-gray"></i>
                Remaining percentage
              </span>
            </div>
          </div>
        </section>

        {/* STUDENT SUMMARY */}

        <section className="panel student-summary">
          <div className="panel-heading">
            <div>
              <h2>Student Information</h2>
              <p>Personal and academic details</p>
            </div>

            <button
              className="text-button"
              onClick={() => setPage("Student Profile")}
            >
              Full profile →
            </button>
          </div>

          <div className="info-grid">
            <div>
              <label>Full Name</label>
              <strong>{student.name}</strong>
            </div>

            <div>
              <label>Register Number</label>
              <strong>{student.register}</strong>
            </div>

            <div>
              <label>Department</label>
              <strong>{student.department}</strong>
            </div>

            <div>
              <label>College</label>
              <strong>{student.college}</strong>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ====================================
  // ACADEMIC PERFORMANCE PAGE
  // ====================================

  function AcademicPage() {
    return (
      <>
        <section className="page-intro">
          <h2>Academic Performance</h2>
          <p>View your marks and subject-wise results.</p>
        </section>

        <section className="metric-grid performance-metrics">
          <MetricCard
            title="Average Percentage"
            value={`${average}%`}
            description="Overall academic percentage"
            icon="%"
            color="blue"
          />

          <MetricCard
            title="Overall Grade"
            value={grade}
            description="Calculated grade"
            icon="★"
            color="purple"
          />

          <MetricCard
            title="Total Subjects"
            value={student.subjects.length}
            description="Subjects recorded"
            icon="▤"
            color="green"
          />
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Subject-wise Results</h2>
              <p>Marks scored out of 100</p>
            </div>
          </div>

          {student.subjects.map((subject) => (
            <div className="performance-row" key={subject.code}>
              <div className="subject-icon">
                {subject.code}
              </div>

              <div className="performance-info">
                <strong>{subject.name}</strong>
                <ProgressBar value={subject.marks} />
              </div>

              <div className="performance-mark">
                {subject.marks}/100
                <small>{subject.marks}%</small>
              </div>
            </div>
          ))}
        </section>
      </>
    );
  }

  // ====================================
  // ATTENDANCE PAGE
  // ====================================

  function AttendancePage() {
    return (
      <>
        <section className="page-intro">
          <h2>Attendance Management</h2>
          <p>Monitor your overall attendance percentage.</p>
        </section>

        <section className="attendance-detail panel">

          <AttendanceCircle
            percentage={student.attendance}
            large
          />

          <div className="attendance-detail-info">
            <span className="active-status">
              CURRENT RECORD
            </span>

            <h2>{student.name}</h2>

            <p>Register Number: {student.register}</p>

            <ProgressBar value={student.attendance} />

            <p>
              {student.attendance >= 75
                ? "Your attendance is above the 75% reference level."
                : "Your attendance is below the 75% reference level."}
            </p>

            <div className="attendance-reference">
              <span>Reference level</span>
              <strong>75%</strong>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ====================================
  // STUDENT PROFILE PAGE
  // ====================================

  function ProfilePage() {
    return (
      <>
        <section className="page-intro">
          <h2>Student Profile</h2>
          <p>Your personal and academic information.</p>
        </section>

        <section className="profile-hero">
          <div className="profile-photo">
            {student.initials}
          </div>

          <div className="profile-hero-info">
            <span className="active-status">
              ● ACTIVE PROFILE
            </span>

            <h2>{student.name}</h2>

            <p>{student.department}</p>

            <span className="profile-register">
              REGISTER NO: {student.register}
            </span>
          </div>
        </section>

        <section className="panel profile-details-panel">
          <div className="panel-heading">
            <div>
              <h2>Personal Information</h2>
              <p>Student profile details</p>
            </div>
          </div>

          <div className="info-grid">
            <div>
              <label>Full Name</label>
              <strong>{student.name}</strong>
            </div>

            <div>
              <label>Register Number</label>
              <strong>{student.register}</strong>
            </div>

            <div>
              <label>Email Address</label>
              <strong>{student.email}</strong>
            </div>

            <div>
              <label>Phone Number</label>
              <strong>{student.phone}</strong>
            </div>

            <div>
              <label>Department</label>
              <strong>{student.department}</strong>
            </div>

            <div>
              <label>Section</label>
              <strong>{student.section}</strong>
            </div>

            <div>
              <label>Academic Year</label>
              <strong>{student.year}</strong>
            </div>

            <div>
              <label>College</label>
              <strong>{student.college}</strong>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ====================================
  // STUDENT ID CARD PAGE
  // ====================================

  function IDCardPage() {
    return (
      <>
        <section className="page-intro">
          <h2>Digital Student Identity Card</h2>
          <p>Your college student identification card.</p>
        </section>

        <section className="id-card">
          <div className="id-header">
            <h3>AJCE</h3>
            <span>STUDENT IDENTITY CARD</span>
          </div>

          <div className="id-content">
            <div className="id-avatar">
              {student.initials}
            </div>

            <h2>{student.name}</h2>

            <p>{student.department}</p>

            <div className="id-register">
              <label>REGISTER NUMBER</label>
              <h3>{student.register}</h3>
            </div>

            <div className="id-footer">
              <span>STUDENT</span>
              <span>AJ COLLEGE</span>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ====================================
  // ALL STUDENTS PAGE
  // ====================================

  function StudentsPage() {
    return (
      <>
        <section className="page-intro">
          <h2>Student Directory</h2>
          <p>View and manage the two student profiles.</p>
        </section>

        <section className="directory-grid">
          {students.map((s, index) => {
            const studentAverage = calculateAverage(s.subjects);

            return (
              <div className="directory-card" key={s.id}>
                <div className="directory-avatar">
                  {s.initials}
                </div>

                <span className="directory-status">
                  ACTIVE STUDENT
                </span>

                <h3>{s.name}</h3>

                <p>{s.register}</p>

                <div className="directory-stats">
                  <span>
                    Attendance
                    <strong>{s.attendance}%</strong>
                  </span>

                  <span>
                    Marks
                    <strong>{studentAverage}%</strong>
                  </span>
                </div>

                <button
                  className="view-button"
                  onClick={() => {
                    setSelected(index);
                    setPage("Student Profile");
                  }}
                >
                  View Profile →
                </button>
              </div>
            );
          })}
        </section>
      </>
    );
  }

  // ====================================
  // PAGE RENDERING
  // ====================================

  function renderPage() {
    switch (page) {
      case "Dashboard":
        return <DashboardPage />;

      case "Academic Performance":
        return <AcademicPage />;

      case "Attendance":
        return <AttendancePage />;

      case "Student Profile":
        return <ProfilePage />;

      case "ID Card":
        return <IDCardPage />;

      case "All Students":
        return <StudentsPage />;

      default:
        return <DashboardPage />;
    }
  }

  // ====================================
  // APPLICATION LAYOUT
  // ====================================

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside className="sidebar">
        <h2 className="logo">
          STUDENT <span>HUB.</span>
        </h2>

        <div className="sidebar-label">
          WORKSPACE
        </div>

        {navigation.map((item) => (
          <button
            key={item.name}
            className={page === item.name ? "nav active" : "nav"}
            onClick={() => setPage(item.name)}
          >
            <span className="nav-icon">
              {item.icon}
            </span>

            {item.name}
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="avatar">
            {student.initials}
          </div>

          <div>
            <strong>{student.name}</strong>
            <p>Student Account</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">

        <header className="topbar">
          <div>
            <h1>{page}</h1>
            <p>College Student Management Portal</p>
          </div>

          <div className="topbar-right">
            <span className="online-dot"></span>
            <span>Academic Portal</span>
          </div>
        </header>

        {/* STUDENT SWITCHER */}

        <section className="profile-switch">
          <div>
            <h3>Student Workspace</h3>
            <p>Select a profile to view academic records.</p>
          </div>

          <div className="switch-buttons">
            {students.map((s, index) => (
              <button
                key={s.id}
                className={selected === index ? "selected" : ""}
                onClick={() => setSelected(index)}
              >
                {s.name}
              </button>
            ))}
          </div>
        </section>

        {/* ACTIVE PAGE */}

        {renderPage()}

        {/* FOOTER */}

        <footer className="footer">
          © 2026 STUDENT HUB | Mohamed Sathak AJ College of Engineering
        </footer>

      </main>
=======
import StudentCard from "./student-card.jsx";

function App() {
  return (
    <div>
      <StudentCard />
>>>>>>> 42b45084590a14e1fe59af9f6157d54e85c8594c
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 42b45084590a14e1fe59af9f6157d54e85c8594c
