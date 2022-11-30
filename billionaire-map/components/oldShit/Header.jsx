import Logo from './Logo'
import User from './User'
import SearchBar from './SearchBar'

function Header() {
  return (
    <header className=''>
        <div className="flex items-center justify-between my-2">
            <SearchBar />
            <Logo />
            <User />
        </div>
    </header>
  )
}

export default Header