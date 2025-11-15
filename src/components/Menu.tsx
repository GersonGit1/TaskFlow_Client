import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ArrowLeftStartOnRectangleIcon, Bars3Icon, BriefcaseIcon, UserIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query';
import type { User } from '../types';

type NavMenuProps = {
  name: User['name']
}


export default function MenuNav({name}:NavMenuProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = () => {
    localStorage.removeItem('uptask_token');
    queryClient.invalidateQueries({queryKey: ['user']});
    navigate('/auth/login');
  }
  return (
    <div className="relative w-52 right-2 text-right cursor-pointer">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold
         text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white
          data-hover:bg-purple-600 data-open:bg-purple-500">
           <Bars3Icon className='w-8 h-8 text-white cursor-pointer ' />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 absolute bg-white origin-top-right rounded-xl border border-white/5 p-1 text-sm/6
           text-gray-900 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
            <p className='text-center'>Hola, {name}</p>
          <MenuItem>
           <Link
              to='/profile'
              className='flex gap-2 p-2 hover:text-purple-950 cursor-pointer'
            >
                <UserIcon className="size-6"/>
                Mi Perfil
            </Link>
          </MenuItem>
          <MenuItem>
           <Link
              to='/'
              className='flex gap-2 p-2 hover:text-purple-950 cursor-pointer'
            >
                <BriefcaseIcon className="size-6"/>
                Mis Proyectos
            </Link>
          </MenuItem>
          <div className="my-1 mx-1.5 h-px bg-gray-300 w-[90%]" />
          <MenuItem>
            <button
              className='flex gap-2 p-2 hover:text-purple-950 cursor-pointer'
              type='button'
              onClick={() => logout()}
            >
                <ArrowLeftStartOnRectangleIcon className="size-6" />
                Cerrar Sesión
            </button>
          </MenuItem>        
        </MenuItems>
      </Menu>
    </div>
  )
}
