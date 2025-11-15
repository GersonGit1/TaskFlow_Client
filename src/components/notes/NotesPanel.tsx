import type { Task } from '../../types'
import AddNoteForm from './AddNoteForm'
import NoteDetail from './NoteDetail'

type NotesPanelProps = {
    notes: Task['notes']
}

export default function NotesPanel({ notes }: NotesPanelProps) {
  return (
    <>
        <AddNoteForm />
        <div className="divide-y divide-gray-100 mt-10">
            {notes.length > 0 ? (
                <>
                    <p className="font-bold text-2xl text-slate-600 mb-5">Notes: </p>
                    {notes.map((note) => <NoteDetail key={note._id} note={note}/>)}
                </>
            ) : 
            <p className="text-center text-gray-500 pt-3">No notes yet</p>
            }
        </div>
    </>
  )
}
