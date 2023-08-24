import React from 'react';

interface ProjectDetailProps {
  readme: string;
  loading: boolean;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ readme, loading }) => {
  if (loading) {
    return <p>Loading...</p>; // Display loading indicator
  }

  return (
    <div
      className="mt-4 p-4 bg-gray-100 border rounded-lg"
      dangerouslySetInnerHTML={{ __html: readme }}
    />
  );
};


export default ProjectDetail;
