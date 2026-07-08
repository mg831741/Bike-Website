import teamData from "../data/teamData";
import "../styles/team.css";

function Team() {
  return (
    <section className="team" id="team">
      <h2>Meet Our Team</h2>
      <p className="team-subtitle">
        The passionate mechanics and restoration experts behind MG Garage who keep your machine running at its absolute best.
      </p>

      {/* Owner Spotlight */}
      <div className="owner-card-container">
        <div className="team-card owner-card">
          <div className="profile-img-wrapper">
            <img src={teamData.owner.image} alt={teamData.owner.name} />
          </div>
          <div className="owner-info">
            <span className="owner-tag">Owner & Founder</span>
            <h3>{teamData.owner.name}</h3>
            <p className="role">{teamData.owner.role}</p>
            <p className="exp-badge">⚙️ {teamData.owner.experience}</p>
            <p className="bio">{teamData.owner.bio}</p>
            <div className="specialties">
              {teamData.owner.specialties.map((spec, index) => (
                <span key={index} className="specialty-tag">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="employee-grid">
        {teamData.employees.map((employee) => (
          <div className="team-card employee-card" key={employee.id}>
            <div className="profile-img-container">
              <div className="profile-img-wrapper">
                <img src={employee.image} alt={employee.name} />
              </div>
              <span className="profile-role-badge">{employee.role}</span>
            </div>
            <h3>{employee.name}</h3>
            <p className="exp-badge">🔧 {employee.experience}</p>
            <p className="bio">{employee.bio}</p>
            <div className="specialties">
              {employee.specialties.map((spec, index) => (
                <span key={index} className="specialty-tag">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;
