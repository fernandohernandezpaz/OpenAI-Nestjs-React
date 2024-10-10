import {NavLink} from 'react-router-dom';

interface Props {
    to: string;
    icon?: string;
    title: string;
    description?: string;
}

const basicClassNames = 'flex justify-center my-px items-center rounded p2 transition-colors'

export const SidebarMenuItem = ({
                                    to, icon, title, description
                                }: Props) => {
    return (
        <>
            <NavLink
                key={to}
                to={to}
                className={({isActive}) =>
                    isActive
                        ? `${basicClassNames} bg-gray-800`
                        : `${basicClassNames} hover:bg-gray-800`
                }
            >
                <i className={`${icon} text-2xl mr-4 text-indigo-400`}></i>
                <div className={'flex flex-col flex-grow'}>
                                <span className={'text-white text-lg font-semibold'}>
                                    {title}
                                </span>
                    <span className={'text-gray-400 text-sm'}>
                                    {description}
                                </span>
                </div>
            </NavLink>
        </>
    )
}
