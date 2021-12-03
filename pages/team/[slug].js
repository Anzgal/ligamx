import { PageSEO } from '@/components/SEO'
import { convertToSlug } from '@/lib/utils'
import siteMetadata from '@/data/siteMetadata'

export async function getStaticPaths() {
  const res = await fetch(
    'https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=Mexican%20Primera%20League'
  )

  const data = await res.json()

  //const posts = getFiles('blog')
  return {
    paths: data.teams.map((p) => ({
      params: {
        slug: convertToSlug(p.strTeam),
        id: p.idTeam,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    'https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=Mexican%20Primera%20League'
  )
  const data = await res.json()

  const filteredValue = data.teams.find((v) => convertToSlug(v.strTeam) === params.slug)

  /*  const resDetails = await fetch(
    `https://www.thesportsdb.com/api/v1/json/50130162/lookupteam.php?id=${params.id}`
  )
  const dataDetails = await resDetails.json() */

  const resEvents = await fetch(`${process.env.APIURL}/eventslast.php?id=${filteredValue.idTeam}`)
  const dataEvents = await resEvents.json()

  const resPlayers = await fetch(
    `${process.env.APIURL}/lookup_all_players.php?id=${filteredValue.idTeam}`
  )
  const dataPlayers = await resPlayers.json()

  const resEquipment = await fetch(
    `https://www.thesportsdb.com/api/v1/json/2/lookupequipment.php?id=${filteredValue.idTeam}`
  )
  const dataEquipment = await resEquipment.json()

  return { props: { filteredValue, dataEvents, dataPlayers, dataEquipment } }
}

export default function Team({ filteredValue, dataEvents, dataPlayers, dataEquipment }) {
  return (
    <>
      <PageSEO
        title={`${filteredValue.strTeam} - ${siteMetadata.title}`}
        description={siteMetadata.description}
      />

      <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
              <div className="lg:py-24">
                <h1 className="mt-4 text-4xl tracking-tight font-extrabold sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block">{filteredValue.strTeam}</span>
                  <span className="block xl:text-4xl text-indigo-400">
                    {filteredValue.strAlternate}
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-800 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Foundation: <span className="font-bold">{filteredValue.intFormedYear}</span>
                </p>
                <p className="mt-1 text-base text-gray-800 dark:text-gray-300 sm:mt-1 sm:text-xl lg:text-lg xl:text-xl">
                  Location: <span className="font-bold">{filteredValue.strStadiumLocation}</span>
                </p>
                <p className="mt-1 text-base text-gray-800 dark:text-gray-300 sm:mt-1 sm:text-xl lg:text-lg xl:text-xl">
                  Stadium: <span className="font-bold">{filteredValue.strStadium}</span>
                </p>
              </div>
            </div>
            <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                <img
                  className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={filteredValue.strTeamBadge}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4  sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
            About
          </p>
          <p className=" mt-5 mx-auto text-xl text-gray-500">{filteredValue.strDescriptionEN}</p>
        </div>
      </div>

      <p className="text-center mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
        Jerseys
      </p>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {dataEquipment.equipment &&
          dataEquipment.equipment.map((product) => (
            <div key={product.idEquipment} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.strEquipment}
                  alt={product.strType}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
            </div>
          ))}
      </div>

      <div className="space-y-5 my-10 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Featured players</h2>
      </div>
      <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
        {dataPlayers.player &&
          dataPlayers.player.map((person) => (
            <li key={person.idPlayer}>
              <div className="space-y-4">
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    className="object-cover shadow-lg rounded-lg"
                    src={
                      person.strThumb
                        ? person.strThumb
                        : 'https://thumbs.dreamstime.com/b/profile-picture-vector-perfect-social-media-other-web-use-125320944.jpg'
                    }
                    alt={person.strPlayer}
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-lg leading-6 font-medium space-y-1">
                    <h3>{person.name}</h3>
                    <p className="text-indigo-600">{person.strPlayer}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>

      <div className="relative  ">
        <div className="relative">
          <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Last matches</p>
          </div>
          <div className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
            {dataEvents.results &&
              dataEvents.results.map((post) => (
                <div
                  key={post.idEvent}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src={post.strThumb} alt="" />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-600">{post.strEvent}</p>
                      <div className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">
                          {post.intHomeScore} - {post.intAwayScore}
                        </p>
                        <p className="mt-3 text-base text-gray-500">{post.dateEventLocal}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
