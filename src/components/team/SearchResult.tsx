import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { TeamMember } from "../../types"
import { addMemberToProject } from "../../services/TeamApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type SearchResultProps = {
    user : TeamMember,
    reset : () => void
}
export default function SearchResult({ user, reset }: SearchResultProps) {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: addMemberToProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
            queryClient.invalidateQueries({queryKey: ['project-team', projectId]});
            navigate(location.pathname, { replace: true });
        }
    });

    const handleAddMember = () => {
        mutate({projectId, userId: user._id})
    }


  return (
    <>
        <p className="mt-10 text-center font-bold">User:</p>
        <div className="flex justify-between text-center">
            <p>{user.name}</p>
            <button className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
            onClick={handleAddMember}>
                Add to Project
            </button>
        </div>
    </>
  )
}
