import { useEffect, useState } from "react";
import {
  deleteRoom,
  displayRooms,
  getRecommandedRooms,
} from "../../../Services/RoomsService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaEdit } from "react-icons/fa"; // Import an icon (assuming you use react-icons)
import { MdOutlineDeleteOutline } from "react-icons/md";

function DisplayRooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState();
  const [recommandedRooms, setRecommandedRooms] = useState([]);

  const getAllRooms = async () => {
    const response = await displayRooms();
    setRooms(response.rooms);
    setRecommandedRooms(response.recommended_rooms);
  };

  useEffect(() => {
    getAllRooms();
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  const handleDelete = async (id) => {
    await deleteRoom(id);
    setRooms(rooms.filter((room) => room.id !== id));
  };

  return (
    <>
      <div className="mt-10">
        <div
          className={`wow fadeInUp w-full center mx-auto text-center`}
          data-wow-delay=".1s"
          style={{ maxWidth: "570px", marginBottom: "30px" }}
        >
          <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
            Découvrez toutes les Rooms
          </h2>
          <p className="text-base !leading-relaxed text-body-color md:text-lg">
            Explore the wide range of teams participating in our tournaments.
            Get to know their history, achievements, and more.
          </p>
        </div>
        <div className="flex justify-end mr-6 mb-5">
          <button
            onClick={() => navigate("/front/addRoom")}
            className="bg-black-700 text-white px-4 py-2 rounded font-bold transition ease-in-out duration-300 hover:bg-red-600"
          >
            Ajouter Room
          </button>
        </div>

        {/* Recommended Rooms Section */}
        {recommandedRooms.length > 0 && (
          <div>
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-10 mr-10">
              {recommandedRooms.map((room) => (
                <div
                  key={room.id}
                  className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200 relative" // Added relative positioning
                >
                  <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                    Recommandé pour vous
                  </span>
                  <img
                    className="w-full h-48 object-cover"
                    src={room.image}
                    alt={room.name}
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{room.name}</div>
                    <p className="text-gray-700 text-base">
                      {room.description}
                    </p>
                  </div>
                  <div className="px-6 py-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                      Status: {room.status}
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                      Participants: {room.max_participants}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Room Cards Section */}
        <div className="mb-64 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-10 mr-10">
          {rooms
            .filter((room) => !recommandedRooms.some((r) => r.id === room.id)) // Exclude recommended rooms
            .map((room) => (
              <div
                key={room.id}
                className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={room.image}
                  alt={room.name}
                />
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-xl mb-2">{room.name}</div>
                    {user && room.createdBy === user.user_id && (
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            navigate(`/front/updateroom`, { state: { room } })
                          }
                          className="ml-2 text-black-500 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(room.id)}
                          className="ml-2 text-black-500 hover:text-blue-800"
                        >
                          <MdOutlineDeleteOutline size={22} />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 text-base">{room.description}</p>
                </div>
                <div className="px-6 py-4">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    Status: {room.status}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    Participants: {room.max_participants}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default DisplayRooms;
