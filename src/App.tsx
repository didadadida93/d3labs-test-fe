import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput from './components/SearchInput';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';

function App() {
  const [username, setUsername] = useState('');
  const [projects, setProjects] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [readme, setReadme] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username) {
      axios
        .get(`https://api.github.com/users/${username}/repos`)
        .then((response) => {
          const projectNames = response.data.map((repo: any) => repo.name);
          setProjects(projectNames);
        })
        .catch((error) => {
          console.error('Error fetching projects:', error);
        });
    }
  }, [username]);

  const handleProjectClick = (projectName: string) => {
    const headers = {
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    setSelectedProject(projectName);
    setLoading(true);
    axios
      .get(`https://api.github.com/repos/${username}/${projectName}/readme`, {
        headers
      })
      .then((response) => {
        setReadme(response.data);
      })
      .catch((_) => {
        setReadme("Failed to load README");
      })
      .finally(() => {
        setLoading(false); // Set loading state back to false
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="container max-w-5xl p-4 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">GitHub Projects Viewer</h1>
        <SearchInput onSearch={setUsername} />
        <ProjectList projects={projects} onProjectClick={handleProjectClick} />
        {selectedProject && <ProjectDetail readme={readme} loading={loading} />}
      </div>
    </div>
  );
}

export default App;
