import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom'
import { getProjectById } from '../../services/ProjectApi';
import EditProjectForm from '../../components/projects/EditProjectForm';
import Spinner from '../../components/Spinner';

export default function EditProjectView() {

  const params = useParams();
  const projectId = params.projectId!    
  const {data, isLoading, isError} = useQuery({
      queryKey:['editProject',projectId], //queryKey should be unique in the application
      queryFn : () => getProjectById(projectId) //no hacer reintentos si falla una vez la consulta
  });
  
  if (isLoading) return <Spinner/>;
  if (isError) return <Navigate to={'/404'}/>
  if (data) return <EditProjectForm data={data} projectId={projectId}/>
}
