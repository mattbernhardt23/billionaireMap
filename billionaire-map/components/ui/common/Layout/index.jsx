import { Navbar, Footer } from "@components/ui/common"

import Head from "next/head";

export default function BaseLayout({children}) {
  return (
     
    <>
      <Head>
          <title>Billionaire Map</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <div className="max-w-7xl mx-auto px-4">
          <Navbar />
            <div className="fit">
              {children}
            </div>
        </div>
        <Footer />
    </> 
  
  )
}


// <Html>
//     <Head>
//       <title>Billionaire Map</title>
//       <link rel="icon" href="/favicon.ico" />
//       <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" />
//     </Head>
//     <body>
//         <div className="max-w-7xl mx-auto px-4">
//           <Navbar />
//           <div className="fit">
//             {children}
//           </div>
//         </div>
//       <Footer />
//       <NextScript />
//     </body>
//   </Html>
