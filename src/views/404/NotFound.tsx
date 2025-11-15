import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
        <h1 className="font-black text-center text-4xl text-white">Not Found</h1>
        <p className="mt-10 text-center text-white">
            Go to {''}
            <Link className="text-fuchsia-500" to={'/'}>
                projects
            </Link>
        </p>
    </>
  )
}
