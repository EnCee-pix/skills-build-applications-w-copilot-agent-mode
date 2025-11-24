import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);

  return (
    <div>
      <h2 className="mb-4 display-6">Workouts</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Workout Name</th>
            <th>Suggested For</th>
          </tr>
        </thead>
        <tbody>
          {workouts.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No workouts found.</td>
            </tr>
          ) : (
            workouts.map((workout, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{workout.name}</td>
                <td>{workout.suggested_for && workout.suggested_for.join(', ')}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Workouts;
