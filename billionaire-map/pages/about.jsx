export default function About() {
  return (
    <div className="p-16 text-gray-700">
      <h1 className="text-2xl font-bold mb-5">Welcome to the About Page</h1>  
      <p>
      <strong className="mr-1">
        First off, I’d like to thank you for visiting Billionaire Map! 
      </strong>
      
         If you are reading this, it is most likely because I have sent you here
        in some indirect manner to view the quality of my work. I’m grateful
        that you have taken the time to make it this far and I hope that you are
        impressed by your experience and pleased by what I have done here. There
        are two things in the remainder of this about section that I would like
        to address; how it was made and why it was made.
      </p>
      <h2 className="my-3 text-lg font-bold">The Pragmatic</h2>
      <p className="indent-8">
        Billionaire Map is a web application that fits the three-tier
        architectural pattern with Next.js handling the UI, Express.js and
        Node.js handling the application layer, and finally, MongoDB handling
        the database layer. Redux was incorporated for state management,
        although React Context would have worked just fine. Redux was chosen
        simply for the sake of experience. The dataset for the application is
        acquired from Forbes via RapidAPI.com. Each item was augmented to
        incorporate a geolocation property via Google Places API in order to
        supply coordinates to the map component provided by Mapbox. The UI is
        built using TailwindCSS.
      </p>
      <h2 className="my-3 text-lg font-bold">The Idealistic</h2>
      <p className="indent-8 mt-2">
        The reason that I began my journey into tech is that I am passionate
        about building things and believe the future will be what we make it.
        It’s corny. It’s the well-portrayed satire of the HBO show, Silicon
        Valley, regarding technologists (“We’re making the world a better
        place!... At least we hope we are.”) With that bit of humility in tow,
        this page is an exploration and expression of my curiosities. The
        Billionaire Boys Club, as Pharrell might have called them, is filled
        with those who have created the hallmark products of our era. For me
        personally, it was a joy to see Michael Jordan and JAY-Z on the list, as
        they were my childhood idols, and of course, Laurene Powell Jobs in lieu
        of her deceased husband, Steve Jobs, among others. I admire these people
        for their determination, perseverance and vision. They changed the way
        their respective games were played and aspiring stars will emulate them
        for decades. They deserve to be incredibly wealthy and I want to join
        them.
      </p>
      <p className="indent-8 mt-2">
        Hero-worship aside, this list also demonstrates a more problematic
        aspect of our global civilization which is the massive wealth
        accumulation and disparity among its people. Not to mention the fact
        that this disparity is increasing (Have no fear, I’m going to plug a
        link to the World Inequality Report <a className="font-bold underline" href="https://www.cadtm.org/World-inequality-report-2022" target="_blank" rel="noreferrer">right here</a>). This creates an
        internal conflict in me, as I think it does for many people. Certainly,
        many people I know. We all want to make more money, have nicer things,
        raise our social status, and the last thing we want is a higher tax bill
        to accompany all our other rising expenses. We also want to avoid the
        stigma of being seen by our peers as someone seeking a handout,
        clamoring to tax the rich, or supporting a universal basic-income.
        Perhaps you don’t have this level of self-consciousness around the
        subject. I hope you don’t. However, the data shows that this is problem,
        and a big problem at that.
      </p>
      <p className="indent-8 mt-2">
        The true potential of this project lies in its ability to stimulate
        conversation around the topic of wealth accumulation and wealth
        distribution. After all, we want to incentivize people to invent, create
        and design system and products that inspire people to challenge
        themselves, that allow us to live in greater harmony with our own nature
        and nature itself. In order to do that, we also need to safeguard our
        society from the hoarders and those that accumulate at the detriment of
        others simply for the sake of accumulation. In that same vein, we ought
        to put legs under the notion that we live in a meritocratic society and
        that fairness and justice are values that we uphold and protect.
      </p>
      <p className="indent-8 mt-2">
        In order to improve this application and maximize its utility, it should
        aim to become a hybrid of Forbes and the World Inequality Database. For
        those of you who don’t know, at WID, they do incredible research and
        maintain a wealth of data on the subject of wealth and income around the
        world. By combining the two, a macro meets the micro scenario, we can
        get a better sense of what activity is productive and ought to be
        endorsed, and that which is not productive and should not be endorsed.
      </p>
    </div>
  );
}
