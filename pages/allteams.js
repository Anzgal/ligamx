import { useEffect, useState } from 'react'
import Image from 'next/image'
import { convertToSlug } from '@/lib/utils'

export async function getStaticProps() {
  const res = await fetch(`${process.env.APIURL}/lookup_all_teams.php?id=4350`)

  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return { props: { data } }
}

const TeamsPage = ({ data }) => {
  return (
    <>
      <div>
        <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">All teams</h2>
              <p className="text-xl text-gray-500">Select the team to view all the information</p>
            </div>
            <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
              {!data.teams.length && 'No posts found.'}
              {data.teams.map((person) => (
                <li key={person.idTeam}>
                  <div className="space-y-6">
                    <a href={`team/${convertToSlug(person.strTeam)}`}>
                      <div className="relative h-40 w-40 xl:w-56 xl:h-56 mx-auto">
                        <Image layout="fill" src={person.strTeamBadge} alt="" />
                      </div>
                    </a>
                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{person.strTeam}</h3>
                        <p className="text-indigo-600">{person.role}</p>
                      </div>
                      <ul className="flex justify-center space-x-5">
                        <li>
                          {person.strTwitter && (
                            <a
                              href={`https://${person.strTwitter}`}
                              className="text-gray-400 hover:text-gray-500"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span className="sr-only">Twitter</span>
                              <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                            </a>
                          )}
                        </li>
                        <li>
                          {person.strWebsite && (
                            <a
                              href={`https://${person.strWebsite}`}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Sitio Web</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                />
                              </svg>
                            </a>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default TeamsPage
