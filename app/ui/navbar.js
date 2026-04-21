import NavButton from './navButton';

export default function NavBar() {

    return (
        <div className=' p-1.5 left-0 bottom-0 fixed md:h-full h-30 bg-light-bg md:w-45 w-full justify-items-center shadow-2xl shadow-light-bg'>
            <h1 className='m-5 text-2xl font-semibold not-md:hidden'>Admin</h1>
            <NavButton title="Rendelesek" path="./"/>
            <NavButton title="Event hozzáadása" path="./events" />
        </div>
    );
}