import './Home.css';
import PropTypes from 'prop-types';

const Task = (props) => {
    const { tasks, deleteTask } = props;

    // Debugging: Check what tasks is
    console.log('Tasks:', tasks);

    return (
        <div className="title-content-container">
            <ul style={{ listStyleType: "none" }}>
                {Array.isArray(tasks) ? (
                    tasks.map((task, index) => (
                        <li key={index}>
                            <div>
                                <h1 className="title">{task.title}</h1>
                                <p className="content">{task.content}</p>
                            </div>
                            <button type="button" onClick={() => deleteTask(task.post_id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
            </ul>
        </div>
    );
};

// Optional: Add PropTypes for type checking
Task.propTypes = {
    tasks: PropTypes.array.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default Task;
