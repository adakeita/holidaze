const SingleVenueCard = ({ venue }) => {
    if (!venue) return <div>No venue data available.</div>;

    const imageUrl = venue.media && venue.media.length > 0 ? venue.media[0].url : 'https://via.placeholder.com/400';

    return (
        <div className="venue-card-container bg-white shadow-md rounded-lg overflow-hidden">
            <img
                src={imageUrl}
                alt={venue.name}
                className="w-full object-cover h-96"
            />
            <div className="p-4">
                <h3 className="text-2xl font-bold">{venue.name}</h3>
                <p className="text-gray-600">{venue.description}</p>
                <div className="mt-2">
                    <strong>Price:</strong> ${venue.price} per night
                </div>
                <div className="mt-1">
                    <strong>Max Guests:</strong> {venue.maxGuests}
                </div>
                <div className="mt-1">
                    <strong>Rating:</strong> {venue.rating} / 5
                </div>
                <div className="mt-1">
                    <strong>Location:</strong> {venue.location.address}, {venue.location.city}
                </div>
                <div className="mt-3">
                    <strong>Amenities:</strong>
                    <ul className="list-disc list-inside">
                        {venue.meta.wifi && <li>Wi-Fi</li>}
                        {venue.meta.parking && <li>Parking</li>}
                        {venue.meta.breakfast && <li>Breakfast included</li>}
                        {venue.meta.pets && <li>Pets allowed</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SingleVenueCard;
