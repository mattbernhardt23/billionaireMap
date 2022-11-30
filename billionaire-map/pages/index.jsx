import { Map, Stats, Search } from "@components/ui/main"


export default function Home() {
  return (
    <div className='flex flex-row'>
        <div className="w-2/3 pr-4 pt-2">
          <Search />
          <Map />
        </div>
        <div className="w-1/3">
          <Stats />
        </div>
    </div>
  )
}
