import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import AddMemberModal from '../../components/team/AddMemberModal';
import { useQuery } from '@tanstack/react-query';
import { getProjectTeam } from '../../services/TeamApi';
import ListMembersTeam from '../../components/team/ListMembersTeam';

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!

  const {data, isLoading, isError} = useQuery({
    queryKey: ['project-team', projectId],
    queryFn: () => getProjectTeam(projectId),
    enabled: !!projectId, // only run the query if projectId is defined
    retry: false
  });

  if(isLoading) return <p>Loading...</p>
  if(isError) return <Navigate to="/404" />

  if(data)
  return (
    <>
        <h1 className="text-5xl font-black">Admin the team</h1>
            <p className="font-2xl font-light mt-5 text-gray-500">manage the work team</p>

            <nav className="my-5 flex gap-3">
                <button className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white
                 text-xl font-bold cursor-pointer transition-colors rounded-lg' onClick={()=>navigate('?addMember=true')}>
                    Add Collaborators
                </button>
                <Link to={`/projects/${projectId}`} className='bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white
                 text-xl font-bold cursor-pointer transition-colors rounded-lg'>
                    back to Project
                </Link>
            </nav>

            <ListMembersTeam data={data} />
            <AddMemberModal />
    </>
  )
}
