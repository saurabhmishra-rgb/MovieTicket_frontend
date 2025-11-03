import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeBooking } from '../../redux/bookingSlice'

const MyBooking = () => {
  const reduxBookings = useSelector((state) => state.bookings?.bookings || [])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [removedIds, setRemovedIds] = useState([])

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <Loading />

  // Merge redux + dummy bookings
  const mergedBookings = [...reduxBookings, ...dummyBookingData]

  // ✅ Remove duplicates based on unique booking ID or movie + datetime combo
  const uniqueBookingsMap = new Map()

  mergedBookings.forEach((b) => {
    const id = b?._id || b?.id
    const uniqueKey =
      id ||
      `${b?.show?.movie?.id || b?.movie?.id || b?.title}_${b?.show?.showDateTime ||
        b?.showDateTime ||
        b?.date}_${b?.show?.time || b?.time}`

    if (!uniqueBookingsMap.has(uniqueKey)) {
      uniqueBookingsMap.set(uniqueKey, b)
    }
  })

  const bookings = Array.from(uniqueBookingsMap.values()).filter((b) => {
    const id = b?._id || b?.id
    return id ? !removedIds.includes(id) : true
  })

  const handlePayNow = (item) => {
    alert(`Proceeding to payment for ${item?.show?.movie?.title || item?.title}`)
  }

  const handleRemove = (item) => {
    const id = item?._id || item?.id
    if (!id) return

    const existsInRedux = reduxBookings.some((b) => b._id === id || b.id === id)
    if (existsInRedux) {
      dispatch(removeBooking(id))
    } else {
      setRemovedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    }
  }

  const formatShowDate = (item) => {
    const iso = item?.show?.showDateTime || item?.showDateTime || null
    if (iso) {
      const d = new Date(iso)
      return `${d.toLocaleDateString()} • ${d.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`
    }
    const date = item?.show?.date || item?.date
    const time = item?.show?.time || item?.time
    if (date || time) return `${date || 'N/A'} • ${time || 'N/A'}`
    return 'N/A'
  }

  return (
    <div className="p-5 text-white min-h-screen bg-gray-950">
      <h2 className="text-2xl font-bold mb-5 text-yellow-400 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-400 text-center">No bookings found.</p>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          {bookings.map((item, index) => {
            const seats = item?.bookedSeats || item?.seats || []
            const amount = item?.amount || item?.show?.showPrice || 0
            const movie = item?.show?.movie || {
              title: item?.title || 'Untitled',
              poster_path: item?.poster_path,
            }

            return (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between bg-gray-800 border border-gray-700 
                           rounded-lg mt-2 p-3 max-w-3xl w-full shadow-md hover:-translate-y-1 transition"
              >
                {/* LEFT SIDE — Movie Info */}
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-3/4">
                  <img
                    src={movie?.poster_path}
                    alt={movie?.title}
                    className="w-full md:w-32 aspect-[3/4] object-cover rounded-md"
                  />

                  <div className="flex flex-col justify-center">
                    <p className="font-semibold text-lg">{movie?.title}</p>
                    <p className="text-xs text-gray-400">
                      {movie?.release_date || 'Unknown Release'}
                    </p>

                    <div className="mt-2 space-y-1 text-xs">
                      <p>
                        <span className="text-gray-400">📅 When:</span>{' '}
                        <span className="font-medium text-yellow-300">
                          {formatShowDate(item)}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-400">Seats:</span>{' '}
                        <span className="font-medium text-yellow-300">
                          {seats.length ? seats.join(', ') : 'N/A'}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-400">Amount:</span>{' '}
                        <span className="font-medium text-yellow-300">₹{amount}</span>
                      </p>
                      <p>
                        <span className="text-gray-400">Status:</span>{' '}
                        <span
                          className={`font-medium ${
                            item.isPaid ? 'text-green-500' : 'text-yellow-300'
                          }`}
                        >
                          {item.isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE — Payment Buttons */}
                <div className="flex flex-col justify-between items-center md:items-end w-full md:w-1/4 mt-3 md:mt-0">
                  <p className="text-yellow-400 text-base font-bold">Total: ₹{amount}</p>
                  <div className="flex flex-col gap-1.5 w-full md:w-auto">
                    <button
                      onClick={() => handlePayNow(item)}
                      className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-1.5 px-4 rounded-md transition-all text-sm"
                    >
                      Pay Now
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/movie/${movie.id}`, { state: { movie } })
                      }
                      className="bg-blue-600 text-white py-1.5 px-4 rounded-md text-sm"
                    >
                      View Movie
                    </button>
                    <button
                      onClick={() => handleRemove(item)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyBooking
