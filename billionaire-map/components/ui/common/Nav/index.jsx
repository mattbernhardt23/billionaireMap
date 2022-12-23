import Link from "next/link"
import { User } from '@components/ui/common'
import { Button } from "@components/ui/common"
import Image from "next/image"

export default function Navbar() {



    return (
    
      <section>
        <div className="relative py-2">
          <nav className="relative"  aria-label="Global">
            <div className="flex flex-row justify-between sticky w-full border-b-4 border-gray-600 ">
              <div className="flex flex-row items-center">
                <Link href='/' legacyBehavior>
                  <a>
                <Button 
                  className="font-large"
                  variant="gray"
                  size="md"
                  hoverable={true}
                >
                  Home
                </Button>
                </a>
                </Link>
                <Link href='/about' legacyBehavior>
                  <a>
                <Button 
                  className="font-large mx-2"
                  variant="gray"
                  size="md"
                >
                  About
                </Button>
                </a>
                </Link>
                </div>
              <div className="w-1/3">
                <div className="mr-4 mb-4 hidden sm:flex">
                  <Image
                    src="/logo.png"
                    width="500"
                    height="500"
                    alt="logo"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <User />
              </div>
            </div> 
          </nav>
        </div> 
      </section>

    )
}
