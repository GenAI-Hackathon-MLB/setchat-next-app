'use client'

import { useState } from 'react'
import { endpoints, type Environment } from '../utils/config'

export default function ApiRequestForm({
  environments,
}: {
  environments: Record<Environment, string>
}) {
  const [environment, setEnvironment] = useState<Environment>('Dev')
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0])
  const [inputValues, setInputValues] = useState<Record<string, string>>({})
  const [response, setResponse] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const areAllFieldsFilled = () => {
    return selectedEndpoint.inputs.every(
      (input) => inputValues[input.name]?.trim() !== ''
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = `${environments[environment]}${selectedEndpoint.path}`
    console.log(selectedEndpoint)
    console.log(inputValues)
    setIsLoading(true)
    try {
      if (selectedEndpoint.method == 'GET') {
        const res = await fetch(url, {
          method: selectedEndpoint.method,
          headers: { 'Content-Type': 'application/json' },
        })
        
        const data = await res.json()
        setResponse(JSON.stringify(data, null, 2))
      } else {
        const res = await fetch(url, {
          method: selectedEndpoint.method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputValues)
        })

        const data = await res
        setResponse(JSON.stringify(data, null, 2))
      }
    } catch (error) {
      setResponse(`Error: ${error}`)
    }
    setIsLoading(false)
  }

  return (
    <div className='space-y-4'>
      <div className='max-w-xs'>
        <label
          htmlFor='environment'
          className='block text-sm font-medium text-gray-700'
        >
          Environment
        </label>
        <select
          id='environment'
          className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
          value={environment}
          onChange={(e) => setEnvironment(e.target.value as Environment)}
        >
          {Object.keys(environments).map((env) => (
            <option key={env} value={env}>
              {env}
            </option>
          ))}
        </select>
      </div>

      <div className='max-w-xs'>
        <label
          htmlFor='endpoint'
          className='block text-sm font-medium text-gray-700'
        >
          Endpoint
        </label>
        <select
          id='endpoint'
          className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
          value={selectedEndpoint.name}
          onChange={(e) => {
            const endpoint = endpoints.find((ep) => ep.name === e.target.value)
            if (endpoint) {
              setSelectedEndpoint(endpoint)
              setInputValues({})
            }
          }}
        >
          {endpoints.map((endpoint) => (
            <option key={endpoint.name} value={endpoint.name}>
              {endpoint.name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {selectedEndpoint.inputs.map((input) => (
          <div key={input.name}>
            <label
              htmlFor={input.name}
              className='block text-sm font-medium text-gray-700'
            >
              {input.name}
              <span className='text-red-500 ml-1'>*</span>
            </label>
            {input.type === 'textarea' ? (
              <textarea
                id={input.name}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                value={inputValues[input.name] || ''}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    [input.name]: e.target.value,
                  })
                }
                required
              />
            ) : (
              <input
                type={input.type}
                id={input.name}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                value={inputValues[input.name] || ''}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    [input.name]: e.target.value,
                  })
                }
                required
              />
            )}
          </div>
        ))}

        <button
          type='submit'
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={!areAllFieldsFilled() || isLoading}
        >
          Submit
        </button>
      </form>

      <div>
        <h2 className='text-lg font-medium text-gray-900'>Response</h2>
        <pre className='mt-2 p-4 bg-gray-100 rounded-md overflow-auto'>
          {response}
        </pre>
      </div>
    </div>
  )
}
