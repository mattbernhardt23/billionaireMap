import Link from "next/link"
import { User } from '@components/ui/common'
import { Button } from "@components/ui/common"
import Image from "next/image"

export default function Navbar() {



    return (
    
      <section>
        <div className="relative py-2">
          <nav className="relative"  aria-label="Global">
            <div className="flex flex-row justify-between sticky w-full border-b-4 border-gray-500 ">
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

// <section>
    //   <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
    //     <nav className="relative" aria-label="Global">
    //       <div className="flex flex-col xs:flex-row justify-between items-center">
    //           <Link href="/" legacyBehavior>
    //             <a
    //               className="font-medium mr-8 text-gray-500 hover:text-gray-900">
    //               Home
    //             </a>
    //           </Link>
    //           <Link href="/marketplace" legacyBehavior>
    //             <a
    //               className="font-medium mr-8 text-gray-500 hover:text-gray-900">
    //               About
    //             </a>
    //           </Link>
    //         </div>
    //         <div className="text-center">
    //         <User />
    //       </div>
    //     </nav>
    //   </div>
    // </section>