import { Input } from '../ui/input'
import { Button } from '../ui/button'

const SearchBar = () => {
    return (
        <div className='w-full flex flex-row'>
            <Input type='text' placeholder="Search..." className="block w-10/12 px-4 py-2 border" />
            <Button className="px-4 text-white border-l rounded">Search</Button>
        </div>
    )
}

export default SearchBar
