import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addBooking } from '../../redux/bookingSlice'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Trailer from '../components/Trailer'

const MovieDetail = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [movie, setMovie] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [customDate, setCustomDate] = useState('')
  const [customTime, setCustomTime] = useState('')
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [showSeats, setShowSeats] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (location.state?.movie) {
          setMovie(location.state.movie)
          return
        }
        const foundMovie = dummyShowsData.find(m => m.id === parseInt(id))
        if (!foundMovie) throw new Error('Movie not found')
        setMovie(foundMovie)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [id, location.state])

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )

  if (!movie)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Movie not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Return Home
        </button>
      </div>
    )

  const rows = 5
  const cols = 8
  const totalSeats = Array.from({ length: rows * cols }, (_, i) => i + 1)

  const toggleSeat = seat => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    )
  }

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time')
      return
    }
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat')
      return
    }

    const showDateTime = selectedTime.includes('T')
      ? selectedTime
      : `${selectedDate}T${selectedTime}`
    const pricePerSeat = movie.price || 250
    const totalAmount = pricePerSeat * selectedSeats.length

    const newBooking = {
      _id: `local_${Date.now()}`,
      user: { name: 'You' },
      show: {
        _id: `local_show_${Date.now()}`,
        movie,
        showDateTime: new Date(showDateTime).toISOString(),
        showPrice: pricePerSeat,
      },
      amount: totalAmount,
      bookedSeats: selectedSeats,
      isPaid: false,
    }

    dispatch(addBooking(newBooking))
    navigate('/my-booking', { state: { added: true } })
  }

  const availableDates = Object.keys(dummyDateTimeData || {})

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {(movie.genres || []).map(g => (
                <span key={g.id} className="px-3 py-1 bg-gray-100 rounded-full">
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">{movie.overview}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Release Date:</span>
                <p>{new Date(movie.release_date).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="font-semibold">Runtime:</span>
                <p>{movie.runtime} minutes</p>
              </div>
              <div>
                <span className="font-semibold">Rating:</span>
                <p>⭐ {movie.vote_average.toFixed(1)}</p>
              </div>
              <div>
                <span className="font-semibold">Language:</span>
                <p>{movie.original_language.toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="bg-gray-900 text-white p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold">Book Tickets</h2>

            {/* Select Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Date (or choose your own below)
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {availableDates.map(date => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date)
                      setSelectedTime('')
                      setCustomDate('')
                      setCustomTime('')
                    }}
                    className={`px-4 py-2 rounded-lg border whitespace-nowrap ${selectedDate === date
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'hover:border-blue-400'
                      }`}
                  >
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Time */}
            {selectedDate && dummyDateTimeData[selectedDate] && (
              <div>
                <label className="block text-sm font-medium mb-2">Select Time</label>
                <div className="flex flex-wrap gap-2">
                  {dummyDateTimeData[selectedDate].map(slot => (
                    <button
                      key={slot.showId}
                      onClick={() => {
                        setSelectedTime(slot.time)
                        setCustomTime('')
                      }}
                      className={`px-4 py-2 rounded-lg border ${selectedTime === slot.time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'hover:border-blue-400'
                        }`}
                    >
                      {new Date(slot.time).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Date & Time */}
            <div className="pt-2 border-t border-gray-700">
              <p className="text-sm mb-2">Or pick your own date & time</p>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2 text-black"
                  value={customDate}
                  onChange={e => setCustomDate(e.target.value)}
                />
                <input
                  type="time"
                  className="border rounded-lg px-3 py-2 text-black"
                  value={customTime}
                  onChange={e => setCustomTime(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (!customDate || !customTime) return
                    const iso = `${customDate}T${customTime}`
                    setSelectedDate(customDate)
                    setSelectedTime(iso)
                  }}
                  className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Use custom
                </button>
              </div>
            </div>

            {/* Seat Selection */}
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Select Your Seats</h3>
                <button
                  onClick={() => setShowSeats(prev => !prev)}
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  {showSeats ? '− Minimize' : '+ Expand'}
                </button>
              </div>

              {showSeats && (
                <>
                  <div className="grid grid-cols-8 gap-2 justify-center">
                    {totalSeats.map(seat => (
                      <button
                        key={seat}
                        onClick={() => toggleSeat(seat)}
                        className={`w-8 h-8 rounded-md text-sm font-semibold transition ${selectedSeats.includes(seat)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Selected Seats:{' '}
                    {selectedSeats.length > 0
                      ? selectedSeats.join(', ')
                      : 'None selected'}
                  </p>
                </>
              )}
            </div>

            {/* Book Button */}
            <button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || selectedSeats.length === 0}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed mt-3"
            >
              {!selectedDate || !selectedTime
                ? 'Select date & time'
                : selectedSeats.length === 0
                  ? 'Select seats'
                  : 'Book Now'}
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MovieDetail
