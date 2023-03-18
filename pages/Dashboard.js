import religions from '../path/to/religions';

function Dashboard() {
  return (
    <div>
      {religions.map((religion) => (
        <div key={religion.id}>
          <h2>{religion.name}</h2>
          <p>{religion.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;