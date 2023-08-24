import React from 'react';

interface ProjectListProps {
  projects: string[];
  onProjectClick: (projectName: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectClick }) => {
  return (
    <ul className="mt-4">
      {projects.map((project) => (
        <li
          key={project}
          className="cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={() => onProjectClick(project)}
        >
          {project}
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
