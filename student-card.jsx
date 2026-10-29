import "./style.css";

function StudentCard() {
  return (
    <div className="student-card">
      <h2>Student Dashboard</h2>
      <h3>Welcome, Student!</h3>

      <p>Name: Mohamed</p>
      <p>Department: AIDS</p>
      <p>Year: 2nd Year</p>

      <button>View Profile</button>
    </div>
  );
}

export default StudentCard;