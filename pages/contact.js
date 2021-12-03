import { useState } from 'react'

export default function About() {
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    setIsSubmiting(true)
    event.preventDefault()

    fetch('api/sendEmail', {
      body: JSON.stringify({
        name: name,
        lastName: lastName,
        phone: phone,
        email: email,
        message: message,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsSubmiting(false)

        if (res.status == 200) {
          console.log('Success')
          setSucceeded(true)
          alert('The message was sent succesfully')
        } else {
          console.log('Fail')
        }
      })
      .catch((err) => {
        console.log(err)
        event.preventDefault()
      })
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
          Contact
        </p>
        <div className="mt-12">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium">
                First Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="first_name"
                  id="first_name"
                  autoComplete="given-name"
                  className="py-3 px-4 block w-full shadow-sm text-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                />
              </div>
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="last_name"
                  id="last_name"
                  autoComplete="family-name"
                  className="py-3 px-4 block w-full shadow-sm text-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="py-3 px-4 block w-full shadow-sm text-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone_number" className="block text-sm font-medium">
                Phone number
              </label>
              <div className="mt-1 relative shadow-sm">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  name="phone_number"
                  id="phone_number"
                  autoComplete="tel"
                  className="py-3 px-4 block w-full text-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  rows="4"
                  className="py-3 px-4 block w-full shadow-sm text-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                ></textarea>
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmiting || succeeded}
                className={
                  succeeded
                    ? 'w-full inline-flex items-center justify-center px-6 py-3 border border-transparent shadow-sm text-base font-medium text-white bg-green-600 '
                    : 'w-full inline-flex items-center justify-center px-6 py-3 border border-transparent shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2'
                }
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
