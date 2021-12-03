import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function About() {
  return (
    <>
      <PageSEO title={`About - ${siteMetadata.title}`} description={siteMetadata.description} />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
            About
          </p>
          <p className="mt-5 mx-auto text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper, leo vitae
            lobortis porta, ligula purus varius neque, consequat posuere eros tortor sit amet dui.
            Proin et ante quis lectus luctus tempus. Nullam purus turpis, bibendum eu quam nec,
            tincidunt sagittis metus. Donec eget erat tempus, rutrum mi in, tristique erat. Quisque
            vel ligula eleifend, faucibus ante malesuada, lobortis urna. Curabitur in velit libero.
            Donec bibendum suscipit diam, ac ullamcorper lectus. Integer efficitur mattis sapien, ac
            iaculis leo pharetra ac.
          </p>
          <p className="mt-5 mx-auto text-xl">
            Vivamus quis dui sed justo auctor volutpat. Sed blandit libero ac felis efficitur
            elementum. Donec vulputate a eros vitae finibus. Aliquam erat volutpat. Sed accumsan
            laoreet risus vel vehicula. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Sed tempor, libero id bibendum fermentum, risus enim congue urna, et semper
            tellus ligula accumsan mi. Proin felis nisl, sagittis non finibus vel, iaculis sed
            purus. Cras at tincidunt orci. Integer vel sodales ex.
          </p>
          <p className="mt-5 mx-auto text-xl">
            Curabitur elementum aliquam turpis, ac ultrices mauris imperdiet at. Sed mi sapien,
            rhoncus nec purus vitae, pellentesque pellentesque nibh. Nunc convallis tincidunt quam
            vitae lobortis. Phasellus quis arcu eu risus porttitor finibus et quis arcu. Nulla
            malesuada mi vitae tincidunt vestibulum. Fusce non egestas lectus. Morbi diam nunc,
            pharetra eu consectetur scelerisque, vehicula sed dolor. Pellentesque finibus in metus
            non luctus.
          </p>
        </div>
      </div>
    </>
  )
}
