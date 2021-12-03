import { PageSEO } from '@/components/SEO'
import Hero from '../components/Hero'
import siteMetadata from '@/data/siteMetadata'

const IndexPage = () => {
  return (
    <>
      <PageSEO title={`Home - ${siteMetadata.title}`} description={siteMetadata.description} />

      <Hero />
    </>
  )
}

export default IndexPage
