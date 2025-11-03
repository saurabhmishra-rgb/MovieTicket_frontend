import React, { useMemo, useState } from 'react'
import MovieCard from '../components/Moviecard'
import { dummyShowsData } from '../assets/assets'

const Movie = () => {
  const [query] = useState('')
  const [genre, setGenre] = useState('All')

  const movies = dummyShowsData || []

  const genres = useMemo(() => {
    const set = new Set()
    movies.forEach(m => (m.genres || []).forEach(g => set.add(g.name)))
    return ['All', ...Array.from(set)]
  }, [movies])

  const filtered = movies.filter(m => {
    const matchesQuery = m.title.toLowerCase().includes(query.toLowerCase())
    const matchesGenre = genre === 'All' || (m.genres || []).some(g => g.name === genre)
    return matchesQuery && matchesGenre
  })

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 py-8">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">All Movies</h2>
          <p className="text-gray-600">Browse our collection and book tickets</p>
        </div>

        <div className="flex gap-3 items-center">
         

          <select value={genre} onChange={e=>setGenre(e.target.value)} className="px-3 py-2 rounded-md bg-gray-800 text-white">
            {genres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </header>

      <section>
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No movies found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(m => (
              <MovieCard key={m.id || m._id} movie={m} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Movie
